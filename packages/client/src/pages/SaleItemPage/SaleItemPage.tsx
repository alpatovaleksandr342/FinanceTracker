import { useCallback, useState } from 'react'
import { useDisclosure } from '@mantine/hooks'
import type { SaleItemFromDB } from 'shared'
import { SaleItemHeader } from './SaleItemHeader'
import { SaleItemList } from './SaleItemList'
import { SaleItemModal } from './SaleItemModal'

export const SaleItemPage = () => {
  const [opened, {open, close}]= useDisclosure(false)
  const [saleItem, setSaleItem] = useState<SaleItemFromDB>()

const handleCreate = useCallback(() => {
  setSaleItem(undefined)
  open()
}, [])


  return (
    <>
    <SaleItemHeader open={handleCreate}/>
    <SaleItemList/>
    {opened && <SaleItemModal opened={opened} onClose={close} saleItem={saleItem}/>}
    </>
  )
}
