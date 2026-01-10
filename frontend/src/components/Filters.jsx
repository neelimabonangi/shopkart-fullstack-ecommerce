import "./Filters.css";

function Filters({ selectedCategory, setSelectedCategory, sortOrder, setSortOrder }) {
  return (
    <div className="filters">
      <h3>Filters</h3>

      <div className="filter-section">
        <h4>Category</h4>
        <label>
          <input
            type="radio"
            name="category"
            checked={selectedCategory === "All"}
            onChange={() => setSelectedCategory("All")}
          />
          All
        </label>

        <label>
          <input
            type="radio"
            name="category"
            checked={selectedCategory === "Women"}
            onChange={() => setSelectedCategory("Women")}
          />
          Women
        </label>

        <label>
          <input
            type="radio"
            name="category"
            checked={selectedCategory === "Men"}
            onChange={() => setSelectedCategory("Men")}
          />
          Men
        </label>
      </div>

      <div className="filter-section">
        <h4>Sort by Price</h4>
        <label>
          <input
            type="radio"
            name="price"
            checked={sortOrder === "low"}
            onChange={() => setSortOrder("low")}
          />
          Low to High
        </label>

        <label>
          <input
            type="radio"
            name="price"
            checked={sortOrder === "high"}
            onChange={() => setSortOrder("high")}
          />
          High to Low
        </label>
      </div>
    </div>
  );
}

export default Filters;
