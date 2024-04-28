<template>
    <div class="card shadow-lg mx-4 p-3 mt-4">
        <div class="d-flex justify-content-between px-4 pt-3">
            <h5 class="font-weight-bolder mb-0">Edit Category</h5>
            <button @click.prevent="router.push({ path: '/examples/category-management/list-categories' })" type="button"
                class="btn base-button btn-icon btn-fab btn-primary btn-sm">
                <span class="btn-inner--text">Back to list</span>
            </button>
        </div>
        <div class="mt-4">
            <form role="form" @submit.prevent="$isDemo(categoryId) ? $demoMessage('categories') : submitForm()" >
                <div class="col-12 mt-sm-0">
                    <label>Name</label>
                    <ArgonInput id="name" name="name" class="multisteps-form__input" type="text" placeholder="Name"
                        v-model="formData.name" :error="isError('name', errorsRef)"
                        :errorMessage="getErrorMessage('name', errorsRef)" />
                </div>
                <div class="col-12 mt-sm-0">
                    <label>Description</label>
                    <ArgonInput id="description" name="description" class="multisteps-form__input" type="text"
                        placeholder="Description" v-model="formData.description" :error="isError('description', errorsRef)"
                        :errorMessage="getErrorMessage('description', errorsRef)" />
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
import { useCategoryStore } from "~~/stores/CategoryStore";
import { useVuelidate } from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
import { isError, getErrorMessage, checkItemExist } from "~~/helpers/errorHandler";
import { useRouter } from "vue-router";
import useToast from "~~/composables/useToast";

definePageMeta({
    middleware: ["auth", "admin-creator"],
})

const { $isDemo, $demoMessage } = useNuxtApp();
const router = useRouter();
const categoryStore = useCategoryStore();
if (!categoryStore.allCategoriesList) {
    await categoryStore.getAllCategoriesList();
}
const { params: { id: categoryId } } = useRoute();

let formData = reactive({
    name: '',
    description: '',
});
const errorsRef = reactive([]);

const getCategory = async () => {
    await categoryStore.getCategory(categoryId);
    formData = reactive({ ...categoryStore.selectedCategory });
}

await getCategory();

const rules = computed(() => {
    return {
        name: {
            required: helpers.withMessage('The name field is required', required),
        },
        description: {
            required: helpers.withMessage('The description field is required', required),
        },
    };
});

const v$ = useVuelidate(rules, formData);

const submitForm = async () => {
    errorsRef.value = [];
    v$.value.$validate();
    const categoryExist = checkItemExist(formData.name, categoryStore.allCategoriesList, categoryStore.selectedCategory.name);

    if (v$.value.$error || categoryExist) {
        const errors = JSON.parse(JSON.stringify(v$.value.$errors));
        errorsRef.value = [...errors];

        if (categoryExist) {
            errorsRef.value = [...errorsRef.value, { $property: 'name', $message: 'The category with this name already exists.' },]
        }
    } else {
        try {
            const updateCategoryResponse = await categoryStore.updateCategory(categoryId, formData.name, formData.description);

            if (updateCategoryResponse.error.value) {
                const errorMessage = updateCategoryResponse.error.value.data.errors[0].detail;
                throw new Error(errorMessage);
            } else {
                useToast('success', 'Category updated successfuly');
                router.push({ path: '/examples/category-management/list-categories' });
            }
        } catch (error) {
            useToast('error', error.message);
        }
    }
}
</script>
