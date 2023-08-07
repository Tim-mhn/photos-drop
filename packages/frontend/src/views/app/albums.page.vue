<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import { createAlbum, getUserAlbums } from '../../api/albums';
import CreateAlbumButton from '../../components/CreateAlbumButton.vue';




const { data: albums, isLoading } = useQuery({
    queryKey: ["albums"],
    queryFn: getUserAlbums,
})

const skeletonsArray = new Array(20).fill("")





</script>

<template>
    <div class="flex flex-col gap-4 p-2">

        <div class="flex flex-grow items-center justify-start ">
            <CreateAlbumButton />
        </div>
        <div class="flex flex-wrap gap-4 ">
            <div v-for="album of albums" class="flex flex-col gap-2">
                <img class="cursor-pointer border-2 border-solid border-fuchsia-100  hover:border-black  w-64 h-64 "
                    src="http://localhost:8000/mgt9ibw152.jpg" />

                <div class="text-md font-bold text-fuchsia-800"> {{ album.name }}</div>

            </div>

            <template v-if="isLoading">
                <div class="bg-slate-200 animate-pulse h-64 w-64" v-for="_ of skeletonsArray"></div>
            </template>
        </div>
    </div>
</template>