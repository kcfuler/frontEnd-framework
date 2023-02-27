<script lang="ts" setup>
import { Path } from "./types";
import { computed, ref } from "vue";
interface IProp {
  pathList: Path[];
}
const props = defineProps<IProp>();
const localList = computed(() => props.pathList);

// 标识当前打开的子目录
const showPath = ref("");
function changeShowPath(path: string) {
  showPath.value = path;
}
</script>

<template>
  <div>
    <ul
      class="flex justify-evenly items-center h-20 bg-slate-800 rounded-md"
      @mouseleave="changeShowPath('')"
    >
      <li
        v-for="item in localList"
        class="relative text-lg text-slate-100 hover:bg-slate-600 p-4 rounded-md transition-all font-bold"
        @mouseover="changeShowPath(item.path)"
      >
        {{ item.label }}

        <!-- subItem -->
        <ul
          v-if="showPath === item.path"
          class="absolute top-20 flex flex-col items-center gap-4 text-lg text-slate-100 bg-slate-800 p-2 rounded-md transition-all font-bold"
        >
          <li
            v-for="subItem in item.child"
            class="hover:bg-slate-600 rounded-md"
          >
            {{ subItem.label }}
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
