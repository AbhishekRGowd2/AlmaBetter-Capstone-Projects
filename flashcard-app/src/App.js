import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import CreateFlashcard from './pages/Flashcard';
import MyFlashcards from './pages/MyFlashcards';
import FlashcardDetails from './pages/Flashcardetails';
import FlashcardView from './components/FlashcardView';

const App = () => {
  return (
    <Router>
      <nav className="p-4 bg-red-200 flex gap-6">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? 'text-white bg-red-500 px-4 py-2 rounded flex items-center justify-center'
              : 'text-black px-4 py-2 rounded flex items-center justify-center'
          }
        >
          My Flashcards
        </NavLink>
        <NavLink
          to="/create"
          className={({ isActive }) =>
            isActive
              ? 'text-white bg-red-500 px-4 py-2 rounded flex items-center justify-center'
              : 'text-black px-4 py-2 rounded flex items-center justify-center'
          }
        >
          Create Flashcard
        </NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<MyFlashcards />} />
        <Route path="/create" element={<CreateFlashcard />} />
        <Route path="/flashcard/:id" element={<FlashcardDetails />} />
        <Route path="/flashcards/:flashcardId" element={<FlashcardView />} />
      </Routes>
    </Router>
  );
};

export default App;
