import { createSlice } from "@reduxjs/toolkit";

type InitState = {
  previewLink: string | null;
  forcedType: "video" | "image";
  savedFile: File | null;
};

const initialState: InitState = {
  previewLink: null,
  forcedType: "image",
  savedFile: null,
};

const thumbnailStatusSlice = createSlice({
  name: "thumbnailStatusControl",
  initialState,
  reducers: {
    setSavedFile(
      state,
      { payload, type }: { payload: InitState["savedFile"]; type: string }
    ) {
      state.savedFile = payload;
    },
    setForcedType(
      state,
      { payload, type }: { payload: InitState["forcedType"]; type: string }
    ) {
      state.forcedType = payload;
    },
    setPreviewLink(
      state,
      { payload, type }: { payload: InitState["previewLink"]; type: string }
    ) {
      state.previewLink = payload;
    },
  },
});
export const { setForcedType, setPreviewLink, setSavedFile } =
  thumbnailStatusSlice.actions;
export default thumbnailStatusSlice.reducer;
