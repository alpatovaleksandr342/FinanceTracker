import React from 'react'
import { CashTransactionHeader } from './CashTransactionHeader'
import { CashTransactionList } from './CashTransactionList'
import { CashTransactionModal } from './CashTransactionModal'

export const CashTransactionPage = () => {
  return (
    <>
    <CashTransactionHeader/>
    <CashTransactionList/>
    <CashTransactionModal/>
    </>
  )
}
