import { useDispatch } from 'react-redux';
import { useState } from 'react';
import FlashcardForm from '../components/FlashcardForm';
import TermForm from '../components/TermForm';
import { addFlashcard } from '../redux/flashcardslice';

const CreateFlashcard = () => {
  const dispatch = useDispatch();
  const [terms, setTerms] = useState([]);
  const [groupTitle, setGroupTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const handleSubmit = (values) => {
    // Dispatch the action to add a flashcard
    dispatch(addFlashcard({ ...values, terms }));

    // Show success message
    setAlertMessage('Flashcard created successfully!');

    // Reset the form fields after submission
    setGroupTitle('');
    setTerms([]);
    setAlertMessage('');

    // Clear alert message after a short delay
    setTimeout(() => {
      setAlertMessage('');
    }, 1500); // Clear message after 1.5 seconds
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Create Flashcard</h1>

      {/* Display success alert */}
      {alertMessage && (
        <div className="bg-green-500 text-white p-4 rounded-md text-center mb-4">
          {alertMessage}
        </div>
      )}

      {/* Flashcard form */}
      <FlashcardForm onSubmit={handleSubmit} setGroupTitle={setGroupTitle} />

      <h2 className="text-xl font-bold mt-4">Add Terms</h2>
      <TermForm terms={terms} setTerms={setTerms} isDisabled={!groupTitle.trim()} />
    </div>
  );
};

export default CreateFlashcard;
