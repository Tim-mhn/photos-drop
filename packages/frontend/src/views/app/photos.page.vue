<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import { IMAGES_QUERY_KEY, fetchImages } from '../../api';
import SelectablePhoto from "../../components/SelectablePhoto.vue";
import { Image, Images } from '../../../../shared/src';
import PhotosBulkActions from '../../components/PhotosBulkActions.vue';
import { computed, reactive } from 'vue';
const fetchImagesFn = () => fetchImages()



const { data, isLoading } = useQuery({ queryKey: [IMAGES_QUERY_KEY], queryFn: fetchImagesFn });

const skeletonsArray = new Array(20).fill("")

const selectedPhotos = reactive<{ photos: Images }>({ photos: [] })

const togglePhotoSelection = (photo: Image) => {
    const isSelected = !!selectedPhotos.photos.find(p => p.id === photo.id)
    if (!isSelected) selectedPhotos.photos.push(photo)
    else selectedPhotos.photos = selectedPhotos.photos.filter(p => p.id !== photo.id)

}

const selectedPhotoIds = computed(() => selectedPhotos.photos.map(p => p.id))




</script>

<template>
    <div class="p-2 flex flex-col gap-4">


        <PhotosBulkActions v-if="selectedPhotos.photos.length > 0" :selected-photos="selectedPhotos.photos" />

        <div class="flex flex-col overflow-hidden gap-4">


            <div v-if="isLoading" class="flex flex-wrap gap-4 ">
                <div :class="{ 'bg-slate-200 animate-pulse h-52': true, 'w-80': index % 3 == 0, 'w-60': index % 3 == 1, 'w-50': index % 3 == 2 }"
                    v-for="(_, index) of skeletonsArray"></div>
            </div>

            <div v-for="imagesOfDay of data" class="flex flex-col gap-2">
                <label class="font-bold text-sm text-pink-700"> {{ imagesOfDay.date.toDateString() }}</label>
                <div class="flex flex-wrap gap-4 ">



                    <SelectablePhoto v-for="photo of imagesOfDay?.images" :photo="photo"
                        :selected="!!selectedPhotoIds.includes(photo.id)" @toggle-photo="togglePhotoSelection" />


                    <hr />
                </div>

            </div>
        </div>

    </div>
</template>