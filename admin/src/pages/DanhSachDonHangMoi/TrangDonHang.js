import React, {useEffect, useState} from "react";
import axios from "axios";
import api from "../../components/urlApi";
import {useNavigate} from "react-router-dom";
import ReactPaginate from "react-paginate";
import {AiFillCaretLeft, AiFillCaretRight} from "react-icons/ai";
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

  console.log(lichSu);

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
            {/* <td scope="col">
              <p className="fs14">{index}</p>
            </td> */}
            <td scope="col">
              <p className="fs14">{item["khachHang"].ten}</p>
            </td>
            <td scope="col">
              <p className="fs14">{item["khachHang"].soDienThoai}</p>
            </td>
            <td scope="col">
              <p className="fs14">{item["sach"].ten}</p>
            </td>
            <td scope="col">
              <p className="fs14">{item.soLuong}</p>
            </td>
            <td scope="col">
              <p className="fs14">
                {item.trangThai == "online" ? "Đã thanh toán" : item["sach"].giaSach * item.soLuong + " VNĐ"}
              </p>
            </td>
            <td scope="col">
              <p className="fs14">{item.trangThai}</p>
            </td>
            <td scope="col">
              <button onClick={() => checkId(item)} className="btn btn-outline-success fw-bolder">
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
            {/* <td scope="col">
              <p className="fs14">{index}</p>
            </td> */}
            <td scope="col">
              <p className="fs14">{item["khachHang"].ten}</p>
            </td>
            <td scope="col">
              <p className="fs14">{item["khachHang"].soDienThoai}</p>
            </td>
            <td scope="col">
              <p className="fs14">{item["sach"].ten}</p>
            </td>
            <td scope="col">
              <p className="fs14">{item.soLuong}</p>
            </td>
            <td scope="col">
              <p className="fs14">{item.ngayMua}</p>
            </td>
            {/* <td scope="col">
              <p className="fs14">{item.trangThai}</p>
            </td> */}
            <td scope="col">
              <p className="fs14">{item.soLuong * item["sach"].giaSach + " VNĐ"} </p>
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
              {/* <th scope="col"></th> */}
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
                <p className="fs14 mb-0">Giá tiền</p>
              </th>
              <th scope="col">
                <p className="fs14 mb-0">Thanh toán</p>
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
              {/* <th scope="col"></th> */}
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
              {/* <th scope="col">
                <p className="fs14 mb-0">Trạng thái</p>
              </th> */}
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
      </div>
    </div>
  );
};

export default TrangDonHang;
