import { checkIndexName } from "@/utils/check-index-name";
import DownloadDocument from "@/attom/exhibitors/download-document/download-document";
import PreviewDetail from "@/attom/exhibitors/preview-detail";

export default function GuarantorsInfo({ data: guarantors }) {
  let guarantorsData = [];

  const guarantorsInfo = (index) => {
    return [
      {
        name: `نام ضامن ${checkIndexName(index)}`,
        value:
          guarantors &&
          guarantors[index]?.name + " " + guarantors[index]?.family,
      },
      {
        name: `کد ملی ضامن ${checkIndexName(index)}`,
        value: guarantors && guarantors[index]?.national_code,
      },
      {
        name: `موبایل ضامن ${checkIndexName(index)}`,
        value: guarantors && guarantors[index]?.mobile_number,
      },
      {
        name: `نسبت ضامن ${checkIndexName(index)}`,
        value: guarantors && guarantors[index]?.relative,
      },
      {
        name: `نام پدر ضامن ${checkIndexName(index)}`,
        value: guarantors && guarantors[index]?.father_name,
      },
      {
        name: `شغل ضامن ${checkIndexName(index)}`,
        value: guarantors && guarantors[index]?.job,
      },
      {
        name: `شماره شناسنامه ضامن ${checkIndexName(index)}`,
        value: guarantors && guarantors[index]?.birth_certificate_code,
      },
      {
        name: `محل صدور شناسنامه ضامن ${checkIndexName(index)}`,
        value: guarantors && guarantors[index]?.birth_certificate_issuing_place,
      },
      {
        name: `شماره تماس محل کار ضامن ${checkIndexName(index)}`,
        value: guarantors && guarantors[index]?.workplace_number,
      },
      {
        name: `تاریخ تولد ضامن ${checkIndexName(index)}`,
        value: `${
          guarantors &&
          guarantors[index]?.birth_date_year +
            "/" +
            guarantors[index]?.birth_date_month +
            "/" +
            guarantors[index]?.birth_date_day
        }`,
      },
      {
        name: `تلفن ثابت ضامن ${checkIndexName(index)}`,
        value: guarantors && guarantors[index]?.landline_phone_number,
      },
      {
        name: `کد پستی ضامن ${checkIndexName(index)}`,
        value: guarantors && guarantors[index]?.postal_code,
      },
      {
        name: `آدرس ضامن ${checkIndexName(index)}`,
        value: guarantors && guarantors[index]?.residence_address,
      },
      {
        name: `تصویر کارت ملی ${checkIndexName(index)}`,
        value: guarantors && guarantors[index]?.national_image_id,
      },
      {
        name: `تصویر شناسنامه ${checkIndexName(index)}`,
        value: guarantors && guarantors[index]?.birth_certificate_image_id,
      },
      {
        name: `تصویر سامانه ثنا ${checkIndexName(index)}`,
        value: guarantors && guarantors[index]?.sana_document_image_id,
      },
    ];
  };

  for (let index = 0; index < guarantors.length; index++) {
    guarantorsData.push(guarantorsInfo(index));
  }

  return (
    <div className="mt-8">
      <h2 className="text-blue font-bold text-lg mb-4 ">اطلاعات ضامن‌ها</h2>
      {guarantorsData.map((item, index) => {
        return (
          <div className="border-t border-gray-150 pt-4 mt-4">
            <h3 className="font-bold text-md mb-4">
              ضامن {checkIndexName(index)}
            </h3>
            <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 ">
              {item.map((guarantor, index) =>
                !guarantor.name.includes("تصویر") ? (
                  <PreviewDetail
                    label={guarantor.name}
                    value={guarantor.value}
                  />
                ) : guarantor.value ? (
                  <DownloadDocument
                    title={guarantor?.name}
                    file={{
                      image_id: guarantor.value.replace(/,\s*$/, ""),
                      name: guarantor?.name,
                      suffix: "png",
                    }}
                  />
                ) : (
                  <></>
                )
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
