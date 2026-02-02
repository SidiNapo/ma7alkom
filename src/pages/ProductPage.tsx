import ProductPageAnimated from "./product/ProductPageAnimated";
import ProductPageIOS from "./product/ProductPageIOS";
import { isIOSWebKit } from "@/lib/isIOS";

const ProductPage = () => {
  return isIOSWebKit() ? <ProductPageIOS /> : <ProductPageAnimated />;
};

export default ProductPage;
