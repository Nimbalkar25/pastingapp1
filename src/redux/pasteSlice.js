import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  pastes: localStorage.getItem("pastes")
    ? JSON.parse(localStorage.getItem("pastes"))
    : [],
};
export const pasteSlice = createSlice({
  name: "paste",
  initialState,
  reducers: {
    // action here is payload from which the paste which we add can be extracted
    addToPastes: (state, action) => {
      const paste = action.payload;

       // Check if title or content is missing
       if (!paste.title?.trim() && !paste.content?.trim()) {
        toast.error("Title or content is required!"); // Show error message
        return;
      }

      state.pastes.push(paste); // add the paste in the list pastes above we created
      localStorage.setItem("pastes", JSON.stringify(state.pastes)); // here in local storage we add items in key value pair first is key and 2 is value
      toast.success("Paste Created Sucessfully...");
    },
    updateToPastes: (state, action) => {
      const paste = action.payload;
      const index = state.pastes.findIndex((item) => item._id === paste._id);

      if (index >= 0) {
        state.pastes[index] = paste;

        localStorage.setItem("pastes", JSON.stringify(state.pastes));

        toast.success("Paste Updated..");
      }
    },
    resetAllPastes: (state, action) => {
      state.pastes = [];
      localStorage.removeItem("pastes");

      toast.success("All Pastes Reset Successfully");
    },
    removeFromPaste: (state, action) => {
      const pasteId = action.payload;

      console.log(pasteId);
      const index = state.pastes.findIndex((item) => item._id === pasteId);

      if (index >= 0) {
        state.pastes.splice(index, 1);

        localStorage.setItem("pastes", JSON.stringify(state.pastes));

        toast.success("Paste Deleted...");
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addToPastes,
  updateToPastes,
  incresetAllPastes,
  removeFromPaste,
} = pasteSlice.actions;

export default pasteSlice.reducer;
