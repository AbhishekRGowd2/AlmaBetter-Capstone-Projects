import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import TermDetails from '../components/Termdetails';

const FlashcardDetails = () => {
  const { id } = useParams();
  const flashcard = useSelector((state) => state.flashcards.flashcards[id]);

  if (!flashcard) return <p>Flashcard not found</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{flashcard.title}</h1>
      <p className="mb-4">{flashcard.description}</p>
      {flashcard.terms.map((term, idx) => <TermDetails key={idx} term={term} />)}
    </div>
  );
};

export default FlashcardDetails;
