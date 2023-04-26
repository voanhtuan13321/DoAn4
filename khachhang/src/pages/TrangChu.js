import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import api from "../components/urlApi";

const TrangChu = () => {
  let sach = JSON.parse(localStorage.getItem("timKiem"));
  console.log(sach);
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get(api.sach).then((res) => {
      setData(res.data.data);
    });
  }, []);

  const productsByCategory = useMemo(() => {
    // Lọc ra các giá trị categoryId duy nhất
    const sanPhamTheoIdDanhMuc = [
      ...new Set(data.map((product) => product["danhMuc"].idDanhMuc)),
    ];
    // Tạo ra danh sách các sản phẩm theo từng categoryId
    const cacSanPhamTheoId = sanPhamTheoIdDanhMuc.map((categoryId) =>
      data.filter((product) => product["danhMuc"].idDanhMuc === categoryId)
    );
    // Trả về mảng kết quả
    return cacSanPhamTheoId;
  }, [data]);

  return (
    <div className="rimary mh700">
      <div className="container-xxl py-2">
        <div className="row">
          <div className="col-6">
            <div className="main-banner position-relative ">
              <img
                src="https://cdn0.fahasa.com/media/magentothem/banner7/Management_mainbanner_T4_840x320_1.jpg"
                className="img-fluid rounded-3 height400"
                alt="main banner"
              />
            </div>
          </div>
          <div className="col-6">
            <div className="d-flex flex-wrap gap-5 justify-content-between align-items-center">
              <div className="small-banner position-relative">
                <img
                  src="https://cdn0.fahasa.com/media/magentothem/banner7/AZ_T04_slide_840x320.jpg"
                  className="img-fluid rounded-3"
                  alt="main banner"
                />
              </div>
              <div className="small-banner position-relative">
                <img
                  src="https://cdn0.fahasa.com/media/magentothem/banner7/PLATINUM_NCCDINHTY_T42023_Slide_840x320.jpg"
                  className="img-fluid rounded-3"
                  alt="main banner"
                />
              </div>
              <div className="small-banner position-relative ">
                <img
                  src="https://cdn0.fahasa.com/media/wysiwyg/Thang-04-2023/FahasaT4w3_T423_Bo1_392x156.jpg"
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
        <>
          {productsByCategory.map((categoryProducts, index) => (
            <div className="mt-5">
              <h3>{categoryProducts[0]["danhMuc"].ten}</h3>
              <div className="row mb-5" key={index}>
                {categoryProducts.slice(0, 5).map((item, index) => (
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
                          <p className="card-text ">
                            Giá sách : {item.giaSach} VND
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