import { FiUpload, FiTrash2, FiEdit } from 'react-icons/fi';
import { useEffect } from 'react';

const TermForm = ({ terms, setTerms, isDisabled }) => {
  useEffect(() => {
    const storedTerms = JSON.parse(localStorage.getItem("terms")) || [];
    setTerms(storedTerms);
  }, []);

  useEffect(() => {
    localStorage.setItem("terms", JSON.stringify(terms));
  }, [terms]);

  const addTerm = () => {
    if (!isDisabled) {
      setTerms([...terms, { title: '', definition: '', imageFile: null, imagePreview: null, isEditing: true }]);
    }
  };

  const removeTerm = (index) => {
    const updatedTerms = terms.filter((_, i) => i !== index);
    setTerms(updatedTerms);
  };

  const toggleEdit = (index) => {
    const updatedTerms = [...terms];
    updatedTerms[index].isEditing = !updatedTerms[index].isEditing;
    setTerms(updatedTerms);
  };

  const updateTerm = (index, field, value) => {
    const updatedTerms = [...terms];
    updatedTerms[index][field] = value;
    setTerms(updatedTerms);
  };

  const handleFileChange = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const base64Image = reader.result;
        const updatedTerms = [...terms];
        updatedTerms[index].imageFile = base64Image;
        updatedTerms[index].imagePreview = base64Image;
        setTerms(updatedTerms);
      };
    }
  };

  return (
    <div className={`space-y-6 ${isDisabled ? 'opacity-50 pointer-events-none' : ''}`}>
      {terms.length === 0 && <div className="text-gray-500 italic">Click "+ Add More" to add terms</div>}

      {terms.map((term, index) => (
        <div key={index} className="flex items-center gap-4">
          <div className="font-bold text-xl w-8">{index + 1}.</div>
          <div className="flex flex-col w-1/3">
            <label className="font-semibold mb-1">Enter Term</label>
            <input
              value={term.title}
              onChange={(e) => updateTerm(index, 'title', e.target.value)}
              className="p-2 border"
              placeholder="Term"
              disabled={!term.isEditing}
            />
          </div>
          <div className="flex flex-col w-1/3">
            <label className="font-semibold mb-1">Enter Definition</label>
            <input
              value={term.definition}
              onChange={(e) => updateTerm(index, 'definition', e.target.value)}
              className="p-2 border"
              placeholder="Definition"
              disabled={!term.isEditing}
            />
          </div>

          <div className="flex gap-4 items-center">
            {/* Upload Button and Preview Image */}
            <div className="flex items-center gap-4">
              <label className="flex items-center border border-gray-400 text-blue-600 px-4 py-2 rounded cursor-pointer gap-2 mt-6">
                <FiUpload size={18} />
                <span>Upload Image</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleFileChange(index, e)}
                  disabled={!term.isEditing}
                />
              </label>

              {/* Image Preview */}
              {term.imagePreview && (
                <img
                  src={term.imagePreview}
                  alt="Preview"
                  className="w-12 h-12 object-cover rounded-md"
                />
              )}
              <p className="text-xs text-gray-500 mt-1">Image Preview</p>
            </div>

            {/* Edit and Delete Buttons */}
            <button onClick={() => toggleEdit(index)} className="text-blue-600">
              <FiEdit size={20} />
            </button>
            <button onClick={() => removeTerm(index)} className="text-red-500">
              <FiTrash2 size={20} />
            </button>
          </div>
        </div>
      ))}

      <button
        onClick={addTerm}
        className={`bg-green-500 text-white p-2 rounded ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={isDisabled}
      >
        + Add More
      </button>
    </div>
  );
};

export default TermForm;
