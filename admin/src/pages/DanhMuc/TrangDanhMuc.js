import React, {useEffect, useState} from "react";
import axios from "axios";
import api from "../../components/urlApi";
import {useNavigate} from "react-router-dom";
import ReactPaginate from "react-paginate";
import {AiFillCaretLeft, AiFillCaretRight} from "react-icons/ai";
import Swal from "sweetalert2";

const TrangDanhMuc = () => {
  const ITEMS_PER_PAGE = 15;
  let navigation = useNavigate();

  // check dang nhap
  let admin = JSON.parse(localStorage.getItem("taiKhoanAdmin"));
  if (!admin) {
    Swal.fire("Bạn phải đăng nhập").then(() => navigation("/"));
  }

  const [input, setInput] = useState({
    ten: "",
    moTa: "",
  });
  const [danhMuc, setDanhMuc] = useState([]);
  const [a, setA] = useState(true);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  let [errTen, setErrTen] = useState("");
  let [errMota, setErrMoTa] = useState("");

  const handleInput = (e) => {
    let nameKey = e.target.name;
    let nameValue = e.target.value;
    setInput((state) => ({...state, [nameKey]: nameValue}));
  };

  const handlerSubmit = (e) => {
    e.preventDefault();
    let check = 1;
    if (input.ten === "") {
      check = 2;
      setErrTen("Yêu cầu nhập vào tên");
      return;
    } else {
      check = 1;
      setErrTen("");
    }
    if (input.moTa === "") {
      check = 2;
      setErrMoTa("Yêu cầu nhập vào mô tả");
      return;
    } else {
      check = 1;
      setErrMoTa("");
    }

    if (check === 1) {
      const data = {
        ten: input.ten,
        moTa: input.moTa,
      };
      axios
        .post(api.getDanhMuc, data)
        .then((res) => {
          Swal.fire("Thêm danh mục thành công").then(() => {
            setA(!a);
          });
        })
        .catch((errors) => console.log(errors));
    }
  };

  useEffect(() => {
    axios
      .get(api.getDanhMuc)
      .then((res) => {
        setDanhMuc(res.data.data);
        setPageCount(Math.ceil(res.data.data.length / ITEMS_PER_PAGE));
      })
      .catch((errors) => console.log(errors));
  }, [a]);

  function deleteId(e) {
    let getId = e.target.value;
    axios
      .delete(api.getDanhMucId + getId)
      .then((res) => {
        if (res.data.status === "fail") {
          Swal.fire("Xoá không thanh công");
        } else {
          Swal.fire("Xoá thành công");
        }
        setA(!a);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function checkId(item) {
    localStorage.setItem("danhmuc", JSON.stringify(item));
    navigation("/admin/sua_danh_muc");
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
          <td className="d-flex">
            <button className="btn btn-danger mr3" onClick={() => checkId(item)}>
              <p className="fs14 mb-0">Sửa</p>
            </button>
            <button className="btn btn-warning" value={item.idDanhMuc} onClick={deleteId}>
              <p className="fs14 mb-0">Xóa</p>
            </button>
          </td>
        </tr>
      );
    });
  };

  return (
    <>
      <div className="container-xxl">
        <div className="row">
          <div className="col-6">
            <form onSubmit={handlerSubmit}>
              <div className="mb-3 text-center fsinput">
                <b className="form-label">Thêm danh mục</b>
              </div>
              <div className="mb-3">
                <label className="form-label">Nhập tên</label>
                <input
                  type="text"
                  name="ten"
                  placeholder="Nhập tên"
                  onChange={handleInput}
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
                <p className="error">{errTen}</p>
              </div>
              <div className="mb-3">
                <label className="form-label">Nhập mô tả</label>
                <input
                  type="text"
                  name="moTa"
                  placeholder="Nhập mô tả"
                  onChange={handleInput}
                  className="form-control"
                  id="exampleInputPassword1"
                />
                <p className="error">{errMota}</p>
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-primary">
                  Thêm danh mục
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="py-5">
        <h5>Danh mục sản phẩm</h5>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Tên</th>
              <th scope="col">Mô tả</th>
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
    </>
  );
};

export default TrangDanhMuc;
