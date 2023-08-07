<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import { useRoute, useRouter } from 'vue-router';
import { getAlbumPhotos } from '../../api/album-photos';
import { getAlbumById } from '../../api/albums'

import SelectablePhoto from '../../components/SelectablePhoto.vue'

const route = useRoute()

const albumId = <string>route.params.albumId


const { data: album } = useQuery({
    queryKey: ["album", albumId],
    queryFn: () => getAlbumById(albumId),
    onSuccess: console.log
})


const { data: albumPhotos } = useQuery({
    queryFn: () => getAlbumPhotos(albumId),
    queryKey: ["album-photos", albumId],
    onSuccess: console.log

})



</script>

<template>
    <div class="flex flex-col gap-8 py-2">
        <div class="text-4xl font-medium text-fuchsia-800">{{ album?.name }}</div>


        <div class="flex flex-wrap gap-4 ">



            <SelectablePhoto v-for="photo of albumPhotos" :photo="photo" :selected="false" />


        </div>
    </div>
</template>