import React, { useEffect, useState } from "react";
import { BsSearch, BsFillCartCheckFill } from "react-icons/bs";
import { useNavigate, NavLink, Link } from "react-router-dom";
import api from "../components/urlApi";
import axios from "axios";
import Swal from "sweetalert2";

const Header = () => {
  let navigate = useNavigate();
  const [timKiemSach, setTimKiem] = useState("");
  const [danhMuc, setDanhMuc] = useState([]);

  // lay thong tin danh muc
  useEffect(() => {
    axios
      .get(api.getDanhMuc)
      .then((res) => {
        setDanhMuc(res.data.data);
      })
      .catch((errors) => console.log(errors));
  }, []);

  const tenKhachHang = () => {
    let getLocalStolore = JSON.parse(localStorage.getItem("khachHang"));
    if (getLocalStolore) {
      return getLocalStolore.ten;
    } else {
      return "Đăng nhập";
    }
  };

  // luu nhu gi khach hang nhap
  const handleSearch = (event) => {
    setTimKiem(event.target.value);
  };

  const rederDanhMuc = () => {
    return danhMuc.map((item, index) => {
      return (
        <li key={index}>
          <Link
            className="dropdown-item text-white"
            to={"/san_theo_danh_muc/" + item.idDanhMuc}
          >
            {item.ten}
          </Link>
        </li>
      );
    });
  };

  const dangXuat = () => {
    localStorage?.removeItem("dataKhachHang");
    localStorage?.removeItem("ten");
    localStorage?.removeItem("khachHang");
    localStorage?.removeItem("idKhachHang");
    navigate("dang_nhap");
  };

  const donHang = () => {
    navigate("/don_hang");
  };

  function renderTaiKhoan() {
    let getLocalStolore = localStorage.getItem("khachHang");
    if (getLocalStolore) {
      return (
        <>
          <li>
            <Link to="/cap_nhat_tai_khoan" className="dropdown-item">
              Tài khoản
            </Link>
          </li>

          <li>
            <button onClick={() => donHang()} className="dropdown-item">
              Đơn hàng
            </button>
          </li>
          <li>
            <button onClick={() => dangXuat()} className="dropdown-item">
              Đăng xuất
            </button>
          </li>
        </>
      );
    } else {
      return (
        <>
          <li>
            <Link to="/dang_ki" className="dropdown-item">
              Đăng kí
            </Link>
          </li>
          <li>
            <Link to="/dang_nhap" className="dropdown-item">
              Đăng nhập
            </Link>
          </li>
        </>
      );
    }
  }

  const timKiem = () => {
    if (timKiemSach === "") {
      Swal.fire(
        "Có vẻ bạn chưa nhập gì vào ô tìm kiếm?",
        "Vui lòng nhập từ khoá để thực hiện chức năng này",
        "info"
      );
    } else {
      window.localStorage.setItem("tuKhoaTimKiem", timKiemSach);
      window.location.href = `http://${api.ip}:3000/tim_kiem`;
    }
  };

  return (
    <div className="figtop">
      <header className="header-upper py-3">
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="col-2">
              <h2>
                <Link to="/" className="text-white">
                  QLBS
                </Link>
              </h2>
            </div>
            <div className="col-5">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control py-2"
                  placeholder="Tìm kiếm..."
                  onChange={handleSearch}
                  aria-label="Search Product Here..."
                  aria-describedby="basic-addon2"
                />
                <span className="input-group-text p-0" id="basic-addon2">
                  <button className="btn colorbutton" onClick={() => timKiem()}>
                    <BsSearch className="fs-6" />
                  </button>
                </span>
              </div>
            </div>
            <div className="col-5 text-start d-flex justify-content-end">
              <div className="header-upper-links d-flex align-items-center justify-content-between">
                <div>
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {tenKhachHang()}
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      {renderTaiKhoan()}
                    </ul>
                  </div>
                </div>
                <div className="mx-3">
                  <Link
                    to="/gio_hang"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <BsFillCartCheckFill />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <header className="header-bottom py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="menu-bottom d-flex align-items-center gap-30">
                <div className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle bg-transparent border-0 gap-15 d-flex align-items-center"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img alt="" />
                    <span className="me-5 d-inline-block">Danh mục</span>
                  </button>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton1"
                  >
                    {rederDanhMuc()}
                  </ul>
                </div>
                <div className="menu-links">
                  <div className="d-flex align-items-center gap-15">
                    <NavLink to="/" className="link">
                      Trang chủ
                    </NavLink>
                    {/* <NavLink to="/su_kien" className="link">
                      Thông tin sự kiện
                    </NavLink> */}
                    <NavLink to="/thong_tin_cua_hang" className="link">
                      Thông tin cửa hàng
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
