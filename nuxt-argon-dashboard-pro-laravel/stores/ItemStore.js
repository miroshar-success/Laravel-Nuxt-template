import itemService from "../services/item.service";
import { defineStore } from "pinia";

export const useItemStore = defineStore("ItemStore", {
    state: () => {
        return {
            allItemsList: null,
            itemsList: null,
            pageMeta: null,
            selectedItem: null,
        }
    },
    actions: {
        async getItemsList({ pageNumber, pageSize, sort, filter }) {
            const response = await itemService.getItemsList({ pageNumber, pageSize, sort, filter });

            this.itemsList = response.data;
            this.pageMeta = response.meta;
        },
        async getAllItemsList() {
            this.allItemsList = await itemService.getAllItemsList();
        },
        async getItem(itemId) {
            if (this.itemsList) {
                this.selectedItem = this.itemsList.find(item => item.id === itemId);
            } else {
                this.selectedItem = await itemService.getItemById(itemId);
            }
        },
        async createItem({name, description, category, date, image, isOnHomepage, status, tags}) {
            return await itemService.createItem({ 
                name: name, 
                description: description,
                category: category,
                date: date,
                image: image,
                isOnHomepage: isOnHomepage,
                status: status,
                tags: tags,
            });
        },
        async updateItem({itemId, name, description, category, date, image, isOnHomepage, status, tags}) {
            return await itemService.updateItem({
                itemId: itemId,
                name: name, 
                description: description,
                category: category,
                date: date,
                image: image,
                isOnHomepage: isOnHomepage,
                status: status,
                tags: tags,
             });
        },
        async deleteItem(itemId) {
            return await itemService.deleteItem(itemId);
        },
        async uploadItemImage(file, itemId) {
            return await itemService.uploadItemImage(file, itemId);
        }
    },
});
