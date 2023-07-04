<script setup lang="ts">
import { Image } from "../../../shared/src/index"

const props = defineProps<{ photo: Image, selected: boolean }>()
const emit = defineEmits<{ (e: 'togglePhoto', image: Image): void }>()

const emitPhotoToggled = () => {
    emit('togglePhoto', props.photo)
}

</script>

<template>
    <div class="relative  group cursor-pointer hover:shadow-lg border-2 border-solid  hover:border-black"
        :class="selected ? 'border-black' : 'border-transparent'">
        <img class="border-2 border-pink-200 h-48 w-auto" :src="photo.url" height="192" width="192" />

        <div role="checkbox" @click.stop="emitPhotoToggled"
            class="flex justify-center items-center z-10 border border-solid  group-hover:visible absolute top-3 left-3 w-5 h-5 rounded-full border-fuchsia-600 text-sm"
            :class="{
                'bg-fuchsia-500 visible text-white font-bold': selected,
                'bg-fuchsia-100 invisible text-fuchsia-500 hover:bg-fuchsia-200': !selected,
            }
                ">
            ✔


        </div>
    </div>
</template>