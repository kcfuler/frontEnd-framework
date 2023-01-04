<template>
  <div class="nav">
    {{ pathList }}
  </div>
</template>

<script setup lang="ts">
import { reactive, defineProps, defineEmits } from "vue";

type Path = {
  label: string;
  path: string;
  child: Path[] | null;
};
type Prop = {
  pathList: Path[];
};

const props = defineProps<Prop>();
const emits = defineEmits(["update:pathList"]);
const pathList = reactive<Path[]>(props.pathList);
</script>

<style scoped lang="scss"></style>
