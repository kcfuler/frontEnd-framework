<script setup lang="ts">

</script>

<template>
  <div class="container">
    <div class="content">
      <div class="left">
        left
      </div>
      <div class="right">
        right
      </div>
    </div>
    <div class="link">
      link
    </div>
  </div>
</template>

<style scoped lang="scss">
.container{
  height: 20vh;
  margin: 0 !important;

  .content{
    height: 80%;
    color: white;
    background-color: #696de0;
    display: flex;
    justify-content: space-around;
  }
}
</style>
