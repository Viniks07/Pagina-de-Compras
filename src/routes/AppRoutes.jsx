import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Products from "../pages/Products";
import Success from "../pages/Success";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/products"></Navigate>}></Route>
        <Route path="/products" element={<Products />}></Route>
        <Route path="/success" element={<Success />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
