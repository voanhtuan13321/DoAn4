import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../components/urlApi";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Input } from "antd";
import QuenMatKhau from "./QuenMatKhau";

const DangNhap = () => {
  const navigate = useNavigate();

  const [input, setInput] = useState({
    taiKhoan: "",
    matKhau: "",
  });
  let [errTaiKhoan, setTaiKhoan] = useState("");
  let [errMatKhau, setMatKhau] = useState("");

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

      axios
        .post(api.checkLogin, data)
        .then((res) => {
          console.log(res);
          if (res.data.status === "ok") {
            localStorage.setItem(
              "idKhachHang",
              JSON.stringify(res.data.data.idKhachHang)
            );
            localStorage.setItem("khachHang", JSON.stringify(res.data.data));
            navigate("/");
          } else {
            // check = 2;
            setMatKhau("Tài khoản hoặc mật khẩu không hợp lệ");
            navigate("");
          }
          console.log(res);
        })
        .catch((errors) => console.log(errors));
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
      .post(api.khachHangQuenTaiKhoan, data)
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

  // const quenMatKhau = () => {
  //   const data = {
  //     taiKhoan: input.taiKhoan,
  //     matKhau: input.matKhau,
  //   };

  //   axios
  //     .post(api.khachHangQuenTaiKhoan, data)
  //     .then((res) => {
  //       console.log(res);
  //       if (res.data.status === "ok") {
  //       } else {
  //         navigate("");
  //       }
  //       console.log(res);
  //     })
  //     .catch((errors) => console.log(errors));
  // };

  return (
    <>
      <div className="d-flex justify-content-center py-5">
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
          <button type="submit" className="submit">
            Đăng nhập
          </button>
          <p className="signup-link">
            <Link to="/dang_ki">Đăng kí</Link>
            <div className="cusoclick" onClick={() => checkTaiKhoan()}>
              {" "}
              ?Quên mật khấu
            </div>
          </p>
        </form>
      </div>

      {/* <div className="d-flex justify-content-center py-5">
        <Form
          className="form bsd "
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishQuenMatKhau={onFinishQuenMatKhau}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <div className="text-center mb-5">
            <h3>Đăng nhập</h3>
          </div>
          <Form.Item
            label="Tài khoản"
            name="taiKhoan"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập vào tài khoản",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="matKhau"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập vào mật khẩu",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Đăng nhập
            </Button>
            <button
              onClick={() => onFinishQuenMatKhau()}
              type="primary"
              htmlType="submit"
            >
              Quên mật khẩu
            </button>
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Link to="/dang_ki" type="primary" htmlType="submit">
              Đăng kí
            </Link>
          </Form.Item>
        </Form>
      </div> */}
    </>
  );
};

export default DangNhap;
