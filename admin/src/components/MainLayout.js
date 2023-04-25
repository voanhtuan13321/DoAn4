import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import {
  AiOutlineDashboard,
  AiOutlineShoppingCart,
  AiOutlineLogout,
  AiOutlineUserAdd,
  AiFillAppstore,
  AiOutlineComment,
} from "react-icons/ai";
import { BsBorderStyle } from "react-icons/bs";

import { Outlet } from "react-router-dom";

import { FaProductHunt } from "react-icons/fa";
import { GoFileDirectory } from "react-icons/go";
import { Layout, Menu, theme } from "antd";
import { useNavigate } from "react-router-dom";
const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();

  // Kiểm tra đăng nhập hay chưa
  // let dangNhap = JSON.parse(localStorage.getItem("dangNhapAdmin"));
  // if (!dangNhap) {
  //   alert("Vui lòng đăng nhập");
  //   navigate("/");
  // }
  //////////////////////////////////
  return (
    <Layout /* onContextMenu={(e) => e.preventDefault()} */>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo"></div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[""]}
          onClick={({ key }) => {
            if (key == "signout") {
            } else {
              navigate(key);
            }
          }}
          items={[
            {
              key: "/admin/don_hang",
              icon: <BsBorderStyle className="fs-4" />,
              label: "Đơn đặt hàng",
            },
            {
              key: "/admin/trang_danh_muc",
              icon: <GoFileDirectory className="fs-4" />,
              label: "Danh Mục",
            },
            {
              key: "/admin/trang_su_kien",
              icon: <AiOutlineShoppingCart className="fs-4" />,
              label: "Sự kiện",
            },
            {
              key: "/admin/trang_khach_hang",
              icon: <AiOutlineUserAdd className="fs-4" />,
              label: "Khách hàng",
            },
            {
              key: "/admin/trang_cua_hang",
              icon: <AiFillAppstore className="fs-4" />,
              label: "Cửa hàng",
            },
            {
              key: "/admin/trang_san_pham",
              icon: <FaProductHunt className="fs-4" />,
              label: "Sản phẩm",
            },

            {
              key: "/admin/binh_luan",
              icon: <AiOutlineComment className="fs-4" />,
              label: "Bình luận",
            },
            {
              key: "/admin/thong_ke",
              icon: <AiOutlineDashboard className="fs-4" />,
              label: "Thống kê",
            },
            {
              key: "/",
              icon: <AiOutlineLogout className="fs-4" />,
              label: "Đăng xuất",
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="d-flex justify-content-between ps-1 pe-2"
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
