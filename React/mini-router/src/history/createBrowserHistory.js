const createBrowserHistory = (props = {}) => {
  /* 此处省略具体功能函数实现代码 */

  const history = {
    length: globalHistory.length,
    action: 'POP',
    location: initialLocation,
    createHref,
    push,
    replace,
    go,
    goBack,
    goForward,
    block,
    listen
  }

  return history
}
