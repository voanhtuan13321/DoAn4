import { BrowserRouter, Routes, Route } from "react-router-dom";
import LayOut from "../src/components/LayOut";
import "./App.css";
import DangNhap from "./pages/DangNhap";
import DangKi from "./pages/DangKi";
import GioHang from "./pages/GioHang";
import TrangChu from "./pages/TrangChu";
import LichSuMuaHang from "./pages/LichSuMuaHang";
import SanPham from "./components/SanPham";
import SuKien from "./pages/SuKien";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayOut />}>
          <Route index path="/" element={<TrangChu />} />
          <Route path="/dang_nhap" element={<DangNhap />} />
          <Route path="/su_kien" element={<SuKien />} />
          <Route path="/dang_ki" element={<DangKi />} />
          <Route path="/gio_hang" element={<GioHang />} />
          <Route path="/san_pham_chi_tiet/:id" element={<SanPham />} />
          <Route path="/lich_su_mua_hang" element={<LichSuMuaHang />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
