import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import { MovieData } from "../../interface/MovieInterface";

interface MovieTypeState {
  recommend: MovieData[];
  newDisney: MovieData[];
  original: MovieData[];
  trending: MovieData[];
};

interface RootState {
  movie: MovieTypeState;
};

const initialState: MovieTypeState = {
  recommend: [],
  newDisney: [],
  original: [],
  trending: [],
};

const movieSlice: Slice<MovieTypeState> = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    setMovies: (state: MovieTypeState, action: PayloadAction<MovieTypeState>) => {
      state.recommend = action.payload.recommend;
      state.newDisney = action.payload.newDisney;
      state.original = action.payload.original;
      state.trending = action.payload.trending;
    }
  }
});

export const { setMovies } = movieSlice.actions;
export default movieSlice.reducer;
export const selectRecommend = (state: RootState) => state.movie.recommend;
export const selectNewDisney = (state: RootState) => state.movie.newDisney;
export const selectOriginal = (state: RootState) => state.movie.original;
export const selectTrending = (state: RootState) => state.movie.trending;