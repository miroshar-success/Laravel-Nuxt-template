<template>
    <div class="card shadow-lg mx-4 p-3 mt-4">
        <div class="d-flex justify-content-between px-4 pt-3">
            <h5 class="font-weight-bolder mb-0">Items List</h5>
            <button v-if="isForDisplay()" type="button" class="btn base-button btn-icon btn-fab btn-primary btn-sm"
                @click.prevent="router.push({ path: '/examples/item-management/add-item' })">
                <span class="btn-inner--text">Add Item</span>
            </button>
        </div>
        <div class="mt-4">
            <div class="table-responsive">
                <div class="dataTable-search search-block">
                    <ArgonInput v-model="search" class="dataTable-input search-input-table" placeholder="Search..."
                        type="text" />
                </div>
                <table id="item-table" class="table table-flush">
                    <thead class="thead-light">
                        <tr>
                            <th>NAME</th>
                            <th>CATEGORY</th>
                            <th data-sortable="false">PICTURE</th>
                            <th>TAGS</th>
                            <th>CREATED AT</th>
                            <th v-if="isForDisplay()" data-sortable="false">ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="{ id, name, category, image, tags, created_at } of pageItems" :key="id">
                            <td class="text-sm font-weight-normal">{{ name }}</td>
                            <td class="text-sm font-weight-normal">{{ category.name }}</td>
                            <td class="text-sm font-weight-normal">
                                <img :src="image ? image : defaultAvatar" height="100" alt="avatar" class="rounded" />
                            </td>
                            <td class="text-sm font-weight-normal">
                                <div class="d-flex flex-wrap">
                                    <span v-for="{ name, color } of tags" class="badge"
                                        :style="{ 'background-color': color, 'margin': '0.1rem' }">
                                        {{ name }}
                                    </span>
                                </div>
                            </td>
                            <td class="text-sm font-weight-normal">{{ created_at }}</td>
                            <td v-if="isForDisplay()" class="text-sm font-weight-normal">
                                <div class="d-flex align-items-center ms-auto">
                                    <div class="cursor-pointer edit">
                                        <i :class="`fas fa-user-edit text-secondary edit-${id}`"></i>
                                    </div>
                                    <div class="mx-3 cursor-pointer delete">
                                        <i :class="`fas fa-trash text-secondary delete-${id}`"></i>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="d-flex justify-content-center justify-content-sm-between flex-wrap">
                    <div class="ms-3">
                        <p>
                            Showing {{ pagination.total ? pagination?.from : 0 }} to {{ pagination?.to }} of
                            {{ pagination.total }} entries
                        </p>
                    </div>
                    <BasePagination v-model="pagination.currentPage" class="pagination-success pagination-md me-3"
                        :value="pagination.currentPage" :per-page="pagination.perPage" :total="pagination.total"
                        @click="handlePageChange($event)" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { DataTable } from "simple-datatables";
import { handleButtons } from "~~/helpers/dataTable";
import { useItemStore } from "~~/stores/ItemStore";
import { useAuthStore } from "~~/stores/AuthStore";
import { useRouter } from "vue-router";
import defaultAvatar from "../../../assets/img/default_avatar.jpeg";
import BasePagination from "~~/components/BasePagination.vue";
import Swal from "sweetalert2";
import _ from "lodash";

definePageMeta({
    middleware: ["auth"],
})

const router = useRouter();
const itemStore = useItemStore();
const authStore = useAuthStore();
const pageItems = null;
let itemsListTable;
const search = ref('');
const sort = ref('');

const getItemList = _.debounce(async function (params) {
    await itemStore.getItemsList({
        filter: params.filter ? params.filter : '',
        sort: params.sort ? params.sort : '',
        pageNumber: params.pageNumber,
        pageSize: params.pageSize
    })
    pagination.from = itemStore.pageMeta.from;
    pagination.to = itemStore.pageMeta.to;
    pagination.total = itemStore.pageMeta.total;
    pagination.currentPage = itemStore.pageMeta.currentPage;

    updateItemsTable();
}, 300);

const pagination = reactive({
    currentPage: 1,
    perPage: 5,
    total: null,
    from: null,
    to: null,
});

if (!authStore.currentUser) {
    await authStore.getProfile();
}

const handlePageChange = async (event) => {
    pagination.currentPage = event;

    await getItemList({ pageNumber: pagination.currentPage, pageSize: pagination.perPage, sort: sort.value, filter: search.value });
}

const createTable = async () => {
    if (document.getElementById("item-table")) {
        itemsListTable = new DataTable("#item-table", {
            searchable: false,
            fixedHeight: true,
            perPage: 5,
        });

        document.querySelector(".dataTable-bottom").remove();
        itemsListTable.setMessage("Loading ...");

        await getItemList({ pageNumber: pagination.currentPage, pageSize: pagination.perPage });

        handleButtons(handleDelete, `/examples/item-management/edit-item/`, 'items');

        itemsListTable.on('datatable.sort', async function (column, direction) {
            const relationColumns = ['tags', 'category']
            itemsListTable.setMessage("Loading ...");
            column = itemsListTable.labels[column].toLowerCase().replace(' ', '_');
            direction = direction == "asc" ? "" : "-";
            if(!relationColumns.includes(column)) {
                sort.value = direction + column;
            } else {
                sort.value = direction + column + '.name';
            }

            await getItemList({ pageNumber: pagination.currentPage, pageSize: pagination.perPage, sort: sort.value, filter: search.value });
        });

        itemsListTable.on('datatable.perpage', async function (value) {
            pagination.perPage = value;

            await getItemList({ pageNumber: 1, pageSize: value, sort: sort.value, filter: search.value });
        });
    }
}

onMounted(() => {
    createTable();
});

watch(search, async (newSearch) => {
    itemsListTable.setMessage("Loading ...");
    await getItemList({ pageNumber: pagination.currentPage, pageSize: pagination.perPage, sort: sort.value, filter: newSearch });
});

const isForDisplay = () => {
    return !(authStore.userRole === 'member');
}

const handleDelete = (itemId) => {
    Swal.fire({
        title: "Delete this item?",
        showCancelButton: true,
        cancelButtonText: "No, keep it",
        confirmButtonText: "Yes, delete it!",
        customClass: {
            confirmButton: "btn bg-gradient-success",
            cancelButton: "btn bg-gradient-danger",
        },
        buttonsStyling: false,
    }).then(async ({ isConfirmed }) => {
        if (isConfirmed) {
            try {
                const response = await itemStore.deleteItem(itemId);

                if (response.error.value) {
                    const errorMessage = response.error.value.data.errors[0].detail;
                    useToast("error", errorMessage);
                } else {
                    useToast("success", "Item deleted successfuly");
                    await getItemList({pageNumber: 1, pageSize: pagination.perPage, sort: sort.value, filter: search.value});
                }
            } catch (error) {
                useFetch("error", error.message);
            }
        }
    })
}

const handleTableTags = (tags) => {
    let tagsHtml = '';

    for (const { name, color } of tags) {
        tagsHtml = tagsHtml + `<span class="badge" style="background-color:${color}; margin:0.1rem">${name}</span>`;
    }

    return tagsHtml;
}

const updateItemsTable = () => {
    const dataItems = [];
    if(itemStore.itemsList && itemStore.itemsList.length > 0) {
        itemsListTable.data = [];
        itemStore.itemsList.forEach(({ id, name, category, image, tags, created_at }) => {
            dataItems.push(
                [
                    `<div class="text-sm font-weight-normal">${name}</div>`,
                    `<div class="text-sm font-weight-normal">${category.name}</div>`,
                    `<div class="text-sm font-weight-normal">
                        <img src="${image ? image : defaultAvatar}" height="100" class="rounded" alt="avatar" />
                    </div>`,
                    `<div class="text-sm font-weight-normal">
                        <div class="d-flex flex-wrap">
                            ${handleTableTags(tags)}
                        </div>
                    </div>`,
                    `<div class="text-sm font-weight-normal">${created_at}</div>`,
                    `<div class="text-sm font-weight-normal">
                        <div class="d-flex align-items-center ms-auto">
                            <div class="cursor-pointer edit">
                                <i class="fas fa-user-edit text-secondary edit-${id}"></i>
                            </div>
                            <div class="mx-3 cursor-pointer delete">
                                <i class="fas fa-trash text-secondary delete-${id}"></i>
                            </div>
                        </div>
                    </div>`,
                ]
            )
        });
        itemsListTable.refresh();
        itemsListTable.insert({ data: dataItems });
    
        handleButtons(handleDelete, `/examples/item-management/edit-item/`, 'items');
    } else {
        itemsListTable.setMessage("No entries found");
    }
}
</script>
