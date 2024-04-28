import tagService from "../services/tag.service";
import { defineStore } from "pinia";

export const useTagStore = defineStore("TagStore", {
    state: () => {
        return {
            allTagsList: null,
            tagsList: null,
            pageMeta: null,
            selectedTag: null,
        }
    },
    actions: {
        async getTagsList({ pageNumber, pageSize, sort, filter }) {
            const response = await tagService.getTagsList({ pageNumber, pageSize, sort, filter });

            this.tagsList = response.data;
            this.pageMeta = response.meta;
        },
        async getAllTagsList() {
            this.allTagsList = await tagService.getAllTagsList();
        },
        async getTag(tagId) {
            if (this.tagsList) {
                this.selectedTag = this.tagsList.find(tag => tag.id === tagId);
            } else {
                this.selectedTag = await tagService.getTagById(tagId);
            }
        },
        async createTag(name, color) {
            return await tagService.createTag({
                name: name,
                color: color,
            });
        },
        async updateTag(tagId, name, color) {
            return await tagService.updateTag({
                tagId: tagId,
                name: name,
                color: color,
            });
        },
        async deleteTag(tagId) {
            return await tagService.deleteTag(tagId);
        },
    },
});
