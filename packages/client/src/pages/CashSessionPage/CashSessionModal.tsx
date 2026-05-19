import {
  Button,
  Modal,
  Select,
  TextInput,
  Text,
  NumberInput,
} from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { schemaResolver, useForm } from "@mantine/form";
import {
  createCashSession,
  createCatigories,
  createProduct,
  type createCashSessionInput,
  type createProductInput,
  type ProductFromDB,
} from "shared";
import { useCreateSession } from "src/api/cashSession/create";
import { useCreateProduct } from "src/api/products/create";
import { useUpdateProduct } from "src/api/products/update";
import { trpc } from "src/main";

interface CreateSessionModalProps {
  opened: boolean;
  onClose: () => void;
  product?: ProductFromDB;
}

export const CreateSessionModal = ({
  opened,
  onClose,
  product,
}: CreateSessionModalProps) => {
  const form = useForm<createCashSessionInput>({
    initialValues: {
      storeId: 0,
      openDate: new Date().toISOString(),
      closeDate: new Date().toISOString(),
    },
    validate: schemaResolver(createCashSession),
  });

  const create = useCreateSession();

  const handleCreate = () => {
    create.mutate(form.getValues());
  };

  const handleUpdate = (id: number) => {};

  const onClickCreate = () => {
    if (product) {
      handleUpdate(product.id);
    } else {
      handleCreate();
    }
  };

  console.log(form.errors);
  return (
    <Modal opened={opened} onClose={onClose}>
      <form
        onSubmit={form.onSubmit(() => {
          onClickCreate();
        })}
      >
        <NumberInput label="Номер кассы" {...form.getInputProps("storeId")} />
        <DateTimePicker label="Начало" {...form.getInputProps("openDate")} />
        <DateTimePicker label="Конец" {...form.getInputProps("closeDate")} />
        <Button type="submit">Создать</Button>
      </form>
    </Modal>
  );
};
