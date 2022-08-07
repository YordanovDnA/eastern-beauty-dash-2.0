import React from "react";
import { useEffect } from "react";
import MainLayout from "../layout/MainLayout";
import ProductsTable from "./categories/components/common/ProductTable/index";

const Products = () => {
  return (
    <MainLayout>
      <ProductsTable products={[]} isMain={true} />
    </MainLayout>
  );
};

export default Products;
