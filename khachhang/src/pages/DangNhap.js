import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../components/urlApi";
import { Link, useNavigate } from "react-router-dom";
// import { Button, Form, Input } from "antd";
// import QuenMatKhau from "./QuenMatKhau";

const DangNhap = () => {
  const load = document.querySelector("#load");

  const navigate = useNavigate();

  const [input, setInput] = useState({
    taiKhoan: "",
    matKhau: "",
  });
  const [nhoDangNhap, setNhoDangNhap] = useState("");
  let [errTaiKhoan, setTaiKhoan] = useState("");
  let [errMatKhau, setMatKhau] = useState("");

  function handleInput(e) {
    let nameKey = e.target.name;
    let nameValue = e.target.value;
    setInput((state) => ({ ...state, [nameKey]: nameValue }));
  }

  const ghiNhoDangNhap = () => {
    setNhoDangNhap(input);
    console.log(input);
  };

  const handlerSubmit = (e) => {
    e.preventDefault();

    let check = 1;
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

    if (check == 1) {
      const data = {
        taiKhoan: input.taiKhoan,
        matKhau: input.matKhau,
      };
      console.log(data);

      // check xem tai khoan co ton tai chua
      axios.post(api.checkTaiKhoan, data).then((res) => {
        console.log(res);
        if (res.data.status === "fail") {
          setTaiKhoan("Tài khoản không hợp lệ");
        } else {
          // neu ton tai thi check dang nhap
          //check logging
          axios
            .post(api.checkLogin, data)
            .then((res) => {
              console.log(res);
              if (res.data.status === "ok") {
                localStorage.setItem(
                  "idKhachHang",
                  JSON.stringify(res.data.data.idKhachHang)
                );
                localStorage.setItem(
                  "khachHang",
                  JSON.stringify(res.data.data)
                );
                navigate("/");
              }
              // else if{

              // }
              else {
                // check = 2;
                // setTaiKhoan("Tài khoản không hợp lệ");
                setMatKhau("Mật không hợp lệ");
                navigate("");
              }
              console.log(res);
            })
            .catch((errors) => console.log(errors));
        }
      });
    }
  };

  const sendMail = (href, tk) => {
    const data1 = { taiKhoan: input.taiKhoan, href: href + "?tk=" + tk };

    console.log(data1);
    axios
      .post(api.khachHangMail, data1)
      .then((res) => {
        if (res.data.status === "ok") {
          alert("gui mail thanh cong");
          // navigate("http://localhost:3000/quen_mat_khau");
        } else {
          alert("gui mail that bai");
          // navigate('')
        }
        load.classList.add("d-none");
        console.log(res);
      })
      .catch((errors) => console.log(errors));
  };

  const checkTaiKhoan = () => {
    load.classList.remove("d-none");

    let check = 1;
    if (input.taiKhoan == "") {
      check = 2;
      setTaiKhoan("Vui lòng nhập vào tài khoản để lấy lại mật khẩu");
    } else {
      check = 1;
      setTaiKhoan("");
    }

    if (check == 1) {
      let taiKhoan = input.taiKhoan;

      const data = {
        taiKhoan: taiKhoan,
      };

      axios
        .post(api.khachHangQuenTaiKhoan, data)
        .then((res) => {
          // console.log(res);
          if (res.data.status === "ok") {
            sendMail(`http://${api.ip}:3000/quen_mat_khau`, taiKhoan);
            setMatKhau("");
          } else {
            setTaiKhoan("Tài khoản không hợp lệ");
          }
          console.log(res);
        })
        .catch((errors) => console.log(errors));
    }
  };

  return (
    <>
      <div className="d-flex justify-content-center py-5 mt150px">
        <form className="bsd form p-5" onSubmit={handlerSubmit}>
          <p className="form-title">Đăng nhập</p>
          <label>Tài khoản</label>
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
            <label>Mật khẩu</label>
            <input
              type="password"
              name="matKhau"
              onChange={handleInput}
              placeholder="Nhập vào mật khẩu"
            />
            <p className="error">{errMatKhau}</p>
          </div>
          <div className="input-container">
            <button type="submit" className="submit">
              Đăng nhập
            </button>
          </div>

          <p className="signup-link">
            <Link to="/dang_ki">Đăng kí</Link>
            <div onClick={() => checkTaiKhoan()}>
              <span className="cusoclick">Quên mật khấu?</span>
            </div>
          </p>
        </form>
      </div>
    </>
  );
};

export default DangNhap;
