import { defineNuxtRouteMiddleware } from "#app";
import { useAuthStore } from "~~/stores/AuthStore";

const authStore = useAuthStore();

if (!authStore.currentUser) {
    await authStore.getProfile();
}

export default defineNuxtRouteMiddleware(async () => {
    if (authStore.userRole !== 'admin' && authStore.userRole !== 'creator') {
        return '/';
    }
});
