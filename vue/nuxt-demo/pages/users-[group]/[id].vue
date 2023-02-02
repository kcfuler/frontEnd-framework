<template>
  <div>
    {{ testText }}
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
let testText = route.params.id;
console.log(route.params);

</script>

<style scoped lang='scss'>

</style>