<script setup lang="ts">
import { useMutation, useQuery } from '@tanstack/vue-query';
import { addPhotosToAlbum } from '../api/album-photos';
import { ref } from "vue"
import Dialog from './Dialog.vue';
import { IAlbum } from '../../../shared/src/models';
import { Images } from '../../../shared/src';
import { getUserAlbums } from '../api/albums';
import Button from '../shared/ui/Button.vue';

const props = defineProps<{ selectedPhotos: Images }>()
const { data: albums } = useQuery({
    queryKey: ["albums"],
    queryFn: getUserAlbums,
})


const dialogOpen = ref(false)
const closeDialog = () => dialogOpen.value = false
const { mutate, isLoading } = useMutation({
    mutationFn: addPhotosToAlbum
})

const addPhotosToAlbumFn = async (album: IAlbum) => {
    await mutate({ album, photos: props.selectedPhotos })
    closeDialog()
}


</script>

<template>
    <Button :style="'flat'" :is-loading="isLoading" :round="true" @click.prevent="() => dialogOpen = true">+</Button>

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
</template>