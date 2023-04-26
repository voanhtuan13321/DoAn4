import React, { useState } from "react";
import { BsBorderStyle, BsFillCalendarEventFill } from "react-icons/bs";
import { BiUserCircle } from "react-icons/bi";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { GoFileDirectory } from "react-icons/go";
import {
  AiOutlineDashboard,
  AiOutlineLogout,
  AiOutlineUserAdd,
  AiFillAppstore,
  AiOutlineComment,
} from "react-icons/ai";
import { FaProductHunt } from "react-icons/fa";
const Sidebar = ({ children }) => {
  let navigate = useNavigate();
  let admin = JSON.parse(localStorage.getItem("admin"));
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const menuItem = [
    {
      path: "/admin/don_hang",
      name: "Đơn đặt hàng",
      icon: <BsBorderStyle />,
    },
    {
      path: "/admin/trang_danh_muc",
      name: "Danh mục",
      icon: <GoFileDirectory />,
    },
    {
      path: "/admin/trang_su_kien",
      name: "Sự kiện",
      icon: <BsFillCalendarEventFill />,
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
      path: "/admin/trang_san_pham",
      name: "Sản phẩm",
      icon: <FaProductHunt />,
    },
    {
      path: "/admin/binh_luan",
      icon: <AiOutlineComment className="fs-4" />,
      name: "Bình luận",
    },
    {
      path: "/admin/thong_ke",
      icon: <AiOutlineDashboard className="fs-4" />,
      name: "Thống kê",
    },
    {
      path: "/",
      icon: <AiOutlineLogout className="fs-4" />,
      name: "Đăng xuất",
    },
  ];

  const thayDoi = () => {
    navigate("/admin/thay_doi_tai_khoan");
  };
  return (
    <div>
      <div className="header py-2">
        <div className="container">
          <div className="row">
            <div className="col-3">
              <img src="" />
            </div>
            <div className="col-9 d-flex align-items-center justify-content-end  ">
              <button onClick={thayDoi} className="btn">
                {/* <div className="widthIcon"> */}
                <BiUserCircle /> {admin}
                {/* </div> */}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="width vh-100">
        <div style={{ width: "180px" }} className="sidebar">
          {/* <div className="top_section">
            <div
              style={{ marginLeft: isOpen ? "50px" : "0px" }}
              className="bars"
            ></div>
          </div> */}
          {menuItem.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              className="link"
              activeclassName="active"
            >
              <div className="icon">{item.icon}</div>
              <div
                // style={{ display: isOpen ? "block" : "none" }}
                className="link_text"
              >
                {item.name}
              </div>
            </NavLink>
          ))}
        </div>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Sidebar;
