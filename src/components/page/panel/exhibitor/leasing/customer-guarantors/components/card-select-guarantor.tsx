import Link from "next/link";
import { useParams } from "next/navigation";

const CardSelectGuarantor = ({ guarantor, title }: any) => {
  const { id } = useParams();

  return (
    <Link
      href={{
        pathname: `/panel/exhibitor/leasing/customer-guarantors/choose/guarantor/${id}`,
        query: guarantor,
      }}
      className="border border-gray-200 rounded-lg p-4 hover:border-blue-400 transition-colors"
    >
      <span className="text-lg block font-bold text-gray-900">
        ضامن {title}
      </span>
      <div className="grid md:grid-cols-3 grid-cols-2 gap-4 mt-4">
        <div>
          <span className="text-xs block text-gray-700">نام ضامن</span>
          <span className="text-sm font-medium">
            {guarantor.name} {guarantor.family}
          </span>
        </div>
        <div>
          <span className="text-xs block text-gray-700">کدملی ضامن</span>
          <span className="text-sm font-medium">{guarantor.national_code}</span>
        </div>
        <div>
          <span className="text-xs block text-gray-700">موبایل ضامن</span>
          <span className="text-sm font-medium">{guarantor.mobile_number}</span>
        </div>
        <div>
          <span className="text-xs block text-gray-700">نسبت ضامن</span>
          <span className="text-sm font-medium">{guarantor.relative}</span>
        </div>
        <div>
          <span className="text-xs block text-gray-700">شغل ضامن</span>
          <span className="text-sm font-medium">{guarantor.job}</span>
        </div>
      </div>
    </Link>
  );
};

export default CardSelectGuarantor;
