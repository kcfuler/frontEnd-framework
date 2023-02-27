function watch(source, cb){
  effect(
    () => source.foo,
    {
      schedule(){
        cb()
      }
    }
  )
}