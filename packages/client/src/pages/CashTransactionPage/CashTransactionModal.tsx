import {
  Button,
  Modal,
  NumberInput,
  Select,
  Stack,
  TextInput,
} from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import React from "react";
import type { transactionFromDB } from "shared";
import { useCreateTransaction } from "src/api/cashTransaction/create";
import { useUpdateTransaction } from "src/api/cashTransaction/update";
import { trpc } from "src/main";

interface TransactionModalProps {
  opened: boolean;
  close: () => void;
  transaction?: transactionFromDB;
}

export const CashTransactionModal = ({
  opened,
  close,
  transaction,
}: TransactionModalProps) => {
  const form = useForm<transactionFromDB>({
    initialValues: {
      id: transaction?.id || 0,
      date: transaction?.date || new Date(),
      type: transaction?.type || "expense",
      amount: transaction?.amount || 0,
      description: transaction?.description || "",
      session: {
        id: transaction?.session.id || 0,
        storeId: transaction?.session.storeId || 0,
      },
    },
    onValuesChange(values, previous) {
      if (values.amount > 0) {
        form.setFieldValue("type", "sale");
      }
    },
  });

  const session = trpc.cashTransaction.getAllSession.useQuery().data;

  const create = useCreateTransaction();
  const update = useUpdateTransaction();

  const handleCreate = (value: transactionFromDB) => {
    create.mutate({
      ...value,
      sessionId: value.session.id,
      date: value.date.toISOString(),
      description: value.description ? value.description : undefined,
    });
  };
  const handleUpdate = (value: transactionFromDB) => {
    update.mutate({
      ...value,
      sessionId: value.session.id,
      date: value.date.toISOString(),
      description: value.description ? value.description : undefined,
    });
  };

  const handleSubmit = (value: transactionFromDB) => {
    if (transaction) {
      handleUpdate(value);
    } else {
      handleCreate(value);
    }
  };

  return (
    <Modal opened={opened} onClose={close}>
      <form onSubmit={form.onSubmit((value) => handleSubmit(value))}>
        <Stack>
          <DateTimePicker label={"Время"} {...form.getInputProps("date")} />
          <NumberInput label={"Сумма"} {...form.getInputProps("amount")} />
          {form.getValues().amount < 0 && (
            <Select
              label={"Тип"}
              data={[
                { label: "Расход", value: "expense" },
                { label: "Возврат", value: "withdraw" },
              ]}
              defaultValue={"expense"}
              {...form.getInputProps("type")}
            />
          )}

          <Select
            data={session?.map((s) => {
              return { label: s.storeId.toString(), value: s.id };
            })}
            label={"Номер кассы"}
            {...form.getInputProps("session.id")}
          />
          <TextInput
            label={"Описание"}
            {...form.getInputProps("description")}
          />
          <Button type="submit">Создать</Button>
        </Stack>
      </form>
    </Modal>
  );
};
