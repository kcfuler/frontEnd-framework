<template>
  <div>
    this is the demo index file
    <button @click="handleClick">点我获取数据并跳转</button>
  </div>
</template>

<script setup lang='ts'>

async function handleClick(){
  const data = await $fetch('/api/getId')
  navigateTo({
    path: `/users-test/${data.id}`,
  })
  console.log(data.id);
}

</script>

<style scoped lang='scss'>

</style>