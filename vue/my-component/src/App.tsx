import { defineComponent, ref } from "vue";

const App = defineComponent({
  setup() {
    const count = ref(0);

    function increment() {
      count.value = count.value + 1;
    }

    return () => (
      <div>
        <h3>{count.value}</h3>
        <button onClick={increment}>+</button>
      </div>
    );
  },
});

export default App;
