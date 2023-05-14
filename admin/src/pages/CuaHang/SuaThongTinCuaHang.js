import React, {useState} from "react";
import axios from "axios";
import api from "../../components/urlApi";
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";

const SuaThongTinCuaHang = () => {
  let navigate = useNavigate();
  const item = JSON.parse(localStorage.getItem("cuahang"));

  // check dang nhap
  let admin = JSON.parse(localStorage.getItem("taiKhoanAdmin"));
  if (!admin) {
    Swal.fire("Bạn phải đăng nhập").then(() => navigate("/"));
  }

  const [input, setInput] = useState({
    id: item.id,
    tenCuaHang: item.tenCuaHang,
    moTa: item.moTa,
    soDienThoai: item.soDienThoai,
    diaChi: item.diaChi,
    website: item.website,
    email: item.email,
  });

  let [errTen, setErrTen] = useState("");
  let [errMoTa, setErrMoTa] = useState("");
  let [errSoDienThoai, setErrSoDienThoai] = useState("");
  let [errDiaChi, setErrDiaChi] = useState("");
  let [errWebsite, setErrWebsite] = useState("");
  let [errEmail, setErrEmail] = useState("");

  console.log(input.id);
  const [a, setA] = useState(false);

  // Hàm kiểu tra só điện thoại nhập vào
  function kiemTraSoDienThoai(value) {
    const phoneNumberRegex = /^\d{10}$/;
    return phoneNumberRegex.test(value);
  }

  // Hàm kiểu tra email nhập vào
  function kiemTraEmail(value) {
    const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    return emailRegex.test(value);
  }

  const handleInput = (e) => {
    let nameKey = e.target.name;
    let nameValue = e.target.value;
    setInput((state) => ({...state, [nameKey]: nameValue}));
  };

  const handlerSubmit = (e) => {
    e.preventDefault();
    let check = 1;

    if (input.tenCuaHang === "") {
      setErrTen("Vui lòng nhập vào tên cửa hàng");
    }
    if (input.diaChi === "") {
      setErrDiaChi("Vui lòng nhập vào địa chỉ cửa hàng");
    }
    if (input.moTa === "") {
      setErrMoTa("Vui lòng nhập vào mô tả cửa hàng");
    }
    if (input.website === "") {
      setErrWebsite("Vui lòng nhập vào website cửa hàng");
    }
    if (input.soDienThoai === "") {
      check = 2;
      setErrSoDienThoai("Yêu cầu nhập vào số điện thoại");
      return;
    } else {
      if (!kiemTraSoDienThoai(input.soDienThoai)) {
        check = 2;
        setErrSoDienThoai("Yêu cầu nhập vào số điện thoại hợp lệ");
        return;
      } else {
        check = 1;
        setErrSoDienThoai("");
      }
    }
    if (input.email === "") {
      check = 2;
      setErrEmail("Yêu cầu nhập vào email cửa hàng");
      return;
    } else {
      if (!kiemTraEmail(input.email)) {
        check = 2;
        setErrEmail("Email không không hợp lệ");
        return;
      } else {
        check = 1;
        setErrEmail("");
      }
    }

    const data = {
      id: input.id,
      tenCuaHang: input.tenCuaHang,
      moTa: input.moTa,
      soDienThoai: input.soDienThoai,
      diaChi: input.diaChi,
      website: input.website,
      email: input.email,
    };

    axios
      .post(api.cuaHang, data)
      .then((res) => {
        setA(!a);
        Swal.fire("Cập nhật thành công").then(() => navigate("/admin/trang_cua_hang"));
      })
      .catch((errors) => console.log(errors));
  };
  const troLai = () => {
    navigate("/admin/trang_cua_hang");
  };
  return (
    <div className="pl5px">
      <button className="btn btn-outline-success" onClick={troLai}>
        <p className="fs14 mb-0">Trở lại</p>
      </button>
      <div className="d-flex align-items-center justify-content-center">
        <form onSubmit={handlerSubmit} className="width-500">
          <p className="form-title py-4">Cập nhật thông tin của hàng</p>
          <div className="d-flex">
            <div className="pr-5">
              <div className="input-container">
                <label className="input_label">Tên cửa hàng</label>
                <input
                  type="text"
                  name="tenCuaHang"
                  onChange={handleInput}
                  value={input.tenCuaHang}
                  placeholder="Nhập tên cửa hàng"
                />
                <p className="error">{errTen}</p>
              </div>
              <div className="input-container">
                <label className="input_label">NHập mô tả</label>
                <input type="text" name="moTa" value={input.moTa} onChange={handleInput} placeholder="Nhập mô tả" />
                <p className="error">{errMoTa}</p>
              </div>
              <label className="input_label">Nhập số điện thoại</label>
              <div className="input-container">
                <input
                  type="text"
                  name="soDienThoai"
                  value={input.soDienThoai}
                  onChange={handleInput}
                  placeholder="Nhập số điện thoại"
                />
                <p className="error">{errSoDienThoai}</p>
              </div>
            </div>
            <div>
              <div className="input-container">
                <label className="input_label">Nhập địa chỉ</label>
                <input
                  type="text"
                  name="diaChi"
                  value={input.diaChi}
                  onChange={handleInput}
                  placeholder="Nhập số điạ chỉ"
                />
                <p className="error">{errDiaChi}</p>
              </div>
              <div className="input-container">
                <label className="input_label">NHập website</label>
                <input type="text" name="website" value={input.website} onChange={handleInput} placeholder="Website" />
                <p className="error">{errWebsite}</p>
              </div>
              <div className="input-container pb-3">
                <label className="input_label">Nhập email cửa hàng</label>
                <input type="text" name="email" value={input.email} onChange={handleInput} placeholder="Email" />
                <p className="error">{errEmail}</p>
              </div>
            </div>
          </div>

          <button type="submit" className="rounded-pill btn bg-secondary btn-width">
            Cập nhật
          </button>
        </form>
      </div>
    </div>
  );
};

export default SuaThongTinCuaHang;
