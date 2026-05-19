
import { Button, Flex, Text } from '@mantine/core'
import React from 'react'

export const ProductHeader = ({open}: {open: ()=> void}) => {
  return (
    <>
    <Flex align={"center"} justify={"space-between"} p={"xs"}>
        <Text>Продукты</Text>
        <Button onClick={open}>Создать</Button>
    </Flex>
    </>
  )
}
