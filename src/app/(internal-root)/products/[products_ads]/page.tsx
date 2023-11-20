import { GetBase64ImageIdAPI } from "@/apis/images";
import { FRONT2DB } from "@/config/url";
import ProductDetails from "@/molcule/product-view/details@/product-details";
import httpService from "@/services/http-service";
import { ResponseType } from "axios";
import React from "react";

const getData = async (params: { products_ads: number | string }) => {
  const res = await fetch(
    `${FRONT2DB}/AdSale/Get/Code/${params.products_ads}`,
    {
      cache: "no-store",
    }
  );
  let data = res.json();
  return data;
};

const getBlobImages = async (image_guids: any) => {
  let imageArray = image_guids.split(",").filter((img: string) => Boolean(img));

  const config = {
    responseType: "blob" as ResponseType,
    cache: {
      noStore: true,
    },
  };

  let result = await Promise.all(
    imageArray?.map(async (item: any) => {
      const imgRes = await httpService.get(
        `${FRONT2DB}/Images/Id/${item}`,
        config
      );
      return imgRes.data;
    })
  );

  return result;
};

const getBase64Images = async (image_guids: string) => {
  let imageArray = image_guids.split(",").filter((img: string) => Boolean(img));
  const result = await Promise.all(
    imageArray?.map(async (item: any) => {      
      const imgRes = await GetBase64ImageIdAPI(item);
      return imgRes;
    })
  );
  return result;
};

const ProductView = async ({ params }: any) => {
  const data = await getData(params);
  const blobImages = await getBlobImages(data?.ads?.image_guids);
  const base64Images = await getBase64Images(data?.ads?.image_guids);

  return (
    <div>
      <ProductDetails
        params={params}
        blobImages={blobImages}
        base64Images={base64Images}
        productData={data?.ads}
      />
    </div>
  );
};

export default ProductView;
