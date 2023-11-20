import Image from "@/assets/images/commingSoon.png";
const CommingSoon = () => {
  return (
    <div className="flex flex-col items-center jsutify-center pt-10">
      
        <img src={Image} className="w-[30rem]"/>
     
      <div>
        <span className="font-bold md:text-[3rem] text-[1.5rem] mt-10 block text-center">متاخودرو در حال توسعه این سرویس است</span>
      </div>
    </div>
  );
};

export default CommingSoon;
