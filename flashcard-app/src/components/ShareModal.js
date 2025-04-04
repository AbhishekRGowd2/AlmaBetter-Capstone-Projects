import { FaFacebook, FaTwitter, FaWhatsapp, FaEnvelope } from 'react-icons/fa';

const ShareModal = ({ link, onClose }) => {
  const copyLink = () => {
    navigator.clipboard.writeText(link);
    alert('Link copied to clipboard!');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-md w-96">
        <h3 className="text-xl font-semibold mb-4 text-center">Share This Link</h3>
        <p className="text-center mb-4">{link}</p>

        <div className="flex justify-around mb-4">
          <button className="flex items-center text-blue-600">
            <FaFacebook size={40} className="mr-2" />
          </button>
          <button className="flex items-center text-blue-400">
            <FaTwitter size={40} className="mr-2" />
            
          </button>
          <button className="flex items-center text-green-500">
            <FaWhatsapp size={40} className="mr-2" />
            
          </button>
          <button className="flex items-center text-red-500">
            <FaEnvelope size={40} className="mr-2" />
            
          </button>
        </div>

        <button onClick={copyLink} className="bg-blue-500 text-white px-4 py-2 rounded w-full mb-2">
          Copy Link
        </button>
        <button onClick={onClose} className="ml-2 text-red-500 w-full text-center">
          Close
        </button>
      </div>
    </div>
  );
};

export default ShareModal;
