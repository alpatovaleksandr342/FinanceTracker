import React, { useCallback, useState } from "react";
import { ProductList } from "./ProductList";
import { CreateProductModal } from "./ProductsModal";
import { useDisclosure } from "@mantine/hooks";
import { ProductHeader } from "./ProductHeader";
import type { ProductFromDB } from "shared";

export const ProductPage = () => {
  const [opened, { open, close }] = useDisclosure();
  const [updatedProduct, setUpdatedProduct] = useState<ProductFromDB>();

  const handleCreate = useCallback(() =>{
    setUpdatedProduct(undefined)
    open()
  },[])
  const handleUpdate = useCallback((values:ProductFromDB)=>{
    setUpdatedProduct(values)
    open()
  }, [])

  return (
    <>
      <ProductHeader open={handleCreate} />
      <ProductList open={handleUpdate}/>
      {opened && (
        <CreateProductModal
          onClose={close}
          opened={opened}
          product={updatedProduct}
        />
      )}
    </>
  );
};
