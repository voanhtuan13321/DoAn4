import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import api from "../components/urlApi";

const TrangChu = () => {
  const [data, setData] = useState([]);
  console.log(data);

  useEffect(() => {
    axios.get(api.sach).then((res) => {
      setData(res.data.data);
    });
  }, []);
  const rederSanPham = () => {
    return data.map((item, index) => {
      return (
        <div className="col-3" key={index}>
          <Link
            to={"/san_pham_chi_tiet/" + item.idSach}
            className="product-card position-relative"
          >
            <div className="product-image">
              <img
                src={api.img + item.hinhAnh}
                className="img-fluid"
                alt="product image"
              />
            </div>
            <div className="product-details">
              <h6 className="brand">{item.ten}</h6>
              <h5 className="product-title">Kids headphones</h5>
              <p>At vero eos et</p>
              <p className="price">$100.00</p>
            </div>
          </Link>
        </div>
      );
    });
  };

  return (
    <div className="rimary">
      <div className="container-xxl py-2">
        <div className="row">
          <div className="col-6">
            <div className="main-banner position-relative ">
              <img
                src="https://cdn0.fahasa.com/media/wysiwyg/Thang-04-2023/FahasaT4w2_LDP_Mainbanner_web.jpg"
                className="img-fluid rounded-3"
                alt="main banner"
              />
            </div>
          </div>
          <div className="col-6">
            <div className="d-flex flex-wrap gap-5 justify-content-between align-items-center">
              <div className="small-banner position-relative">
                <img
                  src="https://cdn0.fahasa.com/media/wysiwyg/Thang-04-2023/FahasaT4w2_LDP_Mainbanner_web.jpg"
                  className="img-fluid rounded-3"
                  alt="main banner"
                />
              </div>
              <div className="small-banner position-relative">
                <img
                  src="https://cdn0.fahasa.com/media/wysiwyg/Thang-04-2023/FahasaT4w2_LDP_Mainbanner_web.jpg"
                  className="img-fluid rounded-3"
                  alt="main banner"
                />
              </div>
              <div className="small-banner position-relative ">
                <img
                  src="https://cdn0.fahasa.com/media/wysiwyg/Thang-04-2023/FahasaT4w2_LDP_Mainbanner_web.jpg"
                  className="img-fluid rounded-3"
                  alt="main banner"
                />
              </div>
              <div className="small-banner position-relative ">
                <img
                  src="https://cdn0.fahasa.com/media/wysiwyg/Thang-04-2023/FahasaT4w2_LDP_Mainbanner_web.jpg"
                  className="img-fluid rounded-3"
                  alt="main banner"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-xxl">
        <div className="row">{rederSanPham()}</div>
      </div>
    </div>
  );
};

export default TrangChu;
