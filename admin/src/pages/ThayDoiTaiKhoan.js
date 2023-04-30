import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import api from "../components/urlApi";
const ThayDoiTaiKhoan = () => {
  let capNhat = JSON.parse(localStorage.getItem("capNhatTaiKhoan"));
  console.log(capNhat);
  console.log(capNhat.taiKhoan);
  const navigate = useNavigate();
  const [input, setInput] = useState({
    ten: capNhat[0].ten,
    email: capNhat[0].email,
    soDienThoai: capNhat[0].soDienThoai,
    taiKhoan: capNhat[0].taiKhoan,
    matKhau: capNhat[0].matKhau,
  });

  let [errTen, setTen] = useState("");
  let [errSoDienThoai, setSoDienThoai] = useState("");
  let [errEmail, setEmail] = useState("");
  let [errTaiKhoan, setTaiKhoan] = useState("");
  let [errMatKhau, setMatKhau] = useState("");

  function handleInput(e) {
    let nameKey = e.target.name;
    let nameValue = e.target.value;
    setInput((state) => ({ ...state, [nameKey]: nameValue }));
  }

  // Hàm kiểu tra só điện thoại nhập vào
  function kiemTraSoDienThoai(value) {
    const phoneNumberRegex = /^\d{10}$/;
    return phoneNumberRegex.test(value);
  }

  // Hàm kiểu tra email nhập vào
  function kiemTraEmail(value) {
    const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    return emailRegex.test(value);
  }

  const handlerSubmit = (e) => {
    e.preventDefault();
    let check = 1;
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
        setSoDienThoai("Yêu cầu nhập vào số điện thoại hợp lệ");
        return;
      } else {
        check = 1;
        setSoDienThoai("");
      }
    }
    if (input.email == "") {
      check = 2;
      setEmail("Yêu cầu nhập vào địa chỉ");
      return;
    } else {
      if (!kiemTraEmail(input.email)) {
        check = 2;
        setEmail("Email không không hợp lệ");
        return;
      } else {
        check = 1;
        setEmail("");
      }
    }
    if (input.taiKhoan == "") {
      check = 2;
      setTaiKhoan("Yêu cầu nhập tài khoản");
      return;
    } else {
      check = 1;
      setTaiKhoan("");
    }
    if (input.matKhau == "") {
      check = 2;
      setMatKhau("Yêu cầu nhập mật khẩu");
      return;
    } else {
      check = 1;
      setMatKhau("");
    }

    if (check == 1) {
      const data = {
        idQuanLy: 1,
        ten: input.ten,
        email: input.email,
        soDienThoai: input.soDienThoai,
        taiKhoan: input.taiKhoan,
        matKhau: input.matKhau,
      };

      console.log(data);

      axios
        .put(api.capNhat, data)
        .then((res) => {
          alert("Cập nhật thành công");
          console.log(res);
        })
        .catch((errors) => console.log(errors));
    }
  };

  return (
    <div className="d-flex justify-content-center py-5">
      <form className="form" onSubmit={handlerSubmit}>
        <p className="form-title">Cập nhật tài khoản</p>
        <div className="input-container">
          <input
            type="text"
            name="ten"
            onChange={handleInput}
            value={input.ten}
            placeholder="Nhập tài khoản"
          />
          <p className="error">{errTen}</p>
        </div>
        <div className="input-container">
          <input
            type="email"
            name="email"
            onChange={handleInput}
            value={input.email}
            placeholder="Nhập email"
          />
          <p className="error">{errEmail}</p>
        </div>
        <div className="input-container">
          <input
            type="number"
            name="soDienThoai"
            onChange={handleInput}
            value={input.soDienThoai}
            placeholder="Nhập so dien thoai"
          />
          <p className="error">{errSoDienThoai}</p>
        </div>
        <div className="input-container">
          <input
            type="text"
            name="taiKhoan"
            onChange={handleInput}
            value={input.taiKhoan}
            placeholder="Nhập tài khoản"
          />
          <p className="error">{errTaiKhoan}</p>
        </div>
        <div className="input-container">
          <input
            type="password"
            name="matKhau"
            onChange={handleInput}
            value={input.matKhau}
            placeholder="Enter password"
          />
          <p className="error">{errMatKhau}</p>
        </div>
        <button type="submit" className="submit">
          Cập nhật tài khoản
        </button>
      </form>
    </div>
  );
};

export default ThayDoiTaiKhoan;
