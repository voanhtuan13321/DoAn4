import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../../components/urlApi";
import { useNavigate } from "react-router-dom";

const TrangDanhMuc = () => {
  let navigate = useNavigate();

  const [input, setInput] = useState({
    ten: "",
    moTa: "",
  });
  const [a, setA] = useState(true);

  let [errTen, setErrTen] = useState("");
  let [errMota, setErrMoTa] = useState("");

  const handleInput = (e) => {
    let nameKey = e.target.name;
    let nameValue = e.target.value;
    setInput((state) => ({ ...state, [nameKey]: nameValue }));
  };

  const handlerSubmit = (e) => {
    e.preventDefault();
    let check = 1;
    if (input.ten == "") {
      check = 2;
      setErrTen("Yêu cầu nhập vào tên");
      return;
    } else {
      check = 1;
      setErrTen("");
    }
    if (input.moTa == "") {
      check = 2;
      setErrMoTa("Yêu cầu nhập vào mô tả");
      return;
    } else {
      check = 1;
      setErrMoTa("");
    }

    if (check == 1) {
      const data = {
        ten: input.ten,
        moTa: input.moTa,
      };
      axios
        .post(api.getDanhMuc, data)
        .then((res) => {
          alert("Thêm danh mục thành công");

          setA(!a);
        })
        .catch((errors) => console.log(errors));
    }
  };

  const xemDanhMuc = () => {
    navigate("/admin/xem_danh_muc");
  };

  return (
    <>
      <div className="container-xxl">
        <button className="btn btn-outline-success" onClick={xemDanhMuc}>
          Xem danh mục
        </button>
        <div className="row">
          <div className="col-3"></div>
          <div className="col-6">
            <form onSubmit={handlerSubmit}>
              <div className="mb-3 text-center fsinput">
                <b className="form-label">Thêm danh mục</b>
              </div>
              <div className="mb-3">
                <label className="form-label">Nhập tên</label>
                <input
                  type="text"
                  name="ten"
                  placeholder="Nhập tên danh mục"
                  onChange={handleInput}
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
                  className="form-control"
                  id="exampleInputPassword1"
                />
                <p className="error">{errMota}</p>
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-primary">
                  Thêm danh mục
                </button>
              </div>
            </form>
          </div>
          <div className="col-3"></div>
        </div>
      </div>
    </>
  );
};

export default TrangDanhMuc;
