<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import { IMAGES_QUERY_KEY, fetchImages } from '../../api';
import SelectablePhoto from "../../components/SelectablePhoto.vue";
import { Image, Images } from '../../../../shared/src';
import PhotosBulkActions from '../../components/PhotosBulkActions.vue';
import { computed, reactive } from 'vue';
import { ref } from 'vue';
import { PhotosGallery } from "../../utils/photos-gallery"
import { watch } from 'vue';
import FullScreenPhotoGallery from '../../components/FullScreenPhotoGallery.vue';
const fetchImagesFn = () => fetchImages()



const { data, isLoading } = useQuery({ queryKey: [IMAGES_QUERY_KEY], queryFn: fetchImagesFn });

const skeletonsArray = new Array(20).fill("")

const selectedPhotos = reactive<{ photos: Images }>({ photos: [] })

const unselectAllPhotos = () => selectedPhotos.photos = []
const togglePhotoSelection = (photo: Image) => {
    const isSelected = !!selectedPhotos.photos.find(p => p.id === photo.id)
    if (!isSelected) selectedPhotos.photos.push(photo)
    else selectedPhotos.photos = selectedPhotos.photos.filter(p => p.id !== photo.id)
    photosGallery.showPhoto(photo)

}

const photosGallery = reactive(new PhotosGallery([]))

watch(data, () => {
    photosGallery.setUserPhotos(data.value || [])
})


const selectedPhotoIds = computed(() => selectedPhotos.photos.map(p => p.id))


const gallery = ref<typeof FullScreenPhotoGallery>(null as any as typeof FullScreenPhotoGallery)
const openGalleryWithPhoto = (photo: Image) => {
    gallery.value.openGalleryWithPhoto(photo)

}


</script>

<template>
    <div class="p-2 flex flex-col gap-4">


        <PhotosBulkActions v-if="selectedPhotos.photos.length > 0" :selected-photos="selectedPhotos.photos"
            @photos-downloaded="unselectAllPhotos" @unselect-clicked="unselectAllPhotos" />


        <FullScreenPhotoGallery ref="gallery" :user-photos="data || []" />



        <div class="flex flex-col overflow-hidden gap-4">


            <div v-if="isLoading" class="flex flex-wrap gap-4 ">
                <div :class="{ 'bg-slate-200 animate-pulse h-52': true, 'w-80': index % 3 == 0, 'w-60': index % 3 == 1, 'w-50': index % 3 == 2 }"
                    v-for="(_, index) of skeletonsArray"></div>
            </div>

            <div v-for="imagesOfDay of data" class="flex flex-col gap-2">
                <label class="font-bold text-sm text-pink-700"> {{ imagesOfDay.date.toDateString() }}</label>
                <div class="flex flex-wrap gap-4 ">



                    <SelectablePhoto @click="() => openGalleryWithPhoto(photo)" v-for="photo of imagesOfDay?.images"
                        :photo="photo" :selected="!!selectedPhotoIds.includes(photo.id)"
                        @toggle-photo="togglePhotoSelection" />


                    <hr />
                </div>

            </div>
        </div>






    </div>
</template>