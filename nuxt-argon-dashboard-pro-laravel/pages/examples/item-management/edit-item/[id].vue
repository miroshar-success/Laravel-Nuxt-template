<template>
    <div class="card shadow-lg mx-4 p-3 mt-4">
        <div class="d-flex justify-content-between px-4 pt-3">
            <h5 class="font-weight-bolder mb-0">Edit Item</h5>
            <button @click.prevent="router.push({ path: '/examples/item-management/list-items' })" type="button"
                class="btn base-button btn-icon btn-fab btn-primary btn-sm">
                <span class="btn-inner--text">Back to list</span>
            </button>
        </div>
        <div class="mt-4">
            <form role="form" @submit.prevent="$isDemo(itemId) ? $demoMessage('items') : submitForm()">
                <div class="d-flex flex-column max-content align-items-center mb-4 mx-4">
                    <img :src="imgSrc ? imgSrc : defaultAvatar" class="rounded d-flex justify-content-center argon-image" width="200" height="200">
                    <div class="mt-2 d-flex justify-content-center">
                        <ArgonButton v-if="imgSrc !== defaultAvatar" type="button" @click.prevent="handleFileRemove()"
                            class="btn base-button btn btn-sm btn-danger btn-button mx-2">
                            <span><i class="fa fa-times"></i> Remove </span>
                        </ArgonButton>
                        <ArgonButton type="button" class="btn base-button btn btn-sm btn-primary btn-button">
                            <label for="imageInput" class="mb-0">
                                {{ imgSrc !== defaultAvatar ? 'Change' : 'Select image' }}
                            </label>
                            <input ref="file" id="imageInput" accept="image/*" type="file" style="display: none;"
                                v-on:change="handleFileUpload()" />
                        </ArgonButton>
                    </div>
                </div>
                <div class="col-12 mt-sm-0">
                    <label>Name</label>
                    <ArgonInput id="name" name="name" class="multisteps-form__input" type="text" placeholder="Item Name"
                        v-model="formData.name" :error="isError('name', errorsRef)"
                        :errorMessage="getErrorMessage('name', errorsRef)" />
                </div>
                <div class="col-12 mt-sm-0">
                    <label>Description</label>
                    <quill-editor id="description" name="description" class="multisteps-form__input" contentType="html"
                        v-model:content="formData.description" style="min-height:150px;" />
                    <span v-if="isError('description', errorsRef)"
                        style="color: #fd5c70; margin-left: 5px; font-size: 12px">{{ getErrorMessage('description',
                            errorsRef) }}</span>
                </div>
                <div class="col-12 mt-3">
                    <label>Category</label>
                    <select id="choices-category" class="form-control" name="choices-category" v-model="formData.category">
                        <option v-for="category of categoryStore.allCategoriesList" :value="category.id">{{
                            category.name
                        }}</option>
                    </select>
                </div>
                <div class="col-12 mt-3">
                    <label>Tags</label>
                    <select id="choices-tags" class="form-control" name="choices-tags" multiple v-model="formData.tags">
                        <option v-for="tag of tagStore.allTagsList" :value="tag.id">{{ tag.name }}</option>
                    </select>
                    <span v-if="isError('tags', errorsRef)" style="color: #fd5c70; margin-left: 5px; font-size: 12px">{{
                        getErrorMessage('tags', errorsRef) }}</span>
                </div>
                <div class="col-12 mt-3">
                    <label>Status</label>
                    <ArgonRadio id="published" name="status" value="published" v-model="formData.status" checked>Published
                    </ArgonRadio>
                    <ArgonRadio id="draft" name="status" value="draft" v-model="formData.status">Draft</ArgonRadio>
                    <ArgonRadio id="archive" name="status" value="archive" v-model="formData.status">Archive</ArgonRadio>
                </div>
                <div class="col-12 mt-3">
                    <label>Show on homepage?</label>
                    <ArgonSwitch id="isOnHomepage" name="isOnHomepage" v-model="formData.isOnHomepage"
                        :checked="formData.isOnHomepage" />
                </div>
                <div class="col-2 mt-3">
                    <label>Date</label>
                    <ArgonInput type="date" placeholder="Date" v-model="formData.date" />
                </div>

                <div class="button-row d-flex mt-4">
                    <ArgonButton type="submit" color="primary" variant="gradient" class="ms-auto mb-0">
                        Submit
                    </ArgonButton>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import Choices from "choices.js";
import { useItemStore } from "~~/stores/ItemStore";
import { useTagStore } from "~~/stores/TagStore";
import { useCategoryStore } from "~~/stores/CategoryStore";
import { useVuelidate } from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators';
import { QuillEditor } from "@vueup/vue-quill";
import { getErrorMessage, isError, checkItemExist } from "~~/helpers/errorHandler";
import { useRouter } from "vue-router";
import defaultAvatar from '../../../../assets/img/default_avatar.jpeg';
import useToast from "~~/composables/useToast";

definePageMeta({
    middleware: ["auth", "admin-creator"],
})

onMounted(() => {
    getChoices("choices-category");
    getTagsChoises("choices-tags");
});

const getChoices = (id) => {
    const element = document.getElementById(id);

    if (element) {
        return new Choices(element, {
            searchEnabled: false,
        });
    }
};

const getTagsChoises = (id) => {
    const element = document.getElementById(id);

    if (element) {
        return new Choices(element, {
            removeItemButton: true,
        });
    }
}

const { $isDemo, $demoMessage } = useNuxtApp();
const router = useRouter();
const { params: { id: itemId } } = useRoute();
const itemStore = useItemStore();
const tagStore = useTagStore();
const categoryStore = useCategoryStore();
await itemStore.getItem(itemId);

if (!itemStore.allItemsList) {
    await itemStore.getAllItemsList();
}

if (!tagStore.allTagsList) {
    await tagStore.getAllTagsList();
}

if (!categoryStore.allCategoriesList) {
    await categoryStore.getAllCategoriesList();
}

const imgSrc = ref(itemStore.selectedItem.image);
const file = ref(null);

const formData = reactive({
    name: itemStore.selectedItem.name,
    description: itemStore.selectedItem.description,
    category: itemStore.selectedItem.category.id,
    tags: itemStore.selectedItem.tags.map(tag => { return tag.id }),
    status: itemStore.selectedItem.status,
    isOnHomepage: itemStore.selectedItem.is_on_homepage,
    date: itemStore.selectedItem.date_at,
});
const errorsRef = reactive([]);

const handleFileUpload = async () => {
    const files = file.value.files;
    if (!files.length) return

    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = () => {
        imgSrc.value = reader.result;
    }
}

const handleFileRemove = () => {
    imgSrc.value = defaultAvatar;
}

const rules = computed(() => {
    return {
        name: {
            required: helpers.withMessage('The name field is required', required),
        },
    };
});

const v$ = useVuelidate(rules, formData);

const submitForm = async () => {
    errorsRef.value = [];
    v$.value.$validate();
    handleAdditionalErrors();

    if (v$.value.$error || errorsRef.value.length) {
        const errors = JSON.parse(JSON.stringify(v$.value.$errors));
        errorsRef.value = [...errorsRef.value, ...errors];
    } else {
        try {
            let uploadedUrl = '';
            if (imgSrc.value !== defaultAvatar) {
                uploadedUrl = await itemStore.uploadItemImage(file, itemId);
            }

            const updateItemResponse = await itemStore.updateItem({
                itemId: itemId,
                name: formData.name,
                description: formData.description,
                status: formData.status,
                image: uploadedUrl,
                date: formData.date,
                isOnHomepage: formData.isOnHomepage,
                category: formData.category,
                tags: formData.tags,
            });

            if (updateItemResponse.error.value) {
                const errorMessage = updateItemResponse.error.value.data.errors[0].detail;
                throw new Error(errorMessage);
            } else {
                useToast('success', 'Item updated successfuly');
                router.push({ path: '/examples/item-management/list-items' });
            }
        } catch (error) {
            useToast('error', error.message);
        }
    }
}

const handleAdditionalErrors = () => {
    if (checkItemExist(formData.name, itemStore.allItemsList, itemStore.selectedItem.name)) {
        errorsRef.value = [...errorsRef.value, { $property: 'name', $message: 'The Item with this name already exists.' }];
    }

    if (formData.description === '<p><br></p>') {
        errorsRef.value = [...errorsRef.value, { $property: 'description', $message: 'The description field is required' }];
    }

    if (!formData.tags.length) {
        errorsRef.value = [...errorsRef.value, { $property: 'tags', $message: 'You should choose at least one tag.' }];
    }
}
</script>
