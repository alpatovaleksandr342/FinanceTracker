import { Button, Modal, NumberInput } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { schemaResolver, useForm } from "@mantine/form";
import {
  createCashSession,
  type createCashSessionInput,
  type SessionFromDB,
} from "shared";
import { useCreateSession } from "src/api/cashSession/create";
import { useUpdateSession } from "src/api/cashSession/update";

interface CreateSessionModalProps {
  opened: boolean;
  onClose: () => void;
  session?: SessionFromDB;
}

export const CreateSessionModal = ({
  opened,
  onClose,
  session,
}: CreateSessionModalProps) => {
  const form = useForm<createCashSessionInput>({
    initialValues: {
      storeId: session?.storeId || 0,
      openDate: session?.openDate.toISOString() || new Date().toISOString(),
      closeDate: session?.closeDate?.toISOString() || new Date().toISOString(),
    },
    validate: schemaResolver(createCashSession),
  });

  const create = useCreateSession();
  const update = useUpdateSession();

  const handleCreate = () => {
    create.mutate(form.getValues());
  };

  const handleUpdate = (id: number) => {
    update.mutate({ ...form.getValues(), id });
  };

  const onClickCreate = () => {
    if (session) {
      handleUpdate(session.id);
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
