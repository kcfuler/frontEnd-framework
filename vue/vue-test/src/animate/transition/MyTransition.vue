<template>
  <div>
    <transition appear name="unique" enter-active-class="animate__animated animate__backInUp" leave-active-class="animate__animated animate__backInUp"
    >
      <slot></slot>
    </transition>
  </div>
</template>

<script setup lang="ts">


</script>

<style>
@import 'animate.css/animate.min.css';
</style>
