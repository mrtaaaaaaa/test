import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Skeleton } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import StepModal from "@/components/common/common/Stepper/Installment/StepModal";
import httpService from "@/services/http-service";
import { FRONT2DB } from "@/config/url";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "next/link";
import {
  SET_CURRENT_STEP,
  SET_LEASING_ID,
} from "@@/redux/car-installment/car-installment/car-Installment-slice";

export default function CardUserInstallment({ item }) {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Accordion
      expanded={expanded === item.leasing_id}
      onChange={handleChange(item.leasing_id)}
      sx={{
        boxShadow: "0px 0px 16px rgba(0, 0, 0, 0.09)",
        border: "none",
        marginTop: "1rem",
        borderRadius: ".5rem",
      }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <span className="font-medium text-lg">
          درخواست خرید اقساطی{" "}
          {item.brand ? (
            item.brand
          ) : (
            <span>{item.brand_models.length} خودرو</span>
          )}
        </span>
      </AccordionSummary>
      <AccordionDetails>
        <PersonalInfo user={item.user} />
        <CarInfo
          brandModel={item.brand_models}
          brand={item.brand}
          model={item.model}
          code={item.ad_code}
        />
        <NationalCardImage
          images={item.image_guids}
          id={item.leasing_id}
          status={item.status}
        />
      </AccordionDetails>
    </Accordion>
  );
}

const PersonalInfo = ({ user }) => {
  // اطلاعات فردی
  const personalInfo = [
    {
      title: "نام و نام‌خانوادگی",
      data: `${user.first_name} ${user.last_name}`,
    },
    {
      title: "کدملی",
      data: user.national_code,
    },
    {
      title: "نلفن محل سکونت",
      data: user.phone_number,
    },
    {
      title: "کدپستی محل سکونت",
      data: user.postal_code,
    },
    {
      title: "آدرس محل سکونت",
      data: user.address,
    },
  ];

  return (
    <div className="bg-white shadow-md pt-5 px-5 pb-8 rounded-lg my-4">
      <span className="block text-blue font-bold mb-4 mt text-lg">
        اطلاعات فردی
      </span>

      <div className="grid md:grid-cols-4 grid-cols-2 justify-between gap-4">
        {personalInfo.map(({ title, data }, index) => (
          <div className={index == 4 && "md:col-span-4 col-span-2 mt-4"}>
            <span className="text-gray-400 text-xs block mb-1">{title}</span>
            <span className="bock font-medium ">{data}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const CarInfo = ({ brandModel, brand, model, code }) => {
  return (
    <div className="bg-white shadow-md pt-5 px-5 pb-8 rounded-lg my-4">
      <span className="block text-blue font-bold mb-4 mt text-lg">
        اطلاعات خودرو
      </span>
      {code ? (
        <div className="grid md:grid-cols-2 grid-cols-2 justify-between items-center gap-2">
          <div>
            <span className="text-gray-400 text-xs block mb-1">برند، مدل</span>
            <span className="bock font-medium">
              {model} - {brand}
            </span>
          </div>
          <div className="flex items-end justify-end">
            <Link
              href={`/${code && code}`}
              className="text-sm border border-blue px-3 py-2 text-blue rounded-lg font-medium"
            >
              لینک آگهی
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 grid-cols-2 justify-between gap-2">
          {brandModel.map(({ model, brand }) => (
            <div>
              <span className="text-gray-400 text-xs block mb-1">
                برند، مدل
              </span>
              <span className="bock font-medium">
                {model} - {brand}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const NationalCardImage = ({ images, id, status }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(SET_CURRENT_STEP(3));
  }, [data]);

  useEffect(() => {
    var config = {
      responseType: "blob",
    };

    let imageArray = null;

    imageArray = images?.split(",");

    imageArray.map((item) => {
      if (item !== "" && typeof window !== "undefined") {
        httpService
          .get(`${FRONT2DB}/Leasing/Get/Id/${id}/Documents/${item}`, config)
          .then((res) => {
            let image =
              typeof window !== "undefined"
                ? window.URL.createObjectURL(res.data)
                : "";
            setData((imageData) => [...imageData, { image }]);
            setLoading(false);
          });
      }
    });

    if (imageArray == null) {
      setLoading(false);
    }
  }, []);

  const nextFormHandler = () => {
    dispatch(SET_LEASING_ID(id));
    setOpen(true);
  };

  return (
    <div className="bg-white shadow-md pt-5 px-5 pb-8 rounded-lg my-4">
      <span className="block text-blue font-bold mb-4 mt text-lg">
        تصاویر کارت ملی
      </span>

      <div className="grid lg:grid-cols-4 grid-cols-2 gap-2">
        {loading ? (
          <>
            <Skeleton variant="rounded" sx={{ width: "100%", height: "" }} />
            <Skeleton variant="rounded" sx={{ width: "100%", height: "" }} />
          </>
        ) : (
          data.map(({ image }) => (
            <img
              src={image}
              alt="product"
              className=" w-full h-full object-cover rounded-xl"
            />
          ))
        )}

        <div className="flex items-center justify-center">
          <span className="text-sm">{status}</span>
        </div>

        {status == "inValid" && (
          <div className="flex items-center justify-end">
            <button
              className="border border-blue text-blue py-2 px-4 rounded-lg text-sm font-medium"
              onClick={nextFormHandler}
            >
              آپلود عکس کارت ملی
            </button>
            <StepModal
              inDetailPage={true}
              open={open}
              setOpen={setOpen}
              current_step={2}
            />
          </div>
        )}
      </div>
    </div>
  );
};
