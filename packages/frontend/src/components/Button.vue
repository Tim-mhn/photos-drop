<script setup lang="ts">
type ButtonStyle = "flat" | "simple";
type ButtonSize = "sm" | "md";
type ButtonType = "submit" | "reset" | "button";




withDefaults(defineProps<Partial<{
    style: ButtonStyle,
    size: ButtonSize,
    disabled: boolean,
    round: boolean
    type: ButtonType,
    onClick: (e?: MouseEvent) => void
}>>(), {
    style: "flat",
    disabled: false,
    round: false,
    size: "md",
    type: "button",
}
)
</script>


<template>
    <button @click.prevent.stop="onClick" :class="{
        'h-10 flex justify-center font-semibold items-center text-center ': true,
        'bg-fuchsia-500 hover:bg-fuchsia-600  text-white border-solid border-black border-2 hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] ':
            style === 'flat',
        'p-3': !round,
        'rounded-full h-8 w-8 p-0': round,
        'text-sm': size === 'sm',
        'text-md': size === 'md',
        'text-fuchsia-600 hover:text-fuchsia-700 hover:underline hover:underline-offset-4 decoration-fuchsia-600 decoration-2':
            style === 'simple',
        'pointer-events-none bg-gray-300': disabled,
    }">
        <slot></slot>
    </button>
</template>
