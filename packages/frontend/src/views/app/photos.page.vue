<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import { IMAGES_QUERY_KEY, fetchImages } from '../../api';



const fetchImagesFn = () => fetchImages()



const { data, isLoading } = useQuery({ queryKey: [IMAGES_QUERY_KEY], queryFn: fetchImagesFn });

const skeletonsArray = new Array(20).fill("")



</script>

<template>
    <div class="p-2 flex flex-col gap-4">
        <div>Photos page</div>




        <div class="flex flex-col overflow-hidden gap-4">

            <template v-if="isLoading">
                <div :class="{ 'bg-slate-200 animate-pulse h-52': true, 'w-80': index % 3 == 0, 'w-60': index % 3 == 1, 'w-50': index % 3 == 2 }"
                    v-for="(_, index) of skeletonsArray"></div>
            </template>


            <div v-for="imagesOfDay of data" class="flex flex-col gap-2">
                <label class="font-bold text-sm text-pink-700"> {{ imagesOfDay.date.toDateString() }}</label>
                <div class="flex flex-wrap gap-4 ">

                    <img class="border-2 border-pink-200 h-52 w-auto" v-for="image of imagesOfDay?.images" :src="image.url"
                        height="208" width="208" />

                    <hr />
                </div>

            </div>
        </div>

    </div>
</template>