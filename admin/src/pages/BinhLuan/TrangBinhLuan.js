import React, { useState, useEffect } from "react";
import axios from "axios";
import api from "../../components/urlApi";
import { GrView } from "react-icons/gr";
import { useNavigate } from "react-router-dom";

const TrangBinhLuan = () => {
  let navigate = useNavigate();

  // Kiểm tra đăng nhập hay chưa
  let dangNhap = JSON.parse(localStorage.getItem("dangNhapAdmin"));
  if (!dangNhap) {
    alert("Vui lòng đăng nhập");
    navigate("/");
  }
  //////////////////////////////////
  const [binhLuan, setBinhLuan] = useState([]);
  const [a, setA] = useState(true);

  // Gọi api lấy tất cả các sản phẩm có bình luận ra
  useEffect(() => {
    axios
      .get(api.binhLuan)
      .then((res) => {
        console.log(res);
        setBinhLuan(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [a]);

  const sanPham = () => {
    return binhLuan.map((item, index) => {
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
          <td>{item.ten}</td>
          <td>{item.tacGia}</td>
          <td>{item.nhaXuatBan}</td>
          <td>{item.giaSach}</td>
          <td>{item.ngayXuatBan}</td>
          <td>
            <button
              onClick={() => xemBinhLuan(item.idSach)}
              className="btn btn-success text-white"
            >
              <GrView />
            </button>
          </td>
        </tr>
      );
    });
  };

  // Xem bình luận của sản phẩm đó
  const xemBinhLuan = (idBinhLuan) => {
    navigate(`/admin/xem_binh_luan/${idBinhLuan}`);
  };

  return (
    <div className="py-5">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Tên</th>
            <th scope="col">Tác giả</th>
            <th scope="col">Nhà xuất bản</th>
            <th scope="col">Giá </th>
            <th scope="col">Ngày xuất bản</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>{sanPham()}</tbody>
      </table>
    </div>
  );
};

export default TrangBinhLuan;
