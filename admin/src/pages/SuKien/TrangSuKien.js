import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../../components/urlApi";
import { useNavigate, Link } from "react-router-dom";

import { Button, Form, Input } from "antd";

const TrangSuKien = () => {
  let navigation = useNavigate();
  let admin = JSON.parse(localStorage.getItem("admin"));
  if (!admin) {
    alert("Bạn phải đăng nhập");
    navigation("/");
  }
  const [suKien, setSuKien] = useState([]);
  const [a, setA] = useState(true);

  useEffect(() => {
    axios
      .get(api.suKien)
      .then((res) => {
        setSuKien(res.data.data);
      })
      .catch((errors) => console.log(errors));
  }, [a]);

  const onFinish = (values) => {
    let getLocalStolore = JSON.parse(localStorage.getItem("admin"));
    if (getLocalStolore) {
      axios
        .post(api.suKien, values)
        .then((res) => {
          console.log(res);
          setA(!a);
        })
        .catch((errors) => console.log(errors));
    } else {
      alert("Bạn chưa đăng nhập");
      navigation("/");
    }
  };

  function deleteId(e) {
    let getId = e.target.value;
    axios
      .delete(api.suKienId + getId)
      .then((res) => {
        setA(!a);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function checkId(item) {
    localStorage.setItem("sukien", JSON.stringify(item));
    navigation("/admin/sua_su_kien");
  }

  const renderSuKien = () => {
    return suKien.map((item, index) => {
      return (
        <tr key={index}>
          <th scope="row">{index}</th>
          <td>{item.tieuDe}</td>
          <td>{item.noiDung}</td>
          <td>
            <button className="btn btn-danger" onClick={() => checkId(item)}>
              Sửa
            </button>
            <button
              className="btn btn-warning"
              value={item.id}
              onClick={deleteId}
            >
              Xóa
            </button>
          </td>
        </tr>
      );
    });
  };

  return (
    <div className="">
      {/* <div className="d-flex align-items-center justify-content-center">
        <form onSubmit={handlerSubmit} className="width-500">
          <p className="form-title py-4">Thêm sự kiện</p>
          <div className="input-container">
            <input
              type="text"
              name="tieuDe"
              onChange={handleInput}
              placeholder="Nhập tiêu đề"
            />
            <span></span>
          </div>
          <div className="input-container pb-3">
            <input
              type="text"
              name="noiDung"
              onChange={handleInput}
              placeholder="Nhập nội dung"
            />
          </div>
          <button
            type="submit"
            className="rounded-pill btn bg-secondary btn-width"
          >
            Thêm
          </button>
        </form>
      </div>
      <div>
        <div className="py-5">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Tiêu đề</th>
                <th scope="col">Nội dung</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>{renderSuKien()}</tbody>
          </table>
        </div>
      </div> */}
      <div className="">
        <Form
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
            label="Nhập vào tiêu đề"
            name="tieuDe"
            rules={[
              {
                required: true,
                message: "Nhập vào tiêu đề!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Nhập vào nội dung"
            name="noiDung"
            rules={[
              {
                required: true,
                message: "Nhập vào nội dung",
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
              Thêm sự kiện
            </Button>
          </Form.Item>
        </Form>
      </div>

      <div>
        <div className="py-5">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Tiêu đề</th>
                <th scope="col">Nội dung</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>{renderSuKien()}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TrangSuKien;
