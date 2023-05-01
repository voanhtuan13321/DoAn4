import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../../components/urlApi";
import { useNavigate } from "react-router-dom";
const SuaDanhMuc = () => {
  let navigate = useNavigate();
  const item = JSON.parse(localStorage.getItem("danhmuc"));
  const [input, setInput] = useState({
    idDanhMuc: item.idDanhMuc,
    ten: item.ten,
    moTa: item.moTa,
  });
  const [a, setA] = useState(false);
  let [errTen, setErrTen] = useState("");
  let [errMoTa, setErrMoTa] = useState("");
  const handleInput = (e) => {
    let nameKey = e.target.name;
    let nameValue = e.target.value;
    setInput((state) => ({ ...state, [nameKey]: nameValue }));
  };

  const handlerSubmit = (e) => {
    e.preventDefault();

    let check = 1;
    if (input.ten === "") {
      check = 2;
      setErrTen("Bạn chưa nhập vào tên");
    } else {
      check = 1;
      setErrTen("");
    }

    if (input.moTa === "") {
      check = 2;
      setErrMoTa("Bạn chưa nhập mô tả");
    } else {
      check = 1;
      setErrMoTa("");
    }

    if (check == 1) {
      const data = {
        idDanhMuc: input.idDanhMuc,
        ten: input.ten,
        moTa: input.moTa,
      };
      console.log(data);
      axios
        .post(api.getDanhMuc, data)
        .then((res) => {
          alert("Sửa thành công");
          navigate("/admin/xem_danh_muc");
          setA(!a);
        })
        .catch((errors) => console.log(errors));
    }
  };
  const suaDanhMuc = () => {
    navigate("/admin/xem_danh_muc");
  };
  return (
    <div className="container-xxl ">
      <button className="btn btn-outline-success" onClick={suaDanhMuc}>
        <p className="fs14 mb-0">Xem danh mục</p>
      </button>
      <div className="row">
        <div className="col-3"></div>
        <div className="col-6">
          <form onSubmit={handlerSubmit}>
            <div className="mb-3 text-center fsinput">
              <b className="form-label">Cập nhật danh mục</b>
            </div>
            <div className="mb-3">
              <label className="form-label">Nhập tên</label>
              <input
                type="text"
                name="ten"
                placeholder="Nhập tên danh mục"
                onChange={handleInput}
                value={input.ten}
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
              <p className="error">{errTen}</p>
            </div>
            <div className="mb-3">
              <label className="form-label">Nhập mô tả</label>
              <textarea
                type="text"
                name="moTa"
                rows={5}
                placeholder="Nhập mô tả danh mục"
                onChange={handleInput}
                value={input.moTa}
                className="form-control"
                id="exampleInputPassword1"
              />
              <p className="error">{errMoTa}</p>
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary">
                Cập nhật danh mục
              </button>
            </div>
          </form>
        </div>
        <div className="col-3"></div>
      </div>
    </div>
  );
};

export default SuaDanhMuc;
