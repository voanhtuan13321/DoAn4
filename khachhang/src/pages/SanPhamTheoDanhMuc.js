import React, {useEffect, useState} from "react";
import axios from "axios";
import api from "../components/urlApi";
import {useParams, Link} from "react-router-dom";

const SanPhamTheoDanhMuc = () => {
  const params = useParams();
  const [danhMucSanPham, setDanhMucSanPham] = useState([]);

  useEffect(() => {
    axios
      .get(api.getDanhMucIdDanhMuc + params.id)
      .then((res) => {
        setDanhMucSanPham(res.data.data);
      })
      .catch((errors) => console.log(errors));
  }, [params.id]);

  const sanPhamTheoDanhMuc = () => {
    if (danhMucSanPham.length > 0) {
      return danhMucSanPham.map((item, index) => {
        return (
          <div className=" col-3 mb-3" key={index}>
            <Link to={"/san_pham/" + item.idSach} className="border color  card " title={item.ten}>
              <div className="card">
                <img src={api.img + item.hinhAnh} className="card-img-top heightImage" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">{item.ten.length > 50 ? item.ten.slice(0, 50) + "...": item.ten}</h5>
                  <p className="card-text ">Giá sách: {item.giaSach.toLocaleString() + " VNĐ"}</p>
                </div>
              </div>
            </Link>
          </div>
        );
      });
    } else {
      return (
        <div className="text-center">
          <h4>Không có sản phẩm</h4>
        </div>
      );
    }
  };
  return (
    <div className="container-xxl py-4 mh700 mt150px">
      <div className="row">{sanPhamTheoDanhMuc()}</div>
    </div>
  );
};

export default SanPhamTheoDanhMuc;
