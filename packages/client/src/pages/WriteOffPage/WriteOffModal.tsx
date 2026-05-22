import { Button, Modal, NumberInput, Select, Text } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { schemaResolver, useForm } from "@mantine/form";
import React from "react";
import type { CreateWriteOffInput, writesOffFromDB } from "shared";
import { CreateWriteOffZod } from "shared";
import { useCreateWriteOff } from "src/api/writesOff/create";
import { trpc } from "src/main";

interface WriteOffModalProps {
  opened: boolean;
  onClose: () => void;
  writeOff?: writesOffFromDB;
}

export const WriteOffModal = ({
  opened,
  onClose,
  writeOff,
}: WriteOffModalProps) => {
  const create = useCreateWriteOff();

  const batches = trpc.writeOff.getBatchesList.useQuery();

  const form = useForm<CreateWriteOffInput>({
    initialValues: {
      batchId: 0,
      quantity: writeOff?.quantity || 0,
      reason: writeOff?.reason || "delay",
    },
    validate: schemaResolver(CreateWriteOffZod),
  });

  if (!batches.data) {
    return <Text>Нет товаров</Text>;
  }

  const handleSubmit = (values: CreateWriteOffInput) => {
    create.mutate(values, {
      onSuccess() {
        onClose();
      },
    });
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Write Off">
      <form
        onSubmit={form.onSubmit((values) => {
          handleSubmit(values);
        })}
      >
        <Select
          label="Поставка"
          data={batches.data.map((batch) => {
            return {
              label:
                batch.product.name + " " + batch.receivedDate.toLocaleString(),
              value: batch.id,
            };
          })}
          {...form.getInputProps("batchId")}
        />
        <NumberInput
          label="Количество"
          max={
            form.getValues().batchId
              ? batches.data.find((b) => b.id === form.getValues().batchId)
                  ?.remainingQuantity
              : undefined
          }
          {...form.getInputProps("quantity")}
        />
        <Select
          label="Причина"
          data={[
            { label: "Просрочка", value: "delay" },
            { label: "Повреждение", value: "decay" },
            { label: "Кража", value: "steal" },
          ]}
          {...form.getInputProps("reason")}
        />
        <DateInput label="Дата" {...form.getInputProps("date")} />
        <Button type="submit">Списать</Button>
      </form>
    </Modal>
  );
};
