import React, { useCallback, useState } from "react";
import { CashSessionHeader } from "./CashSessionHeader";
import { CashSessionList } from "./CashSessionList";
import { useDisclosure } from "@mantine/hooks";
import type { SessionFromDB } from "shared";
import { CreateSessionModal } from "./CashSessionModal";

export const CashSessionPage = () => {
  const [opened, { open, close }] = useDisclosure();
const [editingSession, setEditingSession] = useState<SessionFromDB>()

const handleCreate = useCallback(()=>{
    setEditingSession(undefined)
    open()
}, [])
  return (
    <>
      <CashSessionHeader open={handleCreate}/>
      <CashSessionList />
      {opened && (<CreateSessionModal opened={opened} onClose={close}/>)}
    </>
  );
};
