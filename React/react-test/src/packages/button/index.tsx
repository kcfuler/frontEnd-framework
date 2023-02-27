import React from 'react'
import ClassNames from 'classnames'

const Button = (props: any) => {
  const { children, type } = props
  const cls = ClassNames({
    'ant-btn': true,
    [`ant-button-${type}`]: type,
  })
  return (
    <button className={cls}>{children}</button>
  )
}

export default Button
