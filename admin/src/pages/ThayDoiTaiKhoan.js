import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import api from "../components/urlApi";
const ThayDoiTaiKhoan = () => {
  let admin = JSON.parse(localStorage.getItem("admin"));
  const [input, setInput] = useState({
    taiKhoan: "",
    matKhau: "",
  });
  let [errTaiKhoan, setErrTaiKhoan] = useState("");
  let [errMatKhau, setErrmatKhau] = useState("");

  function handleInput(e) {
    let nameKey = e.target.name;
    let nameValue = e.target.value;
    setInput((state) => ({ ...state, [nameKey]: nameValue }));
  }

  const handlerSubmit = (e) => {
    e.preventDefault();

    let check = 1;
    if (input.taiKhoan == "") {
      check = 2;
      setErrTaiKhoan("Yêu cầu nhập tài khoản");
    } else {
      check = 1;
      setErrTaiKhoan("");
    }
    if (input.matKhau == "") {
      check = 2;
      setErrmatKhau("Yêu cầu nhập mật khẩu");
    } else {
      check = 1;
      setErrmatKhau("");
    }

    if (check == 1) {
      const data = {
        taiKhoan: input.taiKhoan,
        matKhau: input.matKhau,
      };

      // axios
      //   .put(, data)
      //   .then((res) => {
      //     console.log(res);
      //   })
      //   .catch((errors) => console.log(errors));
    }
  };

  return (
    <div className="d-flex justify-content-center py-5">
      <form className="form" onSubmit={handlerSubmit}>
        <p className="form-title">Cập nhật tài khoản</p>
        <div className="input-container">
          <input
            type="text"
            name="taiKhoan"
            onChange={handleInput}
            value={admin.taiKhoan}
            placeholder="Nhập tài khoản"
          />
          <span></span>
        </div>
        <div className="input-container">
          <input
            type="password"
            name="matKhau"
            onChange={handleInput}
            value={admin.matKhau}
            placeholder="Enter password"
          />
        </div>
        <button type="submit" className="submit">
          Cập nhật tài khoản
        </button>
      </form>
    </div>
  );
};

export default ThayDoiTaiKhoan;
