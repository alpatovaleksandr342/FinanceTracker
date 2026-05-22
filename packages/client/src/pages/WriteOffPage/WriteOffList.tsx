import { Table, Flex, Button } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import React from "react";
import { useDeleteWriteOff } from "src/api/writesOff/delete";
import { trpc } from "src/main";

const getReasonLabel = (reason: string) => {
  switch (reason) {
    case "delay":
      return "Просрочка";
    case "decay":
      return "Повреждение";
    case "steal":
      return "Кража";
    default:
      return reason;
  }
};

export const WriteOffList = () => {
  const { data } = trpc.writeOff.getWriteOff.useQuery();

  const deleteWriteOff = useDeleteWriteOff();

  if (!data) return <div>Загрузка...</div>;

  const handleDelete = (id: number) => {
    deleteWriteOff.mutate({ id });
  };

  return (
    <Table.ScrollContainer minWidth={500}>
      <Table striped highlightOnHover withTableBorder>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Наименование</Table.Th>
            <Table.Th>Количество</Table.Th>
            <Table.Th>Дата</Table.Th>
            <Table.Th>Причина</Table.Th>
            <Table.Th>Действия</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data.map((WriteOff) => (
            <Table.Tr key={WriteOff.id}>
              <Table.Td>{WriteOff.product.name}</Table.Td>
              <Table.Td>{WriteOff.quantity}</Table.Td>
              <Table.Td>{WriteOff.date.toLocaleString()}</Table.Td>
              <Table.Td>{getReasonLabel(WriteOff.reason)}</Table.Td>
              <Table.Td>
                <Flex gap="xs">
                  <Button
                    onClick={() => {
                      handleDelete(WriteOff.id);
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
