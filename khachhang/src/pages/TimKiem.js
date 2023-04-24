import React from "react";
import api from "../components/urlApi";
import { Link } from "react-router-dom";

const TimKiem = () => {
  let sach = JSON.parse(localStorage.getItem("timKiem"));
  if (sach == "") {
    return (
      <div className="container-xxl py-5 mh400 text-center">
        <h3>Không tìm thấy sản phẩm</h3>
      </div>
    );
  }

  return (
    <div className="container-xxl py-5 mh700">
      <div className="row">
        {sach.map((item, index) => (
          <div key={index} className="col-3 mb-3">
            <Link
              to={"/san_pham/" + item.idSach}
              className="border color  card "
              title={item.ten}
            >
              <div className="card">
                <img
                  src={api.img + item.hinhAnh}
                  className="card-img-top heightImage"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title">{item.ten}</h5>
                  <p className="card-text ">Giá sách : {item.giaSach} VND</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimKiem;
