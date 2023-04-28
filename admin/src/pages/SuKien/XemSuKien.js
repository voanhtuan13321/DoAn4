import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../../components/urlApi";
import { useNavigate, Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";

import { Button, Form, Input } from "antd";

const TrangSuKien = () => {
  const ITEMS_PER_PAGE = 15;
  let navigate = useNavigate();
  // let admin = JSON.parse(localStorage.getItem("admin"));
  // if (!admin) {
  //   alert("Bạn phải đăng nhập");
  //   navigation("/");
  // }
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  let [a, setA] = useState(true);
  const [suKien, setSuKien] = useState([]);

  useEffect(() => {
    axios
      .get(api.suKien)
      .then((res) => {
        setSuKien(res.data.data);
        setPageCount(Math.ceil(res.data.data.length / ITEMS_PER_PAGE));
      })
      .catch((errors) => console.log(errors));
  }, [a]);

  function deleteId(e) {
    let getId = e.target.value;
    axios
      .delete(api.suKienId + getId)
      .then((res) => {
        setA(!a);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function checkId(item) {
    localStorage.setItem("sukien", JSON.stringify(item));
    navigate("/admin/sua_su_kien");
  }

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * ITEMS_PER_PAGE;
  const currentData = suKien.slice(offset, offset + ITEMS_PER_PAGE);

  const renderSuKien = () => {
    return currentData.map((item, index) => {
      return (
        <tr key={index}>
          <th scope="row">{index}</th>
          <td>{item.tieuDe}</td>
          <td>{item.noiDung}</td>
          <td>
            <button
              className="btn btn-warning mr3"
              onClick={() => checkId(item)}
            >
              Cập nhật
            </button>
            <button
              className="btn btn-danger "
              value={item.id}
              onClick={deleteId}
            >
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
    <div className="">
      <button className="btn btn-outline-success" onClick={themSuKien}>
        Thêm sự kiện
      </button>
      <div>
        <div className="py-5">
          <h5>Thông tin sự kiện</h5>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Tiêu đề</th>
                <th scope="col">Nội dung</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>{renderSuKien()}</tbody>
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

export default TrangSuKien;
