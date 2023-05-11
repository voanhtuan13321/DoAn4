import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import api from "../components/urlApi";
import Swal from "sweetalert2";

const ThayDoiTaiKhoan = () => {
  const capNhat = JSON.parse(localStorage.getItem("taiKhoanAdmin"));
  const navigate = useNavigate();
  const [input, setInput] = useState({
    ten: capNhat.ten,
    email: capNhat.email,
    soDienThoai: capNhat.soDienThoai,
    taiKhoan: capNhat.taiKhoan,
    matKhau: capNhat.matKhau,
  });

  // check dang nhap
  let admin = JSON.parse(localStorage.getItem("taiKhoanAdmin"));
  if (!admin) {
    Swal.fire("Bạn phải đăng nhập").then(() => navigate("/"));
  }

  let [errTen, setTen] = useState("");
  let [errSoDienThoai, setSoDienThoai] = useState("");
  let [errEmail, setEmail] = useState("");
  let [errTaiKhoan, setTaiKhoan] = useState("");
  let [errMatKhau, setMatKhau] = useState("");

  function handleInput(e) {
    let nameKey = e.target.name;
    let nameValue = e.target.value;
    setInput((state) => ({...state, [nameKey]: nameValue}));
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
    if (input.ten === "") {
      check = 2;
      setTen("Yêu cầu nhập vào tên");
      return;
    } else {
      check = 1;
      setTen("");
    }
    if (input.soDienThoai === "") {
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
    if (input.email === "") {
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
    if (input.taiKhoan === "") {
      check = 2;
      setTaiKhoan("Yêu cầu nhập tài khoản");
      return;
    } else {
      check = 1;
      setTaiKhoan("");
    }
    if (input.matKhau === "") {
      check = 2;
      setMatKhau("Yêu cầu nhập mật khẩu");
      return;
    } else {
      check = 1;
      setMatKhau("");
    }

    if (check === 1) {
      const data = {
        idQuanLy: 1,
        ten: input.ten,
        email: input.email,
        soDienThoai: input.soDienThoai,
        taiKhoan: input.taiKhoan,
        matKhau: input.matKhau,
      };

      axios
        .put(api.capNhat, data)
        .then((res) => {
          Swal.fire("Cập nhật thành công");
        })
        .catch((errors) => console.log(errors));
    }
  };

  return (
    <div className="d-flex justify-content-center py-5">
      <form className="form" onSubmit={handlerSubmit}>
        <p className="form-title">Cập nhật tài khoản</p>
        <div className="input-container">
          <input type="text" name="ten" onChange={handleInput} value={input.ten} placeholder="Nhập tài khoản" />
          <p className="error">{errTen}</p>
        </div>
        <div className="input-container">
          <input type="email" name="email" onChange={handleInput} value={input.email} placeholder="Nhập email" />
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
