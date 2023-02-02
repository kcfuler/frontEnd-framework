<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import request from '../api/request'

interface ListItem {
  value: string
  label: string
}

const list = ref<ListItem[]>([])
const options = ref<ListItem[]>([])
const value = ref<string[]>([])
const loading = ref(false)

const states = [
  'https://www.baidu.com',
  'https://www.broadcom.com/',
]

onMounted(() => {
  list.value = states.map((item) => {
    return { value: `value:${item}`, label: `label:${item}` }
  })
})
const remoteMethod = async (query: string) => {
  query = query.trim()
  if (query) {
    loading.value = true
    const data = await request({})
    console.log(data)
    // options.value = data.data
  }
  else {
    options.value = []
  }
}

function handleSelectChange(val: string[]) {
  console.log(val)
  const str = val[0]
  const href = str.slice(str.indexOf(':') + 1)
  location.href = href
}
</script>

<template>
  <div class="searchInput-container">
    <p>use remote-show-suffix</p>
    <el-select
      v-model="value"
      filterable
      remote
      reserve-keyword
      placeholder="输入关键词"
      remote-show-suffix
      :remote-method="remoteMethod"
      :loading="loading"
      @change="handleSelectChange"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </div>
</template>

<style lang="scss" scoped>
.searchInput-container{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  width:25vw;
  height: 25vh;
  margin:0 auto;
  background-color: #fff;
}
</style>
