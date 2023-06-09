import React, { useState } from "react";
import { BsBorderStyle, BsFillCalendarEventFill } from "react-icons/bs";
import { BiUserCircle } from "react-icons/bi";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { GoFileDirectory } from "react-icons/go";
import { AiOutlineDashboard, AiOutlineUserAdd, AiFillAppstore, AiOutlineComment } from "react-icons/ai";
import { FaProductHunt } from "react-icons/fa";
import api from "./urlApi";
import axios from "axios";
import Swal from "sweetalert2";

const Sidebar = () => {
  const [timKiemSach, setTimKiem] = useState("");
  let navigate = useNavigate();
  let admin = JSON.parse(localStorage.getItem("admin"));
  const menuItem = [
    {
      path: "/admin/don_hang",
      name: "Đơn đặt hàng",
      icon: <BsBorderStyle />,
    },
    {
      path: "/admin/xem_danh_muc",
      name: "Danh mục",
      icon: <GoFileDirectory />,
    },
    {
      path: "/admin/trang_khach_hang",
      name: "Khách hàng",
      icon: <AiOutlineUserAdd />,
    },
    {
      path: "/admin/trang_cua_hang",
      name: "Cửa hàng",
      icon: <AiFillAppstore />,
    },
    {
      path: "/admin/xem_san_pham",
      name: "Sản phẩm",
      icon: <FaProductHunt />,
    },
    {
      path: "/admin/binh_luan",
      icon: <AiOutlineComment className="fs-4" />,
      name: "Phản hồi/góp ý",
    },
    {
      path: "/admin/thong_ke",
      icon: <AiOutlineDashboard className="fs-4" />,
      name: "Thống kê",
    },
  ];

  const handleSearch = (event) => {
    setTimKiem(event.target.value);
  };

  const dangXuat = () => {
    localStorage.removeItem("admin");
    navigate("/");
  };

  const capNhatTaiKhoan = () => {
    navigate("/admin/cap_nhat_tai_khoan");
  };

  const timKiem = () => {
    if (timKiemSach === "") {
      Swal.fire("Có vẻ bạn chưa nhập gì vào ô tìm kiếm?", "Vui lòng nhập từ khoá để thực hiện chức năng này", "info");
    } else {
      axios.get(api.timKiem, { params: { search: timKiemSach } }).then((res) => {
        localStorage.setItem("timKiemSach", JSON.stringify(res.data.data));
        window.location.href = `http://${api.ip}:2000/admin/tim_kiem`;
      });
    }
  };
  return (
    <div className="h100">
      <div className="header py-2">
        <div className="container">
          <div className="row">
            <div className="col-2">
              <h2 className="text-white mb-0">QLBS</h2>
            </div>
            <div className="col-5">
              <div className="d-flex">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Tìm kiếm sách"
                  onChange={handleSearch}
                  aria-label="Search"
                />
                <button onClick={timKiem} className="btn btn-outline-success" type="submit">
                  <BsSearch />
                </button>
              </div>
            </div>
            <div className="col-5 d-flex align-items-center justify-content-end  ">
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false">
                  <BiUserCircle /> {admin}
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                  <li>
                    <button className="btn w-100 fs-6 text" onClick={dangXuat}>
                      <span className="text12">Đăng xuất</span>
                    </button>
                  </li>
                  <li>
                    <button className="btn w-100 fs-6 text" onClick={capNhatTaiKhoan}>
                      <span className="text12">Cập nhật thông tin</span>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex vh-100 mt55px">
        <div className="sidebar">
          {menuItem.map((item, index) => (
            <NavLink to={item.path} key={index} className="link">
              <div key={index}>{item.icon}</div>
              <div className="link_text">{item.name}</div>
            </NavLink>
          ))}
        </div>
        <div className="content mt60px">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
