export default defineNuxtPlugin(() => {
    const runtimeConfig = useRuntimeConfig();
    const demo = runtimeConfig.public.isDemo;

    const isDemo = (id) => {
        if(!demo || demo === '0' || id > 3) {
            return false;
        }
        
        return true;
    }

    const getDemoMessage = (item) => {
        useToast('error', `You are not allowed to change data of default ${item}.`);
    }

    return {
        provide: {
            isDemo: isDemo,
            demoMessage: getDemoMessage,
        }
    }
})
