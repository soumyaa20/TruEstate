// frontend/src/components/FilterPanel.jsx
export default function FilterPanel({ filters, onChange }) {
  const update = (field, value) => {
    onChange({ ...filters, [field]: value });
  };

  return (
    <div className="filter-panel">
      <h4>Filters</h4>

      {/* Gender */}
       <label>Gender</label>
<div className="gender-container">
  {["Male", "Female"].map((g) => (
    <label key={g} className="gender-option">
      <input
        type="radio"
        name="gender"
        value={g}
        checked={filters.gender === g}
        onChange={() => onChange({ ...filters, gender: g })}
      />
      {g}
    </label>
  ))}

  {/* Clear selection */}
  <button
    type="button"
    className="clear-gender"
    onClick={() => onChange({ ...filters, gender: "" })}
  >
    Clear
  </button>
</div>




      {/* Age Range */}
      <label>Age Range</label>
      <div className="age-range">
        <input
          type="number"
          placeholder="Min"
          value={filters.ageMin}
          onChange={(e) => update("ageMin", e.target.value)}
        />
        <input
          type="number"
          placeholder="Max"
          value={filters.ageMax}
          onChange={(e) => update("ageMax", e.target.value)}
        />
      </div>

      {/* Product Category (multi-select) */}
      <label>Product Category</label>
      <div className="chip-group">
        {["Electronics", "Groceries", "Clothing", "Home Appliances"].map((cat) => (
          <button
            key={cat}
            className={
              filters.category.includes(cat) ? "chip selected" : "chip"
            }
            onClick={() => {
              const isSelected = filters.category.includes(cat);
              const updated = isSelected
                ? filters.category.filter((c) => c !== cat) // deselect
                : [...filters.category, cat]; // select
              onChange({ ...filters, category: updated });
            }}
          >
            {cat}
          </button>
        ))}
      </div>


      {/* Tags (multi-select) */}
      <label>Tags</label>
      <div className="chip-group">
        {["Discounted", "New", "Bestseller", "Premium"].map((tag) => (
          <button
            key={tag}
            className={filters.tags.includes(tag) ? "chip selected" : "chip"}
            onClick={() => {
              const isSelected = filters.tags.includes(tag);
              const updated = isSelected
                ? filters.tags.filter((t) => t !== tag)
                : [...filters.tags, tag];
              onChange({ ...filters, tags: updated });
            }}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Payment Method (multi-select) */}
      <label>Payment Method</label>
    <div className="chip-group">
      {[
        "Credit Card",
        "Debit Card",
        "Cash",
        "UPI",
        "Net Banking",
        "Wallet",
      ].map((pay) => (
        <button
          key={pay}
          className={filters.paymentMethods.includes(pay) ? "chip selected" : "chip"}
          onClick={() => {
            const isSelected = filters.paymentMethods.includes(pay);
            const updated = isSelected
              ? filters.paymentMethods.filter((p) => p !== pay)
              : [...filters.paymentMethods, pay];
            onChange({ ...filters, paymentMethods: updated });
          }}
        >
          {pay}
        </button>
      ))}
    </div>


      {/* Date Range */}
      <label>Date Range</label>
      <div className="date-range">
        <input
          type="date"
          value={filters.startDate}
          onChange={(e) => update("startDate", e.target.value)}
        />
        <input
          type="date"
          value={filters.endDate}
          onChange={(e) => update("endDate", e.target.value)}
        />
      </div>
    </div>
  );
}
