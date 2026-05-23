import { Button } from '@mantine/core'
import React from 'react'

interface SaleItemHeaderProps {
  open: () => void
}

export const SaleItemHeader = ({ open }: SaleItemHeaderProps) => {
  return (
    <div>
      <Button onClick={open}>Создать</Button>
    </div>
  )
}
