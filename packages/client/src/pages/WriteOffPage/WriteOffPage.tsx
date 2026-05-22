import React, { useCallback, useState } from 'react'
import { WriteOffHeader } from './WriteOffHeader'
import { WriteOffList } from './WriteOffList'
import { useDisclosure } from '@mantine/hooks'
import type { writesOffFromDB } from 'shared'
import { WriteOffModal } from './WriteOffModal'

export const WriteOffPage = () => {
  const [opened, {open, close}]= useDisclosure(false)
  const [writeOff, setWriteOff] = useState<writesOffFromDB>()

const handleCreateWriteOff = useCallback(() => {
  setWriteOff(undefined)
  open()
}, [])


  return (
    <>
    <WriteOffHeader open={handleCreateWriteOff}/>
    <WriteOffList/>
    {opened && <WriteOffModal opened={opened} onClose={close} writeOff={writeOff}/>}
    </>
  )
}
