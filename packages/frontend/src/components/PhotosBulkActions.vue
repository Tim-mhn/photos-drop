<script setup lang="ts">
import { Images } from '../../../shared/src';
import { downloadPhotos } from '../api';
import Button from './Button.vue';
import { useMutation } from '@tanstack/vue-query';


const props = defineProps<{ selectedPhotos: Images }>()

const emit = defineEmits<{ (e: 'photosDownloaded'): void }>()


const { isLoading, mutate: downLoadPhotosFn } = useMutation({
    mutationFn: async () => {
        await downloadPhotos(props.selectedPhotos)
        emit("photosDownloaded")
    },

})





</script>

<template>
    <div class="flex justify-end flew-grow items-center gap-4">
        <Button :style="'flat'" :round="true">+</Button>
        <Button :style="'flat'" @click="() => downLoadPhotosFn()" :is-loading="isLoading">Download</Button>
    </div>
</template>