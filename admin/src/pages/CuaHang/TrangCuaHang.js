import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../../components/urlApi";
import { useNavigate } from "react-router-dom";

const TrangCuaHang = () => {
  let navigation = useNavigate();

  // Kiểm tra đăng nhập hay chưa
  // let dangNhap = JSON.parse(localStorage.getItem("dangNhapAdmin"));
  // if (!dangNhap) {
  //   alert("Vui lòng đăng nhập");
  //   navigation("/");
  // }
  //////////////////////////////////
  const [cuaHang, setCuaHang] = useState([]);
  const [a, setA] = useState(false);

  useEffect(() => {
    axios
      .get(api.cuaHang)
      .then((res) => {
        setCuaHang(res.data.data);
      })
      .catch((errors) => console.log(errors));
  }, [a]);

  function checkId(item) {
    localStorage.setItem("cuahang", JSON.stringify(item));
    navigation("/admin/trang_sua_cua_hang");
  }

  const renderCuaHang = () => {
    return cuaHang.map((item, index) => {
      return (
        <tr key={index}>
          <th scope="row">{index}</th>
          <td>{item.tenCuaHang}</td>
          <td>{item.moTa}</td>
          <td>{item.soDienThoai}</td>
          <td>{item.diaChi}</td>
          <td>{item.website}</td>
          <td>{item.email}</td>
          <td>
            <button className="btn btn-warning" onClick={() => checkId(item)}>
              Sửa
            </button>
          </td>
        </tr>
      );
    });
  };

  return (
    <>
      <div className="">
        <h5>Thông tin cửa hàng</h5>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Tên cửa hàng</th>
              <th scope="col">Mô tả</th>
              <th scope="col">Số điện thoại</th>
              <th scope="col">Dia chỉ</th>
              <th scope="col">Website</th>
              <th scope="col">Email</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>{renderCuaHang()}</tbody>
        </table>
      </div>
    </>
  );
};

export default TrangCuaHang;
