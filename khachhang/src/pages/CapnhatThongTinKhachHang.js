import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../components/urlApi";
import { Link, useNavigate } from "react-router-dom";
const CapnhatThongTinKhachHang = () => {
  let navigate = useNavigate();
  let taiKhoan = JSON.parse(localStorage.getItem("khachHang"));
  // let idKhachHang = JSON.parse(localStorage.getItem("khachHang"));

  // console.log(taiKhoan);
  const [input, setInput] = useState({
    idKhachHang: taiKhoan.idKhachHang,
    ten: taiKhoan.ten,
    email: taiKhoan.email,
    soDienThoai: taiKhoan.soDienThoai,
    diaChi: taiKhoan.diaChi,
    // taiKhoan: taiKhoan.taiKhoan,
    // matKhau: taiKhoan.matKhau,
  });
  let [errTen, setTen] = useState("");
  let [errSoDienThoai, setSoDienThoai] = useState("");
  let [errDiaChi, setDiaChi] = useState("");
  let [errEmail, setEmail] = useState("");

  // const [khachHang, setKhachHang] = useState([]);
  // const [a, setA] = useState(true);

  const handleInput = (e) => {
    let nameKey = e.target.name;
    let nameValue = e.target.value;
    setInput((state) => ({ ...state, [nameKey]: nameValue }));
  };

  // Hàm kiểu tra só điện thoại nhập vào
  function kiemTraSoDienThoai(value) {
    const phoneNumberRegex = /^\d{10}$/;
    return phoneNumberRegex.test(value);
  }

  // Hàm kiểu tra email nhập vào
  function kiemTraEmail(value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  }

  const handlerSubmit = (e) => {
    e.preventDefault();
    let check = 1;
    let formatEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    if (input.ten == "") {
      check = 2;
      setTen("Yêu cầu nhập vào tên");
      return;
    } else {
      check = 1;
      setTen("");
    }
    if (input.soDienThoai == "") {
      check = 2;
      setSoDienThoai("Yêu cầu nhập vào số điện thoại");
      return;
    } else {
      if (!kiemTraSoDienThoai(input.soDienThoai)) {
        check = 2;
        setSoDienThoai("Số điện thoại không hợp lệ");
      }
      check = 1;
      setSoDienThoai("");
    }
    if (input.diaChi == "") {
      check = 2;
      setDiaChi("Yêu cầu nhập địa chỉ");
      return;
    } else {
      check = 1;
      setDiaChi("");
    }
    if (input.email == "") {
      check = 2;
      setEmail("Yêu cầu nhập vào email");
      return;
    } else {
      if (!kiemTraEmail(input.email)) {
        check = 2;
        setEmail("Email không không hợp lệ");
      } else {
        check = 1;
        setEmail("");
      }
    }

    if (check === 1) {
      const data = {
        idKhachHang: input.idKhachHang,
        ten: input.ten,
        email: input.email,
        soDienThoai: input.soDienThoai,
        diaChi: input.diaChi,
      };

      axios
        .put(api.khachHang, data)
        .then((res) => {
          alert("Cập nhật thành công");
          localStorage.setItem("khachHang", JSON.stringify(data));
          navigate("/");
        })
        .catch((errors) => console.log(errors));
    }
  };

  return (
    <div className="d-flex justify-content-center p-5">
      <form className="form p-5" onSubmit={handlerSubmit}>
        <p className="form-title">Cập nhật tài khoản</p>
        <div className="input-container">
          <p className="mb-0">
            <label>Tên</label>
          </p>
          <input
            type="text"
            name="ten"
            value={input.ten}
            onChange={handleInput}
            placeholder="Tên"
          />
          <p className="error mb-0">{errTen}</p>
        </div>
        <div className="input-container">
          <label>Email</label>
          <input
            type="text"
            name="email"
            value={input.email}
            onChange={handleInput}
            placeholder="Email"
          />
          <p className="error mb-0">{errEmail}</p>
        </div>
        <div className="input-container">
          <label>Số điện thoại</label>
          <input
            type="text"
            name="soDienThoai"
            value={input.soDienThoai}
            onChange={handleInput}
            placeholder="Số điện thoại"
          />
          <p className="error mb-0">{errSoDienThoai}</p>
        </div>
        <div className="input-container mb-4">
          <label>Địa chỉ</label>
          <input
            type="text"
            name="diaChi"
            value={input.diaChi}
            onChange={handleInput}
            placeholder="Địa chỉ"
          />
          <p className="error mb-0">{errDiaChi}</p>
        </div>
        <button type="submit" className="submit btn w221">
          Cập nhật tài khoản{" "}
        </button>
        <p className="signup-link">
          <Link to={"/quen_mat_khau?tk=" + taiKhoan.taiKhoan}>
            Đổi mật khẩu
          </Link>
        </p>
      </form>
    </div>
  );
};

export default CapnhatThongTinKhachHang;
