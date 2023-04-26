import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../../components/urlApi";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
const TrangDonHang = () => {
  const ITEMS_PER_PAGE = 15;
  let navigation = useNavigate();

  // let admin = JSON.parse(localStorage.getItem("admin"));
  // if (!admin) {
  //   alert("Bạn phải đăng nhập");
  //   navigation("/");
  // }
  const [data, setData] = useState([]);
  // Gọi các đơn hàng trong giỏ hàng
  useEffect(() => {
    axios
      .get(api.gioHang + "/don-hang")
      .then((res) => {
        console.log(res.data.data);
        setData(res.data.data);
      })
      .catch((errors) => console.log(errors));
  }, []);

  const [lichSu, setLichSu] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    axios
      .get(api.lichSuMua)
      .then((res) => {
        console.log(res.data.data);
        setLichSu(res.data.data);
        setPageCount(Math.ceil(res.data.data.length / ITEMS_PER_PAGE));
      })
      .catch((errors) => console.log(errors));
  }, []);

  // Lấy toàn bộ các thành phần đc chọn
  const checkId = (item) => {
    // console.log(id);
    const promises = [];
    let data = {
      idKhachHang: item["khachHang"].idKhachHang,
      idSach: item["sach"].idSach,
      soLuong: item.soLuong,
    };

    console.log(data);
    const promise1 = axios.post(api.lichSuMua, data);
    const promise2 = axios.delete(api.gioHang + "/" + item.id);

    promises.push(promise1, promise2);
    Promise.all(promises).then(() => {
      localStorage.removeItem("gioHang");

      //////////////////////////
      // navigator("/gio_hang");

      alert("Đơn hàng đả được xác nhận");

      window.location.href = `http://${api.ip}:2000/admin/don_hang`;
    });
  };

  // Lấy tất cả các đơn đặt hàng đang chờ
  const donDatHang = () => {
    return data
      .filter((item) => item.trangThai !== "none")
      .map((item, index) => {
        return (
          <tr>
            <td scope="col">{index}</td>
            <td scope="col">{item["khachHang"].ten}</td>
            <td scope="col">{item["khachHang"].soDienThoai}</td>
            <td scope="col">{item["sach"].ten}</td>
            <td scope="col">{item.soLuong}</td>
            <td scope="col">
              {item.trangThai == "online"
                ? "Đả thanh toán"
                : item["sach"].giaSach * item.soLuong + " VNĐ"}
            </td>
            <td scope="col">{item.trangThai}</td>
            <td scope="col">
              <button onClick={() => checkId(item)} className="btn btn-success">
                Xác nhận
              </button>
            </td>
          </tr>
        );
      });
  };

  const lichSuMuaHang = () => {
    return currentData
      .filter((item) => item.trangThai !== "none")
      .map((item, index) => {
        return (
          <tr>
            <td scope="col">{index}</td>
            <td scope="col">{item["khachHang"].ten}</td>
            <td scope="col">{item["khachHang"].soDienThoai}</td>
            <td scope="col">{item["sach"].ten}</td>
            <td scope="col">{item.soLuong}</td>
            <td scope="col">{item.ngayMua}</td>
          </tr>
        );
      });
  };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * ITEMS_PER_PAGE;
  const currentData = lichSu.slice(offset, offset + ITEMS_PER_PAGE);
  return (
    <div>
      <div className="">
        <h5>Đơn hàng</h5>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Tên khách hàng</th>
              <th scope="col">Số điện thoại</th>
              <th scope="col">Tên sách</th>
              <th scope="col">Số lượng</th>
              <th scope="col">Giá tiền</th>
              <th scope="col">Thanh toán</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>{donDatHang()}</tbody>
        </table>
      </div>
      <div className="py-5">
        <h5>Lịch sử đơn hàng</h5>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Tên khách hàng</th>
              <th scope="col">Số điện thoại</th>
              <th scope="col">Tên sách</th>
              <th scope="col">Số lượng</th>
              <th scope="col">Thời gian</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>{lichSuMuaHang()}</tbody>
        </table>
        <ReactPaginate
          previousLabel={<AiFillCaretLeft />}
          nextLabel={<AiFillCaretRight />}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={"pagination justify-content-center"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          breakClassName={"page-item"}
          breakLinkClassName={"page-link"}
          activeClassName={"active"}
        />
      </div>
    </div>
  );
};

export default TrangDonHang;
