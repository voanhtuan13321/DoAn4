import React from 'react'
import { Link } from 'react-router-dom'
const DanhMuc = () => {
    const quanli = [
        {
          key:'Quản lí danh mục',
          label:'/admin/trang_quan_ly_danhmuc'
        },
        {
          key:'Quản lí sản phẩm',
          label:'/admin/trang_quan_ly_san_pham'
        },
        {
          key:'Thống kê',
          label:'/admin/thong_ke'
        },
        {
          key:'Quản lí sự kiện',
          // icon:
          label:'/admin/trang_su_kien'
        },{
          key:'Quản lý người dùng',
          // icon:
          label:'/admin/trang_quan_ly_nguoi_dung'
        },{
          key:'Thông tin cửa hàng',
          // icon:
          label:'/admin/trang_thong_tin_cua_hang'
        }
      ]
  return (
    <div>
      <h4>Danh mục</h4>
         <ul className="list-unstyled ps-0">
          <li className="mb-1">
            <Link to>
              Home
            </Link>
          </li>
          <li className="mb-1">
            <Link to>
              Dashboard
            </Link>
          </li>
          <li className="mb-1">
            <Link to>
              Orders
            </Link>
          </li>
        </ul>
    </div>

     


  )
}

export default DanhMuc