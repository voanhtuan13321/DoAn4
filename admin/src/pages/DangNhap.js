import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../components/urlApi";
import { useNavigate } from "react-router-dom";

import { Button, Form, Input } from "antd";
const DangNhap = () => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    axios
      .post(api.login, values)
      .then((res) => {
        if (res.data.status === "ok") {
          navigate("/admin");
        } else {
          navigate("");
        }
        console.log(res);
      })
      .catch((errors) => console.log(errors));
  };

  // const [input, setInput] = useState({
  //   taiKhoan: "",
  //   matKhau: "",
  // });

  // function handleInput(e) {
  //   let nameKey = e.target.name;
  //   let nameValue = e.target.value;
  //   setInput((state) => ({ ...state, [nameKey]: nameValue }));
  // }

  // const handlerSubmit = (e) => {
  //   e.preventDefault();

  //   const data = {
  //     taiKhoan: input.taiKhoan,
  //     matKhau: input.matKhau,
  //   };

  //   axios
  //     .post(api.login, data)
  //     .then((res) => {
  //       if (res.data.status === "ok") {
  //         navigate("/admin");
  //       } else {
  //         navigate("");
  //       }
  //       console.log(res);
  //     })
  //     .catch((errors) => console.log(errors));
  // };

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
    //   <div className="d-flex justify-content-center py-5">
    //     <form className="form" onSubmit={handlerSubmit}>
    //       <p className="form-title">Đăng nhập</p>
    //       <div className="input-container">
    //         <input
    //           type="text"
    //           name="taiKhoan"
    //           onChange={handleInput}
    //           placeholder="Nhập tài khoản"
    //         />
    //         <span></span>
    //       </div>
    //       <div className="input-container">
    //         <input
    //           type="password"
    //           name="matKhau"
    //           onChange={handleInput}
    //           placeholder="Enter password"
    //         />
    //       </div>
    //       <button type="submit" className="submit">
    //         Đăng nhập
    //       </button>
    //       <p className="signup-link">
    //         <button onClick={checkTaiKhoan}>?Quên mật khấu</button>
    //       </p>
    //     </form>
    //   </div>
    <>
      <div className="d-flex justify-content-center py-5">
        <Form
          className="form"
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
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
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
            <Input />
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
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default DangNhap;
