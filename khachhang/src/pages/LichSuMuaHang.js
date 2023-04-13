import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import api from "../components/urlApi";
const LichSuMuaHang = () => {
  let idKhachHang = JSON.parse(localStorage.getItem("idKhachHang"));
  const [data, setData] = useState("");

  useEffect(() => {
    axios
      .get(api.lichSuMuaHang + idKhachHang)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // const renderLichSu = () => {
  //   return;
  // };
  return (
    <div className="container-xxl">
      <div className="row">
        <div className="pt-5">
          <h3>Giỏ hàng</h3>
        </div>
        <div className="col-12">
          <div className="cart-header py-3 d-flex justify-content-between align-items-center">
            <h4 className="cart-col-1">Sản phẩm</h4>
            <h4 className="cart-col-3">Tên sách</h4>
            <h4 className="cart-col-2">Giá</h4>
            <h4 className="cart-col-3">Số lượng</h4>
            <h4 className="cart-col-4">Tổng tiền</h4>
          </div>
          <div className="cart-data py-3 mb-2 d-flex justify-content-between align-items-center">
            <div className="cart-col-1 gap-15 d-flex align-items-center">
              <div className="w-25">
                <img
                  src="https://cdn0.fahasa.com/media/catalog/product/i/m/image_195509_1_36793.jpg"
                  className="img-fluid"
                  alt="product image"
                />
              </div>
              <div className="w-75">
                <p>GDffdhg</p>
                <p>Size: hgf</p>
                <p>Color: gfd</p>
              </div>
            </div>
            <div className="cart-col-2">
              <h5 className="price">Sách giáo khoa</h5>
            </div>
            <div className="cart-col-2">
              <h5 className="price">$ 100</h5>
            </div>
            <div className="cart-col-3 d-flex align-items-center gap-15">
              <div>12</div>
              <div>{/* <AiFillDelete className="text-danger " /> */}</div>
            </div>
            <div className="cart-col-4">
              <h5 className="price">$ 100</h5>
            </div>
          </div>
          <div className="cart-data py-3 mb-2 d-flex justify-content-between align-items-center">
            <div className="cart-col-1 gap-15 d-flex align-items-center">
              <div className="w-25">
                <img
                  src="https://cdn0.fahasa.com/media/catalog/product/i/m/image_195509_1_36793.jpg"
                  className="img-fluid"
                  alt="product image"
                />
              </div>
              <div className="w-75">
                <p>GDffdhg</p>
                <p>Size: hgf</p>
                <p>Color: gfd</p>
              </div>
            </div>
            <div className="cart-col-2">
              <h5 className="price">Sách giáo khoa</h5>
            </div>
            <div className="cart-col-2">
              <h5 className="price">$ 100</h5>
            </div>
            <div className="cart-col-3 d-flex align-items-center gap-15">
              <div>
                <input
                  className="form-control"
                  type="number"
                  name=""
                  min={1}
                  max={10}
                />
              </div>
              <div>{/* <AiFillDelete className="text-danger " /> */}</div>
            </div>
            <div className="cart-col-4">
              <h5 className="price">$ 100</h5>
            </div>
          </div>
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
