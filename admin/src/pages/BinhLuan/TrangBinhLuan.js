import React, { useState, useEffect } from "react";
import axios from "axios";
import api from "../../components/urlApi";
import { GrView } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
const TrangBinhLuan = () => {
  const ITEMS_PER_PAGE = 15;
  let navigate = useNavigate();

  // Kiểm tra đăng nhập hay chưa
  // let dangNhap = JSON.parse(localStorage.getItem("dangNhapAdmin"));
  // if (!dangNhap) {
  //   alert("Vui lòng đăng nhập");
  //   navigate("/");
  // }
  //////////////////////////////////
  const [binhLuan, setBinhLuan] = useState([]);
  const [a, setA] = useState(true);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  // Gọi api lấy tất cả các sản phẩm có bình luận ra
  useEffect(() => {
    axios
      .get(api.binhLuan)
      .then((res) => {
        console.log(res);
        setBinhLuan(res.data.data);
        setPageCount(Math.ceil(res.data.data.length / ITEMS_PER_PAGE));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [a]);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * ITEMS_PER_PAGE;
  const currentData = binhLuan.slice(offset, offset + ITEMS_PER_PAGE);

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
          <td>
            <p className="fs14 mb-0">{item.ten}</p>
          </td>
          <td>
            <p className="fs14 mb-0">{item.tacGia}</p>
          </td>
          <td>
            <p className="fs14 mb-0">{item.nhaXuatBan}</p>
          </td>
          <td>
            <p className="fs14 mb-0">{item.giaSach}</p>
          </td>
          <td>
            <p className="fs14 mb-0">{item.ngayXuatBan}</p>
          </td>
          <td>
            <button
              onClick={() => xemBinhLuan(item.idSach)}
              className="btn btn-outline-success text-white"
            >
              <p className="fs14 mb-0">
                <GrView />
              </p>
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
    <div className="">
      <table class="table">
        <thead className="table-dark">
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
  );
};

export default TrangBinhLuan;
