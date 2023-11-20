export default function SearchedValues({ data }) {
  return (
    <div className="border rounded-lg bg-white absolute flex flex-col w-6/12 top-10 p-3">
      <span className="text-[#999CA0]"> {data.count} نتیجه</span>
      {data.ads?.map((item, index) => {
        return (
          <div className="p-3">
            <span key={index}>{item.brand}</span>
          </div>
        );
      })}
    </div>
  );
}
