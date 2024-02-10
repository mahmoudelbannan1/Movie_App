import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  movies: [],
  counter: 0
};

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState: INITIAL_STATE,
  reducers: {
    addMovie: (state, action) => {
      const movie = action.payload;
      state.movies.push(movie);
      state.counter++;
    },
    removeMovie: (state, action) => {
      const movieId = action.payload.id;
      state.movies = state.movies.filter((movie) => movie.id !== movieId);
      state.counter--;
    },
  },
});

export const { addMovie, removeMovie } = watchlistSlice.actions;
export default watchlistSlice.reducer;