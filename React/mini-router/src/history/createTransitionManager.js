const appendListener = (fn) => {
  // isActive 用于保存当前监听函数的状态，默认是 true，取消监听后会变成 false
  // 主要用于处理，listeners 数组中函数已经在遍历执行，同时取消监听，
  // 这时可能这个函数还在执行的数组队列中，isActive 变成 false 可以阻止该函数继续执行
  let isActive = true

  const listener = (...args) => {
    if (isActive)
      fn(...args)
  }

  listeners.push(listener)

  // 返回一个取消监听的函数
  return () => {
    isActive = false
    listeners = listeners.filter(item => item !== listener) // 过滤掉 listener
  }
}

const notifyListeners = (...args) => {
  listeners.forEach(listener => listener(...args))
}

const confirmTransitionTo = (location, action, getUserConfirmation, callback) => {
  // 使用 Prompt 才会进入这个，否则进入 else
  if (prompt != null) {
    const result = typeof prompt === 'function' ? prompt(location, action) : prompt

    if (typeof result === 'string') {
      if (typeof getUserConfirmation === 'function') {
        getUserConfirmation(result, callback)
      } else {
        callback(true)
      }
    } else {
      // Return false from a transition hook to cancel the transition.
      callback(result !== false)
    }
  } else {
    // 没有 prompt 就只执行这个
    callback(true)
  }
}
