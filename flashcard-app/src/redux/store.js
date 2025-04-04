import { configureStore } from '@reduxjs/toolkit';
import flashcardReducer from './flashcardslice';

export const store = configureStore({
  reducer: { flashcards: flashcardReducer },
});