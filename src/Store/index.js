import { configureStore } from "@reduxjs/toolkit";
import watchlistReducer from "./Slices/watchlistSlice";

export default configureStore({
  reducer: {
    watchlist: watchlistReducer,
  },
});