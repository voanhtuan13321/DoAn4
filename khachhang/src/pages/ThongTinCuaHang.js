import React, {useEffect, useState} from "react";
import axios from "axios";
import api from "../components/urlApi";

const ThongTinCuaHang = () => {
  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   axios.get(api.getCuaHang).then((res) => {
  //     setData(res.data.data);
  //   });
  // }, []);

  // const renderData = () => {
  //   return data.map((item, index) => (
  //     <div className="text-start" key={index}>
  //       <p>{item.tenCuaHang}</p>
  //       <p>{item.moTa}</p>
  //       <p>{item.soDienThoai}</p>
  //       <p>{item.diaChi}</p>
  //       <p>{item.website}</p>
  //       <p>{item.email}</p>
  //     </div>
  //   ));
  // };

  // return (
  //   <>
  //     <div className="text-center py-5 mh400 mt150px">
  //       <div className="d-flex align-items-center justify-content-center">
  //         <form className="width-500">
  //           <p className="form-title py-4">Thông tin của hàng</p>
  //           <div className="d-flex fs-5">
  //             <div className="text-start ml5 ">
  //               <p>Tên cửa hàng :</p>
  //               <p>Mô tả :</p>
  //               <p>Số điện thoại :</p>
  //               <p>Địa chỉ :</p>
  //               <p>Website :</p>
  //               <p>Email cửa hàng :</p>
  //             </div>
  //             {renderData()}
  //           </div>
  //         </form>
  //       </div>
  //     </div>
  //   </>
  // );

  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(api.cuaHang).then((res) => {
      console.log(res.data.data);
      setData(res.data.data);
    });
  }, []);

  const renderData = () => {
    return data.map((item, index) => (
      <div className="text-start" key={index}>
        <p className="w500">{item.tenCuaHang}</p>
        <p className="w500 mh100">{item.moTa}</p>
        <p className="w500">{item.soDienThoai}</p>
        <p className="w500">{item.diaChi}</p>
        <p className="w500">{item.website}</p>
        <p className="w500">{item.email}</p>
      </div>
    ));
  };

  return (
    <div className="pl5px">
      <div className="text-center py-5 mh400 mt150px">
        <div className="d-flex align-items-center justify-content-center">
          <form className="">
            <h1 className="form-title py-4">Thông tin của hàng</h1>
            <div className="d-flex fs-5 ">
              <div className="text-start ml5 mr30">
                <p className="w100">Tên cửa hàng :</p>
                <p className="w100 mh100">Mô tả :</p>
                <p className="w100">Số điện thoại :</p>
                <p className="w100">Địa chỉ :</p>
                <p className="w100">Website :</p>
                <p className="w100">Email cửa hàng :</p>
              </div>
              {renderData()}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ThongTinCuaHang;
