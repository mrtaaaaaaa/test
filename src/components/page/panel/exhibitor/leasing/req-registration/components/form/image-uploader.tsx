import { B64toBlob } from "@/utils/b64-to-blob";
import { FormHelperText } from "@mui/material";
import { CloseCircle } from "iconsax-react";
import { FileUploader } from "react-drag-drop-files";
import { toast } from "react-toastify";
import { useRef } from "react";

const MAX_FILE_SIZE = 3;
const DIVISION = 1048576;
const fileTypes = ["JPG", "PNG", "JPEG"];

export default function ImageUploader({
  imgsSrc,
  setImgsSrc,
  imageCount = 10,
  name = "files",
  formik,
  title,
  optional = false,
  className,
}: any) {
  const fileRef = useRef(null);

  const PreviewImage = ({ file }: { file: any }) => {
    return (
      <div
        className="flex flex-col items-center rounded-md m-2 justify-between bg-white p-3 relative  border border-gray-600 w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute -top-4 -right-3 gap-3 cursor-pointer">
          <CloseCircle
            onClick={(e) => cancleUpload(e, file.id)}
            size="28"
            variant="Bulk"
            color="#697689"
          />
        </div>

        <img className="rounded object-cover w-full h-24" src={file.src} />
        <span className=" whitespace-nowrap truncate hover:text-clip font-bold ltr w-full text-center mt-4">
          {file.name}
        </span>

        <span className="text-[#ACADAC] mt-2">
          {Math.round(file.size / DIVISION) <= 0
            ? "1mb"
            : `${Math.round(file.size / DIVISION)}Mb`}
        </span>
      </div>
    );
  };

  const cancleUpload = (e: any, id: any) => {
    if (fileRef.current) fileRef.current.value = "";

    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();

    if (formik) {
      formik.setFieldValue(name, "");
    }

    setImgsSrc(
      [...imgsSrc].filter((item) => {
        return item.id !== id;
      })
    );
  };

  const handleChange = (files) => {
    if (files.length + imgsSrc?.length > imageCount) {
      toast.error(`شما قادر به بارگذاری ${imageCount} عکس هستید`);
      return;
    }

    const payloads = [];
    for (const file of files) {
      if (Math.round(file.size / DIVISION) > MAX_FILE_SIZE) {
        toast.error(`حداکثر حجم فایل ${MAX_FILE_SIZE} مگابایت میباشد`);
        continue;
      }

      const reader = new FileReader();
      let payload = {
        id: Math.random(),
        name: file?.name,
        size: file?.size,
        isUploaded: false,
      };

      payloads.push(payload);
      reader.readAsDataURL(file);
      reader.onerror = () => {
        console.log("error");
      };
      reader.onload = async () => {
        payload["src"] = reader.result;
        setImgsSrc([...imgsSrc, ...payloads]);

        if (formik) {
          formik.setFieldValue(name, B64toBlob(payload.src));
        }
      };
    }
  };

  return (
    <div
      className={`bg-white rounded-md file_uploader ${
        imgsSrc.length == 0 ? (className ? className : "h-[18rem]") : "h-max"
      }`}
    >
      <div className="border w-full justify-center border-gray-dark border-dashed flex flex-col items-center rounded-md p-5 bg-white relative h-full">
        {optional && (
          <span className="text-xs text-blue block absolute left-2 top-2 bg-blue-100 px-6 py-1 rounded font-medium">
            اختیاری
          </span>
        )}
        <div
          className={`grid ${
            imageCount && imageCount == 1 ? "grid-cols-1" : "grid-cols-2 gap-2"
          }`}
        >
          {[...imgsSrc]?.map((file, index) => (
            <PreviewImage key={index} file={file} />
          ))}
        </div>

        {imgsSrc.length > 0 && (
          <h3>
            {imgsSrc.length}/{imageCount}
          </h3>
        )}

        <FileUploader
          className="flex flex-wrap p-3"
          multiple={true}
          maxSize={10}
          handleChange={handleChange}
          types={fileTypes}
          name={name}
        ></FileUploader>
        <span data-before-content={title} className="title"></span>

        {formik?.errors[name] && formik?.touched[name] && (
          <FormHelperText
            className="p-0"
            sx={{
              marginLeft: 0,
              fontFamily: "IranSans",
              marginRight: 0,
              color: "#D90201",
              p: { textAlign: "center!important" },
            }}
          >
            {formik?.errors[name]}
          </FormHelperText>
        )}
      </div>
    </div>
  );
}
