import { Button, Flex, Table } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import React, { type RefCallback } from "react";
import type { ProductFromDB } from "shared";
import { useDeleteProduct } from "src/api/products/delete";
import { trpc } from "src/main";

export const ProductList = React.memo(({open}: {open: (values: ProductFromDB)=> void}) => {
  const { data } = trpc.products.getAllProduct.useQuery();

  const deleteProducts = useDeleteProduct()

  if (!data) return <div>Process...</div>;

  const handleDelete = (id: number)=>{
    deleteProducts.mutate({id})
  }

  return (
    <Table.ScrollContainer minWidth={500}>
      <Table striped highlightOnHover withTableBorder>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Имя</Table.Th>
            <Table.Th>Баркод</Table.Th>
            <Table.Th>Цена</Table.Th>
            <Table.Th>Количество</Table.Th>
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
                {product.unit} {product.unitLabel}
              </Table.Td>
              <Table.Td>
                <Flex gap="xs">
                  <Button onClick={()=>{open(product)}} variant="subtle" size="xs" aria-label="edit">
                    <IconEdit size={16} />
                  </Button>
                  <Button
                  onClick={()=>handleDelete(product.id)}
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
});
