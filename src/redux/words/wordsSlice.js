import { createSlice } from "@reduxjs/toolkit";
import randomWords from "random-words";

const getRandomWords = () =>
  randomWords(250).map((word, i) => {
    if (i === 0) return { name: word, status: "current" };
    return { name: word };
  });

const initialState = {
  wordList: getRandomWords(),
  hit: 0,
  index: 0,
  loading: true,
  finished: false,
};

const wordsSlice = createSlice({
  name: "words",
  initialState,
  reducers: {
    check: (state, action) => {
      const word = state.wordList[state.index];

      if (action.payload.next) {
        if (word.name === action.payload.input) {
          word.status = "passed";
        } else {
          word.status = "failed";
        }

        state.index++;
        state.wordList[state.index].status = "current";
        return;
      }

      if (!word.name.startsWith(action.payload.input)) {
        word.status = "current-highlighted";
      } else {
        word.status = "current";
      }

      state.hit++;
    },
    setLoading: (state, action) => {
      state.loading = false;
    },
    setFinished: (state, action) => {
      state.finished = true;
    },
    reset: (state, action) => {
      return { ...initialState, wordList: getRandomWords() };
    },
  },
});

export const { check, setLoading, setFinished, reset } = wordsSlice.actions;

export default wordsSlice.reducer;
