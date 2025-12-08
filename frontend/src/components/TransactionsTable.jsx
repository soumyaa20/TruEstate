// frontend/src/components/TransactionsTable.jsx
{loading && <p className="placeholder">Fetching sales data...</p>}

export default function TransactionsTable({ rows }) {
  return (
    <table className="transactions-table">
      <thead>
  <tr>
    <th>Date</th>
    <th>Customer</th>
    <th>Phone</th>
    <th>Age</th>
    <th>Gender</th>
    <th>Product</th>
    <th>Quantity</th>
    <th>Final Amount</th>
    <th>Payment</th>
  </tr>
</thead>
<tbody>
  {rows.map((row) => (
    <tr key={row._id}>
      <td>{new Date(row.date).toLocaleDateString()}</td>
      <td>{row.customerName}</td>
      <td>{row.phoneNumber}</td>
      <td>{row.age}</td>
      <td>{row.gender}</td>
      <td>{row.productName}</td>
      <td>{row.quantity}</td>
      <td>{row.finalAmount}</td>
      <td>{row.paymentMethod}</td>
    </tr>
  ))}
</tbody>

    </table>
  );
}
