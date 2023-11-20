import { GetBase64ImageIdAPI } from "@/apis/images";

const getImage = (img: any) => (img !== "" ? img.toString().split(',')[0] : null);

export const ConvertAPIImagesToBase64 = async (data: any) => {
  if(data) {
    await Promise.all(
      data.map(async (item: any) => {
        item.front_firstImage_base64File = null;
        if(getImage(item.image_guids)) {
          const imgRes = await GetBase64ImageIdAPI(getImage(item.image_guids));
          item.front_firstImage_base64File = imgRes;
        }
        return item;
      })
    );
  }
}