import productService from "@/service/productService";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function handle() {
      const res = await productService.getAll();
      setProducts(res.data);
    }
    handle();
  }, []);
  return (
    <>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <Link to={`/products/${product.id}`}>{product.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Products;
