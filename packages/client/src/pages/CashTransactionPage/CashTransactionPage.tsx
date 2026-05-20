import React, { useCallback, useState } from "react";
import { CashTransactionHeader } from "./CashTransactionHeader";
import { CashTransactionList } from "./CashTransactionList";
import { CashTransactionModal } from "./CashTransactionModal";
import { useDisclosure } from "@mantine/hooks";
import type { transactionFromDB } from "shared";

export const CashTransactionPage = () => {
  const [opened, { open, close }] = useDisclosure();
  const [transaction, setTransaction] = useState<transactionFromDB>();

  const onOpenCreate = useCallback(() => {
    setTransaction(undefined);
    open();
  }, []);

  const onOpenUpdate = useCallback((value: transactionFromDB) => {
    setTransaction(value);
    open();
  }, []);

  return (
    <>
      <CashTransactionHeader open={onOpenCreate} />
      <CashTransactionList open={onOpenUpdate} />
      {opened && (
        <CashTransactionModal
          opened={opened}
          close={close}
          transaction={transaction}
        />
      )}
    </>
  );
};
