<script setup lang="ts">
import { Images } from '../../../shared/src';
import { downloadPhotos } from '../api';
import Button from './Button.vue';
import { useMutation } from '@tanstack/vue-query';


const props = defineProps<{ selectedPhotos: Images }>()

const emit = defineEmits<{ (e: 'photosDownloaded'): void, (e: 'deselectClicked'): void }>()


const { isLoading, mutate: downLoadPhotosFn } = useMutation({
    mutationFn: async () => {
        await downloadPhotos(props.selectedPhotos)
        emit("photosDownloaded")
    },

})

const emitDeselectClicked = () => emit('deselectClicked')





</script>

<template>
    <div class="flex flex-grow">
        <div class="flex items-center font-medium text-2xl text-fuchsia-800 gap-4">
            <div>{{ selectedPhotos.length }} selected</div>
            <Button size="sm" @click="emitDeselectClicked">Unselect</Button>


        </div>
        <div class="flex justify-end flex-grow items-center gap-4">
            <Button :style="'flat'" :round="true">+</Button>
            <Button :style="'flat'" @click="() => downLoadPhotosFn()" :is-loading="isLoading">Download</Button>
        </div>
    </div>
</template>