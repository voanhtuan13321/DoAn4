const ip = "192.168.1.49";

const api = {
  getDanhMuc: `http://${ip}:8080/api/danh-muc`,
  getDanhMucId: `http://${ip}:8080/api/danh-muc/`,

  checkLogin: `http://${ip}:8080/api/khach-hang/check-logging`,

  login: `http://${ip}:8080/api/quan-ly/logging`,
  checkTaiKhoan: `http://${ip}:8080/api/quan-ly/check-tai-khoan`,

  suKien: `http://${ip}:8080/api/thong-tin-su-kien`,
  suKienId: `http://${ip}:8080/api/thong-tin-su-kien/`,

  cuaHang: `http://${ip}:8080/api/thong-tin-cua-hang`,
  cuaHangId: `http://${ip}:8080/api/thong-tin-cua-hang/`,

  khachHang: `http://${ip}:8080/api/khach-hang`,
  khachHangId: `http://${ip}:8080/api/khach-hang/`,

  sach: `http://${ip}:8080/api/sach`,
  sachId: `http://${ip}:8080/api/sach/`,

  gioHang: `http://${ip}:8080/api/gio-hang`,
  gioHangId: `http://${ip}:8080/api/gio-hang/`,

  lichSuMuaHang: `http://${ip}:8080/api/lich_su_mua/`,

  img: "data:image/jpeg;base64,",
};

export default api;
