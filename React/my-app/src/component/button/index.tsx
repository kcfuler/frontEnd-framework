import React, { ReactNode } from 'react'
import ClassNames from 'classnames'
import './styles/index.css'

interface ButtonProps{
  className?: string;
  type?: 'nomal' | 'primary';
  children: ReactNode
}

const Button = (props: ButtonProps) => {
  const { children, type='nomal', className } = props
  const cls = ClassNames({
    'ant-btn': true,
    [`ant-btn-${type}`]: type,
    [className as string] : !!className
  })
  return (
    <button className={cls}>{children}</button>
  )
}

export default Button
