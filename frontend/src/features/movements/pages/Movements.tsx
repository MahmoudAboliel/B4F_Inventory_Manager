import { useEffect, useState } from "react";
import { getAllMovements } from "../services/Movements.ts";
import Table from "./Components/Table.tsx";
import { getAllProducts } from "../../products/services/Products.ts";
import type { Movement, Product } from "../../../lib/types.ts";
const Movements = () => {
  const [movements, setMovements] = useState<Movement[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [movementsData, productsData] = await Promise.all([
          getAllMovements(),
          getAllProducts(),
        ]);

        setMovements(movementsData);
        setProducts(productsData);
      } catch (error) {
        console.error("Failed to fetch movements:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Movements</h2>

      <Table movements={movements} products={products} />
    </div>
  );
};

export default Movements;
