import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToPastes, updateToPastes } from "../redux/pasteSlice"// ✅ Fix import
import { useEffect } from "react";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setsearchParams] = useSearchParams("");
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch(); // it use to access function in slice here pasteSlice.js
  const allPastes = useSelector((state) => state.paste.pastes);

  useEffect(() => {
    // console.log("inside useeffect");
    if (pasteId) {
      const paste = allPastes.find((p) => p._id === pasteId);
      // console.log("Page found");
      setTitle(paste.title);
      setValue(paste.content);
    } else {
      console.log("id not found", pasteId);
    }
  }, [pasteId]);

  function createPaste() {
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      //update
      dispatch(updateToPastes(paste));
    } else {
      //create
      dispatch(addToPastes(paste));
    }

    // after creation
    setValue("");
    setTitle("");
    setsearchParams({});
  }

  return (
    <div>
      <div className="flex flex-row gap-3 place-content-center  w-[100%] mt-[60px] font-semibold ">
        <input
          className="p-2 rounded-[8px] border-2 border-gray-300
                  placeholder-gray-400  w-[65%] pl-5 h-[44px]"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div className=" w-[10%] h-[44px]">
          <button
            onClick={createPaste}
            className="rounded-[8px] bg-blue-600  text-white h-[100%] px-2 w-[100%] " 
          >
            {pasteId ? "Update My Paste" : "Create My Paste"}
          </button>
        </div>
      </div>

      <div className="mt-8">
        <textarea
          className="rounded-[8px]  min-w-[500px] p-4  placeholder-gray-500 h-[100%] w-[75%]  
          border-2 border-gray-300 focus:border-blue-500 focus:outline-none "
          value={value}
          placeholder="Write your Content here....."
          onChange={(e) => setValue(e.target.value)}
          rows={20}
        />
      </div>
    </div>
  );
};

export default Home;
