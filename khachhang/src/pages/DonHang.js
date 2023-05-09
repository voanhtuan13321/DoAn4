import React, { useEffect, useState } from "react";
import axios from "axios";
const DonHang = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get();
  }, []);
  return (
    <div className="mh700 mt150px">
      <table class="table caption-top">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">Mã đơn hàng</th>
            <th scope="col">Sản phẩm</th>
            <th scope="col">Hình ảnh</th>
            <th scope="col">Số lượng</th>
            <th scope="col">Ngày mua</th>
            <th scope="col">Trạng thái</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row"></th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DonHang;
