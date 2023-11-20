"use client";
import { FRONT2DB } from "@/config/url";
import { useRequest } from "@/hooks/useRequest";
import { checkExistWindow } from "@/utils/check-exist-window";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const VehicleCheckForm = dynamic(
  () => import("@/page/vehicle-check/vehicle-checkForm"),
  { ssr: false }
);

const VehicleCheckIdPage = () => {
  const router = useRouter();

  const { data: areas } = useRequest({
    method: "GET",
    url: `${FRONT2DB}/Area/Get/All`,
  });

  const { data: brandModel } = useRequest({
    method: "GP",
    url: `${FRONT2DB}/BrandModelType/Get/All`,
    data: {
      page_number: 1,
      page_size: 200,
    },
  });

  useEffect(() => {
    const auth = checkExistWindow()
      ? Boolean(localStorage.getItem("userToken"))
      : "";
    if (!auth) {
      router.push("/auth/check");
    }
  }, []);

  return (
    <div>
      <VehicleCheckForm models={brandModel} areas={areas} />
    </div>
  );
};

export default VehicleCheckIdPage;
