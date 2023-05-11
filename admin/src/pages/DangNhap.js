import React, {useState} from "react";
import axios from "axios";
import api from "../components/urlApi";
import {useNavigate} from "react-router-dom";

const DangNhap = () => {
  const navigate = useNavigate();

  const [input, setInput] = useState({
    taiKhoan: "",
    matKhau: "",
  });

  let [errTaiKhoan, setErrTaiKhoan] = useState("");
  let [errMatKhau, setErrmatKhau] = useState("");

  function handleInput(e) {
    let nameKey = e.target.name;
    let nameValue = e.target.value;
    setInput((state) => ({...state, [nameKey]: nameValue}));
  }

  const handlerSubmit = (e) => {
    e.preventDefault();

    let check = 1;
    if (input.taiKhoan === "") {
      check = 2;
      setErrTaiKhoan("Yêu cầu nhập tài khoản");
    } else {
      check = 1;
      setErrTaiKhoan("");
    }
    if (input.matKhau === "") {
      check = 2;
      setErrmatKhau("Yêu cầu nhập mật khẩu");
    } else {
      check = 1;
      setErrmatKhau("");
    }

    if (check === 1) {
      const data = {
        taiKhoan: input.taiKhoan,
        matKhau: input.matKhau,
      };

      const animationLoad = document.querySelector("#load");
      animationLoad.classList.remove("d-none");

      axios
        .post(api.login, data)
        .then((res) => {
          if (res.data.status === "ok") {
            const thongtin = {
              ten: res.data.data.ten,
              email: res.data.data.email,
              soDienThoai: res.data.data.soDienThoai,
              taiKhoan: res.data.data.taiKhoan,
              matKhau: res.data.data.matKhau,
            };
            localStorage.setItem("taiKhoanAdmin", JSON.stringify(thongtin));
            navigate("/admin/don_hang");
          } else {
            check = 2;
            setErrmatKhau("Tài khoản hoặc mật khẩu không hợp lệ");
            navigate("");
          }
        })
        .catch((errors) => console.log(errors))
        .finally(() => animationLoad.classList.add("d-none"));
    }
  };

  return (
    <div className="d-flex justify-content-center py-5">
      <form className="form" onSubmit={handlerSubmit}>
        <p className="form-title">Đăng nhập</p>
        <div className="input-container">
          <input type="text" name="taiKhoan" onChange={handleInput} placeholder="Nhập tài khoản" />
          <p className="error">{errTaiKhoan}</p>
        </div>
        <div className="input-container">
          <input type="password" name="matKhau" onChange={handleInput} placeholder="Nhập vào mật khẩu" />
          <p className="error">{errMatKhau}</p>
        </div>
        <button type="submit" className="submit">
          Đăng nhập
        </button>
      </form>
    </div>
  );
};

export default DangNhap;
