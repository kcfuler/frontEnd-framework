<template>
  <div class="path-input">
    <div class="path-input_group" v-for="item in localList">
      <h3 :for="item.path">路径名：</h3>
      <el-Input :id="item.label" type="text" v-model="item.label" placeholder="输入路劲名"/>
      <br />
      <h3>地址:</h3>
      <el-Input type="text" v-model="item.path" placeholder="输入路径地址"/>
      <br />
    </div>

    <div class="path-input_tool">
      <el-button round size="large" @click="addPath">
        <el-icon>
          <Plus />
        </el-icon>
      </el-button>
      <el-tooltip class="box-item" effect="dark" content="站内路径只需要目录名， 站外跳转需要完整网址" placement="top-start">
        <el-button size="large" round><el-icon>
          <QuestionFilled />
        </el-icon></el-button>
      </el-tooltip>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineProps} from 'vue'

type Path = {
  path: string
  label: string
  child: Path | null
}

type PropType = {
  pathList: Path[]
}
const props = defineProps<PropType>()
const emits = defineEmits(['update:pathList'])
const localList = ref<Path[]>()
localList.value = props.pathList
console.log('pathList',props.pathList)

watch(
    () => localList,
    () => {
      emits('update:pathList', localList.value)
    }
)

function addPath() {
  if( localList.value ) // 避免ts报错
    localList.value.push({ path: '', label: '', child: null })
}
</script>

<style scoped lang="scss">
.path-input {
  padding: 10px 10px 0 10px;
  margin: 20vh auto; // todo: 测试完后需要删除
  height: 250px;
  width: 200px; // todo: 这里测试完毕之后要删除
  border: 1px solid #ccc;
  border-radius: 5%;
  overflow-y: scroll;

  &_group {
    padding: 10px;
    border-radius: 5%;
    box-shadow: 0 1px 1px 1px rgba(0, 0, 0, 0.2);
    margin-bottom: 10px;

    & h3 {
      margin: 0;
    }
  }

  &_tool {
    display: flex;
    justify-content: space-between;
  }
}
</style>
