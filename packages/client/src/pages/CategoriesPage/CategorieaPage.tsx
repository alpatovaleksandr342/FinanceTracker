import { Button} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { CreateCategoriaModal } from "./CreateCategoriaModal";
import { CategoriesList } from "./CategoriesList";
import React from "react";

export const CategorieaPage = (() => {
  const [opened, { open, close }] = useDisclosure();

  return (
    <>
      <Button onClick={open}>ЕБашим по тцк</Button>
      <CategoriesList />

      {opened && <CreateCategoriaModal opened={opened} onClose={close} />}
    </>
  );
});
