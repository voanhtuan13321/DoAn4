import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../../components/urlApi";
import { useNavigate, Link } from "react-router-dom";

const TrangKhachHang = () => {
  let navigation = useNavigate();
  let admin = JSON.parse(localStorage.getItem("admin"));
  if (!admin) {
    alert("Bạn phải đăng nhập");
    navigation("/");
  }

  const [khachHang, setKhachHang] = useState([]);
  const [a, setA] = useState(true);

  // Gọi các khách hàng ra
  useEffect(() => {
    axios
      .get(api.khachHang)
      .then((res) => {
        setKhachHang(res.data.data);
      })
      .catch((errors) => console.log(errors));
  }, [a]);

  // Khi click vào nút này sẻ lấy đc id của khách hàng đó vào xóa theo id của khách hàng
  function checkId(e) {
    let getLocalStolore = JSON.parse(localStorage.getItem("admin"));
    if (getLocalStolore) {
      let getId = e.target.value;
      axios
        .delete(api.khachHangId + getId)
        .then((res) => {
          setA(!a);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert("Bạn chưa đăng nhập");
      navigation("/");
    }
  }

  // lấy ra từng thông tin của khách hàng
  const renderKhachHang = () => {
    return khachHang.map((item, index) => {
      return (
        <tr key={index}>
          <th scope="row">{index}</th>
          <td>{item.ten}</td>
          <td>{item.email}</td>
          <td>{item.soDienThoai}</td>
          <td>{item.diaChi}</td>
          <td>{item.taiKhoan}</td>
          <td>{item.matKhau}</td>
          <td>
            <button
              className="btn btn-warning"
              value={item.idKhachHang}
              onClick={checkId}
            >
              Xóa
            </button>
          </td>
        </tr>
      );
    });
  };
  return (
    <div>
      <div className="">
        <div className="py-5">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Tên</th>
                <th scope="col">Email</th>
                <th scope="col">Số điện thoại</th>
                <th scope="col">Địa chỉ</th>
                <th scope="col">Tài khoản</th>
                <th scope="col">Mật khẩu</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>{renderKhachHang()}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TrangKhachHang;
