import { Button } from '@mantine/core'
import React from 'react'

interface WriteOffHeaderProps {
  open: () => void
}

export const WriteOffHeader = ({ open }: WriteOffHeaderProps) => {
  return (
    <div>
      <Button onClick={open}>Создать</Button>
    </div>
  )
}
