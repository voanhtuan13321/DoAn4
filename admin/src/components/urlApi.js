const ip = '192.168.1.10';

const api = {
    getDanhMuc:`http://${ip}:8080/api/danh_muc`,
    getDanhMucId:`http://${ip}:8080/api/danh_muc/`,



    login:`http://${ip}:8080/api/quan_ly/logging`,

    


    suKien:`http://${ip}:8080/api/thong_tin_su_kien`,
    suKienId:`http://${ip}:8080/api/thong_tin_su_kien/`,



    cuaHang:`http://${ip}:8080/api/thong_tin_cua_hang`,
    cuaHangId:`http://${ip}:8080/api/thong_tin_cua_hang/`,




    khachHang:`http://${ip}:8080/api/khach_hang`,
    khachHangId:`http://${ip}:8080/api/khach_hang/`,




    sach:`http://${ip}:8080/api/sach`,




    lichSuMua:`http://${ip}:8080/api/lich_su_mua`,



    img:'data:image/jpeg;base64,'


}

export default api; 
