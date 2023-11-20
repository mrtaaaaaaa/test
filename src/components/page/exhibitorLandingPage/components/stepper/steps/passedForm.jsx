import { useRouter } from "next/navigation";
import { AiFillCheckCircle } from "react-icons/ai";

const PassedForm = () => {
  const router=useRouter()

    const handleClick = () => {
        router.push("/panel/User/info")
    }

    return (
        <div className="flex mt-5 flex-col items-center gap-4">
            <div className="px-4 py-8 border flex items-center justify-center gap-4 rounded-xl border-green bg-green-100" >
                <AiFillCheckCircle color="#40BF6A" size="30" />
                <p className="">اطلاعات شما ثبت شد. پس از بررسی کارشناسان مربوطه، به شما اطلاع رسانی می‌شود.</p>
            </div>
            <button className="bg-green px-8 py-2 rounded-lg text-green-100 border text-sm" onClick={handleClick}>ورود به پنل کاربری</button>
        </div>
    );
}

export default PassedForm;