import React from "react";
import api from "../../components/urlApi";

const TimKiem = () => {
  let sach = JSON.parse(localStorage.getItem("timKiemSach"));
  console.log(sach);
  if (sach == "") {
    return (
      <div className="container-xxl py-5 mh400 text-center">
        <h3>Không tìm thấy sản phẩm</h3>
      </div>
    );
  }

  const rederSanPham = () => {
    return sach.map((item, index) => {
      return (
        <tr key={index}>
          <td scope="col">
            <p className="fs14">{index}</p>
          </td>
          <td scope="col">
            <p className="fs14">{item.ten}</p>
          </td>
          <td scope="col">
            <p className="fs14">{item.tacGia}</p>
          </td>
          <td scope="col">
            <p className="fs14">{item.ngayXuatBan}</p>
          </td>
          <td scope="col">
            <p className="fs14">
              {" "}
              {item.giaSach.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </p>
          </td>
          <td scope="col">
            <p className="fs14">{item.soLuong}</p>
          </td>

          <td scope="col">
            <img
              className="img-thumbnail image-w image-h"
              src={api.img + item.hinhAnh}
            />
          </td>
        </tr>
      );
    });
  };

  return (
    <>
      <div className="py-5">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">
                <p className="fs14 mb-0">Tên</p>
              </th>
              <th scope="col">
                <p className="fs14 mb-0">Tác giả</p>
              </th>
              <th scope="col">
                <p className="fs14 mb-0">Nhà xuất bản</p>
              </th>
              <th scope="col">
                <p className="fs14 mb-0">Giá sách</p>
              </th>
              <th scope="col">
                <p className="fs14 mb-0">Số lượng</p>
              </th>
              <th scope="col">
                <p className="fs14 mb-0">Ảnh</p>
              </th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>{rederSanPham()}</tbody>
        </table>
      </div>
    </>
  );
};

export default TimKiem;
