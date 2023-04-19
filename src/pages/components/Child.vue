<template>
    <div class="hello">
        <div>{{ msg }}</div>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

const props = defineProps({
    msg: Number,
})
onMounted(() => {
    if (props.msg === 1) {
        console.log(1)
    } else {
        console.log(2)
    }
})
</script>

<style scoped></style>
