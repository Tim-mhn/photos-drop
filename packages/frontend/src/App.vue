<script setup lang="ts">
import Header from "./components/Header.vue"
import SideNav from "./components/SideNav.vue"
</script>

<template>
  <div class="flex flex-col h-screen w-screen overflow-hidden">

    <Header />

    <div class="flex flex-grow w-full overflow-hidden w-screen">
      <SideNav />

      <div class="overflow-auto relative justify-center max-h-full min-w-[600px]">
        <div class="w-full ">
          <router-view></router-view>
        </div>
      </div>
    </div>


  </div>
</template>

<style scoped></style>
