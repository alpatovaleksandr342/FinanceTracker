import { Modal } from "@mantine/core";
import { schemaResolver } from "@mantine/form";
import { useForm } from "@mantine/form";
import React from "react";
import { useCreateCategory } from "src/api/categories/create";
import { createCatigories, type createCatigoriesInput } from "shared";
import { TextInput } from "@mantine/core";
import { Button } from "@mantine/core";
import type { updateCategoryInput } from "shared";
import { useUpdateCategory } from "src/api/categories/update";

interface CreateCategoriaModalProps {
  opened: boolean;
  onClose: () => void;
  category?: updateCategoryInput|null;
}

export const CreateCategoriaModal = ({
  opened,
  onClose,
  category,
}: CreateCategoriaModalProps) => {
  const form = useForm({
    initialValues: {
      name: category ?category.name:"",
    },
    validate: schemaResolver(createCatigories),
  });

  const createCategoria = useCreateCategory();
  const updateCategory = useUpdateCategory();
  const handleCreate = (value: createCatigoriesInput) => {
    if (category) {return updateCategory.mutate({id: category.id, name: value.name})
      };
    createCategoria.mutate(value);
  };

  console.log(form.values);
  return (
    <Modal opened={opened} onClose={onClose}>
      <form onSubmit={form.onSubmit((values) => {handleCreate(values)})}>
        <TextInput
          label={"Название"}
          placeholder="Продукты"
          {...form.getInputProps("name")}
        ></TextInput>

        <Button type="submit">Создать</Button>
      </form>
    </Modal>
  );
};