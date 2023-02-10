<script>
import {defineComponent} from "vue";
import TestApi from "./components/TestApi.vue";
import AnimationTest from "./animate/AnimationTest.vue";
import TestInstall from "./tailwind/TestInstall.vue";

export default defineComponent({
  components: {TestInstall, AnimationTest, TestApi}
})
</script>

<template>
<!--<TestApi></TestApi>-->
<!--  <AnimationTest></AnimationTest>-->
  <TestInstall></TestInstall>
</template>

<style scoped></style>
