import { defineStore } from "pinia";
import authService from "../services/auth.service";

export const useAuthStore = defineStore("AuthStore", {
  state: () => {
    return {
      currentUser: null,
      userRole: null,
    };
  },
  actions: {
    async login({ email, password }) {
      await authService.login(email, password);
      this.getProfile();
    },
    async register({ name, email, password, passwordConfirm }) {
      await authService.register(name, email, password, passwordConfirm);
      this.getProfile();
    },
    async logout() {
      await authService.logout();
    },
    checkIsAuthenticated() {
      if (localStorage.getItem("authToken")) return true;

      return false;
    },
    async getProfile() {
      this.currentUser = await authService.getProfile();
      this.userRole = this.currentUser.roles[0].name;
    },
    async updateProfile(userId, body) {
      const response = await authService.updateProfile(userId, body);
      await this.getProfile();

      return response;
    },
  },
});
