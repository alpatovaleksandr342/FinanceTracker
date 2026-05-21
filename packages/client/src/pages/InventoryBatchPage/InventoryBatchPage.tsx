import { Table, Flex, Button } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import React from "react";
import { trpc } from "src/main";

export const InventoryBatchPage = () => {
  const { data } = trpc.inventoryBatch.getInventoryBatch.useQuery();

  return (
    <Table.ScrollContainer minWidth={500}>
      <Table striped highlightOnHover withTableBorder>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Наименование</Table.Th>
            <Table.Th>Пришло</Table.Th>
            <Table.Th>Остаток</Table.Th>
            <Table.Th>Продаж</Table.Th>
            <Table.Th>Списаний</Table.Th>
            <Table.Th>Потери</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data?.map((batch) => (
            <Table.Tr key={batch.id}>
              <Table.Td>{batch.product.name}</Table.Td>
              <Table.Td>{batch.initialQuantity}</Table.Td>
              <Table.Td>{batch.remainingQuantity}</Table.Td>
              <Table.Td>
                {batch.saleItems.length > 0 ? batch.saleItems.reduce((sum, item) => sum + item.quantity, 0) : 0}
              </Table.Td>
              <Table.Td>
                {batch.writeOffs.length > 0 ? batch.writeOffs.reduce((sum, item) => sum + item.quantity, 0) : 0}
              </Table.Td>
              <Table.Td>
                {batch.initialQuantity - batch.remainingQuantity - (batch.saleItems.length > 0 ? batch.saleItems.reduce((sum, item) => sum + item.quantity, 0) : 0) - (batch.writeOffs.length > 0 ? batch.writeOffs.reduce((sum, item) => sum + item.quantity, 0) : 0)}
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
};
