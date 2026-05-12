import { Button, Flex, Table } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import React, { memo } from "react";
import { trpc } from "src/main";
import { useDeleteCategory } from "src/api/categories/delete";
import type { updateCategoryInput } from "shared";

export const ProductList = () => {
const {data} = trpc.products.getAllProduct.useQuery();

if (!data) return <div>Process...</div>

  return (
    <Table.ScrollContainer minWidth={500}>
        <Table striped highlightOnHover withTableBorder>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Имя</Table.Th>
              <Table.Th>Баркод</Table.Th>
              <Table.Th>Цена</Table.Th>
              <Table.Th>Категория</Table.Th>
              <Table.Th>Действия</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {data.map((product) => (
              <Table.Tr key={product.id}>
                <Table.Td>{product.name}</Table.Td>
                <Table.Td>{product.barcode}</Table.Td>
                <Table.Td>{product.price}</Table.Td>
                <Table.Td>
                  <Flex gap="xs">
                    <Button
                      variant="subtle"
                      size="xs"
                      aria-label="edit"
                      
                    >
                      <IconEdit size={16} />
                    </Button>
                    <Button
                      
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
  )
}
