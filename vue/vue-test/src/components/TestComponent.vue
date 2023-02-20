<template>
  <div>
    <PathInput v-model:path="testPath"></PathInput>
  </div>
</template>

<script setup lang="ts">
import { ref , watch } from 'vue'
import PathInput from "./common/Nav/helpers/PathInput.vue";


type Path = {
  path: string
  label: string
  child: Path[] | null
}

const testPath = ref<Path[]>([
  {
    path:'/',
    label: 'test01',
    child: [
      {
        path: '/a',
        label: 'test01子路由',
        child:null
      },
      {
        path: '/b',
        label: 'test02子路由',
        child: null
      }
    ]
  },
  {
    path: 'a',
    label: 'test02',
    child: [
      {
        path: 'a/c',
        label: 'test02子路由',
        child:null
      },
      {
        path: 'a/d',
        label: 'test02子路由2',
        child: null
      }
    ]

  }
])

watch(()=> testPath.value , () =>{
  console.log("testPath", testPath.value);
})
</script>

<style scoped>

</style>
