import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../../components/urlApi";
import { useNavigate, Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";

const TrangKhachHang = () => {
  let navigation = useNavigate();
  const ITEMS_PER_PAGE = 15;
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  // let admin = JSON.parse(localStorage.getItem("admin"));
  // if (!admin) {
  //   alert("Bạn phải đăng nhập");
  //   navigation("/");
  // }

  const [khachHang, setKhachHang] = useState([]);
  const [a, setA] = useState(true);

  // Gọi các khách hàng ra
  useEffect(() => {
    axios
      .get(api.khachHang)
      .then((res) => {
        setKhachHang(res.data.data);
        setPageCount(Math.ceil(res.data.data.length / ITEMS_PER_PAGE));
      })
      .catch((errors) => console.log(errors));
  }, [a]);

  // Khi click vào nút này sẻ lấy đc id của khách hàng đó vào xóa theo id của khách hàng
  function checkId(e) {
    let getLocalStolore = JSON.parse(localStorage.getItem("admin"));
    if (getLocalStolore) {
      let getId = e.target.value;
      axios
        .delete(api.khachHangId + getId)
        .then((res) => {
          alert("Xóa thành công");
          setA(!a);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert("Bạn chưa đăng nhập");
      navigation("/");
    }
  }

  // lấy ra từng thông tin của khách hàng
  const renderKhachHang = () => {
    return currentData.map((item, index) => {
      return (
        <tr key={index}>
          <th scope="row">{index}</th>
          <td>{item.ten}</td>
          <td>{item.email}</td>
          <td>{item.soDienThoai}</td>
          <td>{item.diaChi}</td>
          <td>{item.taiKhoan}</td>
          <td>{item.matKhau}</td>
          <td>
            <button
              className="btn btn-danger"
              value={item.idKhachHang}
              onClick={checkId}
            >
              Xóa
            </button>
          </td>
        </tr>
      );
    });
  };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * ITEMS_PER_PAGE;
  const currentData = khachHang.slice(offset, offset + ITEMS_PER_PAGE);
  return (
    <div>
      <div className="">
        <div className="">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Tên</th>
                <th scope="col">Email</th>
                <th scope="col">Số điện thoại</th>
                <th scope="col">Địa chỉ</th>
                <th scope="col">Tài khoản</th>
                <th scope="col">Mật khẩu</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>{renderKhachHang()}</tbody>
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
    </div>
  );
};

export default TrangKhachHang;
