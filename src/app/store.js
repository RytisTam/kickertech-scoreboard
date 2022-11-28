import { configureStore } from "@reduxjs/toolkit";
import TeamTableSliceReducer from "../components/TeamTableSlice";

export const store = configureStore({
  reducer: {
    TeamTable: TeamTableSliceReducer,
  },
});
