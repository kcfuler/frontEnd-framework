const checkDOMListeners = (delta) => {
  listenerCount += delta

  if (listenerCount === 1) {
    // 对 popstate 事件进行监听，handlePopState 会
    addEventListener(window, PopStateEvent, handlePopState)

    if (needsHashChangeListener)
      addEventListener(window, HashChangeEvent, handleHashChange)
  } else if (listenerCount === 0) {
    removeEventListener(window, PopStateEvent, handlePopState)

    if (needsHashChangeListener)
      removeEventListener(window, HashChangeEvent, handleHashChange)
  }
}

const handlePopState = (event) => {
  // 忽略无关的 popstate 事件
  if (isExtraneousPopstateEvent(event))
    return

  handlePop(getDOMLocation(event.state))
}

// 返回一个 location 对象
const getDOMLocation = (historyState) => {
  const { key, state } = (historyState || {})
  const { pathname, search, hash } = window.location

  let path = pathname + search + hash

  if (basename)
    path = stripBasename(path, basename)

  return createLocation(path, state, key)
}

let forceNextPop = false
const handlePop = (location) => {
  // forceNextPop 默认为 false，所以默认会走 else
  if (forceNextPop) {
    forceNextPop = false
    setState()
  } else {
    const action = 'POP'

    // confirmTransitionTo 正常情况下，会调用最后一个回调函数，
    // 然后传入 ok 为 true，执行 setState
    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, (ok) => {
      if (ok) {
        setState({ action, location })
      } else {
        revertPop(location)
      }
    })
  }
}

// setState 会把新的 state 合并到 history 对象，然后调用 notifyListeners
// notifyListeners 会执行 listen 时候保存的监听函数
const setState = (nextState) => {
  Object.assign(history, nextState)

  history.length = globalHistory.length

  transitionManager.notifyListeners(
    history.location,
    history.action
  )
}
