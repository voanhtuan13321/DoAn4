import React, {useEffect, useState} from "react";
import axios from "axios";
import api from "../../components/urlApi";
import {useNavigate} from "react-router-dom";
import ReactPaginate from "react-paginate";
import {AiFillCaretLeft, AiFillCaretRight} from "react-icons/ai";
import Swal from "sweetalert2";

const XemDanhMuc = () => {
  const ITEMS_PER_PAGE = 15;
  let navigate = useNavigate();

  // check dang nhap
  let admin = JSON.parse(localStorage.getItem("taiKhoanAdmin"));
  if (!admin) {
    Swal.fire("Bạn phải đăng nhập").then(() => navigate("/"));
  }

  const [danhMuc, setDanhMuc] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [a, setA] = useState(true);

  useEffect(() => {
    const load = document.querySelector("#load");
    load.classList.remove("d-none");
    axios
      .get(api.getDanhMuc)
      .then((res) => {
        setDanhMuc(res.data.data);
        setPageCount(Math.ceil(res.data.data.length / ITEMS_PER_PAGE));
      })
      .catch((errors) => console.log(errors))
      .finally(() => load.classList.add("d-none"));
  }, [a]);

  function deleteId(e) {
    let getId = e.target.value;
    axios
      .delete(api.getDanhMucId + getId)
      .then((res) => {
        if (res.data.status == "fail") {
          Swal.fire("Xóa không thành công");
        } else {
          Swal.fire("Xóa thành công");
        }
        setA(!a);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function checkId(item) {
    localStorage.setItem("danhmuc", JSON.stringify(item));
    navigate("/admin/sua_danh_muc");
  }

  const handlePageClick = ({selected}) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * ITEMS_PER_PAGE;
  const currentData = danhMuc.slice(offset, offset + ITEMS_PER_PAGE);

  const renderDanhMuc = () => {
    return currentData.map((item, index) => {
      return (
        <tr key={index}>
          <th scope="row">{index}</th>
          <td>
            <p className="fs14 mb-0">{item.ten}</p>
          </td>
          <td>
            <p className="fs14 mb-0">{item.moTa}</p>
          </td>
          <td className="d-flex justify-content-end">
            <button className="btn mr3 btn-outline-warning fw-bolder" onClick={() => checkId(item)}>
              Sửa
            </button>
            <button className="btn btn-outline-danger fw-bolder" value={item.idDanhMuc} onClick={deleteId}>
              Xóa
            </button>
          </td>
        </tr>
      );
    });
  };

  const themDanhMuc = () => {
    navigate("/admin/them_danh_muc");
  };

  return (
    <div className="pl5px">
      <button className="btn btn-outline-success" onClick={themDanhMuc}>
        <p className="fs14 mb-0">Thêm danh mục</p>
      </button>
      <div className="py-2">
        <h5>Danh mục sản phẩm</h5>
        <table className="table">
          <thead className="table-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">
                <p className="fs14 mb-0">Tên</p>
              </th>
              <th scope="col">
                <p className="fs14 mb-0">Mô tả</p>
              </th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>{renderDanhMuc()}</tbody>
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

export default XemDanhMuc;
