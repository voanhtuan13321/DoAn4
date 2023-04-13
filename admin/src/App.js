import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DangNhap from "./pages/DangNhap";
import MainLayout from "./components/MainLayout";
import TrangDanhMuc from "../src/pages/DanhMuc/TrangDanhMuc";
import SuaDanhMuc from "../src/pages/DanhMuc/SuaDanhMuc";
import TrangCuaHang from "../src/pages/CuaHang/TrangCuaHang";

import TrangSuKien from "../src/pages/SuKien/TrangSuKien";
import SuaSuKien from "../src/pages/SuKien/TrangSuaSuKien";

import TrangKhachHang from "../src/pages/KhachHang/TrangKhachHang";
import TrangSanPham from "../src/pages/SanPham/TrangSgSanPham";
import SuaSanPham from "../src/pages/SanPham/SuaSanPham";
import ThongKe from "../src/pages/ThongKe/ThongKe";

import DanhSachDonHangMoi from "../src/pages/DanhSachDonHangMoi/TrangDonHang";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DangNhap />} />
        {/* <Route path="/admin/check_tai_khoan" element={<SuaDanhMuc/>} /> */}
        <Route path="/admin" element={<MainLayout />}>
          `
          <Route path="/admin/trang_danh_muc" element={<TrangDanhMuc />} />
          <Route path="/admin/sua_danh_muc" element={<SuaDanhMuc />} />
          <Route path="/admin/trang_su_kien" element={<TrangSuKien />} />
          <Route path="/admin/sua_su_kien" element={<SuaSuKien />} />
          <Route path="/admin/trang_cua_hang" element={<TrangCuaHang />} />
          <Route path="/admin/don_hang" element={<DanhSachDonHangMoi />} />
          <Route path="/admin/trang_khach_hang" element={<TrangKhachHang />} />
          <Route path="/admin/trang_san_pham" element={<TrangSanPham />} />
          <Route path="/admin/sua_san_pham" element={<SuaSanPham />} />
          <Route path="/admin/thong_ke" element={<ThongKe />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
