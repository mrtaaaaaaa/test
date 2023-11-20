import { default as httpService } from "@/services/http-service";
import { FRONT2DB } from "@/config/url";
import { useEffect, useState } from "react";
import { Puff } from "react-loading-icons";
import MyAdDetails from "./components/my-ad-details";
import MyAdDraftUndraft from "./components/my-ad-draft-undraft";
import MyAdImageModal from "./components/my-ad-image-modal";

const CardMyAd = ({ product }) => {
  // Images State
  const [imageData, setImageData] = useState([]);
  // State for loadingImage
  const [loadImage, setLoadImage] = useState(true);

  const fetchImage = () => {
    var config = {
      responseType: "blob",
    };

    let imageArray = product.image_guids.split(",");

    imageArray.map((item) => {
      if (item !== "") {
        httpService.get(`${FRONT2DB}/Images/Id/${item}`, config).then((res) => {
          let image =
            typeof window !== "undefined"
              ? window.URL.createObjectURL(res.data)
              : "";
          setImageData((imageData) => [...imageData, { image }]);
          setLoadImage(false);
        });
      }
    });

    if (product.image_guids == "") {
      setLoadImage(false);
    }
  };

  useEffect(() => {
    fetchImage();
  }, [loadImage]);

  // Adding one image to advertisement

  const handleClick = () => {
    // navigate(`/${product.ad_code}`);
  };

  return (
    <div>
      <div
        onClick={handleClick}
        className="bg-white grid grid-cols-7 gap-4 my-2 mb-3 p-4 items-end rounded-md custom-shadow"
      >
        {loadImage && (
          <div className="lg:col-span-2 col-span-7 lg:h-full h-56  flex flex-col justify-center items-center lg:object-cover object-fit rounded-md m-auto">
            <Puff stroke="#1242E0" strokeOpacity={0.125} speed={0.75} />
          </div>
        )}

        {!loadImage && imageData[0]?.image && (
          <div className="lg:col-span-2 col-span-7 lg:h-48 sm:h-56 h-36 object-cover w-full shadow-lg m-auto object-bottom">
            <img
              className="object-contain h-full rounded-lg mx-auto"
              alt="product"
              src={imageData[0]?.image}
            />
          </div>
        )}

        {product.image_guids == "" && (
          <MyAdImageModal
            advertiser_id={product.advertiser_id}
            setLoadImage={setLoadImage}
          />
        )}

        <div className="lg:col-span-5 col-span-7 flex flex-col h-full justify-between gap-2">
          <MyAdDraftUndraft product={product} />
          <MyAdDetails product={product} />
        </div>
      </div>
    </div>
  );
};

export default CardMyAd;
