import React, { useState } from 'react'
import { SupplierList } from './SupplierList';
import { Button } from "@mantine/core";
import { SupplierModal } from './SupplierModal';
import { useDisclosure } from '@mantine/hooks';
import type { updateSupplierInput } from 'shared';

export const SupplierPage = () => {
  const [opened, { open, close }] = useDisclosure();
  const [supplier, setSupplier] = useState<updateSupplierInput | null>(null);
  const onCreate = () => {setSupplier(null); open()}
  const onUpdate = (value: updateSupplierInput) => {setSupplier(value); open()}
  return (
    <>
    <Button onClick={onCreate}>Добавить</Button>
    <SupplierList open = {onUpdate}/>

    {opened && <SupplierModal opened={opened} close={close} supplier={supplier}/>}
    </>

    
  )
}
