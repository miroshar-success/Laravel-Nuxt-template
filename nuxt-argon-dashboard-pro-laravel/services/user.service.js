import Jsona from "jsona";
import useToast from "~~/composables/useToast";

const runtimeConfig = useRuntimeConfig();
const apiBaseUrl = runtimeConfig.public.apiBaseUrl;
let access_token = localStorage.getItem("authToken");
const dataFormatter = new Jsona();

const getUsersList = async ({ pageNumber, pageSize, sort, filter }) => {
    try {
        access_token = localStorage.getItem("authToken");

        const usersListResponse = await useFetch(`${apiBaseUrl}/users?${sort ? 'sort=' + sort : 'sort=created_at'}&${filter ? 'filter[name]=' + filter : ''}&page[number]=${pageNumber ? pageNumber : 1}&page[size]=${pageSize ? pageSize : 5}&include=roles`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${access_token}`,
                "Accept": 'application/vnd.api+json',
                "Content-type": 'application/vnd.api+json',
            },
        })

        return {
            data: dataFormatter.deserialize(usersListResponse.data.value),
            meta: usersListResponse.data.value.meta.page,
        }
    } catch (error) {
        useToast("error", error.message);
    }
}

const getUserById = async (userId) => {
    try {
        const getUserResponse = await useFetch(`${apiBaseUrl}/users/${userId}?include=roles`, {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${access_token}`,
                "Accept": 'application/vnd.api+json',
                "Content-type": 'application/vnd.api+json',
            },
        });

        return dataFormatter.deserialize(getUserResponse.data.value);
    } catch (error) {
        useToast("error", error.message);
    }
}

const createUser = async ({ name, email, password, passwordConfirm, role }) => {
    try {
        const body = dataFormatter.serialize({
            stuff: {
                type: 'users',
                name: name,
                email: email,
                password: password,
                password_confirmation: passwordConfirm,
                roles: [{
                    type: "roles",
                    id: role,
                }],
                relationshipNames: ["roles"]
            }
        });

        return await useFetch(`${apiBaseUrl}/users?include=roles`, {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${access_token}`,
                "Accept": 'application/vnd.api+json',
                "Content-type": 'application/vnd.api+json',
            },
            body: body,
        });
    } catch (error) {
        useToast("error", error.message);
    }
}

const updateUser = async (userId, body) => {
    try {
        return await useFetch(`${apiBaseUrl}/users/${userId}?include=roles`, {
            method: 'PATCH',
            headers: {
                "Authorization": `Bearer ${access_token}`,
                "Accept": 'application/vnd.api+json',
                "Content-type": 'application/vnd.api+json',
            },
            body: body,
        });
    } catch (error) {
        useToast("error", error.message);
    }
}

const deleteUser = async (userId) => {
    try {
        return await useFetch(`${apiBaseUrl}/users/${userId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${access_token}`,
                "Accept": 'application/vnd.api+json',
                "Content-type": 'application/vnd.api+json',
            },
        });
    } catch (error) {
        useToast("error", error.message);
    }
}

const uploadProfileImage = async (file, userId) => {
    const formData = new FormData();
    formData.append('attachment', file.value.files[0]);
    const uploadResponse = await useFetch(`${apiBaseUrl}/uploads/users/${userId}/profile-image`, {
        method: 'POST',
        headers: {
            "Authorization": `Bearer ${access_token}`,
        },
        body: formData,
    })

    return uploadResponse.data.value.url;
}

export default {
    getUsersList,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    uploadProfileImage,
}
