import React, {useEffect, useState} from "react";
import axios from "axios";
import api from "../../components/urlApi";
import {useNavigate} from "react-router-dom";
import ReactPaginate from "react-paginate";
import {AiFillCaretLeft, AiFillCaretRight} from "react-icons/ai";
import Swal from "sweetalert2";

const TrangSgSanPham = () => {
  let navigation = useNavigate();

  const ITEMS_PER_PAGE = 15; //Số lượng sản phẩm hiển thị
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  // check dang nhap
  let admin = JSON.parse(localStorage.getItem("taiKhoanAdmin"));
  if (!admin) {
    Swal.fire("Bạn phải đăng nhập").then(() => navigation("/"));
  }

  // tạo để nhận các giá trị
  const [sanPham, setSapPham] = useState({
    ten: "",
    tacGia: "",
    nhaXuatBan: "",
    giaSach: "",
    moTa: "",
    ngayXuatBan: "",
    soLuong: "",
  });

  const [a, setA] = useState(true);
  const [danhMuc, setDanhMuc] = useState([]);
  const [avatar, setAvatar] = useState("");
  const [valuedanhMuc, setValueDanhMuc] = useState(1);
  const [data, setData] = useState([]);

  let [errTen, setErrTen] = useState("");
  let [errTacGia, setErrTacGia] = useState("");
  let [errNhaXuatBan, setErrNhaXuatBan] = useState("");
  let [errGiaSach, setErrGiaSach] = useState("");
  let [errMoTa, setErrMoTa] = useState("");
  let [errNgayXuatBan, setErrNgayXuatBan] = useState("");
  let [errSoLuong, setErrSoLuong] = useState("");
  let [errDanhMuc, setErrDanhMuc] = useState("");
  let [errHinhAnh, setErrHinhAnh] = useState("");

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

  // khi chọn danh mực nào thì lấy danh mục đó để gởi lên
  const handleDanhMuc = (e) => {
    let value = e.target.value;
    setValueDanhMuc(value);
  };

  // Gọi api danh mục
  useEffect(() => {
    axios
      .get(api.getDanhMuc)
      .then((res) => {
        setDanhMuc(res.data.data);
      })
      .catch((errors) => console.log(errors));
  }, []);

  // mỗi lần nhập thông tin trong ô input thì lấy key và value lưu vào object
  const handleInput = (e) => {
    let nameKey = e.target.name;
    let nameValue = e.target.value;
    setSapPham((state) => ({...state, [nameKey]: nameValue}));
  };

  const handleFile = (e) => {
    let files = e.target.files;
    let reader = new FileReader();
    reader.onload = (e) => {
      setAvatar(e.target.result); //Cái này để gởi qua api
    };
    reader.readAsDataURL(files[0]);
  };

  // trả về danh mục để lựa chọn
  const rederDanhMuc = () => {
    return danhMuc.map((item, index) => {
      return (
        <option key={index} value={item.idDanhMuc}>
          {item.ten}
        </option>
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
        setA(!a);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // Lấy phần tủ sách đả được chọn sửa bỏ vào local
  function checkId(item) {
    localStorage.setItem("sach", JSON.stringify(item));
    navigation("/admin/sua_san_pham");
  }

  const handlePageClick = ({selected}) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * ITEMS_PER_PAGE;
  const currentData = data.slice(offset, offset + ITEMS_PER_PAGE);

  const rederSanPham = () => {
    return currentData.map((item, index) => {
      return (
        <tr key={index}>
          <td>{item.ten}</td>
          <td>{item.tacGia}</td>
          <td>{item.ngayXuatBan}</td>
          <td>
            {item.giaSach.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </td>
          <td>{item.soLuong}</td>

          <td>
            <img className="img-thumbnail image-w image-h" src={api.img + item.hinhAnh} alt="" />
          </td>
          <td>
            <button className="btn btn-warning mr3" onClick={() => checkId(item)}>
              Sửa
            </button>
            <button className="btn btn-danger" value={item.idSach} onClick={deleteId}>
              Xóa
            </button>
          </td>
        </tr>
      );
    });
  };

  const handlerSubmit = (e) => {
    e.preventDefault();

    let check = 1;

    if (sanPham.ten === "") {
      check = 2;
      setErrTen("Vui lòng nhập vào tên");
      return;
    } else {
      check = 1;
      setErrTen("");
    }
    if (sanPham.tacGia === "") {
      check = 2;
      setErrTacGia("Vui lòng nhập vào tác giả");
      return;
    } else {
      check = 1;
      setErrTacGia("");
    }
    if (sanPham.nhaXuatBan === "") {
      check = 2;
      setErrNhaXuatBan("Vui lòng nhập vào nhà xuất bản");
      return;
    } else {
      check = 1;
      setErrNhaXuatBan("");
    }
    if (sanPham.giaSach === "") {
      check = 2;
      setErrGiaSach("Vui lòng nhập vào giá sách");
      return;
    } else {
      check = 1;
      setErrGiaSach("");
    }
    if (sanPham.moTa === "") {
      check = 2;
      setErrMoTa("Vui lòng nhập vào mô tả");
      return;
    } else {
      check = 1;
      setErrMoTa("");
    }
    if (sanPham.ngayXuatBan === "") {
      check = 2;
      setErrNgayXuatBan("Vui lòng nhập vào ngày xuất bản");
      return;
    } else {
      check = 1;
      setErrNgayXuatBan("");
    }
    if (sanPham.soLuong === "") {
      check = 2;
      setErrSoLuong("Vui lòng nhập vào số lượng");
      return;
    } else {
      check = 1;
      setErrSoLuong("");
    }
    if (valuedanhMuc === "") {
      check = 2;
      setErrDanhMuc("Vui lòng chọn danh mục");
      return;
    } else {
      check = 1;
      setErrDanhMuc("");
    }
    if (avatar === "") {
      check = 2;
      setErrHinhAnh("Vui lòng chọn hình ảnh");
      return;
    } else {
      check = 1;
      setErrHinhAnh("");
    }

    if (check === 1) {
      const data = {
        ten: sanPham.ten,
        tacGia: sanPham.tacGia,
        nhaXuatBan: sanPham.nhaXuatBan,
        giaSach: parseInt(sanPham.giaSach),
        moTa: sanPham.moTa,
        ngayXuatBan: sanPham.ngayXuatBan,
        soLuong: parseInt(sanPham.soLuong),
        hinhAnh: avatar.replace("data:image/jpeg;base64,", ""),
        idDanhMuc: valuedanhMuc,
      };

      axios
        .post(api.sach, data)
        .then((res) => {
          Swal.fire("Thêm sản phẩm thành công").then(() => {
            setA(!a);
          });
        })
        .catch((errors) => console.log(errors));
    }
  };

  return (
    <div>
      <div className="">
        <div className="d-flex justify-content-center py-4">
          <form className="" onSubmit={handlerSubmit}>
            <h3 className="text-center">
              <b>Thêm sản phẩm</b>
            </h3>
            <div className="d-flex ">
              <div className="p-3">
                <div className="input_container">
                  <label className="input_label">Tên</label>
                  <input placeholder="Tên" name="ten" type="text" className="input_field" onChange={handleInput} />
                </div>
                <span className="error">{errTen}</span>
                <div className="input_container">
                  <label className="input_label" htmlFor="password_field">
                    Tác giả
                  </label>
                  <input
                    placeholder="Tác giả"
                    name="tacGia"
                    type="text"
                    className="input_field"
                    onChange={handleInput}
                  />
                  <span className="error">{errTacGia}</span>
                </div>
                <div className="input_container">
                  <label className="input_label">Nhà xuất bản</label>
                  <input
                    placeholder="Nhà xuất bản"
                    name="nhaXuatBan"
                    type="text"
                    className="input_field"
                    onChange={handleInput}
                  />
                  <span className="error">{errNhaXuatBan}</span>
                </div>
                <div className="input_container">
                  <label className="input_label">Giá sách</label>
                  <input
                    placeholder="Giá sách"
                    name="giaSach"
                    type="number"
                    className="input_field"
                    onChange={handleInput}
                  />
                  <span className="error">{errGiaSach}</span>
                </div>
              </div>
              <div className="p-3">
                <div className="input_container">
                  <label className="input_label">Ngày xuất bản</label>
                  <input
                    placeholder="Ngày xuất bản"
                    name="ngayXuatBan"
                    type="date"
                    className="input_field"
                    onChange={handleInput}
                  />
                  <span className="error">{errNgayXuatBan}</span>
                </div>
                <div className="input_container">
                  <label className="input_label" htmlFor="password_field">
                    Số lượng
                  </label>
                  <input
                    placeholder="Số lượng"
                    name="soLuong"
                    type="number"
                    className="input_field"
                    onChange={handleInput}
                  />
                  <span className="error">{errSoLuong}</span>
                </div>
                <div className="input_container">
                  <label className="input_label" htmlFor="password_field">
                    Hình ảnh
                  </label>
                  <input placeholder="Password" name="input-name" type="file" onChange={handleFile} id="file" />
                  <span className="error">{errHinhAnh}</span>
                </div>
                <div className="input_container pt-5">
                  <select onChange={handleDanhMuc}>{rederDanhMuc()}</select>
                  <span className="error">{errDanhMuc}</span>
                </div>
              </div>
            </div>
            <div className="input_container mb-5">
              <label className="input_label">Mô tả</label>
              <textarea placeholder="Mô tả" name="moTa" type="text" rows={5} onChange={handleInput} />
              <span className="error">{errMoTa}</span>
            </div>
            <button title="Sign In" type="submit" className="sign-in_btn">
              <span>Thêm</span>
            </button>
          </form>
        </div>

        <div className="py-5">
          <table class="table">
            <thead>
              <tr>
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

export default TrangSgSanPham;
