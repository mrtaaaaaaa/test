import CloseIcon from "@mui/icons-material/Close";
import { Keywords } from "src/data/static-data/keyword/keyword";
import { SearchNormal1 } from "iconsax-react";
import React, { useEffect, useRef, useState } from "react";
import KeywordSearches from "./key-word-searches";

interface KeyWordType {
  showSearched: string[];
  setShowSearched: React.Dispatch<React.SetStateAction<string>>;
}

const KeyWord = ({ showSearched, setShowSearched }: KeyWordType) => {
  const [searchedValue, setSearchedValue] = useState("");
  const [suggested, setSuggested] = useState(Keywords);
  const [showSuggested, setShowSuggested] = useState(false);
  const [limitChar, setLimitChar] = useState(false);

  const handleSearchChange = (e) => {
    let value = e.target.value;
    if (value.length <= 50 && showSearched?.length < 10) {
      setSearchedValue(e.target.value);
      setLimitChar(false);
    } else if (value.length > 50) {
      setLimitChar(true);
    }
  };

  const handleCancleClick = (e, title) => {
    let newValues = showSearched.filter((item) => {
      return item !== title;
    });
    setShowSearched(newValues);
    setSuggested((prv) => [...prv, title]);
  };

  const handleClearInput = () => {
    setSearchedValue("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setShowSearched((prevInputArray) => [...prevInputArray, searchedValue]);
      event.preventDefault(); // Prevent default behavior
      setSearchedValue("");
    }
  };

  const handleFocus = () => {
    setShowSuggested(true);
  };

  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setShowSuggested(false);
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  return (
    <div className="flex flex-col gap-5 justify-center lg:col-span-4 md:col-span-3 my-4">
      <span className="text-blue text-lg font-bold">افزودن کلیدواژه</span>
      <div className="flex flex-wrap gap-2 items-center ">
        {showSearched?.length > 0 &&
          showSearched?.map((item) => {
            return (
              item !== "" && (
                <span className="bg-blue rounded-md text-white px-3 py-1 text-sm">
                  <CloseIcon
                    sx={{
                      fontSize: "13px",
                      paddingRight: "2px",
                      cursor: "pointer",
                    }}
                    onClick={(e) => handleCancleClick(e, item)}
                  />
                  {item}
                </span>
              )
            );
          })}
      </div>

      <div className="grid lg:grid-cols-4">
        <div className="col-span-2 relative" ref={wrapperRef}>
          <div className="flex gap-2 items-center border border-gray-200 px-4 py-3 rounded-lg focus-within:border- focus-within:border-blue">
            <SearchNormal1 size={20} color="#D7D8DC" />
            <input
              type="text"
              value={searchedValue}
              onFocus={handleFocus}
              onKeyDown={handleKeyDown}
              onChange={handleSearchChange}
              name="keyWordSearch"
              className="w-full outline-none"
            />
            {showSuggested && (
              <CloseIcon
                sx={{ fontSize: "16px", color: "#D7D8DC", cursor: "pointer" }}
                onClick={handleClearInput}
              />
            )}
          </div>
          {limitChar && (
            <span className="text-xs text-red-500 mt-1">
              حداکثر حروف مجاز ۵۰ کاراکتر است.
            </span>
          )}
          {showSearched?.length == 10 && (
            <span className="text-xs text-red-500 mt-1">
              حداکثر ۱۰ کلیدواژه را می‌توانید انتخاب کنید.
            </span>
          )}
          {showSuggested && (
            <KeywordSearches
              setShowSearched={setShowSearched}
              showSearched={showSearched}
              suggested={suggested}
              setSuggested={setSuggested}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default KeyWord;
