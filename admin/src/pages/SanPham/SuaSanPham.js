import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../../components/urlApi";

const SuaSanPham = () => {
  const sach = JSON.parse(localStorage.getItem("sach"));

  const [input, setInput] = useState({
    ten: sach.ten,
    tacGia: sach.tacGia,
    nhaXuatBan: sach.ngayXuatBan,
    giaSach: sach.giaSach,
    moTa: sach.moTa,
    ngayXuatBan: sach.nhaXuatBan,
    soLuong: sach.soLuong,
    khuyenMai: sach.khuyenMai,
    hinhAnh: sach.hinhAnh,
    idDanhMuc: sach.idDanhMuc,
  });

  const [danhMuc, setDanhMuc] = useState([]);
  const [file, setFile] = useState("");
  const [avatar, setAvatar] = useState("");
  const [valuedanhMuc, setValueDanhMuc] = useState("");
  console.log(danhMuc);

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
    setInput((state) => ({ ...state, [nameKey]: nameValue }));
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

    const data = {
      ten: input.ten,
      tacGia: input.tacGia,
      nhaXuatBan: input.nhaXuatBan,
      giaSach: parseInt(input.giaSach),
      moTa: input.moTa,
      ngayXuatBan: input.ngayXuatBan,
      soLuong: parseInt(input.soLuong),
      khuyenMai: parseInt(input.khuyenMai),
      hinhAnh: avatar.replace("data:image/jpeg;base64,", ""),
      idDanhMuc: parseInt(valuedanhMuc),
    };

    console.log(data);
    axios
      .post(api.sach, data)
      .then((res) => {
        console.log(res);
        // setA(!a)
      })
      .catch((errors) => console.log(errors));
  };

  return (
    <div>
      <div className="">
        <div className="d-flex justify-content-center">
          <form className="" onSubmit={handlerSubmit}>
            <h3>
              <b>Thêm sản phẩm</b>
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
                </div>
                <div className="input_container">
                  <label className="input_label">Mô tả</label>
                  <input
                    placeholder="Mô tả"
                    name="moTa"
                    type="text"
                    className="input_field"
                    onChange={handleInput}
                    value={input.moTa}
                  />
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
                    value={input.ngayXuatBan}
                  />
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
                </div>
                <div className="input_container">
                  <label className="input_label" htmlFor="password_field">
                    Khuyến mãi
                  </label>
                  <input
                    placeholder="Khuyến mãi"
                    name="khuyenMai"
                    type="text"
                    className="input_field"
                    onChange={handleInput}
                    value={input.khuyenMai}
                  />
                </div>
                <div className="input_container">
                  <label className="input_label" htmlFor="password_field">
                    Hình ảnh
                  </label>
                  <input
                    placeholder="Password"
                    name="input-name"
                    type="file"
                    onChange={handleFile}
                    id="file"
                  />
                </div>
                <div className="input_container pt-5">
                  <select onChange={handleDanhMuc} value={input.idDanhMuc}>
                    <option>Chọn danh mục</option>
                    {rederDanhMuc()}
                  </select>
                </div>
              </div>
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
        </div>
      </div>
    </div>
  );
};

export default SuaSanPham;
