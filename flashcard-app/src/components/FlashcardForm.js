import { useState } from 'react';
import { FiUpload } from 'react-icons/fi';

const FlashcardForm = ({ onSubmit, setGroupTitle }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);

  // Function to clear the form and local storage after submission
  const clearForm = () => {
    setTitle('');
    setDescription('');
    setImageFile(null);
    setImageBase64(null);
    localStorage.removeItem('flashcardTitle');
    localStorage.removeItem('flashcardDescription');
    localStorage.removeItem('flashcardImage');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === '') return;
    setGroupTitle(title);

    const newFlashcard = {
      id: Date.now(),
      title,
      description,
      imageFile: imageBase64,
    };

    onSubmit(newFlashcard);
    
    // Clear the form and localStorage after successful submission
    alert('Flashcard created!');
    clearForm();
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    setGroupTitle(e.target.value);
  };

  const handleImageChange = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      setImageFile(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImageBase64(reader.result);
      };
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex gap-8 items-center">
        <div className="flex-1">
          <label className="block font-semibold mb-1">Create Group</label>
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            className="p-2 border w-full"
            placeholder="Enter group name"
            required
          />
        </div>

        <div className="flex-1">
          <label className="block font-semibold mb-1">Upload Image</label>
          <div className="flex items-center gap-4">
            <label className="flex items-center border border-gray-400 text-blue-600 px-4 py-2 rounded cursor-pointer">
              <FiUpload size={18} />
              <span>Upload Image</span>
              <input
                type="file"
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />
            </label>
            {imageBase64 && (
              <img
                src={imageBase64}
                alt="Preview"
                className="w-12 h-12 object-cover rounded-md"
              />
            )}
          </div>
          {imageFile && <p className="text-sm mt-1 text-gray-600">{imageFile.name}</p>}
        </div>
      </div>

      <div>
        <label className="block font-semibold mb-1">Add Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="p-2 border w-full h-32"
          placeholder="Describe the roles, responsibilities, skills required..."
        />
      </div>

      <div className="text-center">
        <button type="submit" className="bg-blue-600 text-white px-8 py-3 rounded">Create</button>
      </div>
    </form>
  );
};

export default FlashcardForm;
