import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../../components/urlApi";
import { useNavigate } from "react-router-dom";

import { Button, Form, Input } from "antd";

const TrangDanhMuc = () => {
  let navigation = useNavigate();

  // const [input,setInput] = useState({
  //   ten:'',
  //   moTa:''
  // })
  const [danhMuc, setDanhMuc] = useState([]);
  const [a, setA] = useState(true);

  // const handleInput = (e) => {
  //   let nameKey = e.target.name;
  //   let nameValue = e.target.value;
  //   setInput(state => ({...state,[nameKey]:nameValue}))
  // }

  // const handlerSubmit = (e) => {
  //   e.preventDefault();

  //   const data = {
  //     ten:input.ten,
  //     moTa:input.moTa
  //   }
  //   axios.post(api.getDanhMuc,data)
  //   .then(res => {
  //     console.log(res);
  //     setA(!a)
  //   })
  //   .catch(errors => console.log(errors))
  // }

  useEffect(() => {
    axios
      .get(api.getDanhMuc)
      .then((res) => {
        setDanhMuc(res.data.data);
      })
      .catch((errors) => console.log(errors));
  }, [a]);

  const onFinish = (values) => {
    axios
      .post(api.getDanhMuc, values)
      .then((res) => {
        console.log(res);
        setA(!a);
      })
      .catch((errors) => console.log(errors));
  };

  function deleteId(e) {
    let getId = e.target.value;
    axios
      .delete(api.getDanhMucId + getId)
      .then((res) => {
        setA(!a);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function checkId(item) {
    localStorage.setItem("danhmuc", JSON.stringify(item));
    navigation("/admin/sua_danh_muc");
  }

  const renderDanhMuc = () => {
    return danhMuc.map((item, index) => {
      return (
        <tr key={index}>
          <th scope="row">{index}</th>
          <td>{item.ten}</td>
          <td>{item.moTa}</td>
          <td>
            <button onClick={() => checkId(item)}>Sửa</button>
            <button value={item.idDanhMuc} onClick={deleteId}>
              Xóa
            </button>
          </td>
        </tr>
      );
    });
  };

  return (
    <>
      {/* <div className="d-flex align-items-center justify-content-center">
        <form onSubmit={handlerSubmit} className="width-500">
          <p className="form-title py-4">Thêm danh mục</p>
          <div className="input-container">
            <input
              type="text"
              name="ten"
              onChange={handleInput}
              placeholder="Nhập tên"
            />
            <span></span>
          </div>
          <div className="input-container pb-3">
            <input
              type="text"
              name="moTa"
              onChange={handleInput}
              placeholder="Nhập mô tả"
            />
          </div>
          <button
            type="submit"
            className="rounded-pill btn bg-secondary btn-width"
          >
            Thêm
          </button>
        </form>
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
            label="Ten danh mục"
            name="tieuDe"
            rules={[
              {
                required: true,
                message: "Nhập vào tên danh mục!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Nội dung"
            name="noiDung"
            rules={[
              {
                required: true,
                message: "Nhập vào nội dung danh mục",
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

      <div className="py-5">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Tên</th>
              <th scope="col">Mô tả</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>{renderDanhMuc()}</tbody>
        </table>
      </div>
    </>
  );
};

export default TrangDanhMuc;
