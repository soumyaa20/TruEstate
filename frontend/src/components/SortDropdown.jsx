// frontend/src/components/SortDropdown.jsx
export default function SortDropdown({ sort, onChange }) {
  const handleSort = (field) => {
    onChange({
      sortBy: field,
      sortOrder: field === sort.sortBy && sort.sortOrder === "asc" ? "desc" : "asc",
    });
  };

  return (
    <div className="sort-dropdown">
      <label>Sort by: </label>
      <select
        value={sort.sortBy}
        onChange={(e) => handleSort(e.target.value)}
      >
        <option value="date">Date</option>
        <option value="quantity">Quantity</option>
        <option value="customerName">Customer Name</option>
      </select>
    </div>
  );
}
