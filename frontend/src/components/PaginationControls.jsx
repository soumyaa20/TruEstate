// frontend/src/components/PaginationControls.jsx
export default function PaginationControls({ page, totalPages, onPrev, onNext }) {
  return (
    <div className="pagination-controls">
      <button disabled={page === 1} onClick={onPrev}>
        Previous
      </button>
      <span>Page {page} of {totalPages}</span>
      <button disabled={page === totalPages} onClick={onNext}>
        Next
      </button>
    </div>
  );
}
