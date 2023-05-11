import React from "react";
import {AiOutlineDashboard, AiOutlineLogout, AiOutlineUserAdd, AiFillAppstore, AiOutlineComment} from "react-icons/ai";
import {BsBorderStyle, BsFillCalendarEventFill} from "react-icons/bs";
import {Outlet, useNavigate} from "react-router-dom";
import {FaProductHunt} from "react-icons/fa";
import {GoFileDirectory} from "react-icons/go";
import {Layout, Menu, theme} from "antd";
import Swal from "sweetalert2";

const {Sider, Content} = Layout;

const MainLayout = () => {
  const {
    token: {colorBgContainer},
  } = theme.useToken();
  const navigate = useNavigate();

  // check dang nhap
  let admin = JSON.parse(localStorage.getItem("taiKhoanAdmin"));
  if (!admin) {
    Swal.fire("Bạn phải đăng nhập").then(() => navigate("/"));
  }
  //////////////////////////////////
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={false}>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[""]}
          onClick={({key}) => {
            if (key === "signout") {
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
              label: "Danh mục",
            },
            {
              key: "/admin/trang_su_kien",
              icon: <BsFillCalendarEventFill className="fs-4" />,
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
        <Content
          style={{
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
