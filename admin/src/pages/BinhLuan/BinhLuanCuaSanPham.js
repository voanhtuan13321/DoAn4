import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import api from "../../components/urlApi";

const BinhLuanCuaSanPham = () => {
  const params = useParams();
  const [binhLuanIdSach, setBinhLuanIdSach] = useState([]);

  // Gọi api của sản phẩm đó để xem các bình luận của sản phẩm
  useEffect(() => {
    axios.get(api.binhLuan + "/" + params.id).then((res) => {
      setBinhLuanIdSach(res.data.data);
    });
  }, []);

  const binhLuan = () => {
    return binhLuanIdSach.map((item, index) => {
      const date = new Date(Date.parse(item.dateTime));
      const gio = date.getHours();
      const phut = date.getMinutes();
      const ngay = date.getDate();
      const thang = date.getMonth() + 1;
      const nam = date.getFullYear();
      const thoiGian = `${gio}:${phut} ${ngay}/${thang}/${nam}`;

      return (
        <tr key={index}>
          <th scope="row">{index}</th>
          <td>{item["khachHang"].ten}</td>
          <td>{item.noiDung}</td>
          <td>{thoiGian}</td>
        </tr>
      );
    });
  };

  return (
    <div className="py-5">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Tên khách hàng</th>
            <th scope="col">Nội dung binhg luận</th>
            <th scope="col">Thời gian</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>{binhLuan()}</tbody>
      </table>
    </div>
  );
};

export default BinhLuanCuaSanPham;
