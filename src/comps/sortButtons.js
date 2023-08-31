import React from "react";
import down from "../assets/down-arrow.png";
import up from "../assets/up-arrow.png";

const SortButtons = ({
  handleSortClick,
  showSettings,
  handleSortOrder,
  sortOrder,
}) => {
  /// Dynamic Styling ///
  const colorBg = showSettings ? "bg-primary" : "bg-secondary";
  const arrowDir = showSettings ? up : down;

  const sortSelectStyle = (type) => {
    return sortOrder === type ? "font bold text-secondary" : "";
  };

  /// Dynamic Text ///
  function sortSelectText() {
    switch (sortOrder) {
      case "asc":
        return "Spend: Low to High";
      case "desc":
        return "Spend: High to Low";
      default:
        return "Sort By";
    }
  }

  const handleButtonClick = (order) => {
    handleSortOrder(order);
    handleSortClick();
  };

  return (
    <div>
      <button
        className={`${colorBg} border py-1 px-3  rounded-full flex justify-center items-center font-light text-md`}
        onClick={handleSortClick}
      >
        {sortSelectText()}
        <img
          className=''
          src={arrowDir}
          height={30}
          width={35}
          alt='Sort Arrow'
        />
      </button>

      {showSettings && (
        <div className='absolute top-full left-0 flex flex-col mt-2 mx-2 py-1 px-2 rounded border shadow-md bg-secondary'>
          <p className='text-secondary text-sm font-light py-1'>Sort By</p>
          <button
            className={`${sortSelectStyle(
              "asc"
            )} py-2 px-2 hover:bg-primary hover:text-primary rounded`}
            onClick={() => handleButtonClick("asc")}
          >
            Spend: Low to High
          </button>
          <button
            className={`${sortSelectStyle(
              "desc"
            )} py-2 px-2 hover:bg-primary hover:text-primary rounded`}
            onClick={() => handleButtonClick("desc")}
          >
            Spend: High to Low
          </button>
          <button
            className='py-2 px-2 hover:bg-primary hover:text-primary rounded'
            onClick={() => handleButtonClick("clear")}
          >
            Reset
          </button>
        </div>
      )}
    </div>
  );
};

export default SortButtons;
