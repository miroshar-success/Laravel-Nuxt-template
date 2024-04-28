import useToast from "~~/composables/useToast";

const runtimeConfig = useRuntimeConfig();
const isDemo = runtimeConfig.public.isDemo;

export const handleButtons = (handleDelete, route, type, currentUserId) => {
    document.querySelectorAll(".delete").forEach(function (el) {
        el.addEventListener("click", async function (el) {
            const classList = el.target.classList;
            const id = classList[classList.length - 1].split('-')[1];
            const { $isDemo, $demoMessage } = useNuxtApp();

            if (id) {
                if($isDemo(id)) {
                    $demoMessage(type);
                } else if (id === currentUserId) {
                    useToast('error', "Can't delete current user");
                } else {
                    handleDelete(id);
                }
            }
        });
    });

    document.querySelectorAll(".edit").forEach(function (el) {
        el.addEventListener("click", async function (el) {
            const classList = el.target.classList;
            const id = classList[classList.length - 1].split('-')[1];
            const { $isDemo, $demoMessage } = useNuxtApp();

            if (id) {
                if(id === currentUserId) {
                    navigateTo('/examples/user-profile');
                } else if ($isDemo(id)) {
                    $demoMessage(type);
                } else {
                    navigateTo(route + id);
                }
            }
        });
    });
}
