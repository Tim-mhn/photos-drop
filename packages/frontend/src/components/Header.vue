<script setup lang="ts">
import { useAuth0 } from '@auth0/auth0-vue';

const { loginWithPopup, user, isAuthenticated } = useAuth0();

const login = async () => {
    console.log("login !");
    try {
        await loginWithPopup()
    }
    catch (err) { console.error(err) }
}
</script>

<template >
    <div class="flex flex-row w-full shadow-sm border-black h-16 flex-shrink-0 px-4 py-1 justify-between items-center">
        <div>Photos Drop</div>
        <button v-if="!isAuthenticated" @click="login">Login</button>
        <div v-if="isAuthenticated"> {{ user?.name }}</div>
    </div>
</template>