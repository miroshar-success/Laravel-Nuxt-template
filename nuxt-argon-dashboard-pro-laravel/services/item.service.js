import Jsona from "jsona";
import useToast from "~~/composables/useToast";

const runtimeConfig = useRuntimeConfig();
const apiBaseUrl = runtimeConfig.public.apiBaseUrl;
let access_token = localStorage.getItem("authToken");
const dataFormatter = new Jsona();

const getItemsList = async ({ pageNumber, pageSize, sort, filter }) => {
    try {
        access_token = localStorage.getItem("authToken");

        const itemsListResponse = await useFetch(`${apiBaseUrl}/items?${sort ? 'sort=' + sort : 'sort=created_at'}&${filter ? 'filter[name]=' + filter : ''}&page[number]=${pageNumber ? pageNumber : 1}&page[size]=${pageSize ? pageSize : 5}&include=category,tags`, {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${access_token}`,
                "Accept": 'application/vnd.api+json',
                "Content-type": 'application/vnd.api+json',
            },
        })

        return {
            data: dataFormatter.deserialize(itemsListResponse.data.value),
            meta: itemsListResponse.data.value.meta.page,
        }
    } catch (error) {
        useToast("error", error.message);
    }
}

const getAllItemsList = async () => {
    try {
        const itemsListResponse = await useFetch(`${apiBaseUrl}/items?include=category,tags`, {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${access_token}`
            },
        })

        return dataFormatter.deserialize(itemsListResponse.data.value);
    } catch (error) {
        useToast("error", error.message);
    }
}

const getItemById = async (itemId) => {
    try {
        const getItemResponse = await useFetch(`${apiBaseUrl}/items/${itemId}?include=category,tags`, {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${access_token}`,
                "Accept": 'application/vnd.api+json',
                "Content-type": 'application/vnd.api+json',
            },
        });

        return dataFormatter.deserialize(getItemResponse.data.value);
    } catch (error) {
        useToast("error", error.message);
    }
}


const createItem = async ({ name, description, status, image, isOnHomepage, date, tags, category }) => {
    try {
        const tagsArray = []
        for (const tag of tags) {
            tagsArray.push({ type: "tags", id: tag })
        }

        const body = dataFormatter.serialize({
            stuff: {
                type: 'items',
                name: name,
                description: description,
                excerpt: description,
                status: status,
                image: image,
                is_on_homepage: isOnHomepage,
                date_at: date,
                tags: tagsArray,
                category: {
                    type: "categories",
                    id: category,
                },
                relationshipNames: ["category", "tags"]
            }
        });

        return await useFetch(`${apiBaseUrl}/items?include=category,tags`, {
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

const updateItem = async ({ itemId, name, description, status, image, isOnHomepage, date, tags, category }) => {
    try {
        const tagsArray = []
        for (const tag of tags) {
            tagsArray.push({ type: "tags", id: tag })
        }

        const body = dataFormatter.serialize({
            stuff: {
                type: 'items',
                id: itemId,
                name: name,
                description: description,
                excerpt: description,
                status: status,
                image: image,
                is_on_homepage: isOnHomepage,
                date_at: date,
                tags: tagsArray,
                category: {
                    type: "categories",
                    id: category,
                },
                relationshipNames: ["category", "tags"]
            }
        });

        return await useFetch(`${apiBaseUrl}/items/${itemId}?include=category,tags`, {
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

const deleteItem = async (itemId) => {
    try {
        return await useFetch(`${apiBaseUrl}/items/${itemId}`, {
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

const uploadItemImage = async (file, itemId) => {
    const formData = new FormData();
    formData.append('attachment', file.value.files[0]);
    const uploadResponse = await useFetch(`${apiBaseUrl}/uploads/items/${itemId}/image`, {
        method: 'POST',
        headers: {
            "Authorization": `Bearer ${access_token}`,
        },
        body: formData,
    })

    return uploadResponse.data.value.url;
}

export default {
    getItemsList,
    getAllItemsList,
    getItemById,
    createItem,
    updateItem,
    deleteItem,
    uploadItemImage,
}
