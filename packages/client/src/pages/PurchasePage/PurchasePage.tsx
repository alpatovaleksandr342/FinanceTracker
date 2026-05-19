import { Button } from '@mantine/core';
import React, { useState } from 'react'
import type { updatePurchaseInput } from 'shared';

export const PurchasePage = () => {
    const [purchase, setPurchase] = useState<updatePurchaseInput | null>(null);
    const onCreate = () => {setPurchase(null); open()};
  return (
    <>
    <Button onClick={onCreate}>Добавить</Button>
    </>
  )
}
