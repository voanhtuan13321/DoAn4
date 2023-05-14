import React, {useEffect, useState} from "react";
import axios from "axios";
import api from "../../components/urlApi";
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";

const TrangCuaHang = () => {
  let navigate = useNavigate();

  // // check dang nhap
  // let admin = JSON.parse(localStorage.getItem("taiKhoanAdmin"));
  // if (!admin) {
  //   Swal.fire("Bạn phải đăng nhập").then(() => navigation("/"));
  // }

  // //////////////////////////////////
  // const [cuaHang, setCuaHang] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get(api.cuaHang)
  //     .then((res) => {
  //       setCuaHang(res.data.data);
  //     })
  //     .catch((errors) => console.log(errors));
  // }, [1]);

  // function checkId(item) {
  //   localStorage.setItem("cuahang", JSON.stringify(item));
  //   navigation("/admin/trang_sua_cua_hang");
  // }

  // const renderCuaHang = () => {
  //   return cuaHang.map((item, index) => {
  //     return (
  //       <tr key={index}>
  //         <td>
  //           <p className="fs14 mb-0">{item.tenCuaHang}</p>
  //         </td>
  //         <td>
  //           <p className="fs14 mb-0">{item.moTa}</p>
  //         </td>
  //         <td>
  //           <p className="fs14 mb-0">{item.soDienThoai}</p>
  //         </td>
  //         <td>
  //           <p className="fs14 mb-0">{item.diaChi}</p>
  //         </td>
  //         <td>
  //           <p className="fs14 mb-0">{item.website}</p>
  //         </td>
  //         <td>
  //           <p className="fs14 mb-0">{item.email}</p>
  //         </td>
  //         <td>
  //           <button className="btn btn-outline-warning fw-bolder" onClick={() => checkId(item)}>
  //             <p className="fs14 mb-0">Sửa</p>
  //           </button>
  //         </td>
  //       </tr>
  //     );
  //   });
  // };

  // return (
  //   <>
  //     <div className="pl5px">
  //       <h5>Thông tin cửa hàng</h5>
  //       <table className="table">
  //         <thead className="table-dark">
  //           <tr>
  //             <th scope="col">
  //               <p className="fs14 mb-0">Tên cửa hàng</p>
  //             </th>
  //             <th scope="col">
  //               <p className="fs14 mb-0">Mô tả</p>
  //             </th>
  //             <th scope="col">
  //               <p className="fs14 mb-0">Số điện thoại</p>
  //             </th>
  //             <th scope="col">
  //               <p className="fs14 mb-0">Dia chỉ</p>
  //             </th>
  //             <th scope="col">
  //               <p className="fs14 mb-0">Website</p>
  //             </th>
  //             <th scope="col">
  //               <p className="fs14 mb-0">Email</p>
  //             </th>
  //             <th scope="col"></th>
  //           </tr>
  //         </thead>
  //         <tbody>{renderCuaHang()}</tbody>
  //       </table>
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
  function checkId(item) {
    console.log(item);
    localStorage.setItem("cuahang", JSON.stringify(item));
    navigate("/admin/trang_sua_cua_hang");
  }
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
      <button className="btn btn-outline-warning fw-bolder" onClick={() => checkId(data[0])}>
        <p className="fs14 mb-0">Sửa</p>
      </button>
      <div className="text-center py-5 mh400 mt150px">
        <div className="d-flex align-items-center justify-content-center">
          <form className="width-500">
            <p className="form-title py-4">Thông tin của hàng</p>
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

export default TrangCuaHang;
