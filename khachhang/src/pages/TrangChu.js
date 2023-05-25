import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import api from "../components/urlApi";

const TrangChu = () => {
  const [data, setData] = useState([]);
  const [sachbanChay, setSachbanChay] = useState([]);
  const animationLoad = document.querySelector("#load");

  // lay du lieu thong tin all sach tu database
  useEffect(() => {
    animationLoad.classList.remove("d-none");
    axios
      .get(api.sach)
      .then((res) => {
        setData(res.data.data);
      })
      .finally(() => animationLoad.classList.add("d-none"));
  }, []);

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

  console.log(sachbanChay);

  const productsByCategory = useMemo(() => {
    animationLoad.classList.remove("d-none");
    // Lọc ra các giá trị categoryId duy nhất
    const sanPhamTheoIdDanhMuc = [
      ...new Set(data.map((product) => product["danhMuc"].idDanhMuc)),
    ];
    // Tạo ra danh sách các sản phẩm theo từng categoryId
    const cacSanPhamTheoId = sanPhamTheoIdDanhMuc.map((categoryId) =>
      data.filter((product) => product["danhMuc"].idDanhMuc === categoryId)
    );
    animationLoad.classList.add("d-none");
    // Trả về mảng kết quả
    return cacSanPhamTheoId;
  }, [data]);

  return (
    <div className="rimary mh700 mt150px ">
      <div className="container-xxl py-2">
        <div className="row mb-5">
          <div className="d-flex align-items-center mb-4 ">
            <h4 className="mr5">Sản phẩm mua nhiều nhất</h4>
          </div>
          {sachbanChay.slice(0, 8).map((item, index) => (
            <div key={index} className="col-3 mb-3">
              <Link
                to={"/san_pham/" + item["sach"].idSach}
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
                      Giá sách: {item["sach"].giaSach.toLocaleString() + " VNĐ"}{" "}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="container-xxl">
        <>
          {productsByCategory.map((categoryProducts, index) => (
            <div className="mt-5" key={index}>
              <div className="d-flex align-items-center mb-4">
                <h4 className="mr5">{categoryProducts[0]["danhMuc"].ten}</h4>
                <Link
                  className="mb-1"
                  to={
                    "/san_theo_danh_muc/" +
                    categoryProducts[0]["danhMuc"]?.idDanhMuc
                  }
                >
                  Xem thêm
                </Link>
              </div>
              <div className="row mb-5">
                {categoryProducts.slice(0, 8).map((item, index) => (
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
                          <h5 className="card-title name">
                            {item.ten.length > 60
                              ? item.ten.slice(0, 60) + "..."
                              : item.ten}
                          </h5>
                          <p className="card-text ">
                            Giá sách: {item.giaSach.toLocaleString() + " VNĐ"}{" "}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </>
      </div>
    </div>
  );
};

export default TrangChu;
