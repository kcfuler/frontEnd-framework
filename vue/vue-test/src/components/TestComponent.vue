<template>
  <div>
    <NavTd :pathList="testPath"></NavTd>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import NavTd from "./common/Nav/Nav-td.vue";
import type { Path } from "./common/Nav/types";

const testPath = reactive<Path[]>([
  {
    path: "/",
    label: "test01",
    child: [
      {
        path: "/a",
        label: "test01子路由",
        child: null,
      },
      {
        path: "/b",
        label: "test02子路由",
        child: null,
      },
    ],
  },
  {
    path: "a",
    label: "test02",
    child: [
      {
        path: "a/c",
        label: "test02子路由",
        child: null,
      },
      {
        path: "a/d",
        label: "test02子路由2",
        child: null,
      },
    ],
  },
]);
</script>

<style scoped></style>
