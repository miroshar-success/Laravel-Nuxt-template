<template>
    <div class="card shadow-lg mx-4 p-3 mt-4">
        <div class="d-flex justify-content-between px-4 pt-3">
            <h5 class="font-weight-bolder mb-0">Roles List</h5>
            <button type="button" class="btn base-button btn-icon btn-fab btn-primary btn-sm"
                @click.prevent="router.push({ path: '/examples/role-management/add-role' })">
                <span class="btn-inner--text">Add Role</span>
            </button>
        </div>
        <div class="mt-4">
            <div class="table-responsive">
                <div class="dataTable-search search-block">
                    <ArgonInput v-model="search" class="dataTable-input search-input-table" placeholder="Search..."
                        type="text" />
                </div>
                <table id="role-table" class="table table-flush">
                    <thead class="thead-light">
                        <tr>
                            <th>NAME</th>
                            <th>CREATED AT</th>
                            <th data-sortable="false">ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="{ id, name, created_at } of pageItems" :key="id">
                            <td class="text-sm font-weight-normal">{{ name }}</td>
                            <td class="text-sm font-weight-normal">{{ created_at }}</td>
                            <td class="text-sm font-weight-normal">
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
import { useRoleStore } from "~~/stores/RoleStore";
import { useRouter } from "vue-router";
import BasePagination from "~~/components/BasePagination.vue";
import Swal from "sweetalert2";
import _ from "lodash";

definePageMeta({
    middleware: ["auth", "admin"],
})

const router = useRouter();
const roleStore = useRoleStore();
let rolesListTable;
const pageItems = null;
const search = ref('');
const sort = ref('');

const getRoleList = _.debounce(async function (params) {
    await roleStore.getRolesList({
        filter: params.filter ? params.filter : '',
        sort: params.sort ? params.sort : '',
        pageNumber: params.pageNumber,
        pageSize: params.pageSize
    })
    pagination.from = roleStore.pageMeta.from;
    pagination.to = roleStore.pageMeta.to;
    pagination.total = roleStore.pageMeta.total;
    pagination.currentPage = roleStore.pageMeta.currentPage;

    updateRolesTable();
}, 300);

const pagination = reactive({
    currentPage: 1,
    perPage: 5,
    total: null,
    from: null,
    to: null,
});

const handlePageChange = async (event) => {
    pagination.currentPage = event;

    await getRoleList({ pageNumber: pagination.currentPage, pageSize: pagination.perPage, sort: sort.value, filter: search.value });
}

const createTable = async () => {
    if (document.getElementById("role-table")) {
        rolesListTable = new DataTable("#role-table", {
            fixedHeight: true,
            searchable: false,
            perPage: 5,
        });

        document.querySelector(".dataTable-bottom").remove();
        rolesListTable.setMessage("Loading ...");

        await getRoleList({ pageNumber: pagination.currentPage, pageSize: pagination.perPage });

        handleButtons(handleDelete, `/examples/role-management/edit-role/`, 'roles');

        rolesListTable.on('datatable.sort', async function (column, direction) {
            rolesListTable.setMessage('Loading ...');
            column = rolesListTable.labels[column].toLowerCase().replace(' ', '_');
            direction = direction == "asc" ? "" : "-";
            sort.value = direction + column;

            await getRoleList({ pageNumber: pagination.currentPage, pageSize: pagination.perPage, sort: direction + column, filter: search.value });

        });

        rolesListTable.on('datatable.perpage', async function (value) {
            pagination.perPage = value;

            await getRoleList({ pageNumber: 1, pageSize: value, sort: sort.value, filter: search.value });
        });
    }
}

onMounted(() => {
    createTable();
});

watch(search, async (newSearch) => {
    rolesListTable.setMessage('Loading ...');
    await getRoleList({ pageNumber: pagination.currentPage, pageSize: pagination.perPage, sort: sort.value, filter: newSearch });
});


const handleDelete = (roleId) => {
    Swal.fire({
        title: "Delete this role?",
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
                const response = await roleStore.deleteRole(roleId);

                if (response.error.value) {
                    const errorMessage = response.error.value.data.errors[0].detail;
                    useToast("error", errorMessage);
                } else {
                    useToast("success", "Role deleted successfuly");
                    await getRoleList({pageNumber: 1, pageSize: pagination.perPage, sort: sort.value, filter: search.value});
                }
            } catch (error) {
                useFetch("error", error.message);
            }
        }
    })
}

const updateRolesTable = () => {
    const dataRoles = [];
    if(roleStore.rolesList && roleStore.rolesList.length > 0) {
        rolesListTable.data = [];
        roleStore.rolesList.forEach(({ id, name, created_at }) => {
            dataRoles.push(
                [
                    `<div class="text-sm font-weight-normal">${name}</div>`,
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
        rolesListTable.refresh();
        rolesListTable.insert({ data: dataRoles });
    
        handleButtons(handleDelete, `/examples/role-management/edit-role/`, 'roles');
    } else {
        rolesListTable.setMessage("No entries found");
    }
}
</script>