import React, {useEffect, useState} from "react";
import axios from "axios";
import api from "../../components/urlApi";
import {useNavigate, Link, useParams} from "react-router-dom";
import ReactPaginate from "react-paginate";
import Swal from "sweetalert2";
import {AiFillCaretLeft, AiFillCaretRight} from "react-icons/ai";

const SanPhamTheoDanhMuc = () => {
  let navigate = useNavigate();
  let params = useParams();

  const ITEMS_PER_PAGE = 8; //Số lượng sản phẩm hiển thị
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  // check dang nhap
  let admin = JSON.parse(localStorage.getItem("taiKhoanAdmin"));
  if (!admin) {
    Swal.fire("Bạn phải đăng nhập").then(() => navigate("/"));
  }

  // tạo để nhận các giá trị
  const [a, setA] = useState(true);
  const [danhMuc, setDanhMuc] = useState([]);

  const [danhMucSanPham, setDanhMucSanPham] = useState([]);
  console.log(danhMucSanPham);
  useEffect(() => {
    const load = document.querySelector("#load");
    load.classList.remove("d-none");
    axios
      .get(api.getDanhMucIdDanhMuc + params.id)
      .then((res) => {
        setDanhMucSanPham(res.data.data);
        setPageCount(Math.ceil(res.data.data.length / ITEMS_PER_PAGE));
      })
      .catch((errors) => console.log(errors))
      .finally(() => load.classList.add("d-none"));
  }, [params.id, a]);

  useEffect(() => {
    axios
      .get(api.getDanhMuc)
      .then((res) => {
        setDanhMuc(res.data.data);
      })
      .catch((errors) => console.log(errors));
  }, []);

  // Gọi api lấy tất cả các sách đả được thêm
  // useEffect(() => {
  //   const load = document.querySelector("#load");
  //   load.classList.remove("d-none");
  //   axios
  //     .get(api.sach)
  //     .then((res) => {
  //       setData(res.data.data);
  //       setPageCount(Math.ceil(res.data.data.length / ITEMS_PER_PAGE));
  //     })
  //     .catch((errors) => console.log(errors))
  //     .finally(() => load.classList.add("d-none"));
  // }, [a]);

  const rederDanhMuc = () => {
    return danhMuc.map((item, index) => {
      return (
        <li key={index}>
          <Link className="dropdown-item" to={"/admin/san_theo_danh_muc/" + item.idDanhMuc}>
            {item.ten}
          </Link>
        </li>
      );
    });
  };

  // xóa sản phẩm theo id
  function deleteId(e) {
    let getId = e.target.value;
    console.log(getId);
    axios
      .delete(api.sachId + getId)
      .then((res) => {
        Swal.fire("Xoá sản phẩm thành công").then(() => setA(!a));
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

  const handlePageClick = ({selected}) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * ITEMS_PER_PAGE;
  const currentData = danhMucSanPham.slice(offset, offset + ITEMS_PER_PAGE);

  const rederSanPham = () => {
    if (currentData.length === 0) {
      return (
        <tr>
          <td colSpan={7} className="text-center">
            Chưa có sản phẩm nào{" "}
          </td>
        </tr>
      );
    }
    return currentData.map((item, index) => {
      return (
        <tr key={index}>
          <td>
            <p className="fs14">{item.ten}</p>
          </td>
          <td>
            <p className="fs14">{item.tacGia}</p>
          </td>
          <td>
            <p className="fs14">{item.ngayXuatBan}</p>
          </td>
          <td>
            <p className="fs14"> {item.giaSach.toLocaleString() + " VNĐ"}</p>
          </td>
          <td>
            <p className="fs14">{item.soLuong}</p>
          </td>
          <td>
            <img className="img-thumbnail image-w image-h" alt="Ảnh" src={api.img + item.hinhAnh} />
          </td>
          <td>
            <button className="btn btn-outline-warning fw-bolder mr3" onClick={() => checkId(item)}>
              Sửa
            </button>
            <button className="btn btn-outline-danger fw-bolder" value={item.idSach} onClick={deleteId}>
              Xóa
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
      <div className="pl5px">
        <div className="d-flex justify-content-between">
          <button className="btn btn-outline-success" onClick={themSanPham}>
            <p className="fs14 mb-0">Thêm sản phẩm</p>
          </button>

          <div className="dropdown">
            <button
              className="btn btn-outline-success dropdown-toggle  border-0 gap-15 d-flex align-items-center"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false">
              <img alt="" />
              Danh mục
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li>
                <Link className="dropdown-item" to={"/admin/xem_san_pham"}>
                  Tất cả
                </Link>
              </li>
              {rederDanhMuc()}
            </ul>
          </div>
        </div>

        <div className="py-1">
          <table className="table">
            <thead className="table-dark">
              <tr>
                <th scope="col">Tên</th>
                <th scope="col">Tác giả</th>
                <th scope="col">Ngày xuất bản</th>
                <th scope="col">Giá sách</th>
                <th scope="col">Số lượng</th>
                <th scope="col">Ảnh</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>{rederSanPham()}</tbody>
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

export default SanPhamTheoDanhMuc;
