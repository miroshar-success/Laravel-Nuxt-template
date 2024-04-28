<template>
    <div class="card shadow-lg mx-4 p-3 mt-4">
        <div class="d-flex justify-content-between px-4 pt-3">
            <h5 class="font-weight-bolder mb-0">Edit Tag</h5>
            <button @click.prevent="router.push({ path: '/examples/tag-management/list-tags' })" type="button"
                class="btn base-button btn-icon btn-fab btn-primary btn-sm">
                <span class="btn-inner--text">Back to list</span>
            </button>
        </div>
        <div class="mt-4">
            <form role="form" @submit.prevent="$isDemo(tagId) ? $demoMessage('tags') : submitForm()">
                <div class="col-12 mt-sm-0">
                    <label>Name</label>
                    <ArgonInput id="name" name="name" class="multisteps-form__input" type="text" placeholder="Tag Name"
                        v-model="formData.name" :error="isError('name', errorsRef)"
                        :errorMessage="getErrorMessage('name', errorsRef)" />
                </div>
                <div class="col-12 mt-sm-0">
                    <label>Color</label>
                    <slider v-model="formData.color" class="w-100" />
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
import { useTagStore } from "~~/stores/TagStore";
import { useVuelidate } from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators';
import { isError, getErrorMessage, checkItemExist } from "~~/helpers/errorHandler";
import { Slider } from "@ckpack/vue-color";
import { useRouter } from "vue-router";
import useToast from "~~/composables/useToast";

definePageMeta({
    middleware: ["auth", "admin-creator"],
})

const { $isDemo, $demoMessage } = useNuxtApp();
const router = useRouter();
const tagStore = useTagStore();
if (!tagStore.allTagsList) {
    await tagStore.getAllTagsList();
}
const { params: { id: tagId } } = useRoute();

let formData = reactive({
    name: '',
    color: '#000000',
});
const errorsRef = reactive([]);

const getTag = async () => {
    await tagStore.getTag(tagId);
    formData = reactive({ ...tagStore.selectedTag });
}

await getTag();

const rules = computed(() => {
    return {
        name: {
            required: helpers.withMessage('The tag name field is required', required),
        },
    };
});

const v$ = useVuelidate(rules, formData);

const submitForm = async () => {
    errorsRef.value = [];
    v$.value.$validate();
    const tagExist = checkItemExist(formData.name, tagStore.allTagsList, tagStore.selectedTag.name);

    if (v$.value.$error || tagExist) {
        const errors = JSON.parse(JSON.stringify(v$.value.$errors));
        errorsRef.value = [...errors];

        if (tagExist) {
            errorsRef.value = [...errorsRef.value, { $property: 'name', $message: 'The tag already exists.' }]
        }
    } else {
        try {
            const updateTagResponse = await tagStore.updateTag(tagId, formData.name, formData.color.hex);

            if (updateTagResponse.error.value) {
                const errorMessage = updateTagResponse.error.value.data.errors[0].detail;
                throw new Error(errorMessage);
            } else {
                useToast('success', 'Tag updated successfuly');
                router.push({ path: '/examples/tag-management/list-tags' });
            }
        } catch (error) {
            useToast('error', error.message);
        }
    }
}
</script>
