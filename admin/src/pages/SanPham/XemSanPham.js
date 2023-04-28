import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../../components/urlApi";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";

import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
const TrangSgSanPham = () => {
  let navigate = useNavigate();


  const ITEMS_PER_PAGE = 15; //Số lượng sản phẩm hiển thị
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  // Kiểm tra đăng nhập
  // let admin = JSON.parse(localStorage.getItem("admin"));
  // if (!admin) {
  //   alert("Bạn phải đăng nhập");
  //   navigation("/");
  // }

  // tạo để nhận các giá trị

  const [a, setA] = useState(true);

  const [data, setData] = useState([]);

  // Gọi api lấy tất cả các sách đả được thêm
  useEffect(() => {
    axios
      .get(api.sach)
      .then((res) => {
        setData(res.data.data);
        setPageCount(Math.ceil(res.data.data.length / ITEMS_PER_PAGE));
      })
      .catch((errors) => console.log(errors));
  }, [a]);

  // xóa sản phẩm theo id
  function deleteId(e) {
    let getId = e.target.value;
    console.log(getId);
    axios
      .delete(api.sachId + getId)
      .then((res) => {
        console.log(res.data);
        setA(!a);
      })
      .catch((error) => {
        console.log(error);
      });
  }


  // Lấy phần tủ sách đả được chọn sửa bỏ vào local
  function checkId(item) {
    localStorage.setItem("sach", JSON.stringify(item));
    navigate("/admin/sua_san_pham");
  }

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * ITEMS_PER_PAGE;
  const currentData = data.slice(offset, offset + ITEMS_PER_PAGE);

  const rederSanPham = () => {
    return currentData.map((item, index) => {
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
          <td scope="col">
            <button
              className="btn btn-warning mr3"
              onClick={() => checkId(item)}
            >
              <p className="fs14">Sửa</p>
            </button>
            <button
              className="btn btn-danger"
              value={item.idSach}
              onClick={deleteId}
            >
              <p className="fs14">Xóa</p>
            </button>
          </td>
        </tr>
      );
    });
  };

  const themSanPham = () => {
    navigate("/admin/them_san_pham");
  };

  return (
    <div>
      <div className="">
        <button className="btn btn-success" onClick={themSanPham}>
          Thêm sản phẩm
        </button>

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
                <th scope="col">Ảnh</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>{rederSanPham()}</tbody>
          </table>
          {currentData.length < 15 ? (
            ""
          ) : (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default TrangSgSanPham;
