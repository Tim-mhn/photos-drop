<script setup lang="ts">
import { Image, UserImages } from '../../../shared/src';
import { reactive } from 'vue';
import { watch } from 'vue';
import { PhotosGallery } from '../utils/photos-gallery';
import { computed } from 'vue';
import { ref } from 'vue';
import { ICONS } from '../utils/icons';



const props = defineProps<{ userPhotos: UserImages }>()


const photosGallery = reactive(new PhotosGallery([]))

watch(props, () => {
    photosGallery.setUserPhotos(props.userPhotos || [])
})

const dialogOpen = ref(false)


const openDialog = () => dialogOpen.value = true
const closeDialog = () => dialogOpen.value = false
const openGalleryWithPhoto = (photo: Image) => {
    photosGallery.showPhoto(photo);
    openDialog()
}

const previousPhoto = () => photosGallery.goToPreviousPhoto()
const nextPhoto = () => photosGallery.gotoNextPhoto()



defineExpose({ openGalleryWithPhoto })
</script>

<template>
    <v-dialog v-model="dialogOpen" fullscreen :scrim="false" transition="dialog-bottom-transition"
        class="bg-black text-white relative p-2 ">

        <div @click="closeDialog"
            class="cursor-pointer absolute left-4 top-4 p-1 rounded-full h-8 w-8 hover:bg-fuchsia-300 text-white flex justify-center items-center">
            <img :src="ICONS.ARROW_LEFT" />
        </div>

        <div class="absolute left-0 right-0 px-3 top-1/3 bottom-1/3 flex items-center justify-between  ">



            <div @click="previousPhoto" v-if="photosGallery.hasPreviousPhoto()"
                class="cursor-pointer w-12 h-12 rounded-full bg-fuchsia-200 hover:bg-fuchsia-300 text-white flex items-center justify-center text-lg">
                <img :src="ICONS.ARROW_LEFT_GRAY" />
            </div>

            <div class="flex flex-grow justify-end items-center">
                <div @click="nextPhoto" v-if="photosGallery.hasNextPhoto()"
                    class="cursor-pointer w-12 h-12 rounded-full bg-fuchsia-200 hover:bg-fuchsia-300 text-white flex items-center justify-center text-lg">
                    <img :src="ICONS.ARROW_RIGHT_GRAY" />
                </div>
            </div>
        </div>
        <div class="flex w-full h-full items-center justify-center">
            <img :src="photosGallery.currentPhoto?.url" class="max-h-full w-auto object-contain" />

        </div>

    </v-dialog>
</template>