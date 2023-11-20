
import {img} from "@/data"
import RegisterCard from "./registerCardForm";

export default function RegisterExhibitors() {
  return (
    <div
      className="max-w-[1920px]  p-8 tablet:mt-24 mt-16"
      // style={{
      //   backgroundImage: `url(${img.registerExbg.src}) `,
      //   backgroundRepeat: "no-repeat",
      //   backgroundSize: "cover",
      //   backgroundPosition: 'center'
      // }}
    >
      <img className="w-full absolute left-0 right-0" src={img.registerExbg.src} alt="bg-grey" />

      <h2 id="enter-phone" className=" gradient-text font-bold text-center mt-10 text-2xl mb-8 w-fit mx-auto">
        <span className="block ">با اتو همه می‌شناسنت!</span>
        <span className="block mt-3">بازار خودرو رو تو مشتت بگیر</span>
      </h2>
      <img src={img.flash.src} alt="flash" className="mx-auto" />

      <RegisterCard />
      
    </div>
  );
}
