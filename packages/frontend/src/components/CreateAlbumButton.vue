<script setup lang="ts">
import { reactive } from 'vue';
import { createAlbum } from '../api/albums';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { ref } from 'vue';
import Button from './Button.vue';

const queryClient = useQueryClient()

const createAlbumDialogOpen = ref(false)

const formData = reactive({
    name: '',
})

const closeDialog = () => createAlbumDialogOpen.value = false

const { mutate, isLoading } = useMutation({
    mutationFn: createAlbum,
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["albums"] });
        closeDialog()
    },
})

const createAlbumFn = (payload: any) => {
    console.log(payload);
    mutate(payload)
}


const requiredValidator = (fieldName: string) => (v: string) => !!v || `${fieldName} is required`
const formValid = ref(false)
</script>


<template>
    <Button @click="() => createAlbumDialogOpen = true">Create album</Button>
    <v-dialog v-model="createAlbumDialogOpen" width="auto">
        <div class="bg-pink-100 border-4 border-solid border-pink-800 text-pink-800 p-4 gap-4 flex flex-col w-80">
            <div class="text-2xl font-semibold">Create new album</div>
            <v-form class="flex flex-col gap-4" v-model="formValid"
                @submit.prevent="() => createAlbumFn({ name: formData.name })">
                <v-text-field v-model="formData.name" :rules="[requiredValidator('Album name')]" label="Name"
                    required></v-text-field>


                <Button type="submit" :disabled="!formValid" :full-width="true" :is-loading="isLoading"> Create
                    album</Button>
            </v-form>

        </div>

    </v-dialog>
</template>