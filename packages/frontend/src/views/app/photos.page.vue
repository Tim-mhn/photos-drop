<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import { IMAGES_QUERY_KEY, fetchImages } from '../../api';
import SelectablePhoto from "../../components/SelectablePhoto.vue";
import { Image, Images } from '../../../../shared/src';
import PhotosBulkActions from '../../components/PhotosBulkActions.vue';
import { computed, reactive } from 'vue';
import { ref } from 'vue';
const fetchImagesFn = () => fetchImages()



const { data, isLoading } = useQuery({ queryKey: [IMAGES_QUERY_KEY], queryFn: fetchImagesFn });

const skeletonsArray = new Array(20).fill("")

const selectedPhotos = reactive<{ photos: Images }>({ photos: [] })

const unselectAllPhotos = () => selectedPhotos.photos = []
const togglePhotoSelection = (photo: Image) => {
    const isSelected = !!selectedPhotos.photos.find(p => p.id === photo.id)
    if (!isSelected) selectedPhotos.photos.push(photo)
    else selectedPhotos.photos = selectedPhotos.photos.filter(p => p.id !== photo.id)

}

const selectedPhotoIds = computed(() => selectedPhotos.photos.map(p => p.id))

let dialog = ref(false)

// const openDialog = () => dialog.value = true



</script>

<template>
    <div class="p-2 flex flex-col gap-4">


        <PhotosBulkActions v-if="selectedPhotos.photos.length > 0" :selected-photos="selectedPhotos.photos"
            @photos-downloaded="unselectAllPhotos" />


        <!-- <button @click="openDialog">open dialog</button> -->

        <div class="flex flex-col overflow-hidden gap-4">


            <div v-if="isLoading" class="flex flex-wrap gap-4 ">
                <div :class="{ 'bg-slate-200 animate-pulse h-52': true, 'w-80': index % 3 == 0, 'w-60': index % 3 == 1, 'w-50': index % 3 == 2 }"
                    v-for="(_, index) of skeletonsArray"></div>
            </div>

            <div v-for="imagesOfDay of data" class="flex flex-col gap-2">
                <label class="font-bold text-sm text-pink-700"> {{ imagesOfDay.date.toDateString() }}</label>
                <div class="flex flex-wrap gap-4 ">



                    <SelectablePhoto v-for="photo of imagesOfDay?.images" :photo="photo"
                        :selected="!!selectedPhotoIds.includes(photo.id)" @toggle-photo="togglePhotoSelection" />


                    <hr />
                </div>

            </div>
        </div>

        <!-- <v-dialog v-model="dialog" fullscreen :scrim="false" transition="dialog-bottom-transition">
            <template v-slot:activator="{  }">
                <v-btn color="primary" dark v-bind="props">
                    Open Dialog
                </v-btn>
            </template>
            <v-card>
                <v-toolbar dark color="primary">
                    <v-btn icon dark @click="dialog = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title>Settings</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn variant="text" @click="dialog = false">
                            Save
                        </v-btn>
                    </v-toolbar-items>
                </v-toolbar>
                <v-list lines="two" subheader>
                    <v-list-subheader>User Controls</v-list-subheader>
                    <v-list-item title="Content filtering"
                        subtitle="Set the content filtering level to restrict apps that can be downloaded"></v-list-item>
                    <v-list-item title="Password"
                        subtitle="Require password for purchase or use password to restrict purchase"></v-list-item>
                </v-list>
                <v-divider></v-divider>
                <v-list lines="two" subheader>
                    <v-list-subheader>General</v-list-subheader>
                    <v-list-item title="Notifications"
                        subtitle="Notify me about updates to apps or games that I downloaded">
                        notifs
                    </v-list-item>
                    <v-list-item title="Sound" subtitle="Auto-update apps at any time. Data charges may apply">
                        sound
                    </v-list-item>
                    <v-list-item title="Auto-add widgets" subtitle="Automatically add home screen widgets">
                        widgets
                    </v-list-item>
                </v-list>
            </v-card>
        </v-dialog> -->

    </div>
</template>