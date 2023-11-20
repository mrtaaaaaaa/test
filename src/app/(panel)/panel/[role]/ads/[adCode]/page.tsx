import ProductDetails from "@/molcule/product-view/details@/product-details";
import React from "react";

interface ProductViewType {
  params: string;
}

const ProductView = ({ params }: ProductViewType) => {
  return (
    <div>
      <ProductDetails params={params} />
    </div>
  );
};

export default ProductView;
