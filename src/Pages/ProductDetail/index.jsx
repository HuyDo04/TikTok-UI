import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as productService from "@/service/productService";
const ProductDetail = () => {
  const params = useParams();
  const [productDetail, setProductDetail] = useState({});

  useEffect(() => {
    async function handle() {
      const res = await productService.getOne(params.id);
      setProductDetail(res);
    }
    handle();
  }, [params.id]);
  return (
    <>
      <p style={{ color: "red", fontSize: 40 }}>{productDetail.title}</p>
      <img src={productDetail.thumbnail} alt={productDetail.title} />
    </>
  );
};

export default ProductDetail;
