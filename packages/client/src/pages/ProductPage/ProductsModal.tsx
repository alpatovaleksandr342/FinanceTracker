import {
  Button,
  Modal,
  Select,
  TextInput,
  Text,
  NumberInput,
} from "@mantine/core";
import { schemaResolver, useForm } from "@mantine/form";
import {
  createCatigories,
  createProduct,
  type createProductInput,
  type ProductFromDB,
} from "shared";
import { useCreateProduct } from "src/api/products/create";
import { useUpdateProduct } from "src/api/products/update";
import { trpc } from "src/main";

interface CreateProductModalProps {
  opened: boolean;
  onClose: () => void;
  product?: ProductFromDB;
}

export const CreateProductModal = ({
  opened,
  onClose,
  product,
}: CreateProductModalProps) => {
  const form = useForm<createProductInput>({
    initialValues: {
      name: product?.name ||"",
      barcode: product?.barcode|| "",
      price: product?.price || 0,
      unit: product?.unit || 0,
      categoryId: product?.category.id || 0,
    },
    validate: schemaResolver(createProduct),
  });

  const categories = trpc.products.getCategories.useQuery();
  const create = useCreateProduct();
  const update = useUpdateProduct()
  if (!categories) {
    return <Text>Загрузка...</Text>;
  }
  const handleCreate = () => {
    create.mutate(form.getValues());
  };

const handleUpdate = (id: number) =>{
  update.mutate({...form.getValues(), id: id})
}

  const onClickCreate = () => {
    if (product) {
      handleUpdate(product.id)
    } else{
    handleCreate();
    }
  };

  return (
    <Modal opened={opened} onClose={onClose}>
      <form onSubmit={form.onSubmit(onClickCreate)}>
        <TextInput
          label={"Наименование"}
          placeholder="Продукт"
          {...form.getInputProps("name")}
        />
        <TextInput
          label={"Баркод"}
          placeholder="123123123123123"
          {...form.getInputProps("barcode")}
        />
        <NumberInput
          hideControls
          label={"Цена"}
          placeholder="Продукт"
          {...form.getInputProps("price")}
        />
        <NumberInput
          hideControls
          label={"Количество"}
          placeholder="Продукт"
          {...form.getInputProps("unit")}
        />
        <Select
          data={categories.data?.map((category) => {
            return { value: category.id, label: category.name };
          })}
          searchable
          label={"Категория"}
          placeholder="Продукт"
          {...form.getInputProps("categoryId")}
        />

        <Button type="submit">Создать</Button>
      </form>
    </Modal>
  );
};
