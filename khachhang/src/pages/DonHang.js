import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../components/urlApi";
import Swal from "sweetalert2";
const DonHang = () => {
  let idKhachHang = JSON.parse(localStorage.getItem("idKhachHang"));
  // console.log(idKhachHang);
  const [data, setData] = useState([]);
  const [a, setA] = useState(true);
  useEffect(() => {
    axios
      .get(api.donHang + "/" + idKhachHang)
      .then((res) => setData(res.data.data));
  }, [a]);

  console.log(data);

  const deleteId = (item) => {
    console.log(item);

    // console.log(id);
    axios
      .delete(api.donHang + "/cancel/" + item.id)
      .then((res) => {
        Swal.fire("ĐƠn hàng đả huỷ");
        setA(!a);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const donHang = () => {
    const today = new Date();

    if (data.length > 0) {
      return data?.map((item, index) => {
        const ngayMua = new Date(item.ngayMua);
        const isCungNgayHienTai =
          today.getDate() === ngayMua.getDate() &&
          today.getMonth() === today.getMonth() &&
          today.getFullYear() === ngayMua.getFullYear();
        return (
          <tr key={index}>
            <th scope="row">{index}</th>
            <td>
              <p className="fs14 mb-0">{item.maDonHang}</p>
            </td>
            <td>
              <p className="fs14 mb-0">{item["sach"].ten}</p>
            </td>
            <td>
              <img className="wh" src={api.img + item["sach"].hinhAnh} />
            </td>
            <td>
              <p className="fs14 mb-0">{item.soLuong}</p>
            </td>
            <td>
              <p className="fs14 mb-0">{item.ngayMua}</p>
            </td>
            <td>
              <p className="fs14 mb-0">{item.trangThai}</p>
            </td>
            <td>
              {!isCungNgayHienTai ? (
                ""
              ) : (
                <button
                  className="btn btn-outline-danger fw-bolder"
                  data-value={item.id}
                  onClick={() => deleteId(item)}
                >
                  <p className="fs10 mb-0">Huỷ đơn hàng</p>
                </button>
              )}
            </td>
          </tr>
        );
      });
    } else {
      <p className="text-center">Không có đơn hàng</p>;
    }
  };
  return (
    <div className="container-xxl">
      <div className="mh700 mt150px">
        <table className="table caption-top">
          <thead>
            <tr>
              <th scope="col">STT</th>
              <th scope="col">Mã đơn hàng</th>
              <th scope="col">Sản phẩm</th>
              <th scope="col">Hình ảnh</th>
              <th scope="col">Số lượng</th>
              <th scope="col">Ngày đặt</th>
              <th scope="col">Trạng thái</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>{donHang()}</tbody>
        </table>
      </div>
    </div>
  );
};

export default DonHang;
