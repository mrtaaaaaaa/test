import { CloseCircle } from "iconsax-react";
import { FileUploader } from "react-drag-drop-files";
import { FiUploadCloud } from "react-icons/fi";
import { toast } from "react-toastify";

const MAX_FILE_SIZE = 100000;

const fileTypes = ["JPG", "PNG", "JPEG"];

const UploadNationalCard = ({
  imgsSrc,
  setImgsSrc,
  imageCount = 0,
}) => {
  const PreviewImage = ({ file }) => {
    return (
      <div
        className="flex flex-col items-center w-56 rounded-md p-auto h-auto  bg-white relative mx-auto"
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

        <img className="rounded object-cover " src={file.src} />
      </div>
    );
  };

  const fileRef = document.querySelector("input[type='file']");
  if (fileRef) fileRef["value"] = "";

  const cancleUpload = (e, id) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();

    setImgsSrc(
      [...imgsSrc].filter((item) => {
        return item.id !== id;
      })
    );
  };

  const handleChange = async (file) => {
    if (imgsSrc.length > imageCount) {
      toast.error(`شما قادر به آپلود 1 عکس هستید`);
      return;
    }
    const payloads = [];

    if (Math.round(file.size / 1024) > MAX_FILE_SIZE) {
      toast.error(`حداکثر حجم فایل ${MAX_FILE_SIZE} مگابایت میباشد`);
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
    };
  };

  return (
    <div className="border w-[38rem] h-auto justify-center  border-grey-dark border-dashed flex flex-col items-center rounded-xl bg-white p-4">
      <div className=" flex-wrap p-3 gap-4 w-full">
        {[...imgsSrc]?.map((file, index) => (
          <PreviewImage key={index} file={file} />
        ))}
      </div>

      <FileUploader
        className="flex flex-wrap "
        multiple={false}
        maxSize={10}
        handleChange={handleChange}
        name="file"
        types={fileTypes}
      >
        <div className="flex flex-col text-center">
          {[...imgsSrc].length == 0 && (
            <>
              <div className=" mb-2 mx-auto flex justify-center">
                <FiUploadCloud
                  size={50}
                  style={{ color: " rgba(37, 109, 133, 0.4)" }}
                />
              </div>
              <h3 className="font-bold ">تصویر کارت ملی خود را آپلود کنید</h3>
            </>
          )}
          <p className="text-grey-700  mt-2">
            حجم عکس‌ انتخاب شده نباید بیشتر از ۱۰ مگابایت باشد.
          </p>
        </div>
      </FileUploader>
    </div>
  );
};

export default UploadNationalCard;
