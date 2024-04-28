import roleService from "../services/role.service";
import { defineStore } from "pinia";

export const useRoleStore = defineStore("RoleStore", {
    state: () => {
        return {
            rolesList: null,
            allRolesList: null,
            pageMeta: null,
            currentRole: null,
        }
    },
    actions: {
        async getRolesList({ pageNumber, pageSize, sort, filter }) {
            const response = await roleService.getRolesList({ pageNumber, pageSize, sort, filter });

            this.rolesList = response.data;
            this.pageMeta = response.meta;
        },
        async getAllRolesList() {
            this.allRolesList = await roleService.getAllRolesList();
        },
        async getRole(roleId) {
            if (this.rolesList) {
                this.currentRole = this.rolesList.find(role => role.id === roleId);
            } else {
                this.currentRole = await roleService.getRoleById(roleId);
            }
        },
        async createRole(roleName) {
            return await roleService.createRole({ name: roleName });
        },
        async updateRole(roleId, roleName) {
            return await roleService.updateRole({ roleId: roleId, name: roleName });
        },
        async deleteRole(roleId) {
            return await roleService.deleteRole(roleId);
        },
    },
});
