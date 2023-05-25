import {BrowserRouter, Routes, Route} from "react-router-dom";
import LayOut from "../src/components/LayOut";
import "./App.css";
import DangNhap from "./pages/DangNhap";
import DangKi from "./pages/DangKi";
import GioHang from "./pages/GioHang";
import TrangChu from "./pages/TrangChu";
import LichSuMuaHang from "./pages/LichSuMuaHang";
// import SuKien from "./pages/SuKien";
import SanPhamTheoDanhMuc from "./pages/SanPhamTheoDanhMuc";
import CapnhatThongTinKhachHang from "./pages/CapnhatThongTinKhachHang";
import QuenMatKhau from "./pages/QuenMatKhau";
import SanPhamChiTiet from "./pages/SanPhamChiTiet";
import TimKiem from "./pages/TimKiem";
import ThongTinCuaHang from "./pages/ThongTinCuaHang";
import DonHang from "./pages/DonHang";
import ChiTietDonHang from "./pages/ChiTietDonHang";
import SachBanChay from "./pages/SachBanChay";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayOut />}>
          <Route index path="/" element={<TrangChu />} />
          <Route path="/dang_nhap" element={<DangNhap />} />
          <Route path="/quen_mat_khau" element={<QuenMatKhau />} />
          <Route path="/sach_ban_chay" element={<SachBanChay />} />
          <Route path="/cap_nhat_tai_khoan" element={<CapnhatThongTinKhachHang />} />
          <Route path="/chi_tiet_don_hang/:id" element={<ChiTietDonHang />} />
          <Route path="/dang_ki" element={<DangKi />} />
          <Route path="/gio_hang" element={<GioHang />} />
          <Route path="/don_hang" element={<DonHang />} />
          <Route path="/tim_kiem" element={<TimKiem />} />
          <Route path="/thong_tin_cua_hang" element={<ThongTinCuaHang />} />
          <Route path="/lich_su_mua_hang" element={<LichSuMuaHang />} />
          <Route path="/san_theo_danh_muc/:id" element={<SanPhamTheoDanhMuc />} />
          <Route path="/san_pham/:id" element={<SanPhamChiTiet />} />
         
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
