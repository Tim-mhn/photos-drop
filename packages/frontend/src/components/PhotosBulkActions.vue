<script setup lang="ts">
import { Images } from '../../../shared/src';
import { downloadPhotos } from '../api';
import Button from './Button.vue';


const props = defineProps<{ selectedPhotos: Images }>()
const download = async () => {
    await downloadPhotos(props.selectedPhotos)
}
</script>

<template>
    <div class="flex justify-end flew-grow items-center gap-4">
        <Button :style="'flat'" :round="true">+</Button>
        <Button :style="'flat'" @click="download">Download</Button>
    </div>
</template>