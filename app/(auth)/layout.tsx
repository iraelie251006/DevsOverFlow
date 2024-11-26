import React, { FC } from 'react'
import { ChidrenProps } from '../(root)/layout'

const AuthLayout = ({children}: ChidrenProps) => {
  return (
    <main>{children}</main>
  )
}

export default AuthLayout