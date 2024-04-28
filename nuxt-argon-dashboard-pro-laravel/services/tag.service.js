import Jsona from "jsona";
import useToast from "~~/composables/useToast";

const runtimeConfig = useRuntimeConfig();
const apiBaseUrl = runtimeConfig.public.apiBaseUrl;
let access_token = localStorage.getItem("authToken");
const dataFormatter = new Jsona();

const getTagsList = async ({ pageNumber, pageSize, sort, filter }) => {
    try {
        access_token = localStorage.getItem("authToken");

        const tagsListResponse = await useFetch(`${apiBaseUrl}/tags?${sort ? 'sort=' + sort : 'sort=created_at'}&${filter ? 'filter[name]=' + filter : ''}&page[number]=${pageNumber ? pageNumber : 1}&page[size]=${pageSize ? pageSize : 5}`, {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${access_token}`,
                "Accept": 'application/vnd.api+json',
                "Content-type": 'application/vnd.api+json',
            },
        })

        return {
            data: dataFormatter.deserialize(tagsListResponse.data.value),
            meta: tagsListResponse.data.value.meta.page,
        }
    } catch (error) {
        useToast("error", error.message);
    }
}

const getAllTagsList = async () => {
    try {
        const tagsListResponse = await useFetch(`${apiBaseUrl}/tags?sort=-created_at`, {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${access_token}`,
                "Accept": 'application/vnd.api+json',
                "Content-type": 'application/vnd.api+json',
            },
        })

        return dataFormatter.deserialize(tagsListResponse.data.value);
    } catch (error) {
        useToast("error", error.message);
    }
}

const getTagById = async (tagId) => {
    try {
        const getTagrResponse = await useFetch(`${apiBaseUrl}/tags/${tagId}`, {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${access_token}`
            },
        });

        return dataFormatter.deserialize(getTagrResponse.data.value);
    } catch (error) {
        useToast("error", error.message);
    }
}

const createTag = async ({ name, color }) => {
    try {
        const body = dataFormatter.serialize({
            stuff: {
                type: 'tags',
                name: name,
                color: color,
            }
        });

        return await useFetch(`${apiBaseUrl}/tags`, {
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

const updateTag = async ({ tagId, name, color }) => {
    try {
        const body = dataFormatter.serialize({
            stuff: {
                type: 'tags',
                id: tagId,
                name: name,
                color: color,
            }
        });

        return await useFetch(`${apiBaseUrl}/tags/${tagId}`, {
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

const deleteTag = async (tagId) => {
    try {
        return await useFetch(`${apiBaseUrl}/tags/${tagId}`, {
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
    getTagsList,
    getAllTagsList,
    getTagById,
    createTag,
    updateTag,
    deleteTag
}
