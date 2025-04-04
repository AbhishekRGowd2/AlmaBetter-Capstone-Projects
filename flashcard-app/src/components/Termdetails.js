const TermDetails = ({ term }) => (
    <div className="p-4 border rounded mb-4">
      <h3 className="font-bold text-lg">{term.title}</h3>
      <p>{term.definition}</p>
      {term.image && <img src={term.imageFile} alt={term.title} className="mt-2 w-64" />}
    </div>
  );
  
  export default TermDetails;
  