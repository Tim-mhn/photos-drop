<script setup lang="ts">
import { Images } from '../../../shared/src';
import { IAlbum } from '../../../shared/src/models';
import { downloadPhotos } from '../api';
import Button from './Button.vue';
import { useMutation, useQuery } from '@tanstack/vue-query';
import { ref } from "vue"
import Dialog from './Dialog.vue';
import { getUserAlbums } from '../api/albums';
import { addPhotosToAlbum } from '../api/album-photos'
const props = defineProps<{ selectedPhotos: Images }>()

// const albums: IAlbum[] = [{
//     creationDate: new Date(),
//     name: "album 1",
//     id: "1"
// },
// {
//     creationDate: new Date(),
//     name: "album 2",
//     id: "21"
// }]

const { data: albums } = useQuery({
    queryKey: ["albums"],
    queryFn: getUserAlbums,
})

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
            <Button :style="'flat'" :round="true" @click.prevent="() => dialogOpen = true">+</Button>


            <Dialog v-model:open="dialogOpen">
                <template #header>
                    Add to album
                </template>

                <div class="flex flex-col gap-2 max-h-96 overflow-auto">
                    <div @click="() => addPhotosToAlbumFn(album)" v-for="album of albums"
                        class="text-gray-800 px-4 py-2 w-80 hover:bg-pink-200 cursor-pointer">
                        {{ album.name }}</div>
                </div>
            </Dialog>
            <Button :style="'flat'" @click="() => downLoadPhotosFn()" :is-loading="isLoading">Download</Button>
        </div>
    </div>
</template>