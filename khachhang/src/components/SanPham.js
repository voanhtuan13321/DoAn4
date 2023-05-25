import React, { useStat, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import api from "../components/urlApi";
import { useNavigate } from "react-router-dom";

const SanPham = () => {
  let navigate = useNavigate();
  const params = useParams();
  const [data, setData] = useState("");

  useEffect(() => {
    axios
      .get(api.sachId + params.id)
      .then((res) => {
        setData(res.data.data);
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const checkDangNhap = () => {
    alert("Bạn chưa đăng nhập");
    window.location = "http://localhost:3000/dang-nhap";
  };

  const themVaoGioHang = (idSach) => {
    let idKhachHang = JSON.parse(sessionStorage.getItem("idKhachHang"));
    if (!idKhachHang) {
      // window.location = "http://localhost:3000/dang-nhap";
      checkDangNhap();
    } else {
      const data = {
        idKhachHang,
        idSach,
      };

      console.log(data);
      axios
        .post(api.gioHang, data)
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
      <div className="col-10">
        <div className="container-xxl py-5 rounded ">
          <div className="row">
            <div className="col-4">
              <div className="product-image">
                <img
                  src={api.img + data.hinhAnh}
                  className="img-fluid"
                  alt="product image"
                />
              </div>
            </div>
            <div className="col-8">
              <div className="product-details">
                <h6 className="brand">{data.ten}</h6>
                {/* <h5 className="product-title">{data.tacGia}</h5> */}
                <p>{data.nhaXuatBan}</p>
                <p>{data.khuyenMai}</p>
                <p>Nhà xuất bản : {data.nhaXuatBan}</p>
                <p>Số lượng : {data.soLuong}</p>
                <p>Ngày xuất bản : {data.ngayXuatBan}</p>
                <p>{data.moTa}</p>
                <p className="price">
                  <b>Giá tiền</b> : {data.giaSach} VNĐ
                </p>
              </div>
              <div className="d-flex justify-content-center align-items-center">
                {/* <div class="input-group mb-0">
                  <button className="btn btn-outline-secondary">+</button>
                  <input type="text" defaultValue={1} />
                  <button className="btn btn-outline-secondary">-</button>
                </div> */}
                <div>
                  <button
                    onClick={() => themVaoGioHang(data.idSach)}
                    className="button"
                  >
                    Thêm vào giỏ hàng
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SanPham;
