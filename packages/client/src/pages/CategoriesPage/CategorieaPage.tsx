import React from 'react'
import { Button, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks';
import { CreateCategoriaModal } from './CreateCategoriaModal';

export const CategorieaPage = () => {
    const [opened, {open, close}] = useDisclosure()


  return (
    <><Text>Тут будет список</Text>
    <Button onClick={open}>ЕБашим по тцк</Button>

    {opened && (    <CreateCategoriaModal opened={opened} onClose={close}></CreateCategoriaModal>)}
    </>
  )
}
