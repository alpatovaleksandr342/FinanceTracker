import { Button, Modal, TextInput } from "@mantine/core";
import { schemaResolver, useForm } from "@mantine/form";
import { type createSuppliersInput, createSuppliers } from "shared";
import { useCreateSupplier } from "src/api/supplier/create";
import { useUpdateSupplier } from "src/api/supplier/update";

interface SupplierModalProps {
  opened: boolean;
  close: () => void;
  supplier?: { name: string; id: number } | null;
}

export const SupplierModal = ({
  opened,
  close,
  supplier,
}: SupplierModalProps) => {
  const form = useForm<createSuppliersInput>({
    initialValues: {
      name: supplier?.name || "",
    },
    validate: schemaResolver(createSuppliers)
  });
  const create = useCreateSupplier();
  const update = useUpdateSupplier();
  const handleUpdate = (id: number) => {
    update.mutate({ ...form.values, id: id }, { onSuccess: close});
  };
  const handleCreate = () => {
    create.mutate(form.values, { onSuccess: close });
  };
  const handleSubmit = () => {
    if (supplier) {
      handleUpdate(supplier.id);
    } else {
      handleCreate();
    }
  };

  return (
    <Modal opened={opened} onClose={close}>
      <form onSubmit={form.onSubmit(() => handleSubmit())}>
        <TextInput label={"Наименование"} {...form.getInputProps("name")} />
        <Button type="submit">Создать</Button>
      </form>
    </Modal>
  );
};
