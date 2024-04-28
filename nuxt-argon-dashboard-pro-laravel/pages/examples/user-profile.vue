<template>
    <div class="py-4 container-fluid">
        <div class="card shadow-lg mx-4 profile-card">
            <div class="card-body p-3">
                <div class="row gx-4">
                    <div class="col-auto">
                        <div class="avatar avatar-xl position-relative">
                            <img :src="authStore.currentUser.profile_image" alt="profile_image"
                                class="shadow-sm w-100 border-radius-lg" />
                        </div>
                    </div>
                    <div class="col-auto my-auto">
                        <div class="h-100">
                            <h5 class="mb-1">{{ authStore.currentUser.name }}</h5>
                            <p class="mb-0 text-sm font-weight-bold">{{ authStore.currentUser.email }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div class="card shadow-lg mx-4 p-3 mt-4">
                <h5 class="font-weight-bolder mb-0">Edit Profile</h5>
                <div class="mt-4">
                    <div class="d-flex flex-column max-content align-items-center mb-4 mx-4">
                        <img :src="imgSrc" class="rounded d-flex justify-content-center argon-image" width="200"
                            height="200">
                        <div class="mt-2 d-flex justify-content-center">
                            <ArgonButton v-if="imgSrc !== defaultAvatar" type="button" @click="handleFileRemove()"
                                class="btn base-button btn btn-sm btn-danger btn-button mx-2">
                                <span><i class="fa fa-times"></i> Remove </span>
                            </ArgonButton>
                            <ArgonButton type="button" class="btn base-button btn btn-sm btn-primary btn-button">
                                <label for="imageInput" class="mb-0">{{ imgSrc !== defaultAvatar ? 'Change' : 'Select image'}}
                                </label>
                                <input ref="file" id="imageInput" accept="image/*" type="file" style="display: none;"
                                    v-on:change="handleFileUpload()" />
                            </ArgonButton>
                        </div>
                    </div>
                    <div class="col-12 mt-sm-0">
                        <label>Name</label>
                        <ArgonInput id="user-name" class="multisteps-form__input" type="text" placeholder="Name"
                            v-model="newName" :error="isError('name', errorsRef)"
                            :errorMessage="getErrorMessage('name', errorsRef)" />
                    </div>
                    <div class="col-12 mt-sm-0">
                        <label>Email</label>
                        <ArgonInput id="user-email" class="multisteps-form__input" type="email" placeholder="Email"
                            v-model="newEmail" :error="isError('email', errorsRef)"
                            :errorMessage="getErrorMessage('email', errorsRef)" />
                    </div>
                    <div class="button-row d-flex mt-4">
                        <ArgonButton type="button" color="primary" variant="gradient" class="ms-auto mb-0"
                            @click.prevent="$isDemo(userId) ? $demoMessage('users') : handleSubmit()">Submit
                        </ArgonButton>
                    </div>
                </div>
            </div>
            <div class="card shadow-lg mx-4 p-3 mt-4">
                <h5 class="font-weight-bolder mb-0">Change Password</h5>
                <div class="mt-4">
                    <div class="col-12 mt-sm-0">
                        <label>New Password</label>
                        <ArgonInput id="new-password" class="multisteps-form__input" type="password" placeholder="******"
                            v-model="password" :error="isError('password', passwordErrorsRef)"
                            :errorMessage="getErrorMessage('password', passwordErrorsRef)" />
                    </div>
                    <div class="col-12 mt-sm-0">
                        <label>Repeat New Password</label>
                        <ArgonInput id="repeat-password" class="multisteps-form__input" type="password" placeholder="******"
                            v-model="passwordConfirm" :error="isError('passwordConfirm', passwordErrorsRef)"
                            :errorMessage="getErrorMessage('passwordConfirm', passwordErrorsRef)" />
                    </div>
                    <div class="button-row d-flex mt-4">
                        <ArgonButton @click.prevent="$isDemo(userId) ? $demoMessage('users') : handlePasswordChange()" type="button" color="primary"
                            variant="gradient" class="ms-auto mb-0">Submit
                        </ArgonButton>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import Jsona from 'jsona';
import defaultAvatar from '../../assets/img/default_avatar.jpeg';
import { useAuthStore } from '../../stores/AuthStore';
import { useUserStore } from '../../stores/UserStore';
import { isError, getErrorMessage } from '~~/helpers/errorHandler';

definePageMeta({
    layout: "default",
    middleware: ["auth"],
});

const userStore = useUserStore();
const authStore = useAuthStore();
const { $isDemo, $demoMessage } = useNuxtApp(); 
if (!authStore.currentUser) {
    await authStore.getProfile();
}
const dataFormatter = new Jsona();
let file = ref(null);
const imgSrc = ref(authStore.currentUser.profile_image);
const newName = ref(authStore.currentUser.name);
const newEmail = ref(authStore.currentUser.email);
const password = ref("");
const passwordConfirm = ref("");
const userId = authStore.currentUser.id;
const errorsRef = reactive([]);
const passwordErrorsRef = reactive([]);

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

const handleSubmit = async () => {
    try {
        errorsRef.value = [];
        handleProfileErrors();
        if (!errorsRef.value.length) {
            let uploadedUrl = authStore.currentUser.profile_image;
            if (imgSrc.value !== defaultAvatar) {
                uploadedUrl = await userStore.uploadProfileImage(file, userId);
            }

            const body = dataFormatter.serialize({
                stuff: {
                    type: 'users',
                    id: userId,
                    name: newName.value,
                    email: newEmail.value,
                    profile_image: uploadedUrl,
                }
            });

            const updateUserResponse = await authStore.updateProfile(userId, body);

            if (updateUserResponse.error.value) {
                const errorMessage = updateUserResponse.error.value.data.errors[0].detail;
                useToast("error", errorMessage);
            } else {
                useToast('success', 'Profile updated successfully');
            }
        }
    } catch (error) {
        useToast('error', error.message);
    }
}

const handlePasswordChange = async () => {
    try {
        passwordErrorsRef.value = [];
        handlePasswordErrors();
        if (!passwordErrorsRef.value.length) {
            const body = dataFormatter.serialize({
                stuff: {
                    type: 'users',
                    id: userId,
                    password: password,
                    password_confirmation: passwordConfirm,
                }
            });

            const { error } = await authStore.updateProfile(userId, body);

            if (error.value) {
                const errorMessage = error.value.data.errors[0].detail;
                throw new Error(errorMessage);
            } else {
                useToast('success', 'Password updated successfully');
            }
        }
    } catch (error) {
        useToast('error', error.message);
    }
}

const handleProfileErrors = () => {
    if (!newName.value) {
        errorsRef.value = [...errorsRef.value, { $property: 'name', $message: 'The name field is required.' }];
    }

    if (!newEmail.value) {
        errorsRef.value = [...errorsRef.value, { $property: 'email', $message: 'The email field is required.' }];
    }
}

const handlePasswordErrors = () => {
    if (!password.value) {
        passwordErrorsRef.value = [...passwordErrorsRef.value, { $property: 'password', $message: 'The password field is required.' }];
    }

    if (password.value.length < 8) {
        passwordErrorsRef.value = [...passwordErrorsRef.value, { $property: 'password', $message: 'The password must be at least 8 characters.' }];
    }

    if (password.value !== passwordConfirm.value) {
        passwordErrorsRef.value = [...passwordErrorsRef.value, { $property: 'passwordConfirm', $message: "Passwords don't match." }];
    }
}

</script>
