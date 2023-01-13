<template>
  <h3>
    传入路径
    {{ LocalPath }}
  </h3>
  <div :class="navClass">
    <div
      :class="navClass + '_item'"
      v-for="item in pathList"
      @click="handleClick(item.path)"
    >
      {{ item.label }}
    </div>
  </div>
</template>

<script setup>
import { reactive, defineProps, watchEffect, ref } from "vue";

const props = defineProps(["pathList", "mode"]);

const navClass = ref("nav--white");
watchEffect(() => {
  if (props.mode) {
    navClass.value = "nav--" + props.mode;
  }
});

const LocalPath = reactive(props.pathList);
function handleClick(path) {
  if (isOuterPath(path)) {
    location.href = path;
  }
}
function isOuterPath(path) {
  let outerPath = /^http/g;
  return outerPath.test(path);
}
</script>

<style scoped lang="scss">
.nav--dark {
  --dark-item-bgc-blue: #0052d9;
  --dark-item-bgc-gray: #4b4b4b;

  display: flex;
  min-width: 400px;
  height: 60px;
  color: #fefefe;
  background-color: #242424;
  font-family: "Microsoft YaHei";

  justify-content: space-evenly;
  align-items: center;

  &_item {
    padding: 0.5rem;
    border-radius: 5%;
    cursor: pointer;
    &:hover {
      background-color: var(--dark-item-bgc-blue);
    }
  }
}

.nav--white {
  --white-bgc: #fff;
  --white-font-color: #191919;

  --white-item-font-color: #0054cc;
  --white-item-bgc-blue: #f2f3ff;
  --dark-item-bgc-gray: #4b4b4b;

  display: flex;
  min-width: 400px;
  height: 60px;
  color: var(--white-font-color);
  background-color: var(--white-bgc);
  font-family: "Microsoft YaHei";

  justify-content: space-evenly;
  align-items: center;

  &_item {
    padding: 0.5rem;
    border-radius: 5%;
    cursor: pointer;
    &:hover {
      color: var(--white-item-font-color);
      background-color: var(--white-item-bgc-blue);
    }
  }
}
</style>
