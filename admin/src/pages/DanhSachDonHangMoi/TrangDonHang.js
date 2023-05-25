import React, {useEffect, useState} from "react";
import axios from "axios";
import api from "../../components/urlApi";
import {useNavigate,Link} from "react-router-dom";
import ReactPaginate from "react-paginate";
import {AiFillCaretLeft, AiFillCaretRight} from "react-icons/ai";
import Swal from "sweetalert2";

const TrangDonHang = () => {
  const ITEMS_PER_PAGE = 5;
  let navigation = useNavigate();
  const [data, setData] = useState([]);

  // check dang nhap
  let admin = JSON.parse(localStorage.getItem("taiKhoanAdmin"));
  if (!admin) {
    Swal.fire("Bạn phải đăng nhập").then(() => navigation("/"));
  }

  // Gọi các đơn hàng trong giỏ hàng
  useEffect(() => {
    axios
      .get(api.donHang)
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
        setLichSu(res.data.data);
        setPageCount(Math.ceil(res.data.data.length / ITEMS_PER_PAGE));
      })
      .catch((errors) => console.log(errors));
  }, []);

  // Lấy toàn bộ các thành phần đc chọn
  const checkId = (item) => {
    const promises = [];
    let data = {
      idKhachHang: item["khachHang"].idKhachHang,
      idSach: item["sach"].idSach,
      maDonHang: item.maDonHang,
      soLuong: item.soLuong,
      ngayMua: item.ngayMua,
    };

    const promise1 = axios.post(api.lichSuMua, data);
    const promise2 = axios.delete(api.donHang + "/cancel/" + item.id);

    promises.push(promise1, promise2);
    Promise.all(promises).then(() => {
      localStorage.removeItem("gioHang");
      Swal.fire("Đơn hàng đã được xác nhận").then(
        () => (window.location.href = `http://${api.ip}:2000/admin/don_hang`)
      );
    });
  };

  // Lấy tất cả các đơn đặt hàng đang chờ
  const donDatHang = () => {
    const today = new Date();
    return data
      .filter((item) => item.trangThai !== "none")
      .map((item, index) => {
        const ngayMua = new Date(item.ngayMua);
        const isCungNgayHienTai =
          today.getDate() === ngayMua.getDate() &&
          today.getMonth() === today.getMonth() &&
          today.getFullYear() === ngayMua.getFullYear();
        return (
          <tr key={index}>
            <td>
            <Link to={"/admin/chi_tiet_don_hang/" + item.id}>
                <p className="fs14 mb-0">
                  {item.maDonHang}</p>
              </Link>
            </td>
            <td>
              <p className="fs14 mb-0">{item["khachHang"].ten}</p>
            </td>
            <td>
              <p className="fs14 mb-0">{item.ngayMua}</p>
            </td>
            <td>
              <p className="fs14 mb-0">{item.phuongThucThanhToan}</p>
            </td>
            <td>
              <p className="fs14">{item.trangThai}</p>
            </td>
            <td>
              {isCungNgayHienTai ? (
                ""
              ) : (
                <button onClick={() => checkId(item)} className="btn btn-outline-success fw-bolder ">
                  <p className="fs14 mb-0 w61">Xác nhận</p>
                </button>
              )}
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
          <tr key={index}>
            <td>
              <p className="fs14 mb-0">{item.maDonHang}</p>
            </td>
            <td>
              <p className="fs14 mb-0">{item["khachHang"]?.ten}</p>
            </td>
            <td>
              <p className="fs14 mb-0">{item["khachHang"].soDienThoai}</p>
            </td>
            <td>
              <p className="fs14 mb-0">{item["sach"].ten}</p>
            </td>
            <td>
              <p className="fs14 mb-0">{item.soLuong}</p>
            </td>
            <td>
              <p className="fs14 mb-0">{item.ngayMua}</p>
            </td>
            <td>
              <p className="fs14 mb-0">{(item.soLuong * item["sach"].giaSach).toLocaleString() + " VNĐ"} </p>
            </td>
          </tr>
        );
      });
  };

  const handlePageClick = ({selected}) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * ITEMS_PER_PAGE;
  const currentData = lichSu.slice(offset, offset + ITEMS_PER_PAGE);
  return (
    <div className="pl5px">
      <div className="">
        <h5>Đơn hàng</h5>
        <table className="table">
          <thead className="table-dark">
            <tr>
              <th scope="col">
                <p className="fs14 mb-0">Mã đơn hàng</p>
              </th>
              <th scope="col">
                <p className="fs14 mb-0">Tên khách hàng</p>
              </th>
              <th scope="col">
                <p className="fs14 mb-0 w103">Ngày mua</p>
              </th>
              <th scope="col">
                <p className="fs14 mb-0 w103">Phương thức thanh toán</p>
              </th>
              <th scope="col">
                <p className="fs14 mb-0">Trạng thái</p>
              </th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>{donDatHang()}</tbody>
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
      {/* <div className="">
        <h5>Đơn hàng</h5>
        <table className="table">
          <thead className="table-dark">
            <tr>
              <th scope="col">
                <p className="fs14 mb-0">Mã đơn hàng</p>
              </th>
              <th scope="col">
                <p className="fs14 mb-0 w103">Tên khách hàng</p>
              </th>
              <th scope="col">
                <p className="fs14 mb-0 w103">Số điện thoại</p>
              </th>
              <th scope="col">
                <p className="fs14 mb-0">Tên sách</p>
              </th>
              <th scope="col">
                <p className="fs14 mb-0 w61">Số lượng</p>
              </th>
              <th scope="col">
                <p className="fs14 mb-0">Giá tiền</p>
              </th>
              <th scope="col">
                <p className="fs14 mb-0">Ngày đặt</p>
              </th>
              <th scope="col">
                <p className="fs14 mb-0">Trạng thái</p>
              </th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>{donDatHang()}</tbody>
        </table>
      </div>
      <div className="py-5">
        <h5>Lịch sử đơn hàng</h5>
        <table className="table">
          <thead className="table-dark">
            <tr>
              <th scope="col">
                <p className="fs14 mb-0">Mã đơn hàng</p>
              </th>
              <th scope="col">
                <p className="fs14 mb-0">Tên khách hàng</p>
              </th>
              <th scope="col">
                <p className="fs14 mb-0">Số điện thoại</p>
              </th>
              <th scope="col">
                <p className="fs14 mb-0">Tên sách</p>
              </th>
              <th scope="col">
                <p className="fs14 mb-0">Số lượng</p>
              </th>
              <th scope="col">
                <p className="fs14 mb-0">Thời gian</p>
              </th>
              <th scope="col">
                <p className="fs14 mb-0">Tổng tiền</p>
              </th>
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
      </div> */}
    </div>
  );
};

export default TrangDonHang;
