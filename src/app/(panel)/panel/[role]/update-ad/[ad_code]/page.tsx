"use client";
import Alert from "@/attom/alerts/alert";
import { Loading } from "@/attom/loading/loading";
import { FRONT2DB } from "@/config/url";
import { useRequest } from "@/hooks/useRequest";
import UpdateAdPageContent from "@/page/panel/role/update-ad";
import { useParams } from "next/navigation";

export default function UpdateAdPage() {
  const { ad_code } = useParams();

  const { data: cityData } = useRequest({
    method: "GET",
    url: `${FRONT2DB}/City/Get/All`,
  });

  const { data: colorsData } = useRequest({
    method: "GET",
    url: `${FRONT2DB}/Color/Get/All`,
  });

  const {
    data: advertiseData,
    error: advertiseError,
    isLoading: advertiseLoading,
  } = useRequest({
    method: "GET",
    url: `${FRONT2DB}/AdSale/Get/Code/${ad_code}`,
  });

  return advertiseLoading ? (
    <Loading />
  ) : advertiseError ? (
    <Alert title="متاسفانه خطایی رخ داده است." type="error" />
  ) : advertiseData?.ads ? (
    <UpdateAdPageContent
      cities={cityData?.cities}
      colors={colorsData?.colors}
      advertise={advertiseData?.ads}
    />
  ) : (
    <></>
  );
}
