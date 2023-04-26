import React, { useState } from "react";
import { BsBorderStyle, BsFillCalendarEventFill } from "react-icons/bs";
import { NavLink, Outlet } from "react-router-dom";
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
  return (
    <div>
      <div className="header">
        <div className="container">
          <div className="row">
            <div className="col-3">ewewe</div>
            <div className="col-3">wew</div>
          </div>
        </div>
      </div>
      <div className="width">
        <div style={{ width: "200px" }} className="sidebar">
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
