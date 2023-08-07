<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import { getUserAlbums } from '../../api/albums';
import { computed } from 'vue';
import { IAlbum } from '../../../../shared/src/models';
import Button from '../../components/Button.vue';




const { data: albums } = useQuery({
    queryKey: ["albums"],
    queryFn: getUserAlbums,
})


</script>

<template>
    <div class="flex flex-col gap-4 p-2">

        <div class="flex flex-grow items-center justify-end px-4">
            <Button>Create album</Button>
        </div>
        <div class="flex flex-wrap gap-4 ">
            <div v-for="album of albums" class="flex flex-col gap-2">
                <img class="cursor-pointer border-2 border-solid border-fuchsia-100  hover:border-black  w-64 h-64 "
                    src="http://localhost:8000/mgt9ibw152.jpg" />

                <div class="text-md font-bold text-fuchsia-800"> {{ album.name }}</div>

            </div>
        </div>
    </div>
</template>