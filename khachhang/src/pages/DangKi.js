import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../components/urlApi";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
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

  let [errTen, setTen] = useState("");
  let [errSoDienThoai, setSoDienThoai] = useState("");
  let [errDiaChi, setDiaChi] = useState("");
  let [errEmail, setEmail] = useState("");
  let [errTaiKhoan, setTaiKhoan] = useState("");
  let [errMatKhau, setMatKhau] = useState("");

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
    const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    return emailRegex.test(value);
  }

  const handlerSubmit = (e) => {
    e.preventDefault();
    let check = 1;
    if (input.ten == "") {
      check = 2;
      setTen("Yêu cầu nhập vào tên");
    } else {
      check = 1;
      setTen("");
    }
    if (input.soDienThoai == "") {
      check = 2;
      setSoDienThoai("Yêu cầu nhập vào số điện thoại");
    } else {
      if (!kiemTraSoDienThoai(input.soDienThoai)) {
        check = 2;
        setSoDienThoai("Yêu cầu nhập vào số điện thoại hợp lệ");
      } else {
        check = 1;
        setSoDienThoai("");
      }
    }
    if (input.diaChi == "") {
      check = 2;
      setDiaChi("Yêu cầu nhập địa chỉ");
    } else {
      check = 1;
      setDiaChi("");
    }
    if (input.email == "") {
      check = 2;
      setEmail("Yêu cầu nhập vào địa chỉ");
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
      setTaiKhoan("Yêu cầu nhập vào tài khoản");
    } else {
      check = 1;
      setTaiKhoan("");
    }
    if (input.matKhau == "") {
      check = 2;
      setMatKhau("Yêu cầu nhập vào mật khẩu");
    } else {
      check = 1;
      setMatKhau("");
    }

    if (check === 1) {
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
          console.log(res);

          // if (res.data.status == "successful") {
          //   console.log(res);

          if (res.data.status == "unsuccessful") {
            setTaiKhoan("Tài khoản đả bị trùng");
            return;
          } else {
            Swal.fire("Đăng kí thành công", "Vui lòng đăng nhập để sử dụng", "info");
            setTimeout(function(){
              navigate("/dang_nhap");

            },1000)
          }
        })
        .catch((errors) => console.log(errors));
    }
  };

  return (
    <div className="d-flex justify-content-center p-5 mt150px">
      <form className="bsd form  p-5" onSubmit={handlerSubmit}>
        <p className="form-title">Đăng kí</p>
        <div className="input-container">
          <label className="lableinput">Nhập tên</label>
          <input
            type="text"
            name="ten"
            onChange={handleInput}
            placeholder="Tên"
          />
          <p className="error">{errTen}</p>
        </div>
        <div className="input-container">
          <label className="lableinput">Nhập email</label>
          <input
            type="text"
            name="email"
            onChange={handleInput}
            placeholder="Nhập vào email"
          />
          <p className="error">{errEmail}</p>
        </div>

        <div className="input-container">
          <label className="lableinput">Nhập số điện thoại</label>
          <input
            type="text"
            name="soDienThoai"
            onChange={handleInput}
            placeholder="Số điện thoại"
          />
          <p className="error">{errSoDienThoai}</p>
        </div>

        <div className="input-container">
          <label className="lableinput">Nhập địa chỉ</label>
          <input
            type="text"
            name="diaChi"
            onChange={handleInput}
            placeholder="Địa chỉ"
          />
          <p className="error">{errDiaChi}</p>
        </div>

        <div className="input-container">
          <label className="lableinput">Nhập tài khoản</label>
          <input
            type="text"
            name="taiKhoan"
            onChange={handleInput}
            placeholder="Tài khoản"
          />
          <p className="error">{errTaiKhoan}</p>
        </div>

        <div className="input-container">
          <label className="lableinput">Nhập mật khẩu</label>
          <input
            type="text"
            name="matKhau"
            onChange={handleInput}
            placeholder="Mật khẩu"
          />
          <p className="error">{errMatKhau}</p>
        </div>
        <div className="input-container">
          <button type="submit" className="submit">
            Đăng kí
          </button>
        </div>

        <p className="signup-link">
          <Link to="/dang_nhap">Đăng nhập</Link>
        </p>
      </form>
    </div>
  );
};

export default DangKi;
