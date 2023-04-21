import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../../components/urlApi";

const TrangDonHang = () => {
  const [data, setData] = useState([]);
  // Gọi các đơn hàng trong giỏ hàng
  useEffect(() => {
    axios
      .get(api.gioHang + "/don-hang")
      .then((res) => {
        console.log(res.data.data);
        setData(res.data.data);
      })
      .catch((errors) => console.log(errors));
  }, []);

  const [lichSu, setLichSu] = useState([]);
  useEffect(() => {
    axios
      .get(api.lichSuMua)
      .then((res) => {
        console.log(res.data.data);
        setLichSu(res.data.data);
      })
      .catch((errors) => console.log(errors));
  }, []);

  // Lấy toàn bộ các thành phần đc chọn
  const checkId = (item) => {
    // console.log(id);
    const promises = [];
    let data = {
      idKhachHang: item["khachHang"].idKhachHang,
      idSach: item["sach"].idSach,
      soLuong: item.soLuong,
    };

    console.log(data);
    const promise1 = axios.post(api.lichSuMua, data);
    const promise2 = axios.delete(api.gioHang + "/" + item.id);

    promises.push(promise1, promise2);
    Promise.all(promises).then(() => {
      localStorage.removeItem("gioHang");

      //////////////////////////
      // navigator("/gio_hang");

      window.location.href = "http://localhost:2000/admin/don_hang";
    });
  };

  // Lấy tất cả các đơn đặt hàng đang chờ
  const donDatHang = () => {
    return data
      .filter((item) => item.trangThai !== "none")
      .map((item, index) => {
        return (
          <tr>
            <th scope="col">{index}</th>
            <th scope="col">{item["khachHang"].ten}</th>
            <th scope="col">{item["khachHang"].soDienThoai}</th>
            <th scope="col">{item["sach"].ten}</th>
            <th scope="col">{item.soLuong}</th>
            <th scope="col">{item.trangThai}</th>
            <th scope="col">
              <button onClick={() => checkId(item)} className="btn btn-success">
                Xác nhận
              </button>
            </th>
          </tr>
        );
      });
  };

  const lichSuMuaHang = () => {
    return data
      .filter((item) => item.trangThai !== "none")
      .map((item, index) => {
        return (
          <tr>
            <th scope="col">{index}</th>
            <th scope="col">{item["khachHang"].ten}</th>
            <th scope="col">{item["khachHang"].soDienThoai}</th>
            <th scope="col">{item["sach"].ten}</th>
            <th scope="col">{item.soLuong}</th>

            {/* <th scope="col">
              <button onClick={() => checkId(item)} className="btn btn-success">
                Xác nhận
              </button>
            </th> */}
          </tr>
        );
      });
  };
  return (
    <div>
      <div className="py-5">
        <h2>Đơn hàng</h2>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Tên khách hàng</th>
              <th scope="col">Số điện thoại</th>
              <th scope="col">Tên sách</th>
              <th scope="col">Số lượng</th>
              <th scope="col">Thanh toán</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>{donDatHang()}</tbody>
        </table>
      </div>
      <div className="py-5">
        <h2>Lịch sử đơn hàng</h2>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Tên khách hàng</th>
              <th scope="col">Số điện thoại</th>
              <th scope="col">Tên sách</th>
              <th scope="col">Số lượng</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>{lichSuMuaHang()}</tbody>
        </table>
      </div>
    </div>
  );
};

export default TrangDonHang;
