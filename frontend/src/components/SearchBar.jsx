// frontend/src/components/SearchBar.jsx
export default function SearchBar({ value, onChange, onSubmit }) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") onSubmit();
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search by customer name or phone..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={onSubmit}>Search</button>
    </div>
  );
}
