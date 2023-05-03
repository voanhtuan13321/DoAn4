import React, {useEffect, useState} from "react";
import axios from "axios";
import api from "../../components/urlApi";

import {useNavigate} from "react-router-dom";

const SuaSanPham = () => {
  const sach = JSON.parse(localStorage.getItem("sach"));
  let navigator = useNavigate();

  const [input, setInput] = useState({
    idSach: sach.idSach,
    ten: sach.ten,
    tacGia: sach.tacGia,
    nhaXuatBan: sach.nhaXuatBan,
    giaSach: sach.giaSach,
    moTa: sach.moTa,
    ngayXuatBan: sach.ngayXuatBan,
    soLuong: sach.soLuong,
    khuyenMai: sach.khuyenMai,
    hinhAnh: sach.hinhAnh,
    idDanhMuc: sach.danhMuc.idDanhMuc,
  });

  const [danhMuc, setDanhMuc] = useState([]);
  const [file, setFile] = useState("");
  const [avatar, setAvatar] = useState("");
  const [valuedanhMuc, setValueDanhMuc] = useState("");
  console.log(danhMuc);

  let [errTen, setErrTen] = useState("");
  let [errTacGia, setErrTacGia] = useState("");
  let [errNhaXuatBan, setErrNhaXuatBan] = useState("");
  let [errGiaSach, setErrGiaSach] = useState("");
  let [errMoTa, setErrMoTa] = useState("");
  let [errNgayXuatBan, setErrNgayXuatBan] = useState("");
  let [errSoLuong, setErrSoLuong] = useState("");
  let [errDanhMuc, setErrDanhMuc] = useState("");
  let [errHinhAnh, setErrHinhAnh] = useState("");

  const handleDanhMuc = (e) => {
    let value = e.target.value;
    setValueDanhMuc(value);
  };

  useEffect(() => {
    axios
      .get(api.getDanhMuc)
      .then((res) => {
        console.log(res);
        setDanhMuc(res.data.data);
      })
      .catch((errors) => console.log(errors));
  }, []);

  const handleInput = (e) => {
    let nameKey = e.target.name;
    let nameValue = e.target.value;
    setInput((state) => ({...state, [nameKey]: nameValue}));
  };

  const handleFile = (e) => {
    let files = e.target.files;
    let reader = new FileReader();
    reader.onload = (e) => {
      setAvatar(e.target.result); //Cái này để gởi qua api
      setFile(files[0]);
    };
    reader.readAsDataURL(files[0]);
  };

  const rederDanhMuc = () => {
    return danhMuc.map((item, index) => {
      return (
        <option key={index} value={item.idDanhMuc}>
          {item.ten}
        </option>
      );
    });
  };

  const handlerSubmit = (e) => {
    e.preventDefault();

    let check = 1;

    if (input.ten == "") {
      check = 2;
      setErrTen("Vui lòng nhập vào tên");
      return;
    } else {
      check = 1;
      setErrTen("");
    }
    if (input.tacGia == "") {
      check = 2;
      setErrTacGia("Vui lòng nhập vào tác giả");
      return;
    } else {
      check = 1;
      setErrTacGia("");
    }
    if (input.nhaXuatBan == "") {
      check = 2;
      setErrNhaXuatBan("Vui lòng nhập vào nhà xuất bản");
      return;
    } else {
      check = 1;
      setErrNhaXuatBan("");
    }
    if (input.giaSach == "") {
      check = 2;
      setErrGiaSach("Vui lòng nhập vào giá sách");
      return;
    } else {
      check = 1;
      setErrGiaSach("");
    }
    if (input.moTa == "") {
      check = 2;
      setErrMoTa("Vui lòng nhập vào mô tả");
      return;
    } else {
      check = 1;
      setErrMoTa("");
    }
    if (input.ngayXuatBan == "") {
      check = 2;
      setErrNgayXuatBan("Vui lòng nhập vào ngày xuất bản");
      return;
    } else {
      check = 1;
      setErrNgayXuatBan("");
    }
    if (input.soLuong == "") {
      check = 2;
      setErrSoLuong("Vui lòng nhập vào số lượng");
      return;
    } else {
      check = 1;
      setErrSoLuong("");
    }
    if (valuedanhMuc == "") {
      check = 2;
      setErrDanhMuc("Vui lòng chọn danh mục");
      return;
    } else {
      check = 1;
      setErrDanhMuc("");
    }
    if (avatar == "") {
      check = 2;
      setErrHinhAnh("Vui lòng chọn hình ảnh");
      return;
    } else {
      check = 1;
      setErrHinhAnh("");
    }

    if (check == 1) {
      const data = {
        idSach: input.idSach,
        ten: input.ten,
        tacGia: input.tacGia,
        nhaXuatBan: input.nhaXuatBan,
        giaSach: parseInt(input.giaSach),
        moTa: input.moTa,
        ngayXuatBan: input.ngayXuatBan,
        soLuong: parseInt(input.soLuong),
        hinhAnh: avatar.replace("data:image/jpeg;base64,", ""),
        idDanhMuc: input.idDanhMuc,
      };

      console.log(typeof data.hinhAnh);

      axios
        .post(api.sach, data)
        .then((res) => {
          console.log(res);
          alert("Cập nhật thành công");
          navigator("/admin/trang_san_pham");
        })
        .catch((errors) => console.log(errors));
    }
  };

  const xemSanPham = () => {};

  return (
    <div className="pl5px">
      <button></button>
      <div className="">
        <div className="d-flex justify-content-center">
          <form className="" onSubmit={handlerSubmit}>
            <h3>
              <b>Cập nhật sản phẩm</b>
            </h3>
            <div className="d-flex ">
              <div className="p-3">
                <div className="input_container">
                  <label className="input_label">Tên</label>
                  <input
                    placeholder="Tên"
                    name="ten"
                    type="text"
                    className="input_field"
                    onChange={handleInput}
                    value={input.ten}
                  />
                  <span className="error">{errTen}</span>
                </div>
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
                    value={input.tacGia}
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
                    value={input.nhaXuatBan}
                  />
                  <span className="error">{errNhaXuatBan}</span>
                </div>
                <div className="input_container">
                  <label className="input_label">Giá sách</label>
                  <input
                    placeholder="Giá sách"
                    name="giaSach"
                    type="text"
                    className="input_field"
                    onChange={handleInput}
                    value={input.giaSach}
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
                    // value={new Date(input.ngayXuatBan)}
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
                    type="text"
                    className="input_field"
                    onChange={handleInput}
                    value={input.soLuong}
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
                  <select onChange={handleDanhMuc} value={input.idDanhMuc}>
                    {/* <option>Chọn danh mục</option> */}
                    {rederDanhMuc()}
                  </select>
                </div>
              </div>
            </div>
            <div className="input_container mb-5">
              <label className="input_label">Mô tả</label>
              <textarea
                placeholder="Mô tả"
                name="moTa"
                type="text"
                rows={5}
                className="input_field"
                onChange={handleInput}
                value={input.moTa}
              />
              <span className="error">{errMoTa}</span>
            </div>
            <button title="Sign In" type="submit" className="sign-in_btn">
              <span>Cập nhật</span>
            </button>
          </form>
        </div>

        {/* <div className="py-5">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Tên</th>
                <th scope="col">Tác giả</th>
                <th scope="col">Nhà xuất bản</th>
                <th scope="col">Giá sách</th>
                <th scope="col">Số lượng</th>
                <th scope="col">Khuyến mãi</th>
                <th scope="col">Ảnh</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div> */}
      </div>
    </div>
  );
};

export default SuaSanPham;
