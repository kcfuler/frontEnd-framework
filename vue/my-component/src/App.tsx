import { defineComponent, reactive, ref } from "vue";
import NavTdVue from "./components/nav-td/NavTdVue.vue";

type Path = {
  label: string;
  path: string;
  child: Path[] | null;
};

type PathList = Path[];

const App = defineComponent({
  setup() {
    const pathList = reactive<PathList>([
      {
        path: "https://baidu.com",
        label: "百度啦",
        child: null,
      },
      {
        path: "https://baidu.com",
        label: "百度啦",
        child: null,
      },
      {
        path: "https://baidu.com",
        label: "百度啦",
        child: null,
      },
    ]);

    return () => (
      <template>
        <NavTdVue v-model:pathList={pathList} pathList={pathList}></NavTdVue>
        <div>app running</div>
      </template>
    );
  },
});

export default App;
