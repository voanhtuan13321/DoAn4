const ip = "192.168.1.32";

const api = {
  getDanhMuc: `http://${ip}:8080/api/danh-muc`,
  getDanhMucId: `http://${ip}:8080/api/danh-muc/`,

  login: `http://${ip}:8080/api/quan-ly/logging`,
  checkTaiKhoan: `http://${ip}:8080/api/quan-ly/check-tai-khoan`,
  sendMail: `http://${ip}:8080/api/quan-ly/email/1`,

  suKien: `http://${ip}:8080/api/thong-tin-su-kien`,
  suKienId: `http://${ip}:8080/api/thong-tin-su-kien/`,

  cuaHang: `http://${ip}:8080/api/thong-tin-cua-hang`,
  cuaHangId: `http://${ip}:8080/api/thong-tin-cua-hang/`,

  khachHang: `http://${ip}:8080/api/khach-hang`,
  khachHangId: `http://${ip}:8080/api/khach-hang/`,

  sach: `http://${ip}:8080/api/sach`,
  sachId: `http://${ip}:8080/api/sach/`,

  lichSuMua: `http://${ip}:8080/api/lich-su-mua`,

  gioHang: `http://${ip}:8080/api/gio-hang`,

  binhLuan: `http://${ip}:8080/api/danh-gia-san-pham`,

  thongKeTheoThang: `http://${ip}:8080/api/lich-su-mua/thong-ke/`,

  // binhLuanTheoSanPham: `http://${ip}:8080/api/danh-gia-san-pham`,

  img: "data:image/jpeg;base64,",
};

export default api;
