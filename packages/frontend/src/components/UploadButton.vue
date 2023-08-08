<script setup lang="ts">
import { ref } from "vue"
import { uploadImages } from "../api";
import { useQueryClient } from "@tanstack/vue-query";
import { reactive } from "vue";
import Button from "../shared/ui/Button.vue";
const input = ref<HTMLInputElement>(null as any as HTMLInputElement)

const openFileExplorer = () => input.value?.click()

const queryClient = useQueryClient()
let err = reactive<{ error: Error | null }>({ error: null })
const onChange = async (event: Event) => {
    const fileList = (event.target as any).files as FileList;
    try {
        await uploadImages(queryClient, fileList)
    } catch (error) {
        console.log(error);
        err.error = error as Error
        snackbarOpen.value = true
    }
}


const snackbarOpen = ref(false)

</script>

<template>
    <!-- <button @click.prevent.stop="openFileExplorer" type="button">Upload</button> -->
    <Button @click="openFileExplorer">Upload</Button>
    <input className="hidden" type="file" accept="image/png, image/jpeg" :multiple="true" ref="input"
        :onChange.prevent.stop="onChange" />

    <v-snackbar v-model="snackbarOpen" multi-line>
        {{ err.error?.message }}

        <template v-slot:actions>
            <v-btn color="red" variant="text" @click="snackbarOpen = false">
                Close
            </v-btn>
        </template>
    </v-snackbar>
</template>