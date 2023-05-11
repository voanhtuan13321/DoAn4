import React, {useEffect, useState} from "react";
import axios from "axios";
import api from "../../components/urlApi";
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";

const TrangCuaHang = () => {
  let navigation = useNavigate();

  // check dang nhap
  let admin = JSON.parse(localStorage.getItem("taiKhoanAdmin"));
  if (!admin) {
    Swal.fire("Bạn phải đăng nhập").then(() => navigation("/"));
  }

  //////////////////////////////////
  const [cuaHang, setCuaHang] = useState([]);

  useEffect(() => {
    axios
      .get(api.cuaHang)
      .then((res) => {
        setCuaHang(res.data.data);
      })
      .catch((errors) => console.log(errors));
  }, [1]);

  function checkId(item) {
    localStorage.setItem("cuahang", JSON.stringify(item));
    navigation("/admin/trang_sua_cua_hang");
  }

  const renderCuaHang = () => {
    return cuaHang.map((item, index) => {
      return (
        <tr key={index}>
          <th scope="row">{index}</th>
          <td>
            <p className="fs14 mb-0">{item.tenCuaHang}</p>
          </td>
          <td>
            <p className="fs14 mb-0">{item.moTa}</p>
          </td>
          <td>
            <p className="fs14 mb-0">{item.soDienThoai}</p>
          </td>
          <td>
            <p className="fs14 mb-0">{item.diaChi}</p>
          </td>
          <td>
            <p className="fs14 mb-0">{item.website}</p>
          </td>
          <td>
            <p className="fs14 mb-0">{item.email}</p>
          </td>
          <td>
            <button className="btn btn-outline-warning fw-bolder" onClick={() => checkId(item)}>
              <p className="fs14 mb-0">Sửa</p>
            </button>
          </td>
        </tr>
      );
    });
  };

  return (
    <>
      <div className="pl5px">
        <h5>Thông tin cửa hàng</h5>
        <table className="table">
          <thead className="table-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">
                <p className="fs14 mb-0">Tên cửa hàng</p>
              </th>
              <th scope="col">
                <p className="fs14 mb-0">Mô tả</p>
              </th>
              <th scope="col">
                <p className="fs14 mb-0">Số điện thoại</p>
              </th>
              <th scope="col">
                <p className="fs14 mb-0">Dia chỉ</p>
              </th>
              <th scope="col">
                <p className="fs14 mb-0">Website</p>
              </th>
              <th scope="col">
                <p className="fs14 mb-0">Email</p>
              </th>
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
