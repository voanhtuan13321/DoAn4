import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../../components/urlApi";
import { useNavigate, Link } from "react-router-dom";

const ThemSuKien = () => {
  let navigate = useNavigate();
  // let admin = JSON.parse(localStorage.getItem("admin"));
  // if (!admin) {
  //   alert("Bạn phải đăng nhập");
  //   navigation("/");
  // }

  const [input, setInput] = useState({
    tieuDe: "",
    noiDung: "",
  });

  let [errTieuDe, setErrTieuDe] = useState("");
  let [errNoiDung, setErrNoiDung] = useState("");

  const handleInput = (e) => {
    let nameKey = e.target.name;
    let nameValue = e.target.value;
    setInput((state) => ({ ...state, [nameKey]: nameValue }));
  };

  const handlerSubmit = (e) => {
    e.preventDefault();
    let check = 1;
    if (input.tieuDe == "") {
      check = 2;
      setErrTieuDe("Yêu cầu nhập vào tiêu đề");
      return;
    } else {
      check = 1;
      setErrTieuDe("");
    }
    if (input.noiDung == "") {
      check = 2;
      setErrNoiDung("Yêu cầu nhập vào nội dung");
      return;
    } else {
      check = 1;
      setErrNoiDung("");
    }

    if (check == 1) {
      const data = {
        tieuDe: input.tieuDe,
        noiDung: input.noiDung,
      };
      axios
        .post(api.suKien, data)
        .then((res) => {
          alert("Thêm sự kiện thành công");
        })
        .catch((errors) => console.log(errors));
    }
  };

  const xemSuKien = () => {
    navigate("/admin/xem_su_kien");
  };

  return (
    <div className="">
      <button className="btn btn-outline-success" onClick={xemSuKien}>
        Xem sự kiện
      </button>
      <div className="container-xxl">
        <div className="row">
          <div className="col-3"></div>
          <div className="col-6">
            <form onSubmit={handlerSubmit}>
              <div className="mb-3 text-center fsinput">
                <b className="form-label">Thêm sự kiện</b>
              </div>
              <div className="mb-3">
                <label className="form-label">Nhập tiêu đề</label>
                <input
                  type="text"
                  name="tieuDe"
                  placeholder="Nhập tiêu đề"
                  onChange={handleInput}
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
                <p className="error">{errTieuDe}</p>
              </div>
              <div className="mb-3">
                <label className="form-label">Nhập nội dung</label>
                <textarea
                  type="text"
                  name="noiDung"
                  rows={5}
                  placeholder="Nhập nội dung"
                  onChange={handleInput}
                  className="form-control"
                  id="exampleInputPassword1"
                />
                <p className="error">{errNoiDung}</p>
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-primary">
                  Thêm sự kiện
                </button>
              </div>
            </form>
          </div>
          <div className="col-3"></div>
        </div>
      </div>
    </div>
  );
};

export default ThemSuKien;
