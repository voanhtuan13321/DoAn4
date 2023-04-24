import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import api from "../components/urlApi";
const LichSuMuaHang = () => {
  let idKhachHang = JSON.parse(localStorage.getItem("idKhachHang"));
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(api.lichSuMuaHang + "/" + idKhachHang)
      .then((res) => {
        console.log(res);
        setData(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const renderLichSu = () => {
    return data.map((item, index) => {
      return (
        <div className="cart-data py-3 mb-2 d-flex justify-content-between align-items-center">
          <div className="cart-col-1 gap-15 d-flex align-items-center">
            <div className="w-25">
              <img className="img-fluid" src={api.img + item["sach"].hinhAnh} />
            </div>
          </div>
          <div className="cart-col-2">
            <h5 className="price">{item["sach"].ten}</h5>
          </div>
          <div className="cart-col-2">
            <h5 className="price"> {item["sach"].giaSach} VNĐ</h5>
          </div>
          <div className="cart-col-3 d-flex align-items-center gap-15">
            <div>{item.soLuong}</div>
            <div>{/* <AiFillDelete className="text-danger " /> */}</div>
          </div>
          <div className="cart-col-4">
            <h5 className="price">{item["sach"].giaSach * item.soLuong} VNĐ</h5>
          </div>
        </div>
      );
    });
  };
  return (
    <div className="container-xxl mh700">
      <div className="row">
        <div className="pt-5">
          <h3>Lịch sử mua hàng</h3>
        </div>
        <div className="col-12">
          <div className="cart-header py-3 d-flex justify-content-between align-items-center">
            <h4 className="cart-col-1">Sản phẩm</h4>
            <h4 className="cart-col-3">Tên sách</h4>
            <h4 className="cart-col-2">Giá</h4>
            <h4 className="cart-col-3">Số lượng</h4>
            <h4 className="cart-col-4">Tổng tiền</h4>
          </div>
          {renderLichSu()}
        </div>
        <div className="col-12 py-2 mt-4">
          <div className="d-flex justify-content-between align-items-baseline">
            <Link to="/gio_hang" className="button">
              Giỏ hàng
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LichSuMuaHang;
