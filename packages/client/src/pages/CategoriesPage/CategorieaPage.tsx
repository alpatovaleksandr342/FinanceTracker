import { Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { CreateCategoriaModal } from "./CreateCategoriaModal";
import { CategoriesList } from "./CategoriesList";
import React, { useState } from "react";
import type { updateCategoryInput } from "shared";

export const CategorieaPage = () => {
  const [opened, { open, close }] = useDisclosure();
  const [category, setCategory] = useState<updateCategoryInput | null>(null);
  const onOpenCreate = () => {setCategory(null); open()}
  const onOpenUpdate = (value: updateCategoryInput) => {setCategory(value); open()}
  return (
    <>
      <Button onClick={onOpenCreate}>ЕБашим по тцк</Button>
      <CategoriesList openUpdate={onOpenUpdate} />

      {opened && <CreateCategoriaModal opened={opened} onClose={close} category={category} />}
    </>
  );
};
