import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../components/urlApi";
const ThongTinCuaHang = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get(api.getCuaHang).then((res) => {
      setData(res.data.data);
      console.log(res.data.data);
    });
  }, []);

  const renderData = () => {
    return data.map((item, index) => {
      return (
        <div className="text-start">
          <p>{item.tenCuaHang}</p>
          <p>{item.moTa}</p>
          <p>{item.soDienThoai}</p>
          <p>{item.diaChi}</p>
          <p>{item.website}</p>
          <p>{item.email}</p>
        </div>
      );
    });
  };

  return (
    <>
      <div className="text-center py-5 mh400">
        <div className="d-flex align-items-center justify-content-center">
          <form className="width-500">
            <p className="form-title py-4">Thông tin của hàng</p>
            <div className="d-flex fs-5">
              <div className="text-start ml5 ">
                <p>Tên cửa hàng :</p>
                <p>Mô tả :</p>
                <p>Số điện thoại :</p>
                <p>Địa chỉ :</p>
                <p>Website :</p>
                <ps>Email cửa hàng :</ps>
              </div>
              {renderData()}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ThongTinCuaHang;
