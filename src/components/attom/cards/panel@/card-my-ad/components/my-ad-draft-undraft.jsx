import { FRONT2MESSAGE } from "@/config/url";
import httpService from "@/services/http-service";
import { checkExistWindow } from "@/utils/check-exist-window";
import { Edit, FolderAdd, Trash } from "iconsax-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import MyAdRemoveReasonModal from "./my-ad-remove-reason-modal";
import { parseJwt } from "@/utils/jwt";

export default function MyAdDraftUndraft({ product }) {
  // Product data
  const { name, status, is_draft, advertiser_id, ad_code } = product;

  const userToken =
    checkExistWindow() &&
    JSON.parse(window.localStorage.getItem("userToken") ?? "{}");
  const { roles } = userToken
    ? parseJwt(
        checkExistWindow() &&
          JSON.parse(window.localStorage.getItem("userToken") ?? "{}")
      )
    : { roles: [] };

  //   Show removeReason modal state
  const [showRemoveReason, setShowRemoveReason] = useState(false);

  const [buttonState, setButtonState] = useState({
    is_draft: {
      state: is_draft,
      loading: null,
      error: null,
    },
    is_undraft: {
      state: is_draft,
      loading: null,
      error: null,
    },
  });

  //   Navigate
  const router = useRouter();

  //   Undraft ad
  const undraftHandler = (e, advertiser_id) => {
    e.stopPropagation();

    setButtonState({
      ...buttonState,
      is_undraft: {
        state: is_draft,
        loading: true,
        error: null,
      },
    });

    httpService
      .get(`${FRONT2MESSAGE}/AdSale/Id/${advertiser_id}/UnDraft`)
      .then(() => {
        toast.success(" آگهی شما در صف انتشار مجدد قرار گرفت ");

        setButtonState({
          ...buttonState,
          is_undraft: {
            state: false,
            loading: false,
            error: false,
          },
        });
      })
      .catch(() => {
        toast.error("انتشار مجدد آگهی با خطا مواجه شد");

        setButtonState({
          ...buttonState,
          is_undraft: {
            state: is_draft,
            loading: false,
            error: true,
          },
        });
      });
  };

  //handle what happen when clicking on deleting ad
  const draftHandler = (e) => {
    e.stopPropagation();
    setShowRemoveReason(true);
  };

  //   Navigate to Update Page
  const handleEditClick = (e, ad_code) => {
    e.stopPropagation();
    router.push(`/panel/${roles?.[0]}/update-ad/${ad_code}`);
  };

  return (
    <>
      <div className="lg:col-span-5 col-span-7 flex flex-col h-full justify-between gap-2">
        <div className="grid xl:grid-cols-2 grid-cols-1 justify-between gap-1">
          <div className="flex lg:flex-row flex-col items-center justify-start gap-1">
            <div className="flex w-full items-center">
              <Link
                href={`/products/${ad_code}`}
                state={{ code: ad_code, id: advertiser_id }}
                className=" font-bold whitespace-nowrap truncate"
              >
                {name}
                <span className="text-sm"> ({status})</span>
              </Link>
            </div>
          </div>

          <div className="flex gap-2 justify-end">
            {buttonState.is_undraft.state ? (
              <button
                className={`bg-blue text-sm font-bold text-white rounded flex justify-center items-center px-2 py-1 border border-blue gap-1 hover:bg-white hover:text-blue transition-colors ${
                  buttonState.is_undraft.loading && "cursor-not-allowed"
                }`}
                onClick={(e) => undraftHandler(e, advertiser_id)}
                disabled={buttonState.is_undraft.loading ? true : false}
              >
                <FolderAdd size="18" />

                {buttonState.is_undraft.loading ? " ..." : " انتشار مجدد"}
              </button>
            ) : (
              <button
                onClick={(e) => draftHandler(e, advertiser_id)}
                className={`border text-sm font-bold border-red-500 text-red-500  rounded flex justify-center items-center px-2 py-1 gap-1 hover:bg-red-500  hover:text-white transition-colors ${
                  buttonState.is_draft.loading && "cursor-not-allowed"
                }`}
                disabled={buttonState.is_draft.loading ? true : false}
              >
                <Trash size="18" />
                {buttonState.is_draft.loading ? " ..." : " حذف آگهی"}
              </button>
            )}

            <button
              className="bg-blue-100  text-blue rounded flex justify-center items-center px-2 py-1 gap-1 hover:bg-blue hover:text-white transition-colors	"
              onClick={(e) => handleEditClick(e, ad_code)}
            >
              <Edit size="18" />
            </button>
          </div>
        </div>
      </div>

      <MyAdRemoveReasonModal
        advertiser_id={product.advertiser_id}
        is_draft={product.is_draft}
        setButtonState={setButtonState}
        buttonState={buttonState}
        open={showRemoveReason}
        setOpen={setShowRemoveReason}
      />
    </>
  );
}
