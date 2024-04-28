import Jsona from "jsona";
import useToast from "~~/composables/useToast";

const runtimeConfig = useRuntimeConfig();
const apiBaseUrl = runtimeConfig.public.apiBaseUrl;
let access_token = localStorage.getItem("authToken");
const dataFormatter = new Jsona();

const getCategoriesList = async ({ pageNumber, pageSize, sort, filter }) => {
    try {
        access_token = localStorage.getItem("authToken");
        
        const categoriesListResponse = await useFetch(`${apiBaseUrl}/categories?${sort ? 'sort=' + sort : 'sort=created_at'}&${filter ? 'filter[name]=' + filter : ''}&page[number]=${pageNumber ? pageNumber : 1}&page[size]=${pageSize ? pageSize : 5}`, {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${access_token}`,
                "Accept": 'application/vnd.api+json',
                "Content-type": 'application/vnd.api+json',
            },
        })

        return {
            data: dataFormatter.deserialize(categoriesListResponse.data.value),
            meta: categoriesListResponse.data.value.meta.page,
        }
    } catch (error) {
        useToast("error", error.message);
    }
}

const getAllCategoriesList = async () => {
    try {
        if(!access_token) {
            access_token = localStorage.getItem("authToken");
        }
        
        const categoriesListResponse = await useFetch(`${apiBaseUrl}/categories`, {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${access_token}`
            },
        })

        return dataFormatter.deserialize(categoriesListResponse.data.value);
    } catch (error) {
        useToast("error", error.message);
    }
}

const getCategoryById = async (categoryId) => {
    try {
        const getCategoryResponse = await useFetch(`${apiBaseUrl}/categories/${categoryId}`, {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${access_token}`
            },
        });

        return dataFormatter.deserialize(getCategoryResponse.data.value);
    } catch (error) {
        useToast("error", error.message);
    }
}

const createCategory = async ({ name, description }) => {
    try {
        const body = dataFormatter.serialize({
            stuff: {
                type: 'categories',
                name: name,
                description: description,
            }
        });

        return await useFetch(`${apiBaseUrl}/categories`, {
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

const updateCategory = async ({ categoryId, name, description }) => {
    try {
        const body = dataFormatter.serialize({
            stuff: {
                type: 'categories',
                id: categoryId,
                name: name,
                description: description,
            }
        });

        return await useFetch(`${apiBaseUrl}/categories/${categoryId}`, {
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

const deleteCategory = async (categoryId) => {
    try {
        return await useFetch(`${apiBaseUrl}/categories/${categoryId}`, {
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
    getCategoriesList,
    getAllCategoriesList,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
}
