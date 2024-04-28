import categoryService from "../services/category.service";
import { defineStore } from "pinia";

export const useCategoryStore = defineStore("CategoryStore", {
    state: () => {
        return {
            categoriesList: null,
            pageMeta: null,
            allCategoriesList: null,
            selectedCategory: null,
        }
    },
    actions: {
        async getCategoriesList({ pageNumber, pageSize, sort, filter }) {
            const response = await categoryService.getCategoriesList({ pageNumber, pageSize, sort, filter });

            this.categoriesList = response.data;
            this.pageMeta = response.meta;
        },
        async getAllCategoriesList() {
            this.allCategoriesList = await categoryService.getAllCategoriesList();
        },
        async getCategory(categoryId) {
            if (this.categoriesList) {
                this.selectedCategory = this.categoriesList.find(category => category.id === categoryId);
            } else {
                this.selectedCategory = await categoryService.getCategoryById(categoryId);
            }
        },
        async createCategory(name, description) {
            return await categoryService.createCategory({ name: name, description: description });
        },
        async updateCategory(categoryId, name, description) {
            return await categoryService.updateCategory({ categoryId: categoryId, name: name, description: description });
        },
        async deleteCategory(categoryId) {
            return await categoryService.deleteCategory(categoryId);
        },
    },
});
