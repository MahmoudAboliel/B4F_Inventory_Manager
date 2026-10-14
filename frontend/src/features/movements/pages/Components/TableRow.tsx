import type { Movement, Product } from "../../../../lib/types";

interface TableRowProps {
  movement: Movement;
  products: Product[];
}

const TableRow = ({ movement, products }: TableRowProps) => {
  const product = products.find((product) => product.id === movement.productId);

  return (
    <tr>
      <td>{product?.name ?? "Unknown product"}</td>
      <td>{movement.type}</td>
      <td>{movement.amount}</td>
      <td>{new Date(movement.date).toLocaleDateString()}</td>
      <td>{movement.note ?? "-"}</td>
    </tr>
  );
};

export default TableRow;
