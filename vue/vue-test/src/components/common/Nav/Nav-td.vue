<script lang="ts" setup>
import { Path } from "./types";
import { computed } from "vue";
interface IProp {
  pathList: Path[];
}
const props = defineProps<IProp>();
const localList = computed(() => props.pathList);
</script>

<template>
  <div class="flex justify-evenly h-20 bg-black"></div>
</template>

<style scoped></style>
