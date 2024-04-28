<template>
    <div class="card shadow-lg mx-4 p-3 mt-4">
        <div class="d-flex justify-content-between px-4 pt-3">
            <h5 class="font-weight-bolder mb-0">Users List</h5>
            <button type="button" class="btn base-button btn-icon btn-fab btn-primary btn-sm"
                @click.prevent="router.push({ path: '/examples/user-management/add-user' })">
                <span class="btn-inner--text">Add User</span>
            </button>
        </div>
        <div class="mt-4">
            <div class="table-responsive">
                <div class="dataTable-search search-block">
                    <ArgonInput v-model="search" class="dataTable-input search-input-table" placeholder="Search..."
                        type="text" />
                </div>
                <table id="user-table" class="table table-flush">
                    <thead class="thead-light">
                        <tr>
                            <th data-sortable="false">AUTHOR</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>ROLE</th>
                            <th>CREATED AT</th>
                            <th data-sortable="false">ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="{ id, name, email, profile_image, roles, created_at } of pageItems" :key="id">
                            <td class="text-sm text-black font-weight-normal"><img
                                    :src="profile_image ? profile_image : defaultAvatar" class="avatar rounded-circle width-auto"
                                    alt="avatar" /></td>
                            <td class="text-sm font-weight-normal">{{ name }}</td>
                            <td class="text-sm font-weight-normal">{{ email }}</td>
                            <td class="text-sm font-weight-normal">{{ roles[0].name }}</td>
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
import { useUserStore } from "~~/stores/UserStore";
import { useAuthStore } from "~~/stores/AuthStore";
import { DataTable } from "simple-datatables";
import { handleButtons } from "~~/helpers/dataTable";
import { useRouter } from "vue-router";
import defaultAvatar from "../../../assets/img/default_avatar.jpeg";
import BasePagination from "~~/components/BasePagination.vue";
import Swal from "sweetalert2";
import _ from "lodash";

definePageMeta({
    middleware: ["auth", "admin"],
})

const router = useRouter();
const authStore = useAuthStore();
const userStore = useUserStore();
let usersListTable;
const pageItems = null;
const search = ref('');
const sort = ref('');

const getUserList = _.debounce(async function (params) {
    await userStore.getUsersList({
        filter: params.filter ? params.filter : '',
        sort: params.sort ? params.sort : '',
        pageNumber: params.pageNumber,
        pageSize: params.pageSize
    })
    pagination.from = userStore.pageMeta.from;
    pagination.to = userStore.pageMeta.to;
    pagination.total = userStore.pageMeta.total;
    pagination.currentPage = userStore.pageMeta.currentPage;

    updateUsersTable();
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

    await getUserList({ pageNumber: pagination.currentPage, pageSize: pagination.perPage, sort: sort.value, filter: search.value });
}

const createTable = async () => {
    if (document.getElementById("user-table")) {
        usersListTable = new DataTable("#user-table", {
            fixedHeight: true,
            searchable: false,
            perPage: 5,
        });

        document.querySelector(".dataTable-bottom").remove();
        usersListTable.setMessage("Loading ...");

        await getUserList({ pageNumber: pagination.currentPage, pageSize: pagination.perPage });

        handleButtons(handleDelete, `/examples/user-management/edit-user/`, 'users', authStore.currentUser.id);

        usersListTable.on('datatable.sort', async function (column, direction) {
            usersListTable.setMessage('Loading ...');
            column = usersListTable.labels[column].toLowerCase().replace(' ', '_');
            direction = direction == "asc" ? "" : "-";
            column === 'role' ? sort.value = direction + 'roles.name' : sort.value = direction + column;

            await getUserList({ pageNumber: pagination.currentPage, pageSize: pagination.perPage, sort: sort.value, filter: search.value });
        })

        usersListTable.on('datatable.perpage', async function (value) {
            pagination.perPage = value;

            await getUserList({ pageNumber: 1, pageSize: value, sort: sort.value, filter: search.value });
        });
    }
}


onMounted(() => {
    createTable();
})

watch(search, async (newSearch) => {
    usersListTable.setMessage('Loading ...');
    await getUserList({ pageNumber: pagination.currentPage, pageSize: pagination.perPage, sort: sort.value, filter: newSearch });
});

const handleDelete = (userId) => {
    Swal.fire({
        title: "Delete this user?",
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
                const response = await userStore.deleteUser(userId);

                if (response.error.value) {
                    const errorMessage = response.error.value.data.errors[0].detail;
                    useToast("error", errorMessage);
                } else {
                    useToast("success", "User deleted successfuly");
                    await getUserList({pageNumber: 1, pageSize: pagination.perPage, sort: sort.value, filter: search.value});
                }
            } catch (error) {
                useFetch("error", error.message);
            }
        }
    })
}

const updateUsersTable = () => {
    const dataUsers = [];
    if(userStore.usersList && userStore.usersList.length > 0) {
        usersListTable.data = [];
        userStore.usersList.forEach(({ id, name, email, profile_image, roles, created_at }) => {
            dataUsers.push(
                [
                    `<div class="text-sm font-weight-normal">
                        <img src="${profile_image ? profile_image : defaultAvatar}" class="avatar rounded-circle width-auto" alt="avatar" />
                    </div>`,
                    `<div class="text-sm font-weight-normal">${name}</div>`,
                    `<div class="text-sm font-weight-normal">${email}</div>`,
                    `<div class="text-sm font-weight-normal">${roles[0].name}</div>`,
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
        usersListTable.refresh();
        usersListTable.insert({ data: dataUsers });
    
        handleButtons(handleDelete, `/examples/user-management/edit-user/`, 'users', authStore.currentUser.id);
    } else {
        usersListTable.setMessage("No entries found");
    }
}
</script>
