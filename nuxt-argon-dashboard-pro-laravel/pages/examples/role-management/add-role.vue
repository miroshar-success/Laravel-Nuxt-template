<template>
    <div class="card shadow-lg mx-4 p-3 mt-4">
        <div class="d-flex justify-content-between px-4 pt-3">
            <h5 class="font-weight-bolder mb-0">Add Role</h5>
            <button @click.prevent="router.push({ path: '/examples/role-management/list-roles' })" type="button"
                class="btn base-button btn-icon btn-fab btn-primary btn-sm">
                <span class="btn-inner--text">Back to list</span>
            </button>
        </div>
        <div class="mt-4">
            <form role="form" @submit.prevent="submitForm">
                <div class="col-12 mt-sm-0">
                    <label>Name</label>
                    <ArgonInput id="role" name="role" class="multisteps-form__input" type="text" placeholder="Role Name"
                        v-model="formData.role" :error="isError('role', errorsRef)"
                        :errorMessage="getErrorMessage('role', errorsRef)" />
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
import { useRoleStore } from "~~/stores/RoleStore";
import { useVuelidate } from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
import { isError, getErrorMessage, checkItemExist } from "~~/helpers/errorHandler";
import { useRouter } from "vue-router";
import useToast from "~~/composables/useToast";

definePageMeta({
    middleware: ["auth", "admin"],
})

const router = useRouter();
const roleStore = useRoleStore();

if (!roleStore.allRolesList) {
    await roleStore.getAllRolesList();
}

const formData = reactive({
    role: '',
})
const errorsRef = reactive([]);

const rules = computed(() => {
    return {
        role: {
            required: helpers.withMessage('The role name field is required', required),
        },
    };
});

const v$ = useVuelidate(rules, formData);

const submitForm = async () => {
    errorsRef.value = [];
    v$.value.$validate();
    const roleExist = checkItemExist(formData.role, roleStore.allRolesList);

    if (v$.value.$error || roleExist) {
        const errors = JSON.parse(JSON.stringify(v$.value.$errors));
        errorsRef.value = errors;

        if (roleExist) {
            errorsRef.value = [...errorsRef.value, { $property: 'role', $message: 'The role already exists.' },]
        }
    } else {
        try {
            const createRoleResponse = await roleStore.createRole(formData.role);

            if (createRoleResponse.error.value) {
                const errorMessage = createRoleResponse.error.value.data.errors[0].detail;
                throw new Error(errorMessage);
            } else {
                useToast('success', 'Role created successfuly');
                router.push({ path: '/examples/role-management/list-roles' });
            }
        } catch (error) {
            useToast('error', error.message);
        }
    }
}
</script>
