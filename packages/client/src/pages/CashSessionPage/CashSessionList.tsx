import { Button, Flex, Table, Text } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import React, { useCallback } from "react";
import type { SessionFromDB } from "shared";
import { useDeleteSession } from "src/api/cashSession/delete";
import { trpc } from "src/main";

export const CashSessionList = ({
  open,
}: {
  open: (session: SessionFromDB) => void;
}) => {
  const { data } = trpc.cashSession.getAllSession.useQuery();
  const deleteSession = useDeleteSession();


  const handleDelete = useCallback((id: number) => {
    deleteSession.mutate({id});
  }, []);

  if (!data) {
    return <Text>Загрузка...</Text>;
  }

  return (
    <Table.ScrollContainer minWidth={500}>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Номер кассы</Table.Th>
            <Table.Th>Начало сессии</Table.Th>
            <Table.Th>Конец сесии</Table.Th>
            <Table.Th>Статус</Table.Th>
            <Table.Th>Действия</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data.map((session) => (
            <Table.Tr>
              <Table.Td>{session.storeId}</Table.Td>
              <Table.Td>{session.openDate.toDateString()}</Table.Td>
              <Table.Td>{session.closeDate?.toDateString()}</Table.Td>
              <Table.Td>{session.closeDate ? "Активна" : "Завершена"}</Table.Td>
              <Table.Td>
                <Flex gap="xs">
                  <Button
                    variant="subtle"
                    size="xs"
                    aria-label="edit"
                    onClick={() => open(session)}
                  >
                    <IconEdit size={16} />
                  </Button>
                  <Button
                    variant="subtle"
                    color="red"
                    size="xs"
                    aria-label="delete"
                    onClick={()=>handleDelete(session.id)}
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
