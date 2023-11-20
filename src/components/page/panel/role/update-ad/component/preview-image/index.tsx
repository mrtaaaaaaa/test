import { GetAdSaleIdImagesRemoveId, GetImageId } from "@/apis/images";
import { CloseCircle } from "iconsax-react";
import { memo, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ImageDataType, PreviewImagePropsType } from "./type";
import { useCallback } from "react";

export function PreviewImage({ image_guids, ad_id }: PreviewImagePropsType) {
  const [imageData, setImageData] = useState<ImageDataType>([]);
  let imageArray = image_guids
    ?.split(",")
    .filter((image: string) => Boolean(image));

  useEffect(() => {
    imageArray.map((image_id: string) => {
      if (image_id !== "") {
        GetImageId(image_id).then((res) => {
          setImageData((imageData) => [
            ...imageData,
            { image: res, id: image_id },
          ]);
        });
      }
    });
  }, []);

  const deleteImagehandler = (image_id: string) => {
    const filteredData = imageData.filter((item) => item.id !== image_id);

    GetAdSaleIdImagesRemoveId(ad_id, image_id)
      .then(() => {
        toast.success("تصویر با موفقیت حذف شد");
        setImageData(filteredData);
      })
      .catch(() => {
        toast.error("مشکلی در حذف تصویر بوجود آمده‌است");
      });
  };

  const arr = imageData.filter(
    (v, i, a) => a.findIndex((v2) => v2.id === v.id) === i
  );

  const ReturnImage = useCallback(() => {
    return arr?.map((imageItem) => (
      <div
        key={imageItem.image}
        className="relative p-2 bg-gray-150 rounded h-fit"
      >
        <button
          type="button"
          className="absolute -top-2 -right-2"
          onClick={() => deleteImagehandler(imageItem.id)}
        >
          <CloseCircle color="#2E2E2E" size="25" variant="Bold" />
        </button>
        <img
          src={imageItem.image}
          className="rounded-md w-full md:h-28 object-cover"
        />
      </div>
    ));
  }, [arr.length]);

  return (
    <div className="grid lg:grid-cols-4 grid-cols-2 gap-2 my-4">
      {imageData.length ? <ReturnImage /> : <></>}
    </div>
  );
}

export default memo(PreviewImage);
