import React, {useEffect, useState} from "react";
import api from "../components/urlApi";
import {Link} from "react-router-dom";
import axios from "axios";

function TimKiem() {
  const [listSachs, setListSachs] = useState([]);
  const [search, setIsSearch] = useState(false);
  const animatinLoad = document.getElementById("load");
  const [sanPhamDanhMuc, setSanPhamDanhMuc] = useState([]);

  useEffect(() => {
    const min = 1;
    const max = 10;
    const randomInt = Math.floor(Math.random() * (max - min + 1)) + min;
    axios
      .get(api.getDanhMucIdDanhMuc + randomInt)
      .then((res) => {
        setSanPhamDanhMuc(res.data.data);
      })
      .catch((errors) => console.log(errors));
  }, []);

  const sanPhamTheoDanhMuc = () => {
    if (sanPhamDanhMuc.length > 0) {
      return sanPhamDanhMuc.map((item, index) => {
        return (
          <div className=" col-3 mb-3" key={index}>
            <Link to={"/san_pham/" + item.idSach} className="border color  card " title={item.ten}>
              <div className="card">
                <img src={api.img + item.hinhAnh} className="card-img-top heightImage" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">{item.ten.length > 40 ? item.ten.slice(0, 40) + "..." : item.ten}</h5>
                  <p className="card-text ">Giá sách : {item.giaSach.toLocaleString() + " VNĐ"}</p>
                </div>
              </div>
            </Link>
          </div>
        );
      });
    }
  };

  let timKiemSach = window.localStorage.getItem("tuKhoaTimKiem");
  useEffect(() => {
    animatinLoad.classList.remove("d-none");
    axios
      .get(api.timKiem, {params: {search: timKiemSach}})
      .then((res) => {
        if (res.data?.data) {
          setListSachs(res.data?.data);
          setIsSearch(true);
        }
      })
      .finally(() => animatinLoad.classList.add("d-none"));
  }, [timKiemSach]);
  return (
    <div className="container-xxl py-5 mh700 mt150px">
      <div className="row">
        {listSachs.length
          ? listSachs?.map((item, index) => (
              <div key={index} className="col-3 mb-3">
                <Link to={"/san_pham/" + item.idSach} className="border color  card " title={item.ten}>
                  <div className="card">
                    <img src={api.img + item.hinhAnh} className="card-img-top heightImage" alt="..." />
                    <div className="card-body">
                      <h5 className="card-title">{item.ten}</h5>
                      <p className="card-text ">Giá sách : {item.giaSach + " VNĐ"} </p>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          : search && (
              <div className="">
                <h3 className="text-center py-4">Không tìm thấy sản phẩm!</h3>
                <div>
                  <h4 className="mb-5 mt-5">Cách sản phẩm có thể bạn thích</h4>
                  <div className="row">{sanPhamTheoDanhMuc()}</div>
                </div>
              </div>
            )}
      </div>
    </div>
  );
}

export default TimKiem;
