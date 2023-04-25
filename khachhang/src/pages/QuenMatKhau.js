import React, { useState } from "react";
import axios from "axios";
import api from "../components/urlApi";
import { useNavigate, useParams } from "react-router-dom";

const QuenMatKhau = () => {
  // Tạo đối tượng URL với đường dẫn href
  let idKhachHang = JSON.parse(localStorage.getItem("idKhachHang"));
  let check = document.querySelector("#checkNhapMatKhau");
  console.log(check);

  // Lấy giá trị của tham số param1
  //   const param1 = url.searchParams.get("tk");
  //   console.log(param1);

  let param = useParams();
  console.log(param);
  let navigate = useNavigate();

  const [input, setInput] = useState({
    matKhau: "",
    matKhauMoi: "",
    nhapLaiMatKhauMoi: "",
  });
  //   console.log(input);

  function handleInput(e) {
    let nameKey = e.target.name;
    let nameValue = e.target.value;
    setInput((state) => ({ ...state, [nameKey]: nameValue }));
  }

  const handleOnkeydow = () => {
    check.style.border = "1px solid #ccc";
  };

  const handlerSubmit = (e) => {
    e.preventDefault();

    if (input.matKhauMoi !== input.nhapLaiMatKhauMoi) {
      alert("Mật khẩu không hợp lệ");
      check.style.border = "1px solid red";
      console.log(check);
    } else {
      const url = new URL(window.location);
      const param1 = url.searchParams.get("tk");

      const data = {
        // idKhachHang: idKhachHang,
        taiKhoan: param1,
        matKhau: input.matKhauMoi,
      };
      console.log(data);
      axios
        .post(api.khachHangQuenMatKhau, data)
        .then((res) => {
          console.log(res);
          if (res.data.status === "ok") {
            alert("Đổi mật khẩu thành công");
            navigate("/dang_nhap");
            localStorage.setItem();
          } else {
            navigate("");
          }
          console.log(res);
        })
        .catch((errors) => console.log(errors));
    }
  };

  return (
    <div className="d-flex justify-content-center py-5">
      <form className="form p-5" onSubmit={handlerSubmit}>
        <p className="form-title">Đổi mật khẩu</p>

        <label>Mật khẩu mới</label>
        <div className="input-container">
          <input
            type="password"
            name="matKhauMoi"
            onChange={handleInput}
            placeholder="Nhập mật khẩu mới"
          />
        </div>
        <div className="input-container">
          <label>Nhập lại mật khẩu mới</label>
          <input
            id="checkNhapMatKhau"
            onKeyDown={handleOnkeydow}
            type="password"
            name="nhapLaiMatKhauMoi"
            onChange={handleInput}
            placeholder="Nhập lại mật khẩu mới"
          />
        </div>
        <button type="submit" className="submit">
          Đổi mật khẩu
        </button>
      </form>
    </div>
  );
};

export default QuenMatKhau;
