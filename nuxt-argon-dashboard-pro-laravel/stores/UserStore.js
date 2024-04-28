import userService from "../services/user.service";
import { defineStore } from "pinia";

export const useUserStore = defineStore("UserStore", {
    state: () => {
        return {
            usersList: null,
            pageMeta: null,
            allUsersList: null,
            selectedUser: null,
        }
    },
    actions: {
        async getUsersList({ pageNumber, pageSize, sort, filter }) {
            const response = await userService.getUsersList({ pageNumber, pageSize, sort, filter });
            
            this.usersList = response.data;
            this.pageMeta = response.meta;
        },
        async getAllUsersList() {
            this.allUsersList = await tagService.getAllUsersList();
        },
        async getUser(userId) {
            if (this.usersList) {
                this.selectedUser = this.usersList.find(user => user.id === userId);
            } else {
                this.selectedUser = await userService.getUserById(userId);
            }
        },
        async createUser({ email, name, password, passwordConfirm, role }) {
            return await userService.createUser({
                email: email,
                name: name,
                password: password,
                passwordConfirm: passwordConfirm,
                role: role,
            });
        },
        async updateUser(userId, body) {
            return await userService.updateUser(userId, body);
        },
        async deleteUser(userId) {
            return await userService.deleteUser(userId);
        },
        async uploadProfileImage(file, userId) {
            return await userService.uploadProfileImage(file, userId);
        }
    },
});
