<script setup lang="ts">
defineProps<{ open: boolean }>()
defineEmits<{ (e: 'update:open'): boolean }>()

</script>

<template>
    <v-dialog :model-value="open" @update:model-value="open => $emit('update:open', open)" width="auto">
        <div class="flex flex-col bg-white border-pink-800 gap-4 py-4 border-solid border-4 text-gray-800">

            <div class="text-lg px-4 text-gray-900">
                <slot name="header"></slot>
            </div>

            <div class="flex flex-col text-gray-800">
                <slot></slot>
            </div>
        </div>

    </v-dialog>
</template>