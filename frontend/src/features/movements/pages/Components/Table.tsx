import type { Movement, Product } from "../../../../lib/types";
import TableRow from "./TableRow";

interface TableProps {
  movements: Movement[];
  products: Product[];
}

const Table = ({ movements, products }: TableProps) => {
  return (
    <table className="table table-striped table-hover">
      <thead>
        <tr>
          <th>Product</th>
          <th>Type</th>
          <th>Amount</th>
          <th>Date</th>
          <th>Notes</th>
        </tr>
      </thead>

      <tbody>
        {movements.map((movement) => (
          <TableRow key={movement.id} movement={movement} products={products} />
        ))}
      </tbody>
    </table>
  );
};

export default Table;
