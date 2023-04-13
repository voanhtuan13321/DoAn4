import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../components/urlApi";
import { Link, useNavigate } from "react-router-dom";
const DangKi = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    ten: "",
    email: "",
    soDienThoai: "",
    diaChi: "",
    taiKhoan: "",
    matKhau: "",
  });
  const [khachHang, setKhachHang] = useState([]);
  const [a, setA] = useState(true);

  const handleInput = (e) => {
    let nameKey = e.target.name;
    let nameValue = e.target.value;
    setInput((state) => ({ ...state, [nameKey]: nameValue }));
  };

  const handlerSubmit = (e) => {
    e.preventDefault();

    const data = {
      ten: input.ten,
      email: input.email,
      soDienThoai: input.soDienThoai,
      diaChi: input.diaChi,
      taiKhoan: input.taiKhoan,
      matKhau: input.matKhau,
    };
    axios
      .post(api.khachHang, data)
      .then((res) => {
        if (res.data.status === "successful") {
          console.log(res);
          navigate("/dang_nhap");
        } else alert("Trùng tài khoản");
      })
      .catch((errors) => console.log(errors));
  };

  return (
    <div className="d-flex justify-content-center p-5">
      <form className="form text-center p-5" onSubmit={handlerSubmit}>
        <p className="form-title">Đăng kí</p>
        <div className="input-container">
          <input
            type="text"
            name="ten"
            onChange={handleInput}
            placeholder="Tên"
          />
        </div>
        <div className="input-container">
          <input
            type="password"
            name="email"
            onChange={handleInput}
            placeholder="Enter password"
          />
        </div>
        <div className="input-container">
          <input
            type="password"
            name="soDienThoai"
            onChange={handleInput}
            placeholder="Số điện thoại"
          />
        </div>
        <div className="input-container">
          <input
            type="password"
            name="diaChi"
            onChange={handleInput}
            placeholder="Địa chỉ"
          />
        </div>
        <div className="input-container">
          <input
            type="password"
            name="taiKhoan"
            onChange={handleInput}
            placeholder="Tài khoản"
          />
        </div>
        <div className="input-container">
          <input
            type="password"
            name="matKhau"
            onChange={handleInput}
            placeholder="Mật khẩu"
          />
        </div>
        <button type="submit" className="submit btn">
          Đăng kí
        </button>
        <p className="signup-link">
          <Link to="/dang_nhap">Đăng nhập</Link>
        </p>
      </form>
    </div>
  );
};

export default DangKi;
