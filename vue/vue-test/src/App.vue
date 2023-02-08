<script>
import {defineComponent} from "vue";
import TestApi from "./components/TestApi.vue";
import AnimationTest from "./animate/AnimationTest.vue";

export default defineComponent({
  components: {AnimationTest, TestApi}
})
</script>

<template>
<TestApi></TestApi>
  <AnimationTest></AnimationTest>
</template>

<style scoped></style>
