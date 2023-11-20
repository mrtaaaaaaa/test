import { CloseCircle, Image } from "iconsax-react";
import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { toast } from "react-toastify";
import ImageGuideModal from "./image-guide";

const MAX_FILE_SIZE = 3;
const DIVISION = 1048576
const fileTypes = ["JPG", "PNG", "JPEG"];

const ImageUploader = ({ imgsSrc, setImgsSrc, imageCount = 10 }) => {
    const PreviewImage = ({ file }) => {
        return (
            <div
                className="flex flex-col items-center rounded-md m-2 justify-between bg-white p-3 relative w-full border border-grey-600"
                onClick={(e) => e.stopPropagation()}>
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
        )
    }

    const fileRef = typeof window !== 'undefined' && window.document.querySelector("input[type='file']");

    if (fileRef) fileRef["value"] = "";

    const cancleUpload = (e, id) => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        setImgsSrc([...imgsSrc].filter((item) => {
            return item.id !== id;
        }))
    }

    const handleChange = (files) => {
        if (files.length + imgsSrc?.length > imageCount) {
            toast.error(`شما قادر به آپلود ${imageCount} عکس هستید`);
            return;
        }

        const payloads = [];
        for (const file of files) {
            if (Math.round(file.size / DIVISION) > MAX_FILE_SIZE) {
                toast.error(`حداکثر حجم فایل ${MAX_FILE_SIZE} مگابایت میباشد`);
                continue;
            }

            const reader = new FileReader();
            let payload =
            {
                id: Math.random(),
                name: file?.name,
                size: file?.size,
                isUploaded: false,
            }

            payloads.push(payload);
            reader.readAsDataURL(file);
            reader.onerror = () => { console.log("error"); };
            reader.onload = async () => {
                payload["src"] = reader.result;
                if (payloads.length === files.length) {
                    setImgsSrc([...imgsSrc, ...payloads]);
                }
            }
        };
    };

    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => setOpen(true);



    return (
        <div className={`bg-white rounded-md file_uploader ${imgsSrc.length == 0 ? "h-[18rem]" : "h-max"}`}>
            <div className="border w-full justify-center border-grey-dark border-dashed flex flex-col items-center rounded-md p-5 bg-white relative h-full">

                <ImageGuideModal onClick={handleOpen} open={open} onClose={handleClose} />

                <div className="grid md:grid-cols-4 grid-cols-1 flex-wrap p-3 gap-4 w-full">
                    {[...imgsSrc]?.map((file, index) => (
                        <PreviewImage key={index} file={file} />
                    ))}
                </div>

                {imgsSrc.length > 0 && <h3>{imgsSrc.length}/{imageCount}</h3>}

                <FileUploader
                    className="flex flex-wrap p-3"
                    multiple={true}
                    maxSize={10}
                    handleChange={handleChange}
                    name="file"
                    types={fileTypes}
                >



                </FileUploader>

                {/* <div className='flex flex-col text-center'>
                        {[...imgsSrc].length == 0 && (
                            <>
                                <div className="mt-5 mb-10 mx-auto flex justify-center">
                                    <Image size="50" color="#1242E0" />
                                </div>
                                <h3 className="font-bold mt-2">
                                    عکس‌های مورد نظر خود را بارگذاری کنید
                                </h3>
                            </>
                        )}
                        <p className="text-grey-700  mt-2">
                            شما میتوانید {imageCount} عکس آپلود کنید، عکس تا <b className="font-bold">10MB</b> و با
                            فرمت <b className="font-bold">PNG,JPG</b>
                        </p>
                        <button className="bg-blue  py-2 px-4 w-fit mx-auto mt-4 text-white rounded-md mb-4">انتخاب عکس</button>
                    </div> */}

            </div>


        </div>
    );
}

export default ImageUploader;