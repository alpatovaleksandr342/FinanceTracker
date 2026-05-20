import { Button, Flex, Table } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import React from "react";
import type { transactionFromDB } from "shared";
import { useDeleteTransaction } from "src/api/cashTransaction/delete";
import { trpc } from "src/main";

export const CashTransactionList = ({
  open,
}: {
  open: (value: transactionFromDB) => void;
}) => {
  const { data } = trpc.cashTransaction.getAllTransaction.useQuery();

  const deleteTransaction = useDeleteTransaction();

  const handleDelete = (id: number) => {
    deleteTransaction.mutate({ id });
  };

  if (!data) return <div>Загрузка...</div>;

  return (
    <Table.ScrollContainer minWidth={500}>
      <Table striped highlightOnHover withTableBorder>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Дата</Table.Th>
            <Table.Th>Тип</Table.Th>
            <Table.Th>Сумма</Table.Th>
            <Table.Th>Номер кассы</Table.Th>
            <Table.Th>Действия</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data.map((category) => (
            <Table.Tr key={category.id}>
              <Table.Td>{category.date.toLocaleDateString()}</Table.Td>
              <Table.Td>{category.type}</Table.Td>
              <Table.Td>{category.amount}</Table.Td>
              <Table.Td>{category.session.storeId}</Table.Td>
              <Table.Td>
                <Flex gap="xs">
                  <Button
                    onClick={() => {
                      open(category);
                    }}
                    variant="subtle"
                    size="xs"
                    aria-label="edit"
                  >
                    <IconEdit size={16} />
                  </Button>
                  <Button
                    onClick={() => {
                      handleDelete(category.id);
                    }}
                    variant="subtle"
                    color="red"
                    size="xs"
                    aria-label="delete"
                  >
                    <IconTrash size={16} />
                  </Button>
                </Flex>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
};
