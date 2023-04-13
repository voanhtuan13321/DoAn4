import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../../components/urlApi";

const TrangDonHang = () => {
  // const [data, setData] = useState([]);
  const data = {
    trangThai: "thanh_toan",
  };
  useEffect(() => {
    axios
      .get(api.gioHang + "?trangThai=thanh_toan")
      .then((res) => {
        console.log(res);
        // setA(!a);
      })
      .catch((errors) => console.log(errors));
  });
  return (
    <div>
      <div className="py-5">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Tên</th>
              <th scope="col">Tác giả</th>
              <th scope="col">Nhà xuất bản</th>
              <th scope="col">Giá sách</th>
              <th scope="col">Số lượng</th>
              <th scope="col">Khuyến mãi</th>
              <th scope="col">Ảnh</th>
              <th scope="col"></th>
            </tr>
          </thead>
          {/* <tbody>{rederSanPham()}</tbody> */}
        </table>
      </div>
    </div>
  );
};

export default TrangDonHang;
