import { defineComponent, reactive, ref } from "vue";
import NavigationVue from "./components/NavigationVue.vue";

export default defineComponent({
  name: "App",

  setup() {
    const pathList = reactive([
      {
        label: "百度啦",
        path: "https://baidu.com",
        child: null,
      },
      {
        label: "百度啦",
        path: "https://baidu.com",
        child: null,
      },
      {
        label: "百度啦",
        path: "https://baidu.com",
        child: null,
      },
    ]);

    const navMode = ref("white");

    return () => (
      <>
        <div>
          父组件中的路径
          {pathList.map((item) => (
            <div>
              {item.label} --- {item.path}
            </div>
          ))}
        </div>
        <div
          className="container"
          style={{
            minHeight: "600px",
            margin: "0 auto",
            backgroundColor: "#ffd9c2",
            border: "1px solid #366ef4",
            borderRadius: "5%",
          }}
        >
          <button
            onClick={() =>
              (navMode.value = navMode.value == "dark" ? "white" : "dark")
            }
          >
            change mode
          </button>
          <NavigationVue
            pathList={pathList}
            mode={navMode.value}
          ></NavigationVue>
        </div>
      </>
    );
  },
});
