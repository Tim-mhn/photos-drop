<script setup lang="ts">
import { useAuth0 } from '@auth0/auth0-vue';
import UploadButton from './UploadButton.vue';

const { loginWithPopup, user, isAuthenticated, logout, } = useAuth0();

const login = async () => {
    try {
        await loginWithPopup()

    }
    catch (err) { console.error(err) }
}


const logoutAndRedirect = async () => {
    await logout({

        logoutParams: {
            returnTo: `${import.meta.env.VITE_APP_BASE_URL}/auth/login`
        }

    });
}


</script>

<template >
    <div class="flex flex-row w-full shadow-sm border-black h-16 flex-shrink-0 px-4 py-1 justify-between items-center">
        <div>Photos Drop</div>
        <div class="flex flex-grow justify-end gap-2">
            <UploadButton v-if="isAuthenticated" />
            <button v-if="!isAuthenticated" @click="login" type="button">Login</button>

            <div v-if="isAuthenticated"> {{ user?.name }}</div>
            <button v-if="isAuthenticated" @click="logoutAndRedirect" type="button">Logout</button>
        </div>
    </div>
</template>