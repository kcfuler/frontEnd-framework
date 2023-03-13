<script setup lang="ts">
// import { reactive } from 'vue'
// import NavTd from './common/Nav/Nav-td.vue'
// import type { Path } from './common/Nav/types'
// import TestUpload from './test/TestUpload.vue'
import TestCarousel from './test/TestCarousel.vue'

// const testPath = reactive<Path[]>([
//   {
//     path: '/',
//     label: 'test01',
//     child: [
//       {
//         path: '/a',
//         label: 'test01子路由',
//         child: null,
//       },
//       {
//         path: '/b',
//         label: 'test02子路由',
//         child: null,
//       },
//     ],
//   },
//   {
//     path: 'a',
//     label: 'test02',
//     child: [
//       {
//         path: 'a/c',
//         label: 'test02子路由',
//         child: null,
//       },
//       {
//         path: 'a/d',
//         label: 'test02子路由2',
//         child: null,
//       },
//     ],
//   },
// ])
</script>

<template>
  <div class="w-160 mx-auto">
    <!-- <NavTd :path-list="testPath" /> -->
    <!-- <TestDraggable /> -->
    <!-- <TestUpload /> -->
    <TestCarousel />
  </div>
</template>

<style scoped></style>
