const ip = "192.168.188.45";

const api = {
  getDanhMuc: `http://${ip}:8080/api/danh-muc`,
  getDanhMucId: `http://${ip}:8080/api/danh-muc/`,
  getDanhMucIdDanhMuc: `http://${ip}:8080/api/sach/by-danh-muc/`,

  getCuaHang: `http://${ip}:8080/api/thong-tin-cua-hang`,

  checkLogin: `http://${ip}:8080/api/khach-hang/check-logging`,

  login: `http://${ip}:8080/api/khach-hang/logging`,
  checkTaiKhoan: `http://${ip}:8080/api/khach-hang/check-tai-khoan`,

  suKien: `http://${ip}:8080/api/thong-tin-su-kien`,
  suKienId: `http://${ip}:8080/api/thong-tin-su-kien/`,

  cuaHang: `http://${ip}:8080/api/thong-tin-cua-hang`,
  cuaHangId: `http://${ip}:8080/api/thong-tin-cua-hang/`,

  khachHangQuenMatKhau: `http://${ip}:8080/api/khach-hang/doi-mat-khau`,
  khachHangMail: `http://${ip}:8080/api/khach-hang/email`,
  khachHang: `http://${ip}:8080/api/khach-hang`,
  khachHangId: `http://${ip}:8080/api/khach-hang/`,
  khachHangQuenTaiKhoan: `http://${ip}:8080/api/khach-hang/check-tai-khoan`,

  sach: `http://${ip}:8080/api/sach`,
  sachId: `http://${ip}:8080/api/sach/`,
  sachTheoDanhMuc: `http://${ip}:8080/api/sach/by-danh-muc/`,

  gioHang: `http://${ip}:8080/api/gio-hang`,

  gioHangId: `http://${ip}:8080/api/gio-hang/`,
  gioHangCount: `http://${ip}:8080/api/gio-hang/count/`,

  lichSuMuaHang: `http://${ip}:8080/api/don-hang/lich-su/`,

  thanhToan: `http://${ip}:8080/api/payment/create-payment`,

  binhLuan: `http://${ip}:8080/api/danh-gia-san-pham`,

  timKiem: `http://${ip}:8080/api/sach/searching`,

  donHang: `http://${ip}:8080/api/don-hang`,

  chiTietDonHang: `http://${ip}:8080/api/chi-tiet-don-hang/`,

  sachBanChay: `http://${ip}:8080/api/chi-tiet-don-hang/top-5`,

  sachMoiNhat: `http://${ip}:8080/api/sach/sach-moi-nhat`,

  img: "data:image/jpeg;base64,",

  ip: "192.168.188.45",
};

export default api;
