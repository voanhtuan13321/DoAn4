import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../components/urlApi";
import { useNavigate } from "react-router-dom";

const DangNhap = () => {
  const navigate = useNavigate();
  // const [error, setError] = useState({});

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

      axios
        .post(api.login, data)
        .then((res) => {
          if (res.data.status === "ok") {
            navigate("/admin/thong_ke");
          } else {
            check = 2;
            setErrmatKhau("Tài khoản hoặc mật khẩu không hợp lệ");
            navigate("");
          }
          console.log(res);
        })
        .catch((errors) => console.log(errors));
    }
  };

  // const sendMail = (href) => {
  //   const data = {
  //     href,
  //   };
  //   axios
  //     .post(api.sendMail, data)
  //     .then((res) => {
  //       if (res.data.status === "ok") {
  //         alert("gui mail thanh cong");
  //         // navigate('/admin')
  //       } else {
  //         alert("gui mail that bai");
  //         // navigate('')
  //       }
  //       console.log(res);
  //     })
  //     .catch((errors) => console.log(errors));
  // };

  const sendMail = (href, tk) => {
    const data1 = { taiKhoan: input.taiKhoan, href: href + "?tk=" + tk };

    console.log(data1);
    axios
      .post(api.khachHangMail, data1)
      .then((res) => {
        if (res.data.status === "ok") {
          alert("gui mail thanh cong");
          navigate("/quen_mat_khau");
        } else {
          alert("gui mail that bai");
          navigate("");
        }
        console.log(res);
      })
      .catch((errors) => console.log(errors));
  };

  const checkTaiKhoan = () => {
    let taiKhoan = input.taiKhoan;

    const data = {
      taiKhoan: taiKhoan,
    };

    axios
      .post(api.checkTaiKhoan, data)
      .then((res) => {
        console.log(res);
        if (res.data.status === "ok") {
          sendMail("http://localhost:3000/quen_mat_khau", taiKhoan);
        } else {
          alert("sai tai khoan");
        }
        console.log(res);
      })
      .catch((errors) => console.log(errors));
  };

  // const checkTaiKhoan = () => {
  //   let taiKhoan = input.taiKhoan;

  //   const data = {
  //     taiKhoan: taiKhoan,
  //   };

  //   axios
  //     .post(api.checkTaiKhoan, data)
  //     .then((res) => {
  //       console.log(res);
  //       if (res.data.status === "true") {
  //         sendMail("noi dung chi do");
  //       } else {
  //         alert("sai tai khoan");
  //       }
  //       console.log(res);
  //     })
  //     .catch((errors) => console.log(errors));
  // };

  return (
    <div className="d-flex justify-content-center py-5">
      <form className="form" onSubmit={handlerSubmit}>
        <p className="form-title">Đăng nhập</p>
        <div className="input-container">
          <input
            type="text"
            name="taiKhoan"
            onChange={handleInput}
            placeholder="Nhập tài khoản"
          />
          <p className="error">{errTaiKhoan}</p>
        </div>
        <div className="input-container">
          <input
            type="password"
            name="matKhau"
            onChange={handleInput}
            placeholder="Nhập vào mật khẩu"
          />
          <p className="error">{errMatKhau}</p>
        </div>
        <button type="submit" className="submit">
          Đăng nhập
        </button>
        <p className="signup-link">
          <button onClick={checkTaiKhoan}>?Quên mật khấu</button>
        </p>
      </form>
    </div>
  );
};

export default DangNhap;
