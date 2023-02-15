// use the weakMap | Map | Set , to construct a tree data structure
// weakMap -> Map -> Set
// target -> key -> effects

const bucket = new WeakMap();

let activeEffect;
// use a high order function to register the effect function
function effect(fn) {
  activeEffect = fn;
  fn(); // this implement must ensure the proxy is being read before set , otherwise the effect can't be trigger
}
// 原始数据

function track(target, key) {
  if (!activeEffect) return;
  let depsMap = bucket.get(target);
  if (!depsMap) {
    bucket.set(target, (depsMap = new Map()));
  }
  let deps = depsMap.get(key);
  if (!deps) {
    depsMap.set(key, (deps = new Set()));
  }
  deps.add(activeEffect);
}

function trigger(target, key) {
  let depsMap = bucket.get(target);
  if (!depsMap) return;
  let effects = depsMap.get(key);
  effects && effects.forEach((fn) => fn());
}
function trigger() {}
const data = { text: "hello world" };
// 对原始数据的代理
const obj = new Proxy(data, {
  // 拦截读取操作
  get(target, key) {
    // 将副作用函数 effect 添加到存储副作用函数的桶中
    track(target, key);
    console.log("reading !");
    // 返回属性值
    return target[key];
  },
  // 拦截设置操作
  set(target, key, newVal) {
    target[key] = newVal;
    trigger(target, key);
    // 返回 true 代表设置操作成功
    return true;
  },
});
effect(() => {
  console.log("being setting !!!", obj.text);
});

obj.text = "lala";
