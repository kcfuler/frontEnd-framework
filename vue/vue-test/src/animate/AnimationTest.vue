<template>
  <div class="test-container">
    <AnimaSingle></AnimaSingle>

    <a-button @click="isShow = !isShow">切换自定义动画</a-button>
    <MyTransition>
    <div class="test" v-if="isShow"> test </div>
    </MyTransition>

    <input v-model="query" />
    <AnimaGroup>
      <li
          v-for="(item, index) in computedList"
          :key="item.msg"
          :data-index="index"
          ref="listRef"
          v-show="listShow"
      >
        <div style="height: 200px">{{ item.msg }}</div>
      </li>
    </AnimaGroup>
  </div>
</template>

<script setup lang="ts">
import {computed, onMounted, onUnmounted, ref} from 'vue'
import {  useThrottleFn } from '@vueuse/core'
import AnimaSingle from "./transition/Anima-single.vue";
import MyTransition from "./transition/MyTransition.vue";
import AnimaGroup from "./transition/Anima-group.vue";

const isShow = ref(true)

// 动画组过程
const listRef = ref<Element | null>(null)
const query = ref('')
const computedList = computed(() => {
  return list.filter((item) => item.msg.toLowerCase().includes(query.value))
})
const list = [
  { msg: 'Bruce Lee' },
  { msg: 'Jackie Chan' },
  { msg: 'Chuck Norris' },
  { msg: 'Jet Li' },
  { msg: 'Kung Fury' }
]
const listShow = ref(true);
const handleObserver = useThrottleFn( () => {
  // @ts-ignore
  observer.observe(listRef.value[0]);
},300)
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    listShow.value = entry.isIntersecting ? true : false;
  })
})
onMounted(() => {

  console.log(listRef)
  window.addEventListener('scroll', handleObserver)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleObserver)
})
</script>

<style scoped>
.test-container{
  height: 2000px;
}

.test{
  width: 200px;
  height: 200px;
  margin: 0 auto;
  background-color: skyblue;
}
</style>
