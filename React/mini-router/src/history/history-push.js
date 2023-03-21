const push = (path, state) => {
  const action = 'PUSH'
  const location = createLocation(path, state, createKey(), history.location)

  transitionManager.confirmTransitionTo(location, action, getUserConfirmation, (ok) => {
    if (!ok)
      return

    const href = createHref(location)
    const { key, state } = location

    if (canUseHistory) {
      // 使用原生 history 的 pushState 方法，改变 url
      globalHistory.pushState({ key, state }, null, href)

      if (forceRefresh) {
        window.location.href = href
      } else {
        const prevIndex = allKeys.indexOf(history.location.key)
        const nextKeys = allKeys.slice(0, prevIndex === -1 ? 0 : prevIndex + 1)

        nextKeys.push(location.key)
        allKeys = nextKeys

        setState({ action, location })
      }
    } else {
      window.location.href = href
    }
  })
}
