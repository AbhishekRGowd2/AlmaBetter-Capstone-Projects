import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight, FaShareAlt, FaDownload, FaPrint } from "react-icons/fa";
import TermDetails from "./Termdetails";
import ShareModal from "./ShareModal"; // Import the ShareModal component

const FlashcardView = () => {
  const { flashcardId } = useParams();
  const flashcards = useSelector((state) => state.flashcards?.flashcards || []);
  const flashcard = flashcards.find((card) => card.id === Number(flashcardId));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flashcardImageUrl, setFlashcardImageUrl] = useState(null);
  const [termImageUrl, setTermImageUrl] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state for visibility
  const [shareLink, setShareLink] = useState(""); // Link to be shared

  if (!flashcard) return <p className="text-center text-red-500">Flashcard not found!</p>;

  const terms = flashcard.terms || [];

  // Debugging logs
  useEffect(() => {
    console.log("Selected Flashcard Data:", flashcard);
  }, [flashcard]);

  useEffect(() => {
    console.log("Current Term Data:", terms[currentIndex]);
  }, [currentIndex, terms]);

  // Generate blob URL for flashcard image
  useEffect(() => {
    console.log("Flashcard Image File:", flashcard.imageFile);

    if (flashcard.imageFile && typeof flashcard.imageFile === "string") {
      setFlashcardImageUrl(flashcard.imageFile);
    } else if (flashcard.imageFile instanceof Blob) {
      const blobUrl = URL.createObjectURL(flashcard.imageFile);
      setFlashcardImageUrl(blobUrl);
      return () => URL.revokeObjectURL(blobUrl); // Cleanup
    } else {
      setFlashcardImageUrl(null);
    }
  }, [flashcard.imageFile]);

  // Generate blob URL for term image
  useEffect(() => {
    const term = terms[currentIndex];

    console.log("Term Image File:", term?.imageFile);
    console.log("Term Image Preview:", term?.imagePreview);

    if (term?.imagePreview && typeof term.imagePreview === "string") {
      setTermImageUrl(term.imagePreview);
    } else if (term?.imageFile instanceof Blob) {
      const blobUrl = URL.createObjectURL(term.imageFile);
      setTermImageUrl(blobUrl);
      return () => URL.revokeObjectURL(blobUrl); // Cleanup
    } else {
      setTermImageUrl(null);
    }
  }, [currentIndex, terms]);

  const nextTerm = () => setCurrentIndex((prev) => (prev + 1) % terms.length);
  const prevTerm = () => setCurrentIndex((prev) => (prev - 1 + terms.length) % terms.length);

  // Handle the Share button click
  const handleShareClick = () => {
    setShareLink(window.location.href); // Set the current page URL as the share link
    setIsModalOpen(true); // Open the modal
  };

  return (
    <div className="max-w-6xl mx-auto bg-white p-6 shadow-md rounded-md">
      {/* Upper Section: Flashcard Title, Image, and Description */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2 text-center">{flashcard.title}</h2>

        {flashcardImageUrl ? (
          <img
            src={flashcardImageUrl}
            alt={flashcard.title}
            className="w-full h-64 object-cover rounded-md mb-4"
            onError={(e) => {
              console.error("Flashcard Image Error:", e);
              e.target.style.display = "none";
            }}
          />
        ) : (
          <p className="text-gray-500 text-center">No Flashcard Image Available</p>
        )}

        <p className="text-gray-700 text-center mb-4">{flashcard.description}</p>
      </div>

      {/* Main Content Section: Left, Center, and Right Columns */}
      <div className="grid grid-cols-12 gap-8">

        {/* Left Column: Flashcard Terms */}
        <div className="col-span-3 bg-gray-100 p-6 rounded-md shadow-md">
          <h3 className="text-lg font-semibold mb-2">Flashcard Terms</h3>
          <ul className="space-y-2">
            {terms.map((term, index) => (
              <li
                key={index}
                className={`cursor-pointer p-2 rounded-md ${index === currentIndex ? "bg-red-200" : "hover:bg-gray-100"}`}
                onClick={() => setCurrentIndex(index)}
              >
                {term.title}
              </li>
            ))}
          </ul>
        </div>

        {/* Center Column: Term Image and Details */}
        <div className="col-span-6 bg-white p-6 rounded-md shadow-md">
          <h3 className="text-lg font-semibold mb-2 text-center">Term Details</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left side: Term Image */}
            <div className="bg-gray-50 p-4 rounded-md">
              {termImageUrl ? (
                <img
                  src={termImageUrl}
                  alt={terms[currentIndex]?.title || "Term Image"}
                  className="w-full h-38 object-cover rounded-md"
                  onError={(e) => {
                    console.error("Term Image Error:", e);
                    e.target.style.display = "none";
                  }}
                />
              ) : (
                <p className="text-gray-500">No Image Available</p>
              )}
            </div>

            {/* Right side: Term Title & Description */}
            <div className="p-4 bg-gray-50 rounded-md">
              <h4 className="text-lg font-semibold">{terms[currentIndex]?.title}</h4>
              <p className="text-gray-700">{terms[currentIndex]?.definition}</p>
            </div>
          </div>

          <div className="flex justify-between mt-4">
            <button onClick={prevTerm} className="text-red-500 p-2 bg-gray-200 rounded-md">
              <FaArrowLeft size={20} />
            </button>
            <button onClick={nextTerm} className="text-red-500 p-2 bg-gray-200 rounded-md">
              <FaArrowRight size={20} />
            </button>
          </div>
        </div>

        {/* Right Column: Actions */}
        <div className="col-span-3 bg-gray-100 p-6 rounded-md shadow-md">
          <h3 className="text-lg font-semibold mb-2">Actions</h3>
          <button
            onClick={handleShareClick} // Open the modal on click
            className="bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-2 w-full mb-2"
          >
            <FaShareAlt /> Share
          </button>
          <button className="bg-green-500 text-white px-4 py-2 rounded flex items-center gap-2 w-full mb-2">
            <FaDownload /> Download
          </button>
          <button className="bg-yellow-500 text-white px-4 py-2 rounded flex items-center gap-2 w-full">
            <FaPrint /> Print
          </button>
        </div>

      </div>

      {/* ShareModal */}
      {isModalOpen && <ShareModal link={shareLink} onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default FlashcardView;
