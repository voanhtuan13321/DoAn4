import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import api from "../../components/urlApi";

import { useNavigate } from "react-router-dom";

const TrangSuaSuKien = () => {
  let navigate = useNavigate();
  let admin = JSON.parse(localStorage.getItem("admin"));
  if (!admin) {
    alert("Bạn phải đăng nhập");
    navigate("/");
  }
  const item = JSON.parse(localStorage.getItem("sukien"));
  const [input, setInput] = useState({
    id: item.id,
    tieuDe: item.tieuDe,
    noiDung: item.noiDung,
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
      setErrTieuDe("Yêu cầu nhập tiêu đề");
    } else {
      check = 1;
      setErrTieuDe("");
    }
    if (input.noiDung == "") {
      check = 2;
      setErrNoiDung("Yêu cầu nhập nội dung");
    } else {
      check = 1;
      setErrNoiDung("");
    }

    if (check === 1) {
      const data = {
        id: input.id,
        tieuDe: input.tieuDe,
        noiDung: input.noiDung,
      };

      axios
        .post(api.suKien, data)
        .then((res) => {
          alert("Cập nhật thành công");
          navigate("/admin/xem_su_kien");
        })
        .catch((errors) => console.log(errors));
    }
  };
const xemSuKien = () => {
  navigate("/admin/xem_su_kien");
};
return (
  <>
    <div className="container-xxl">
      <button className="btn btn-outline-success" onClick={xemSuKien}>
        Xem sự kiện
      </button>
      <div className="row">
        <div className="col-3"></div>
        <div className="col-6">
          <form onSubmit={handlerSubmit}>
            <div className="mb-3 text-center fsinput">
              <b className="form-label">Cập nhật sự kiện</b>
            </div>
            <div className="mb-3">
              <label className="form-label">Nhập tiêu đề</label>
              <input
                type="text"
                name="tieuDe"
                placeholder="Nhập tiêu đề"
                onChange={handleInput}
                value={input.tieuDe}
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
                value={input.noiDung}
                className="form-control"
                id="exampleInputPassword1"
              />
              <p className="error">{errNoiDung}</p>
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary">
                Cập nhật sự kiện
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

export default TrangSuaSuKien;
