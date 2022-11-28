import {
  configureStore,
  createListenerMiddleware,
  isAnyOf,
} from "@reduxjs/toolkit";
import TeamTableSliceReducer, {
  createTeam,
  updateScore,
} from "../components/TeamTableSlice";

const listenerMiddleware = createListenerMiddleware();
listenerMiddleware.startListening({
  matcher: isAnyOf(createTeam, updateScore),
  effect: () =>
    localStorage.setItem(
      "teamtable",
      JSON.stringify(store.getState().TeamTable)
    ),
});

const reHydrateStore = () => {
  if (localStorage.getItem("teamtable") !== null) {
    return JSON.parse(localStorage.getItem("teamtable"));
  }
};

export const store = configureStore({
  preloadedState: {
    TeamTable: reHydrateStore(),
  },
  reducer: {
    TeamTable: TeamTableSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(listenerMiddleware.middleware),
});
