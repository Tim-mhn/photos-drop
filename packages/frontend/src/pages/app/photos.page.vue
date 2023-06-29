<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import { fetchImages, useAPIClient } from '../../api';


const client = useAPIClient()

const fetchImagesFn = () => fetchImages(client)



const { data: images, isLoading } = useQuery({ queryKey: ['images'], queryFn: fetchImagesFn });

const skeletonsArray = new Array(20).fill("")



</script>

<template>
    <div class="p-2 flex flex-col gap-4">
        <div>Photos page</div>




        <div class="flex flex-wrap gap-4  overflow-hidden">

            <template v-if="isLoading">
                <div :class="{ 'bg-slate-200 animate-pulse h-52': true, 'w-80': index % 3 == 0, 'w-60': index % 3 == 1, 'w-50': index % 3 == 2 }"
                    v-for="(_, index) of skeletonsArray"></div>
            </template>


            <img class="border-2 border-pink-200 h-52 w-auto" v-for="image of images" :src="image.url" height="208"
                width="208" />
        </div>
    </div>
</template>