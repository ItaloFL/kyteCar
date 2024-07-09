import { Route, Routes } from "react-router-dom";

import { Statics } from "./screens/statics";
import { Products } from "./screens/products";
import { History } from "./screens/history";
import { Demand } from "./screens/demand";
import { Layout } from "./screens/layout";
import { ProductDetail } from "./screens/product-detail";
import { DemandDetail } from "./screens/demand-detail";

export function Routers() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/products" element={<Products />} />
        <Route path="/statics" element={<Statics />} />
        <Route path="/history" element={<History />} />
        <Route path="/demand" element={<Demand />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/demand/:id" element={<DemandDetail />} />
      </Route>
    </Routes>
  );
}
