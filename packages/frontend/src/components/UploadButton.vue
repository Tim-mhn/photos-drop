<script setup lang="ts">
import { ref } from "vue"
import { uploadImages, useAPIClient } from "../api";

const input = ref<HTMLInputElement>(null as any as HTMLInputElement)

const openFileExplorer = () => input.value?.click()
const client = useAPIClient()
const onChange = (event: Event) => {
    const fileList = (event.target as any).files as FileList;
    uploadImages(client, fileList)
};


</script>

<template>
    <button @click.prevent.stop="openFileExplorer">Upload</button>
    <input className="hidden" type="file" accept="image/png, image/jpeg" :multiple="true" ref="input"
        :onChange.prevent.stop="onChange" />
</template>