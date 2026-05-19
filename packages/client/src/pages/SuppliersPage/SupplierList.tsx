import { Button, Flex, Table } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import React, { memo } from "react";
import { trpc } from "src/main";
import type { updateSupplierInput } from "shared";
import { useDeleteSupplier } from "src/api/supplier/delete";

export const SupplierList = memo(({open}:{open: (value: updateSupplierInput) => void}) => {
const {data} = trpc.suppliers.getAllSupplieres.useQuery();


const deleteSupplier = useDeleteSupplier();

if (!data) return <div>Process...</div>
const handleDelete = (id: number) => {deleteSupplier.mutate({id:id})}

  return (
    <Table.ScrollContainer minWidth={500}>
        <Table striped highlightOnHover withTableBorder>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Имя</Table.Th>
              <Table.Th>Действия</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {data.map((supplier) => (
              <Table.Tr key={supplier.id}>
                <Table.Td>{supplier.name}</Table.Td>
                <Table.Td>
                  <Flex gap="xs">
                    <Button
                      variant="subtle"
                      size="xs"
                      aria-label="edit"
                      onClick={()=>{open(supplier)}}
                    >
                      <IconEdit size={16} />
                    </Button>
                    <Button
                      onClick={()=>{handleDelete(supplier.id)}}
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
})
