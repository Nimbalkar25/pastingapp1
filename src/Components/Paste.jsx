import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPaste } from "../redux/pasteSlice";
import toast from "react-hot-toast";
import { Edit, Trash2, Eye, Clipboard } from "lucide-react";

const Paste = () => {
  //to fetch data stored in state we use useselector
  // Fetch pastes from Redux store

  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  console.log(pastes);

  // ✅ Filter pastes based on the search term
  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId) {
    dispatch(removeFromPaste(pasteId));
  }

  function formattedDate(datestring) {
    const date = new Date(datestring);
  
    const options = { year: "numeric", month: "long", day: "numeric" };
    return `📅  ${date.toLocaleDateString("en-US", options)}`;
  }

  return (
    <div>
      <input
        className=" rounded-l p-2
        place-content-center
         placeholder-gray 
          min-w-[600px] mt-[80px] w-[80%] 
          border-2 border-gray-300"
        type="search"
        placeholder="Search here.."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div
        className="flex flex-col content-center mt-[20px] mb-0 ml-auto mr-auto
       w-[80%] 
       border-2 border-gray-300"
      >
        <div
          className="flex place-content-start 
        border-b border-gray-300  pl-4
        text-[50px]
        font-semibold"
        >
          All Pastes
        </div>

        <div className="flex flex-col gap-5 p-4">
          {filteredData.length > 0 &&
            filteredData.map((paste) => {
              return (
                <div
                  className="flex border-gray-300 border-2 place-content-between p-3"
                  key={paste?._id}
                >
                  <div>
                    <div className="font-semibold text-[40px] "
                    >{paste.title}</div>
                    <div className="text-gray-500"
                    >{paste.content}</div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <div className="flex flex-row gap-3 place-content-evenly h-[50%] ">
                      <button className="border-2 border-gray-400 p-1.5">
                        <a href={`/?pasteId=${paste?._id}`}>
                        <Edit size={20} className="text-gray-500" /></a>
                      </button>
                      <button className="border-2 border-gray-400 p-1.5" onClick={() => handleDelete(paste?._id)}>
                      <Trash2 size={20} className="text-gray-500" />
                      </button>
                      <button className="border-2 border-gray-400 p-1.5">
                        <a href={`/pastes/${paste?._id}`}>
                        <Eye size={20} className="text-gray-500" />
                        </a>
                      </button >
                      <button className="border-2 border-gray-400 p-1.5"
                        onClick={() => {
                          navigator.clipboard.writeText(paste?.content);
                          toast.success("Copied");
                        }}
                      >
                         <Clipboard size={20} className="text-gray-500" />
                      </button>
                      
                    </div>

                    <div className="text-[17px]"
                    >{formattedDate(paste.createdAt)}</div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Paste;
