import { Modal } from "@mantine/core";
import { schemaResolver } from "@mantine/form";
import { useForm } from "@mantine/form";
import React from "react";
import { useCreateCategory } from "src/api/categories/create";
import { createCatigories, type createCatigoriesInput } from "shared";
import { TextInput } from "@mantine/core";
import { Button } from "@mantine/core";

interface CreateCategoriaModalProps {
  opened: boolean;
  onClose: () => void;
}

export const CreateCategoriaModal = ({
  opened,
  onClose,
}: CreateCategoriaModalProps) => {
  const form = useForm({
    initialValues: {
      name: "",
    },
    validate: schemaResolver(createCatigories),
  });


  const createCategoria = useCreateCategory();

  const handleCreate = (value: createCatigoriesInput) =>{
    createCategoria.mutate(value)
  }

  console.log(form.values)
  return (
    <Modal opened={opened} onClose={onClose}>
      <form
        onSubmit={form.onSubmit((values) => handleCreate(values))}
      >

        <TextInput label={"Название"} placeholder="Продукты" {...form.getInputProps('name')}></TextInput>

        
        <Button type="submit">Создать</Button>
      </form>
    </Modal>
  );
};
