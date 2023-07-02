<script setup lang="ts">
import Header from "../../components/Header.vue"
import SideNav from "../../components/SideNav.vue"

</script>

<template>
    <Header />

    <div class="flex flex-grow w-full overflow-hidden w-screen">
        <SideNav />

        <div class="overflow-auto relative justify-center max-h-full min-w-[600px]">
            <div class="w-full p-2">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>