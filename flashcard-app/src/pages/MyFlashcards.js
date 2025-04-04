import { useDispatch, useSelector } from 'react-redux';
import { clearFlashcards } from '../redux/flashcardslice';  // Import clearFlashcards action
import FlashcardItem from '../components/FlashcardItem';

const MyFlashcards = () => {
  const dispatch = useDispatch();
  const { flashcards } = useSelector((state) => state.flashcards);

  const handleClearFlashcards = () => {
    // Dispatch the clearFlashcards action to clear the state
    dispatch(clearFlashcards());
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f5dc] p-8">
      <div className="w-full max-w-5xl bg-[#5b9de9] shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">My Flashcards</h1>
        <button
          onClick={handleClearFlashcards}
          className="mb-4 p-2 bg-red-500 text-white rounded"
        >
          Clear Flashcards
        </button>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {flashcards.map((fc, index) => (
            <FlashcardItem key={index} flashcard={fc} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyFlashcards;
