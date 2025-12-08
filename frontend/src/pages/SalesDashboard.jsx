// frontend/src/pages/SalesDashboard.jsx
import { useState } from "react";
import SearchBar from "../components/SearchBar.jsx";
import FilterPanel from "../components/Filterpanel.jsx";
import SortDropdown from "../components/SortDropdown.jsx";
import TransactionsTable from "../components/TransactionsTable.jsx";
import PaginationControls from "../components/PaginationControls.jsx";
import { useSales } from "../hooks/usesales.js";

export default function SalesDashboard() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    region: [],
    gender: [],
    ageMin: "",
    ageMax: "",
    category: [],
    tags: [],
    paymentMethods: [],
    startDate: "",
    endDate: "",
  });
  const [sort, setSort] = useState({ sortBy: "date", sortOrder: "desc" });
  const [page, setPage] = useState(1);

  const queryParams = {
  search,
  region: filters.region.join(","),
  gender: filters.gender,
  ageMin: filters.ageMin,
  ageMax: filters.ageMax,
  category: filters.category.join(","),
  tags: filters.tags.join(","),
  paymentMethods: filters.paymentMethods.join(","),
  startDate: filters.startDate,
  endDate: filters.endDate,
  sortBy: sort.sortBy,
  sortOrder: sort.sortOrder,
  page,
  pageSize: 10,
};


  const { data, pagination, loading, error } = useSales(queryParams);

  return (
  <div className="sales-dashboard">
    <h2 className="page-title">Retail Sales Management</h2>

    {/* Search bar */}
    <div className="search-bar-container">
      <SearchBar value={search} onChange={setSearch} onSubmit={() => setPage(1)} />
    </div>

    {/* Filters + Table Layout */}
    <div className="dashboard-container">
      
      {/* Filters Left */}
      <aside className="filter-panel">
        <FilterPanel
          filters={filters}
          onChange={(newFilters) => {
            setFilters(newFilters);
            setPage(1);
          }}
        />
      </aside>

      {/* Table Right */}
      <div className="table-wrapper">
        <div className="sort-container">
          <SortDropdown sort={sort} onChange={setSort} />
        </div>

        {loading && <p className="placeholder">Loading...</p>}
        {error && <p className="error">{error}</p>}
        {!loading && data.length === 0 && <p className="placeholder">No records found</p>}

        {!loading && data.length > 0 && <TransactionsTable rows={data} />}

        {pagination && (
          <PaginationControls
            page={pagination.page}
            totalPages={pagination.totalPages}
            onPrev={() => setPage((p) => Math.max(1, p - 1))}
            onNext={() => setPage((p) => (p < pagination.totalPages ? p + 1 : p))}
          />
        )}
      </div>
    </div>
  </div>
);
}
