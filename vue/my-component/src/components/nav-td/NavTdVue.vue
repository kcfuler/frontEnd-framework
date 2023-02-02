<script setup lang="ts">
import { defineEmits, defineProps, reactive } from 'vue'

interface Path {
  label: string
  path: string
  child: Path[] | null
}
interface Prop {
  pathList: Path[]
}

const props = defineProps<Prop>()
const emits = defineEmits(['update:pathList'])
const pathList = reactive<Path[]>(props.pathList)
</script>

<template>
  <div class="nav">
    {{ pathList }}
  </div>
</template>

<style scoped lang="scss"></style>
