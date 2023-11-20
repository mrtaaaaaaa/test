import { CircularProgress } from "@mui/material";
import { AUTH_URL, FRONT2DB, FRONT2MESSAGE } from "@/config/url";
import { Heart } from "iconsax-react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
// import { isTokenExpired } from "utils";
import httpService from "@/services/http-service";
import { usePathname } from "next/navigation";
import { isTokenExpired } from "@/utils/jwt";
import { useAppSelector } from "@/hooks/redux-hooks";
import { RootState } from "@/redux/store";
import { checkExistWindow } from "@/utils/check-exist-window";
import { AnonymousUserLikeAdAPI, LoginUserLikeAdAPI } from "@/apis/like-ad";

type LikeIconInCardsPropsType = {
  productDetail: {
    advertiser_id: string | number;
    like: boolean | number;
  };
  index: string | number;
  advertiser_id: number | string;
};

export default function LikeIconInCards({
  productDetail,
  index,
  advertiser_id,
}: LikeIconInCardsPropsType) {
  const [likeCounts, setLikeCounts] = useState<number | boolean>();
  const [loading, setLoading] = useState(false);
  const { userInfo } = useAppSelector((state: RootState) => state.auth);
  const [isLiked, setIsliked] = useState(false);

  useEffect(() => {
    if (
      userInfo.phone_number &&
      !isTokenExpired(
        checkExistWindow() && window.localStorage.getItem("userToken")
      )
    ) {
      LoginUserLikeAdAPI().then((res) => {
        return res.ads?.map((item: { advertiser_id: number | string }) => {
          if (item.advertiser_id == advertiser_id) {
            setIsliked(true);
          }
        });
      });
    } else {
      AnonymousUserLikeAdAPI().then((res) => {
        res?.user?.Likes?.map((item: number | string) => {
          if (item == advertiser_id) {
            setIsliked(true);
          }
        });
      });
    }
    setLikeCounts(productDetail?.like);
  }, [advertiser_id]);

  {
    /*@ts-ignore */
  }

  const handleLike = (e, position) => {
    {
      /*@ts-ignore */
    }
    setLikeCounts(likeCounts + 1);
    setLoading(true);
    e.stopPropagation();
    httpService
      .get(
        `${FRONT2MESSAGE}/AdSale/Id/${
          advertiser_id ? advertiser_id : productDetail.advertiser_id
        }/Like`
      )
      .then((res) => {
        setLoading(false);
        if (res.status == 200 && userInfo.phone_number) {
        }
        if (position == index) {
          setIsliked(true);
          // setIsFilledIcon(false)
        }
      })
      .catch(() => {
        setLoading(false);
        toast.error("مشکلی پیش آمده است");
      });
  };

  const handleDisLike = (e: React.MouseEvent, position: number) => {
    setLikeCounts(Number(likeCounts) - 1);
    setLoading(true);
    e.stopPropagation();
    httpService
      .get(
        `${FRONT2MESSAGE}/AdSale/Id/${
          advertiser_id ? advertiser_id : productDetail.advertiser_id
        }/UnLike`
      )
      .then((res) => {
        setLoading(false);
        if (res.status == 200 && userInfo.phone_number) {
          // toast.info("آگهی از لیست پسندیده شده‌ها حذف شد.");
        }
        if (position == index) {
          setIsliked(false);
          // setIsFilledIcon(true)
        }
      })
      .catch(() => {
        setLoading(false);
        toast.error("حذف آگهی با خطا مواجه شد.");
      });
  };


  return isLiked ? (
    <button className="flex items-center">
      {loading ? (
        <CircularProgress />
      ) : (
        <Heart
          onClick={(e) => handleDisLike(e, Number(index))}
          className="cursor-pointer"
          size="25"
          color="#FB4432"
          variant="Bold"
        />
      )}
      {/*@ts-ignore */}

      {!isNaN(likeCounts) && likeCounts != 0 && likeCounts > 0 && likeCounts}
    </button>
  ) : (
    <button className="flex items-center">
      {loading ? (
        <CircularProgress />
      ) : (
        <Heart
          onClick={(e) => handleLike(e, index)}
          className="cursor-pointer"
          size="25"
          color="#FB4432"
        />
      )}
      {/*@ts-ignore */}{" "}
      {!isNaN(likeCounts) && likeCounts != 0 && likeCounts > 0 && likeCounts}
    </button>
  );
}
