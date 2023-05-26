import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import api from "../../components/urlApi";
import ReactPaginate from "react-paginate";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const BinhLuanCuaSanPham = () => {
  const ITEMS_PER_PAGE = 15;
  const params = useParams();
  const [binhLuanIdSach, setBinhLuanIdSach] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  let navigate = useNavigate();

  // check dang nhap
  let admin = JSON.parse(localStorage.getItem("taiKhoanAdmin"));
  if (!admin) {
    Swal.fire("Bạn phải đăng nhập").then(() => navigate("/"));
  }

  // Gọi api của sản phẩm đó để xem các bình luận của sản phẩm
  useEffect(() => {
    axios.get(api.binhLuan + "/" + params.id).then((res) => {
      setBinhLuanIdSach(res.data.data);
      setPageCount(Math.ceil(res.data.data.length / ITEMS_PER_PAGE));
    });
  }, []);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

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
          <th scope="row">
            <p className="fs14 mb-0">{index}</p>
          </th>
          <td>
            <p className="fs14 mb-0">{item["khachHang"].ten}</p>
          </td>
          <td>
            <p className="fs14 mb-0">{item.noiDung}</p>
          </td>
          <td>
            <p className="fs14 mb-0">{thoiGian}</p>
          </td>
        </tr>
      );
    });
  };

  const troLai = () => {
    navigate("/admin/binh_luan");
  };

  return (
    <div className="pl5px">
      <button className="btn btn-outline-success" onClick={troLai}>
        <p className="fs14 mb-0">Trở lại</p>
      </button>
      <table className="table">
        <thead className="table-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">
              <p className="fs14 mb-0">Tên khách hàng</p>
            </th>
            <th scope="col">
              <p className="fs14 mb-0">Nội dung gióp ý</p>
            </th>
            <th scope="col">
              <p className="fs14 mb-0">Thời gian</p>
            </th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>{binhLuan()}</tbody>
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
  );
};

export default BinhLuanCuaSanPham;
