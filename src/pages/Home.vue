<!-- 这个例子是使用v-lazy-show的，使用后发现它并不支持表达式，只支持boolean类型的值 -->
<template>
    <div class="list-item">
        <Child v-lazy-show="active" :msg="message1" />
        <Child v-lazy-show="active" :msg="message2" />
        <button @click="handleClick(0)">clickMe1</button>
        <button @click="handleClick(1)">clickMe2</button>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Child } from './components'
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

<style scoped lang="scss">
.list-item {
    position: relative;
    width: 20px;
    .test {
        color: red;
        .second {
            color: red;
            .color {
                color: gray;
            }
        }
    }
}

.dec {
    padding: 4px 0;
    // width: 140px;
    font-size: 14px;
    color: #ffffff;
    cursor: pointer;
}

.active {
    color: #00c2ff;
}
</style>
