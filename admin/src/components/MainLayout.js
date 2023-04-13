import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import {
  AiOutlineDashboard,
  AiOutlineShoppingCart,
  AiOutlineUser,
  AiOutlineBgColors,
} from "react-icons/ai";
import { RiCouponLine } from "react-icons/ri";

import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { ImBlog } from "react-icons/im";
import { IoIosNotifications } from "react-icons/io";
import { FaClipboardList, FaBloggerB } from "react-icons/fa";
import { SiBrandfolder } from "react-icons/si";
import { BiCategoryAlt } from "react-icons/bi";
import { Layout, Menu, theme } from "antd";
import { useNavigate } from "react-router-dom";
const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  return (
    <Layout /* onContextMenu={(e) => e.preventDefault()} */>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <h2 className="text-white fs-5 text-center py-3 mb-0">
            <span className="sm-logo">DC</span>
            <span className="lg-logo">Dev Corner</span>
          </h2>
        </div>
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
              key: "/admin/thong_ke",
              icon: <AiOutlineDashboard className="fs-4" />,
              label: "Thống kê",
            },
            {
              key: "/admin/trang_danh_muc",
              icon: <AiOutlineUser className="fs-4" />,
              label: "Danh Mục",
            },
            {
              key: "/admin/trang_su_kien",
              icon: <AiOutlineShoppingCart className="fs-4" />,
              label: "Sự kiện",
            },
            {
              key: "/admin/trang_khach_hang",
              icon: <FaClipboardList className="fs-4" />,
              label: "Khách hàng",
            },
            {
              key: "/admin/trang_cua_hang",
              icon: <RiCouponLine className="fs-4" />,
              label: "Cửa hàng",
            },
            {
              key: "/admin/trang_san_pham",
              icon: <FaClipboardList className="fs-4" />,
              label: "Sản phẩm",
            },
            {
              key: "/admin/don_hang",
              icon: <FaClipboardList className="fs-4" />,
              label: "Đơn đặt hàng",
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="d-flex justify-content-between ps-1 pe-5"
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
