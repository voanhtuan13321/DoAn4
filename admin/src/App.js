import "./App.css";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
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
import SuaThongTinCuaHang from "../src/pages/CuaHang/SuaThongTinCuaHang";
import TrangBinhLuan from "../src/pages/BinhLuan/TrangBinhLuan";
import BinhLuanCuaSanPham from "../src/pages/BinhLuan/BinhLuanCuaSanPham";
import Sidebar from "./components/Sidebar";

import ThayDoiTaiKhoan from "./pages/ThayDoiTaiKhoan";
import ThemDanhMuc from "./pages/DanhMuc/ThemDanhMuc";
import XemDanhMuc from "./pages/DanhMuc/XemDanhMuc";

import ThemSuKien from "./pages/SuKien/ThemSuKien";
import XemSuKien from "./pages/SuKien/XemSuKien";

import ThemSanPham from "./pages/SanPham/ThemSanPham";
import XemSanPham from "./pages/SanPham/XemSanPham";
import TimKiem from "./pages/SanPham/TiemKiem";
import SanPhamTheoDanhMuc from "./pages/SanPham/SanPhamTheoDanhMuc";
import ChiTietDonHang from "./pages/DanhSachDonHangMoi/ChiTietDonHang";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DangNhap />} />
        {/* <Route path="/admin/check_tai_khoan" element={<SuaDanhMuc/>} /> */}
        <Route path="/admin" element={<Sidebar />}>
          <Route path="/admin/trang_danh_muc" element={<TrangDanhMuc />} />

          <Route path="/admin/them_danh_muc" element={<ThemDanhMuc />} />
          <Route path="/admin/xem_danh_muc" element={<XemDanhMuc />} />
          <Route path="/admin/sua_danh_muc" element={<SuaDanhMuc />} />

          <Route path="/admin/them_su_kien" element={<ThemSuKien />} />
          <Route path="/admin/sua_su_kien" element={<SuaSuKien />} />
          <Route path="/admin/xem_su_kien" element={<XemSuKien />} />

          <Route path="/admin/them_san_pham" element={<ThemSanPham />} />
          <Route path="/admin/xem_san_pham" element={<XemSanPham />} />

          <Route path="/admin/trang_cua_hang" element={<TrangCuaHang />} />
          <Route path="/admin/binh_luan" element={<TrangBinhLuan />} />
          <Route path="/admin/xem_binh_luan/:id" element={<BinhLuanCuaSanPham />} />
          <Route path="/admin/trang_sua_cua_hang" element={<SuaThongTinCuaHang />} />
          <Route path="/admin/don_hang" element={<DanhSachDonHangMoi />} />
          <Route path="/admin/trang_khach_hang" element={<TrangKhachHang />} />
          <Route path="/admin/trang_san_pham" element={<TrangSanPham />} />
          <Route path="/admin/sua_san_pham" element={<SuaSanPham />} />
          <Route path="/admin/sua_san_pham" element={<SuaSanPham />} />
          <Route path="/admin/thong_ke" element={<ThongKe />} />

          <Route path="/admin/chi_tiet_don_hang/:id" element={<ChiTietDonHang />} />

          <Route path="/admin/tim_kiem" element={<TimKiem />} />

          <Route path="/admin/san_theo_danh_muc/:id" element={<SanPhamTheoDanhMuc />} />

          <Route path="/admin/cap_nhat_tai_khoan" element={<ThayDoiTaiKhoan />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
