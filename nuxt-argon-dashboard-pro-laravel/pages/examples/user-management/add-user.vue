<template>
    <div class="card shadow-lg mx-4 p-3 mt-4">
        <div class="d-flex justify-content-between px-4 pt-3">
            <h5 class="font-weight-bolder mb-0">Add User</h5>
            <button @click.prevent="router.push({ path: '/examples/user-management/list-users' })" type="button"
                class="btn base-button btn-icon btn-fab btn-primary btn-sm">
                <span class="btn-inner--text">Back to list</span>
            </button>
        </div>
        <div class="mt-4">
            <form role="form" @submit.prevent="submitForm">
                <div class="d-flex flex-column max-content align-items-center mb-4 mx-4">
                    <img :src="imgSrc" class="rounded d-flex justify-content-center argon-image" width="200" height="200">
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
                    <ArgonInput id="name" name="name" class="multisteps-form__input" type="text" placeholder="Name"
                        v-model="formData.name" :error="isError('name', errorsRef)"
                        :errorMessage="getErrorMessage('name', errorsRef)" />
                </div>
                <div class="col-12 mt-sm-0">
                    <label>Email</label>
                    <ArgonInput id="email" name="email" class="multisteps-form__input" type="email" placeholder="Email"
                        v-model="formData.email" :error="isError('email', errorsRef)"
                        :errorMessage="getErrorMessage('email', errorsRef)" />
                </div>
                <div class="col-12 mt-sm-0 mb-3">
                    <label>Role</label>
                    <select id="choices-role" class="form-control" name="choices-role" v-model="formData.role">
                        <option v-for="role of roleStore.allRolesList" :value="role.id">{{ role.name }}</option>
                    </select>
                </div>
                <div class="col-12 mt-sm-0">
                    <label>Password</label>
                    <ArgonInput id="password" name="password" class="multisteps-form__input" type="password"
                        placeholder="******" v-model="formData.password" :error="isError('password', errorsRef)"
                        :errorMessage="getErrorMessage('password', errorsRef)" />
                </div>
                <div class="col-12 mt-sm-0">
                    <label>Confirm Password</label>
                    <ArgonInput id="passwordConfirm" name="passwordConfirm" class="multisteps-form__input" type="password"
                        placeholder="******" v-model="formData.passwordConfirm"
                        :error="isError('passwordConfirm', errorsRef)"
                        :errorMessage="getErrorMessage('passwordConfirm', errorsRef)" />
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
import { useUserStore } from "~~/stores/UserStore";
import { useRoleStore } from "~~/stores/RoleStore";
import { useVuelidate } from "@vuelidate/core";
import { required, email, helpers, minLength, sameAs } from "@vuelidate/validators";
import { isError, getErrorMessage } from "~~/helpers/errorHandler";
import { useRouter } from "vue-router";
import Jsona from "jsona";
import useToast from "~~/composables/useToast";
import defaultAvatar from "../../../assets/img/default_avatar.jpeg";
import Choices from "choices.js";

definePageMeta({
    middleware: ["auth", "admin"],
})

onMounted(() => {
    getChoices("choices-role");
});

const getChoices = (id) => {
    const element = document.getElementById(id);
    if (element) {
        return new Choices(element, {
            searchEnabled: false,
        });
    }
};

const router = useRouter();
const userStore = useUserStore();
const roleStore = useRoleStore();

if (!roleStore.allRolesList) {
    await roleStore.getAllRolesList();
}

const imgSrc = ref(defaultAvatar);
const file = ref(null);
const formData = reactive({
    name: '',
    email: '',
    role: roleStore.allRolesList[0].id,
    password: '',
    passwordConfirm: '',
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
    file.value = null;
}

const rules = computed(() => {
    return {
        name: {
            required: helpers.withMessage('The name field is required', required),
        },
        email: {
            required: helpers.withMessage('The email field is required', required),
            email: helpers.withMessage('Invalid email format', email),
        },
        password: {
            required: helpers.withMessage('The password field is required', required),
            minLength: helpers.withMessage('The password must be at least 8 characters', minLength(8)),
        },
        passwordConfirm: {
            sameAs: helpers.withMessage("Passwords don't match", sameAs(formData.password)),
        }
    };
});
const v$ = useVuelidate(rules, formData);

const submitForm = async () => {
    errorsRef.value = [];
    v$.value.$validate();

    if (v$.value.$error) {
        const errors = JSON.parse(JSON.stringify(v$.value.$errors));
        errorsRef.value = [...errors];
    } else {
        try {
            const createUserResponse = await userStore.createUser({
                email: formData.email,
                name: formData.name,
                password: formData.password,
                passwordConfirm: formData.passwordConfirm,
                role: formData.role,
            });

            if (createUserResponse.error.value) {
                const errorMessage = createUserResponse.error.value.data.errors[0].detail;
                throw new Error(errorMessage);
            } else {
                if (imgSrc.value === defaultAvatar) {
                    useToast('success', 'User created successfuly');
                    router.push({ path: '/examples/user-management/list-users' })
                } else {
                    const dataFormatter = new Jsona();
                    const newUser = dataFormatter.deserialize(createUserResponse.data.value);

                    const uploadedUrl = await userStore.uploadProfileImage(file, newUser.id);

                    const body = dataFormatter.serialize({
                        stuff: {
                            type: 'users',
                            id: newUser.id,
                            profile_image: uploadedUrl,
                        }
                    });
                    const updateUserResponse = await userStore.updateUser(newUser.id, body);

                    if (updateUserResponse.error.value) {
                        const errorMessage = updateUserResponse.error.value.data.errors[0].detail;
                        throw new Error(errorMessage);
                    } else {
                        useToast('success', 'User created successfuly');
                        router.push({ path: '/examples/user-management/list-users' })
                    }
                }
            }
        } catch (error) {
            useToast('error', error.message);
        }
    }
}
</script>
