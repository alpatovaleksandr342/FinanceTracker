import { Button, Flex } from '@mantine/core'
import React from 'react'

export const CashSessionHeader = ({open}: {open: ()=> void}) => {
  return (
    <Flex>
        <Button onClick={open}>Создать</Button>
    </Flex>
  )
}
