<script setup lang="ts">
import { Images } from '../../../shared/src';
import { IAlbum } from '../../../shared/src/models';
import { downloadPhotos } from '../api';
import Button from '../shared/ui/Button.vue';
import { useMutation, useQuery } from '@tanstack/vue-query';
import { ref } from "vue"
import { addPhotosToAlbum } from '../api/album-photos'
import AddPhotosToAlbumButton from './AddPhotosToAlbumButton.vue';
const props = defineProps<{ selectedPhotos: Images }>()





const { mutate } = useMutation({
    mutationFn: addPhotosToAlbum
})

const addPhotosToAlbumFn = (album: IAlbum) => mutate({ album, photos: props.selectedPhotos })


const emit = defineEmits<{ (e: 'photosDownloaded'): void, (e: 'unselectClicked'): void }>()


const { isLoading, mutate: downLoadPhotosFn } = useMutation({
    mutationFn: async () => {
        await downloadPhotos(props.selectedPhotos)
        emit("photosDownloaded")
    },

})

const emitUnselectClicked = () => emit('unselectClicked')

const dialogOpen = ref(false)




</script>

<template>
    <div class="flex flex-grow">
        <div class="flex items-center font-medium text-2xl text-fuchsia-800 gap-4">
            <div>{{ selectedPhotos.length }} selected</div>
            <Button size="sm" @click="emitUnselectClicked">Unselect</Button>


        </div>
        <div class="flex justify-end flex-grow items-center gap-4">
            <AddPhotosToAlbumButton :selected-photos="selectedPhotos"></AddPhotosToAlbumButton>
            <Button :style="'flat'" @click="() => downLoadPhotosFn()" :is-loading="isLoading">Download</Button>
        </div>
    </div>
</template>