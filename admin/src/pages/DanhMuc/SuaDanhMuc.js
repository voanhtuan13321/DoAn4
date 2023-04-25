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
          navigate("/admin/trang_danh_muc");
          setA(!a);
        })
        .catch((errors) => console.log(errors));
    }
  };
  return (
    <div className="d-flex justify-content-center py-5">
      <form className="form" onSubmit={handlerSubmit}>
        <p className="form-title">Sửa danh mục</p>
        <div className="input-container">
          <input
            type="text"
            name="ten"
            value={input.ten}
            onChange={handleInput}
            placeholder="Nhập tên"
          />
          <span className="error">{errTen}</span>
        </div>
        <div className="input-container">
          <input
            type="text"
            name="moTa"
            value={input.moTa}
            onChange={handleInput}
            placeholder="Nhập mô tả"
          />
        </div>
        <span className="error">{errMoTa}</span>
        <button type="submit" className="submit">
          Sửa
        </button>
      </form>
    </div>
  );
};

export default SuaDanhMuc;
