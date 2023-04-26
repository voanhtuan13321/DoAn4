import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../../components/urlApi";
import { useNavigate, Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";

import { Button, Form, Input } from "antd";

const TrangSuKien = () => {
  const ITEMS_PER_PAGE = 15;
  let navigation = useNavigate();
  // let admin = JSON.parse(localStorage.getItem("admin"));
  // if (!admin) {
  //   alert("Bạn phải đăng nhập");
  //   navigation("/");
  // }

  const [input, setInput] = useState({
    tieuDe: "",
    noiDung: "",
  });
  const [a, setA] = useState(true);
  let [errTieuDe, setErrTieuDe] = useState("");
  let [errNoiDung, setErrNoiDung] = useState("");

  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const handleInput = (e) => {
    let nameKey = e.target.name;
    let nameValue = e.target.value;
    setInput((state) => ({ ...state, [nameKey]: nameValue }));
  };

  const handlerSubmit = (e) => {
    e.preventDefault();
    let check = 1;
    if (input.tieuDe == "") {
      check = 2;
      setErrTieuDe("Yêu cầu nhập vào tiêu đề");
      return;
    } else {
      check = 1;
      setErrTieuDe("");
    }
    if (input.noiDung == "") {
      check = 2;
      setErrNoiDung("Yêu cầu nhập vào nội dung");
      return;
    } else {
      check = 1;
      setErrNoiDung("");
    }

    if (check == 1) {
      const data = {
        tieuDe: input.tieuDe,
        noiDung: input.noiDung,
      };
      axios
        .post(api.suKien, data)
        .then((res) => {
          alert("Thêm sự kiện thành công");
          console.log(res);
          setA(!a);
        })
        .catch((errors) => console.log(errors));
    }
  };

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
    navigation("/admin/sua_su_kien");
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
              Sửa
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

  return (
    <div className="">
      <div className="container-xxl">
        <div className="row">
          <div className="col-6">
            <form onSubmit={handlerSubmit}>
              <div className="mb-3 text-center fsinput">
                <b className="form-label">Thêm sự kiện</b>
              </div>
              <div className="mb-3">
                <label className="form-label">Nhập tiêu đề</label>
                <input
                  type="text"
                  name="tieuDe"
                  placeholder="Nhập tiêu đề"
                  onChange={handleInput}
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
                <p className="error">{errTieuDe}</p>
              </div>
              <div className="mb-3">
                <label className="form-label">Nhập nội dung</label>
                <input
                  type="text"
                  name="noiDung"
                  placeholder="Nhập nội dung"
                  onChange={handleInput}
                  className="form-control"
                  id="exampleInputPassword1"
                />
                <p className="error">{errNoiDung}</p>
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-primary">
                  Thêm sự kiện
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

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
