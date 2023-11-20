import { GetImageId } from "@/apis/images";
import { useState } from "react";
import { useEffect } from "react";
import { BsDownload } from "react-icons/bs";
import { DownloadDocumentPropsType, StatusType } from "./type";
import downloadFile from "@/utils/download-file";

export default function DownloadDocument({
  title,
  file,
}: DownloadDocumentPropsType) {
  const [status, setStatus] = useState<StatusType>({
    img: "",
    loading: false,
    error: false,
  });

  useEffect(() => {
    if (file.image_id) {
      setStatus({ ...status, loading: true });
      GetImageId(file.image_id)
        .then((res) => {
          setStatus({
            img: res,
            loading: false,
            error: false,
          });
        })
        .catch(() =>
          setStatus({
            img: "",
            loading: false,
            error: true,
          })
        );
    }
  }, []);

  return (
    <div className="border border-dashed flex flex-col p-4 items-center rounded-lg w-full">
      <div
        className={`rounded-lg px-4 py-3 flex justify-center w-[10rem] h-[8rem]`}
        style={{
          backgroundImage: status.loading
            ? "#F5F5F5"
            : file.image_id && !status.error
            ? `url(${status.img})`
            : "#F5F5F5",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
        <button
          className="bg-[#B9CFD6] mt-auto rounded-md py-2 px-4 font-bold whitespace-nowrap flex gap-2 items-center"
          style={{ fontSize: "11px" }}
          onClick={() => downloadFile(status.img, file.name, file.suffix)}
        >
          <BsDownload />
          دانلود و مشاهده
        </button>
      </div>
      <span className={`font-bold text-sm text-center mt-2 px-5`}>
        {" "}
        {title}
      </span>
    </div>
  );
}
