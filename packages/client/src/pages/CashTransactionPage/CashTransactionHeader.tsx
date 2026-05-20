import { Button } from '@mantine/core'
import React from 'react'

export const CashTransactionHeader = ({open}:{open: ()=>void}) => {
  return (
    <Button onClick={open}>Создать</Button>
  )
}
