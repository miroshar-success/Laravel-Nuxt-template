<template>
    <div class="card shadow-lg mx-4 p-3 mt-4">
        <div class="d-flex justify-content-between px-4 pt-3">
            <h5 class="font-weight-bolder mb-0">Add Tag</h5>
            <button @click.prevent="router.push({ path: '/examples/tag-management/list-tags' })" type="button"
                class="btn base-button btn-icon btn-fab btn-primary btn-sm">
                <span class="btn-inner--text">Back to list</span>
            </button>
        </div>
        <div class="mt-4">
            <form role="form" @submit.prevent="submitForm">
                <div class="col-12 mt-sm-0">
                    <label>Name</label>
                    <ArgonInput id="tag" name="tag" class="multisteps-form__input" type="text" placeholder="Tag Name"
                        v-model="formData.tag" :error="isError('tag', errorsRef)"
                        :errorMessage="getErrorMessage('tag', errorsRef)" />
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
import { useVuelidate } from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
import { isError, getErrorMessage, checkItemExist } from "~~/helpers/errorHandler";
import { Slider } from "@ckpack/vue-color";
import { useRouter } from "vue-router";
import useToast from "~~/composables/useToast";

definePageMeta({
    middleware: ["auth", "admin-creator"],
});

const router = useRouter();
const tagStore = useTagStore();
if (!tagStore.allTagsList) {
    await tagStore.getAllTagsList();
}

const formData = reactive({
    tag: '',
    color: {
        a: 1,
        hex: "#40BEBF",
        hex8: "#40BEBFFF",
        hsl: { h: 180.55612770339857, s: 0.5, l: 0.5, a: 1 },
        hsv: { h: 180.55612770339857, s: 0.6666666666666666, v: 0.75, a: 1 },
        oldHue: 180.55612770339857,
        rgba: { r: 64, g: 190, b: 191, a: 1 },
        source: "hsl"
    },
})
const errorsRef = reactive([]);

const rules = computed(() => {
    return {
        tag: {
            required: helpers.withMessage('The tag name field is required', required),
        },
    };
});

const v$ = useVuelidate(rules, formData);

const submitForm = async () => {
    errorsRef.value = [];
    v$.value.$validate();
    const tagExist = checkItemExist(formData.tag, tagStore.allTagsList);

    if (v$.value.$error || tagExist) {
        const errors = JSON.parse(JSON.stringify(v$.value.$errors));
        errorsRef.value = [...errors];

        if (tagExist) {
            errorsRef.value = [...errorsRef.value, { $property: 'tag', $message: 'The tag already exists.' }]
        }
    } else {
        try {
            const createTagResponse = await tagStore.createTag(formData.tag, formData.color.hex);

            if (createTagResponse.error.value) {
                const errorMessage = createTagResponse.error.value.data.errors[0].detail;
                throw new Error(errorMessage);
            } else {
                useToast('success', 'Tag created successfuly');
                router.push({ path: '/examples/tag-management/list-tags' });
            }
        } catch (error) {
            useToast('error', error.message);
        }
    }
}
</script>
