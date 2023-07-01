<script setup lang="ts">
import { useAuth0 } from '@auth0/auth0-vue';
import { useRouter } from 'vue-router';



const { loginWithPopup } = useAuth0()
const router = useRouter()
const loginAndGoToHomePage = async () => {
    await loginWithPopup({
        authorizationParams: {
            redirect_uri: "http://localhost:5173/"
        }
    })
    router.push("/")
}
</script>

<template>
    <div class="flex flex-col items-center justify-center h-screen w-screen overflow-hidden">


        <button @click="loginAndGoToHomePage"
            class="border-solid border-fuchsia-600 border-2 p-2 hover:bg-fuchsia-100  text-fuchsia-600 ">Login or sign
            up</button>


    </div>
</template>