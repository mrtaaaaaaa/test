import DownloadDocument from "@/attom/exhibitors/download-document/download-document";
import { checkIndexName } from "@/utils/check-index-name";

export default function ChecksInFinalPart({ data: checks, title }) {
  let checksDetail = [];

  for (let i = 0; i < checks?.length; i++) {
    checksDetail.push({
      name: `تصویر چک ${checkIndexName(i)}`,
      image_id: checks[i].image_id,
      data: checks[i],
    });
  }

  return (
    <div className="mt-8 flex flex-col">
      <h2 className="text-blue font-bold border-b text-lg  mb-4 pb-4 border-gray-150 ">
        {title ? title : "چک‌ها"}
      </h2>

      <div className="grid md:grid-cols-2  grid-cols-1 gap-4">
        {checksDetail.map(({ name, image_id, data }) => (
          <div className=" border border-gray-150 p-4 rounded-xl">
            <DownloadDocument
              title={name}
              file={{
                image_id: image_id.split(",")[0],
                name: "check",
                suffix: "png",
              }}
            />

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <span className="block text-xs text-gray-300">نام بانک</span>
                <span className="block text-sm font-medium">{data.bank}</span>
              </div>

              <div>
                <span className="block text-xs text-gray-300">نام شعبه</span>
                <span className="block text-sm font-medium">
                  {data.bank_branch}
                </span>
              </div>
              <div>
                xs
                <span className="block text-xs text-gray-300">شناسه صیادی</span>
                <span className="block text-sm font-medium">
                  {data.sayadi_id}
                </span>
              </div>
              <div>
                <span className="block text-xs text-gray-300">شماره چک</span>
                <span className="block text-sm font-medium">
                  {data.check_no}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
