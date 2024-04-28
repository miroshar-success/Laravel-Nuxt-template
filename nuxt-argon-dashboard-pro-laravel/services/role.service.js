import Jsona from "jsona";
import useToast from "~~/composables/useToast";

const runtimeConfig = useRuntimeConfig();
const apiBaseUrl = runtimeConfig.public.apiBaseUrl;
let access_token = localStorage.getItem("authToken");
const dataFormatter = new Jsona();

const getRolesList = async ({ pageNumber, pageSize, sort, filter }) => {
    try {
        access_token = localStorage.getItem("authToken");

        const rolesListResponse = await useFetch(`${apiBaseUrl}/roles?${sort ? 'sort=' + sort : 'sort=created_at'}&${filter ? 'filter[name]=' + filter : ''}&page[number]=${pageNumber ? pageNumber : 1}&page[size]=${pageSize ? pageSize : 5}`, {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${access_token}`,
                "Accept": 'application/vnd.api+json',
                "Content-type": 'application/vnd.api+json',
            },
        })

        return {
            data: dataFormatter.deserialize(rolesListResponse.data.value),
            meta: rolesListResponse.data.value.meta.page,
        }
    } catch (error) {
        useToast("error", error.message);
    }
}

const getAllRolesList = async () => {
    try {
        if(!access_token) {
            access_token = localStorage.getItem("authToken");
        }

        const rolesListResponse = await useFetch(`${apiBaseUrl}/roles`, {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${access_token}`,
                "Accept": 'application/vnd.api+json',
                "Content-type": 'application/vnd.api+json',
            },
        })

        return dataFormatter.deserialize(rolesListResponse.data.value);
    } catch (error) {
        useToast("error", error.message);
    }
}

const getRoleById = async (roleId) => {
    try {
        const getRoleResponse = await useFetch(`${apiBaseUrl}/roles/${roleId}`, {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${access_token}`,
                "Accept": 'application/vnd.api+json',
                "Content-type": 'application/vnd.api+json',
            },
        });

        return dataFormatter.deserialize(getRoleResponse.data.value);
    } catch (error) {
        useToast("error", error.message);
    }
}

const createRole = async ({ name }) => {
    try {
        const body = dataFormatter.serialize({
            stuff: {
                type: 'roles',
                name: name,
                permissions: [{
                    type: "permissions",
                    id: "1",
                }],
                relationshipNames: ["permissions"]
            }
        });

        return await useFetch(`${apiBaseUrl}/roles`, {
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

const updateRole = async ({ roleId, name }) => {
    try {
        const body = dataFormatter.serialize({
            stuff: {
                type: 'roles',
                id: roleId,
                name: name,
                permissions: [{
                    type: "permissions",
                    id: "1",
                }],
                relationshipNames: ["permissions"]
            }
        });

        return await useFetch(`${apiBaseUrl}/roles/${roleId}`, {
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

const deleteRole = async (roleId) => {
    try {
        return await useFetch(`${apiBaseUrl}/roles/${roleId}`, {
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

export default {
    getRolesList,
    getAllRolesList,
    getRoleById,
    createRole,
    updateRole,
    deleteRole,
}
