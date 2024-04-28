<template>
    <div class="card shadow-lg mx-4 p-3 mt-4">
        <div class="d-flex justify-content-between px-4 pt-3">
            <h5 class="font-weight-bolder mb-0">Tags List</h5>
            <button v-if="isForDisplay()" type="button" class="btn base-button btn-icon btn-fab btn-primary btn-sm"
                @click.prevent="router.push({ path: '/examples/tag-management/add-tag' })">
                <span class="btn-inner--text">Add Tag</span>
            </button>
        </div>
        <div class="mt-4">
            <div class="table-responsive">
                <div class="dataTable-search search-block">
                    <ArgonInput v-model="search" class="dataTable-input search-input-table" placeholder="Search..."
                        type="text" />
                </div>
                <table id="tag-table" class="table table-flush">
                    <thead class="thead-light">
                        <tr>
                            <th>NAME</th>
                            <th data-sortable="false">COLOR</th>
                            <th>CREATED AT</th>
                            <th v-if="isForDisplay()" data-sortable="false">ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody class="table-body">
                        <tr v-for="{ id, name, color, created_at } of pageItems" :key="id">
                            <td class="text-sm font-weight-normal">{{ name }}</td>
                            <td class="text-sm font-weight-normal">
                                <span class="badge" :style="{ 'background-color': color }">{{ name }}</span>
                            </td>
                            <td class="text-sm font-weight-normal">{{ created_at }}</td>
                            <td v-if="isForDisplay()" class="text-sm font-weight-normal">
                                <div class="d-flex align-items-center ms-auto">
                                    <div class=" cursor-pointer edit">
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
import { useTagStore } from "~~/stores/TagStore";
import { useAuthStore } from "~~/stores/AuthStore";
import { useRouter } from "vue-router";
import BasePagination from "~~/components/BasePagination.vue";
import Swal from "sweetalert2";
import _ from "lodash";

definePageMeta({
    middleware: ["auth", "admin-creator"],
})

const router = useRouter();
const authStore = useAuthStore();
const tagStore = useTagStore();
let tagsListTable;
const pageItems = null;
const search = ref('');
const sort = ref('');

const getTagList = _.debounce(async function (params) {
    await tagStore.getTagsList({
        filter: params.filter ? params.filter : '',
        sort: params.sort ? params.sort : '',
        pageNumber: params.pageNumber,
        pageSize: params.pageSize
    })
    pagination.from = tagStore.pageMeta.from;
    pagination.to = tagStore.pageMeta.to;
    pagination.total = tagStore.pageMeta.total;
    pagination.currentPage = tagStore.pageMeta.currentPage;

    updateTagsTable();
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
    
    await getTagList({ pageNumber: pagination.currentPage, pageSize: pagination.perPage, sort: sort.value, filter: search.value });
}

const createTable = async () => {
    if (document.getElementById("tag-table")) {
        tagsListTable = new DataTable("#tag-table", {
            fixedHeight: true,
            searchable: false,
            perPage: 5,
        });

        document.querySelector(".dataTable-bottom").remove();
        tagsListTable.setMessage("Loading ...");

        await getTagList({ pageNumber: pagination.currentPage, pageSize: pagination.perPage });

        handleButtons(handleDelete, `/examples/tag-management/edit-tag/`, 'tags');

        tagsListTable.on('datatable.sort', async function (column, direction) {
            tagsListTable.setMessage('Loading ...');
            column = tagsListTable.labels[column].toLowerCase().replace(' ', '_');
            direction = direction == "asc" ? "" : "-";
            sort.value = direction + column;

            await getTagList({ pageNumber: pagination.currentPage, pageSize: pagination.perPage, sort: direction + column, filter: search.value });
        });

        tagsListTable.on('datatable.perpage', async function (value) {
            pagination.perPage = value;

            await getTagList({ pageNumber: 1, pageSize: value, sort: sort.value, filter: search.value });
        });
    }
}

onMounted(() => {
    createTable();
});

watch(search, async (newSearch) => {
    tagsListTable.setMessage('Loading ...');
    await getTagList({ pageNumber: pagination.currentPage, pageSize: pagination.perPage, sort: sort.value, filter: newSearch });
});


const isForDisplay = () => {
    return !(authStore.userRole === 'member');
}

const handleDelete = (tagId) => {
    Swal.fire({
        title: "Delete this tag?",
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
                const response = await tagStore.deleteTag(tagId);

                if (response.error.value) {
                    const errorMessage = response.error.value.data.errors[0].detail;
                    useToast("error", errorMessage);
                } else {
                    useToast("success", "Tag deleted successfuly");
                    await getTagList({pageNumber: 1, pageSize: pagination.perPage, sort: sort.value, filter: search.value});
                }
            } catch (error) {
                useFetch("error", error.message);
            }
        }
    })
}

const updateTagsTable = () => {
    const dataTags = [];
    if (tagStore.tagsList && tagStore.tagsList.length > 0) {
        tagsListTable.data = [];
        tagStore.tagsList.forEach(({ id, name, color, created_at }) => {
            dataTags.push(
                [
                    `<div class="text-sm font-weight-normal">${name}</div>`,
                    `<div class="text-sm font-weight-normal"><span class="badge" style="background-color:${color}">${name}</span></div>`,
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
        tagsListTable.refresh();
        tagsListTable.insert({ data: dataTags });

        handleButtons(handleDelete, `/examples/tag-management/edit-tag/`, 'tags');
    } else {
        tagsListTable.setMessage("No entries found");
    }
}
</script>
