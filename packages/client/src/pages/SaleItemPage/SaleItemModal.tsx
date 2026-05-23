import { Button, Modal, NumberInput, Select } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { schemaResolver, useForm } from "@mantine/form";
import React from "react";
import type { CreateSaleItemInput, SaleItemFromDB } from "shared";
import { CreateSaleItem } from "shared";
import { useCreateSaleItem } from "src/api/SaleItem/create";
import { trpc } from "src/main";

interface SaleItemModalProps {
  opened: boolean;
  onClose: () => void;
  saleItem?: SaleItemFromDB;
}

export const SaleItemModal = ({
  opened,
  onClose,
  saleItem,
}: SaleItemModalProps) => {
  const create = useCreateSaleItem();

  const batches = trpc.sale.getBatchesList.useQuery();

  const form = useForm<CreateSaleItemInput>({
    initialValues: {
      batchId: 0,
      quantity: saleItem?.quantity || 0,
      unitPrice: saleItem?.unitPrice || 0,
    },
    validate: schemaResolver(CreateSaleItem),
  });

  if (!batches.data || batches.data?.length === 0) {
    return (
      <Modal opened={opened} onClose={onClose} title="Продажи">
        Нет товаров
      </Modal>
    );
  }

  const handleSubmit = (values: CreateSaleItemInput) => {
    create.mutate(values, {
      onSuccess() {
        onClose();
      },
    });
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Продажи">
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
        <NumberInput label="Цена" {...form.getInputProps("unitPrice")} />
        <DateInput label="Дата" {...form.getInputProps("date")} />
        <Button type="submit">Списать</Button>
      </form>
    </Modal>
  );
};
