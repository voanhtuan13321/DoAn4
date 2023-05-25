import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import api from "../components/urlApi";
const SachBanChay = () => {
  const animationLoad = document.querySelector("#load");
  const [sachbanChay, setSachbanChay] = useState([]);
  // sach Bán chạy
  useEffect(() => {
    animationLoad.classList.remove("d-none");
    axios
      .get(api.sachBanChay)
      .then((res) => {
        setSachbanChay(res.data.data);
      })
      .finally(() => animationLoad.classList.add("d-none"));
  }, []);
  return (
    <div className="rimary mh700 mt150px">
      <div className="container-xxl py-2">
        <div className="row mb-5">
         
          {sachbanChay.map((item, index) => (
            <div key={index} className="col-3 mb-3">
              <Link
                to={"/san_pham/" + item.idSach}
                className="border color  card "
                title={item.ten}
              >
                <div className="card">
                  <img
                    src={api.img + item["sach"].hinhAnh}
                    className="card-img-top heightImage"
                    alt="..."
                  />
                  <div className="card-body">
                    <h5 className="card-title name">
                      {item["sach"].ten.length > 60
                        ? item["sach"].ten.slice(0, 60) + "..."
                        : item["sach"].ten}
                    </h5>
                    <p className="card-text ">
                      Giá sách :{" "}
                      {item["sach"].giaSach.toLocaleString() + " VNĐ"}{" "}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SachBanChay;
