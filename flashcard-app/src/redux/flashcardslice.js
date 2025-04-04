import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  flashcards: JSON.parse(localStorage.getItem('flashcards')) || [],
};

const flashcardSlice = createSlice({
  name: 'flashcards',
  initialState,
  reducers: {
    addFlashcard: (state, action) => {
      state.flashcards.push(action.payload);
      localStorage.setItem('flashcards', JSON.stringify(state.flashcards));
    },
    clearFlashcards: (state) => {
      state.flashcards = [];
      localStorage.removeItem('flashcards');  // Remove from localStorage as well
    },
  },
});

export const { addFlashcard, clearFlashcards } = flashcardSlice.actions;
export default flashcardSlice.reducer;
