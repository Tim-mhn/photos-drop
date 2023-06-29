<script setup lang="ts">
import { provide } from "vue";
import { APIClient, API_CLIENT_KEY } from "./api";
import { useAuth0 } from "@auth0/auth0-vue";
const authClient = useAuth0()
provide(API_CLIENT_KEY, new APIClient(authClient))
</script>

<template>
  <div class="flex flex-col h-screen w-screen overflow-hidden">

    <router-view></router-view>



  </div>
</template>

<style scoped></style>
