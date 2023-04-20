<!-- 这个例子是使用v-lazy-show的，使用后发现它并不支持表达式，只支持boolean类型的值 -->
<template>
    <div>
        <Child v-lazy-show="active" :msg="message1" />
        <Child v-lazy-show="active" :msg="message2" />

        <button @click="handleClick(0)">clickMe1</button>
        <button @click="handleClick(1)">clickMe2</button>
        <Icon icon="material-symbols:arrow-circle-right-outline" color="#489554" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Child } from './components'
import { Icon } from '@iconify/vue'
const props = defineProps({
    msg: String,
})
const message1 = ref(1)
const message2 = ref(2)
const active = ref(false)

const handleClick = (type: number) => {
    active.value = true
    if (type === 0) {
        message1.value++
    } else {
        message2.value++
    }
}
</script>

<style scoped></style>
