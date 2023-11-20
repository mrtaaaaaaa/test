"use client";
import { GetExhibitorData } from "@/apis/panel/exhibitor";
import Alert from "@/attom/alerts/alert";
import { Loading } from "@/attom/loading/loading";
import { FRONT2DB } from "@/config/url";
import { useRequest } from "@/hooks/useRequest";
import UpdateInfoForm from "@/page/panel/exhibitor/leasing/update-info";

export default function UpdateInfoPage({ searchParams }: any) {
  UpdateInfoForm;

  const {
    data: leasing,
    isLoading,
    isError,
  } = useRequest({
    method: "GET",
    url: `${FRONT2DB}/Exhibitor/Leasing/Id/${searchParams.exhibitor_leasing_id}`,
  });

  return isLoading ? (
    <Loading />
  ) : isError ? (
    <Alert title="متاسفانه خطایی رخ داده است" type="error" />
  ) : (
    <>
      <div className="flex gap-4 items-center border-b border-b-gray-200 pb-4 mt-8 w-full mb-4">
        <h2 className="font-bold text-xl  text-blue">
          ویرایش درخواست خرید اقساطی
        </h2>
        {searchParams.reason && (
          <span className="text-sm text-orange font-medium bg-orange-100 px-6 py-2 rounded-md">
            {searchParams.reason}
          </span>
        )}
      </div>

      <div className="border border-gray-200 rounded-lg p-4 mb-4">
        <UpdateInfoForm leasing={leasing.exhibitorLeasings} exhibitor_leasing_id={searchParams.exhibitor_leasing_id}/>
      </div>
    </>
  );
}
