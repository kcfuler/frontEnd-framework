<template>
  <div>
    <a-button @click="getData">获取数据</a-button>

  </div>
</template>

<script setup lang="ts">

import request from "../service/request";
import {ref} from "vue";
type todo = {
  userId: number,
  id: 1,
  title: string,
  complete: boolean
}

const req = request();

const data = ref<todo>();
async function getData(){
  console.log(req)
  data.value = await req.get<todo>('/todos/1');
  console.log(await fetch('/api/todos/1'))
}

</script>

<style scoped>

</style>
