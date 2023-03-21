const listen = (listener) => {
  /*
   * transitionManager 是一个 location 转换过程的管理器，使用 发布-订阅 的模式
   * appendListener 会将 listener 保存在 transitionManager 内的 listeners 数组中
   * appendListener 返回一个函数，这个函数执行后会将 相应的 listener 从 listeners 数组中过滤掉
   * checkDOMListeners
   */
  const unlisten = transitionManager.appendListener(listener)
  checkDOMListeners(1)

  return () => {
    checkDOMListeners(-1)
    unlisten()
  }
}
