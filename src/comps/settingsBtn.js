import React from "react";
import { useState } from "react";
import settingImg from "../assets/settings.png";

const settingsBtn = ({
  handleSortClick,
  showSettings,
  handleSortOrder,
  sortOrder,
}) => {
  // const [sortBtnBool, setSortBtnBool] = useState();
  const colorBg = showSettings ? "bg-primary" : "bg-secondary";

  // const sortButtonColorConfig = () => {
  //   if (sortOrder === "asc") {
  //     setSortBtnBool(true);
  //   } else if (sortOrder === "desc") {
  //     setSortBtnBool(false);
  //   } else {
  //     setSortBtnBool(null);
  //   }
  // };

  // const ascBtnColor = sortBtnBool
  //   ? "bg-primary text-primary"
  //   : "bg-secondary text-secondary";

  // const descBtnColor = sortBtnBool
  //   ? "bg-secondary text-secondary"
  //   : "bg-primary text-primary";

  const buttonShow = showSettings ? (
    <div className='flex space-x-4 py-2'>
      <button
        className='py-2 px-2 hover:bg-primary hover:text-primary rounded'
        onClick={() => handleSortOrder("asc")}
      >
        ASC
      </button>
      <button
        className=' py-2 px-2 hover:bg-primary hover:text-primary rounded'
        onClick={() => handleSortOrder("desc")}
      >
        DESC
      </button>
      <button
        className='py-2 px-2 hover:bg-primary hover:text-primary rounded'
        onClick={() => handleSortOrder("clear")}
      >
        CLEAR
      </button>{" "}
    </div>
  ) : null;

  return (
    <>
      <div>
        <button
          className={`${colorBg} py-2 px-2 rounded`}
          onClick={handleSortClick}
        >
          <img src={settingImg} height={30} width={35} />
        </button>
      </div>
      {buttonShow}
    </>
  );
};

export default settingsBtn;
