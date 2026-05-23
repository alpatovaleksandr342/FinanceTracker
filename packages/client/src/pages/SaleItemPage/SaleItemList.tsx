import { Table, Flex, Button } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { useDeleteSaleItem } from "src/api/SaleItem/delete";
import { trpc } from "src/main";

export const SaleItemList = () => {
  const { data } = trpc.sale.getSaleItems.useQuery();

  const deleteSaleItem = useDeleteSaleItem();

  if (!data) return <div>Загрузка...</div>;

  const handleDelete = (id: number) => {
    deleteSaleItem.mutate({ id });
  };

  return (
    <Table.ScrollContainer minWidth={500}>
      <Table striped highlightOnHover withTableBorder>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Наименование</Table.Th>
            <Table.Th>Количество</Table.Th>
            <Table.Th>Цена шт.</Table.Th>
            <Table.Th>Общая сумма</Table.Th>
            <Table.Th>Дата</Table.Th>
            <Table.Th>Действия</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data.map((saleItem) => (
            <Table.Tr key={saleItem.id}>
              <Table.Td>{saleItem.product.name}</Table.Td>
              <Table.Td>{saleItem.quantity}</Table.Td>
              <Table.Td>{saleItem.unitPrice}</Table.Td>
              <Table.Td>{saleItem.total}</Table.Td>
              <Table.Td>{saleItem.date.toLocaleString()}</Table.Td>

              <Table.Td>
                <Flex gap="xs">
                  <Button
                    onClick={() => {
                      handleDelete(saleItem.id);
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
