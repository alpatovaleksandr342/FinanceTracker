import { Table, Text } from "@mantine/core";
import React from "react";
import { trpc } from "src/main";

export const CashSessionList = () => {
  const { data } = trpc.cashSession.getAllSession.useQuery();
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
              <Table.Td>{session.closeDate? "Активна": "Завершена"}</Table.Td>
              <Table.Td>Действия</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
};
