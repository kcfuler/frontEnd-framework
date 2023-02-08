<template>
  <div>
    <a-button @click="isShow = !isShow">toggle</a-button>

<!--    <transition name="fade">-->
<!--      <div class="test" v-show="isShow">-->
<!--        啦啦啦-->
<!--      </div>-->
<!--    </transition>-->
<!--    <transition name="bounce">-->
<!--      <div class="test" v-show="isShow">-->
<!--        bounce-->
<!--      </div>-->
<!--    </transition>-->

    <transition name="animateCss" enter-active-class="animate__animated animate__backInUp" leave-active-class="animate__animated animate__backInUp">
      <div class="test" v-if="isShow">
        animate css
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">

import {ref} from "vue";

const isShow = ref(true)

</script>

<style scoped>
@import 'animate.css/animate.min.css';
.test{
  width: 200px;
  height: 200px;
  margin: 0 auto;
  background-color: pink;

}
.fade-enter-active, .fade-leave-active{
  transition: all 0.5s ease-in-out;
}
.fade-enter-from, .fade-leave-to{
  transform: translate(-100%, -100%) scale(120%);
  opacity: 0;
}


.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}

</style>
