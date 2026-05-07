import { Button, Flex, Table } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import React, { memo } from 'react'
import { trpc } from 'src/main';
import { useDeleteCategory } from 'src/api/categories/delete';

export const CategoriesList = memo(() => {

const { data } = trpc.categoties.getAllCategoryes.useQuery();

const deleteCategory = useDeleteCategory()

const handleDelete = (id: number) => {
    deleteCategory.mutate({id: id})
}


if (!data) return (
    <div>Process...</div>
)

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
            {data.map((category) => (
              <Table.Tr key={category.id}>
                <Table.Td>{category.name}</Table.Td>
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
                        onClick={()=> handleDelete(category.id)}
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
