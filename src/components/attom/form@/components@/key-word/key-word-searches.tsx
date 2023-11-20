const KeywordSearches = ({
  showSearched,
  setShowSearched,
  setSuggested,
  suggested,
}) => {
  
  const length = showSearched?.length
  const handleClick = (e, title) => {
    if (length < 10) {
      e.stopPropagation();
      setShowSearched((prv) => [...prv, title]);
      setSuggested(suggested.filter((item) => item !== title));
    }
  };

  return (
    <div
      className="bg-white py-6 px-8 border border-gray-100 rounded-xl flex flex-col gap-4 w-full mt-4 absolute top-[3.5rem] z-10"
      style={{
        boxShadow:
          "0px 0px 1px 0px rgba(0, 0, 0, 0.40), 0px 8px 24px -6px rgba(0, 0, 0, 0.16)",
      }}
    >
      <span className="text-sm text-gray-500"> کلمات پیشنهادی</span>
      <div className="grid lg:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-2 md:h-fit h-40 overflow-auto custom-scrollbar">
        {suggested.map((item) => {
          return (
            <span
              className={`border text-center col-span-1 rounded-lg p-2 cursor-pointer text-sm ${length == 10 && "bg-gray-200 cursor-not-allowed"}`}
              onClick={(e) => handleClick(e, item)}
            >
              {item}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default KeywordSearches;
