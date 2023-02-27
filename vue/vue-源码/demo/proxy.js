const obj = { foo: 1 }
const p = new Proxy(obj, {
  deleteProperty(target, key) {
    // reflect 起到的作用主要是改变this 的指向，确保代理对象能够和原对象的方法建立联系
    return Reflect.deleteProperty(target, key)
  }
})
console.log(p.foo) // 1
delete p.foo
console.log(p.foo) // 未定义