import { Modal } from '@mantine/core'
import React from 'react'
import type { transactionFromDB } from 'shared'

interface TransactionModalProps {
  opened: boolean
  close: ()=> void,
  transaction?: transactionFromDB,
}

export const CashTransactionModal = ({opened, close,transaction}:TransactionModalProps) => {
  return (
    <Modal opened={opened} onClose={close}>

    </Modal>
  )
}
