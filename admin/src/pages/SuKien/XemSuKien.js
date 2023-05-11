import React, {useEffect, useState} from "react";
import axios from "axios";
import api from "../../components/urlApi";
import {useNavigate} from "react-router-dom";
import ReactPaginate from "react-paginate";
import {AiFillCaretLeft, AiFillCaretRight} from "react-icons/ai";
import Swal from "sweetalert2";

const TrangSuKien = () => {
  const ITEMS_PER_PAGE = 15;
  let navigate = useNavigate();

  // check dang nhap
  let admin = JSON.parse(localStorage.getItem("taiKhoanAdmin"));
  if (!admin) {
    Swal.fire("Bạn phải đăng nhập").then(() => navigate("/"));
  }

  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  let [a, setA] = useState(true);
  const [suKien, setSuKien] = useState([]);

  useEffect(() => {
    const load = document.querySelector("#load");
    load.classList.remove("d-none");
    axios
      .get(api.suKien)
      .then((res) => {
        setSuKien(res.data.data);
        setPageCount(Math.ceil(res.data.data.length / ITEMS_PER_PAGE));
      })
      .catch((errors) => console.log(errors))
      .finally(() => load.classList.add("d-none"));
  }, [a]);

  function deleteId(e) {
    let getId = e.target.value;
    axios
      .delete(api.suKienId + getId)
      .then((res) => {
        Swal.fire("Xoá thành công").then(() => {
          setA(!a);
          navigate("/admin/xem_su_kien");
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function checkId(item) {
    localStorage.setItem("sukien", JSON.stringify(item));
    navigate("/admin/sua_su_kien");
  }

  const handlePageClick = ({selected}) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * ITEMS_PER_PAGE;
  const currentData = suKien.slice(offset, offset + ITEMS_PER_PAGE);

  const renderSuKien = () => {
    return currentData.map((item, index) => {
      return (
        <tr key={index}>
          <td>
            {" "}
            <p className="fs14 mb-0">{item.tieuDe}</p>
          </td>
          <td>
            {" "}
            <p className="fs14 mb-0">{item.noiDung}</p>
          </td>
          <td>
            <button className="btn btn-outline-warning mr3 fw-bolder" onClick={() => checkId(item)}>
              Sửa
            </button>
            <button className=" btn btn-outline-danger fw-bolder" value={item.id} onClick={deleteId}>
              Xóa
            </button>
          </td>
        </tr>
      );
    });
  };
  const themSuKien = () => {
    navigate("/admin/them_su_kien");
  };

  return (
    <div className="pl5px">
      <button className="btn btn-outline-success" onClick={themSuKien}>
        <p className="fs14 mb-0">Thêm sự kiện</p>
      </button>
      <div>
        <div className="">
          <h5>Thông tin sự kiện</h5>
          <table className="table">
            <thead className="table-dark">
              <tr>
                <th scope="col">Tiêu đề</th>
                <th scope="col">Nội dung</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>{renderSuKien()}</tbody>
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

export default TrangSuKien;
