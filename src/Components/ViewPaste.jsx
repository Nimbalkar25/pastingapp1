import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";

import { useEffect } from "react";

const ViewPaste = () => {
  const { id } = useParams();
  const allPastes = useSelector((state) => state.paste.pastes);

  // Use find() instead of filter()
  // const paste = allPastes.filter((p) => p._id === id)[0];

  // can be use instead of filter so will get one object for given id and || {} will help gettinf no error if object not found
  const paste = allPastes.find((p) => p._id === id) || {};

  // console.log("Found Paste:", paste);

  if (!paste) {
    return <div className="text-red-500 text-lg">Paste not found!</div>;
  }

  return (
    <div>
      <div className="flex flex-row gap-3 place-content-center  w-[100%] mt-[60px] font-semibold ">
        <input
          className="p-2 rounded-[8px] border-2 border-gray-300
                  placeholder-gray-400  w-[65%] pl-5 h-[44px]"
          type="text"
          placeholder="Enter title here"
          value={paste.title}
        />

        {/* <div className="p-2 rounded-2xl mt-2">
          <button
            onClick={createPaste}
            className="rounded-2xl bg-gray-500  text-white h-[80%]"
          >
            {pasteId ? "Update My Paste" : "Create My Paste"}
          </button>
        </div> */}
      </div>

      <div className="mt-6 ">
        <textarea
          className="rounded-[8px]  min-w-[500px] p-4  placeholder-gray-500 h-[100%] w-[75%]  
          border-2 border-gray-300 focus:border-blue-500 focus:outline-none "
          value={paste.content}
          placeholder="Enter your Content here....."
          disabled
          rows={20}
        />
      </div>
    </div>
  );
};

export default ViewPaste;
