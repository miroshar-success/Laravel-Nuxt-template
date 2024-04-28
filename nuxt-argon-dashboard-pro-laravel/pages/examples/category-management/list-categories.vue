<template>
    <div class="card shadow-lg mx-4 p-3 mt-4">
        <div class="d-flex justify-content-between px-4 pt-3">
            <h5 class="font-weight-bolder mb-0">Categories List</h5>
            <button v-if="isForDisplay()" type="button" class="btn base-button btn-icon btn-fab btn-primary btn-sm"
                @click.prevent="router.push({ path: '/examples/category-management/add-category' })">
                <span class="btn-inner--text">Add Category</span>
            </button>
        </div>
        <div class="mt-4">
            <div class="table-responsive">
                <div class="dataTable-search search-block">
                    <ArgonInput v-model="search" class="dataTable-input search-input-table" placeholder="Search..."
                        type="text" />
                </div>
                <table id="category-table" class="table table-flush">
                    <thead class="thead-light">
                        <tr>
                            <th>NAME</th>
                            <th>DESCRIPTION</th>
                            <th>CREATED AT</th>
                            <th v-if="isForDisplay()" data-sortable="false">ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="{ id, name, description, created_at } of pageItems" :key="id">
                            <td class="text-sm font-weight-normal">{{ name }}</td>
                            <td class="text-sm font-weight-normal">{{ description }}</td>
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
import { useCategoryStore } from "~~/stores/CategoryStore";
import { useAuthStore } from "~~/stores/AuthStore";
import { useRouter } from "vue-router";
import BasePagination from "~~/components/BasePagination.vue";
import Swal from "sweetalert2";
import _ from "lodash";

definePageMeta({
    middleware: ["auth", "admin-creator"],
})

const router = useRouter();
const categoryStore = useCategoryStore();
const authStore = useAuthStore();
let categoriesListTable;
const pageItems = null;
const search = ref('');
const sort = ref('');

const getCategoryList = _.debounce(async function (params) {
    await categoryStore.getCategoriesList({
        filter: params.filter ? params.filter : '',
        sort: params.sort ? params.sort : '',
        pageNumber: params.pageNumber,
        pageSize: params.pageSize
    })
    pagination.from = categoryStore.pageMeta.from;
    pagination.to = categoryStore.pageMeta.to;
    pagination.total = categoryStore.pageMeta.total;
    pagination.currentPage = categoryStore.pageMeta.currentPage;

    updateCategoriesTable();
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

    await getCategoryList({ pageNumber: pagination.currentPage, pageSize: pagination.perPage, sort: sort.value, filter: search.value });
}

const createTable = async () => {
    if (document.getElementById("category-table")) {
        categoriesListTable = new DataTable("#category-table", {
            fixedHeight: true,
            searchable: false,
            perPage: 5,
        });

        document.querySelector(".dataTable-bottom").remove();
        categoriesListTable.setMessage("Loading ...");

        await getCategoryList({ pageNumber: pagination.currentPage, pageSize: pagination.perPage });


        handleButtons(handleDelete, `/examples/category-management/edit-category/`, 'categories');

        categoriesListTable.on('datatable.sort', async function (column, direction) {
            categoriesListTable.setMessage('Loading ...');
            column = categoriesListTable.labels[column].toLowerCase().replace(' ', '_');
            direction = direction == "asc" ? "" : "-";
            sort.value = direction + column;

            await getCategoryList({ pageNumber: pagination.currentPage, pageSize: pagination.perPage, sort: direction + column, filter: search.value });
        });

        categoriesListTable.on('datatable.perpage', async function (value) {
            pagination.perPage = value;

            await getCategoryList({ pageNumber: 1, pageSize: value, sort: sort.value, filter: search.value });
        });
    }
}

onMounted(() => {
    createTable();
});

watch(search, async (newSearch) => {
    tagsListTable.setMessage('Loading ...');
    await getCategoryList({ pageNumber: pagination.currentPage, pageSize: pagination.perPage, sort: sort.value, filter: newSearch });
});

const isForDisplay = () => {
    return !(authStore.userRole === 'member');
}

const handleDelete = (categoryId) => {
    Swal.fire({
        title: "Delete this category?",
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
                const response = await categoryStore.deleteCategory(categoryId);

                if (response.error.value) {
                    const errorMessage = response.error.value.data.errors[0].detail;
                    useToast("error", errorMessage);
                } else {
                    useToast("success", "Category deleted successfuly");
                    await getCategoryList({pageNumber: 1, pageSize: pagination.perPage, sort: sort.value, filter: search.value});
                }
            } catch (error) {
                useFetch("error", error.message);
            }
        }
    })
}

const updateCategoriesTable = () => {
    const dataCategories = [];
    if(categoryStore.categoriesList && categoryStore.categoriesList.length > 0) {        
        categoriesListTable.data = [];
        categoryStore.categoriesList.forEach(({ id, name, description, created_at }) => {
            dataCategories.push(
                [
                    `<div class="text-sm font-weight-normal">${name}</div>`,
                    `<div class="text-sm font-weight-normal">${description}</div>`,
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
        categoriesListTable.refresh();
        categoriesListTable.insert({ data: dataCategories });
    
        handleButtons(handleDelete, `/examples/category-management/edit-category/`, 'categories');
    } else {
        categoriesListTable.setMessage("No entries found");
    }
}
</script>
