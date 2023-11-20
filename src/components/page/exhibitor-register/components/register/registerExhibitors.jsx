// import flash from "Assets/images/exhibitors//flash.svg";
// import bg from "Assets/images/exhibitors/register-bg.png";
import RegisterCard from "./registerCardForm";

export default function RegisterExhibitors() {
  return (
    <div
      className="max-w-[1920px] mx-auto p-8 tablet:mt-24 mt-16"
      style={{
        // backgroundImage: `url(${bg}) `,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: 'center'
      }}
    >
      <h2 id="enter-phone" className=" gradient-text font-bold text-center text-2xl mb-8 w-fit mx-auto">
        <span className="block">با اتو همه می‌شناسنت!</span>
        <span className="block mt-3">بازار خودرو رو تو مشتت بگیر</span>
      </h2>
      {/* <img src={flash} alt="flash" className="mx-auto" /> */}
      <RegisterCard />
    </div>
  );
}
