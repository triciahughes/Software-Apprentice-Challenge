import React from "react";
import down from "../assets/down-arrow.png";
import up from "../assets/up-arrow.png";

const sortBtns = ({
  handleSortClick,
  showSettings,
  handleSortOrder,
  sortOrder,
}) => {
  /// Dynamic Styling ///
  const colorBg = showSettings ? "bg-primary" : "bg-secondary";
  const arrowDir = showSettings ? `${up}` : `${down}`;

  function ascSortSelectStyle() {
    if (sortOrder === "asc") {
      return "font-bold text-secondary";
    } else return "";
  }

  function descSortSelectionStyle() {
    if (sortOrder === "desc") {
      return "font-bold text-secondary";
    } else return "";
  }

  /// Dynamic Text ///
  function sortSelectText() {
    if (sortOrder === "asc") {
      return "Spend: Low to High";
    } else if (sortOrder === "desc") {
      return "Spend: High to Low";
    } else return "Sort By";
  }

  /// Sort Buttons Dynamic Rendering ///
  const buttonShow = showSettings ? (
    <div className='absolute top-full left-0 flex flex-col mt-2 mx-2 py-1 px-2 rounded border shadow-md bg-secondary'>
      <p className='text-secondary text-sm font-light py-1'>Sort By</p>
      <button
        className={`${ascSortSelectStyle()} py-2 px-2 hover:bg-primary hover:text-primary rounded`}
        onClick={() => (handleSortOrder("asc"), handleSortClick())}
      >
        Spend: Low to High
      </button>
      <button
        className={`${descSortSelectionStyle()} py-2 px-2 hover:bg-primary hover:text-primary rounded`}
        onClick={() => (handleSortOrder("desc"), handleSortClick())}
      >
        Spend: High to Low
      </button>
      <button
        className='py-2 px-2 hover:bg-primary hover:text-primary rounded'
        onClick={() => (handleSortOrder("clear"), handleSortClick())}
      >
        Reset
      </button>{" "}
    </div>
  ) : null;

  return (
    <>
      <div>
        <button
          className={`${colorBg} border py-1 px-3  rounded-full flex justify-center items-center font-light text-md`}
          onClick={handleSortClick}
        >
          {`${sortSelectText()}`}
          <img className='' src={arrowDir} height={30} width={35} />
        </button>
        {buttonShow}
      </div>
    </>
  );
};

export default sortBtns;
