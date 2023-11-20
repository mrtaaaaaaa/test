const Banner = () => {
  return (
    <div className="flex tablet:flex-row flex-col-reverse -mt-6 ">
      <div className="tablet:bg-[#F2F3FF] tablet:p-8 p-4 tablet:w-1/2">
        <div className="w-fit mx-auto">
          <h1 className="font-bold tablet:text-3xl text-2xl text-justify">
            به جمع نمایشگاه‌داران اُتو بپیوندید!
          </h1>
          <span className="block mt-2 text-gray-700">
            فرصتی استثنایی برای این‌که نمایشگاه خودتان را آنلاین به همه نشان
            دهید و به سادگی با چند کلیک، خودروهای موجود در نمایشگاه‌تان را آگهی
            نمایید.
          </span>
          <a
            href="#enter-phone"
            className="bg-gradient-to-tr from-[#2B3990] to-[#1242E0] text-white px-4 py-2 rounded-md tablet:mt-4 mt-6 block w-fit tablet:mr-auto tablet:ml-0 mx-auto tablet:text-base text-lg"
          >
            ثبت‌نام نمایشگاه
          </a>
        </div>
      </div>
      <div className="p-8 bg-gradient-to-b from-[#1242E0] to-[#989FC2] tablet:w-1/2"></div>
    </div>
  );
};

export default Banner;
