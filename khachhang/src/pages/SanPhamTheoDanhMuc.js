import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../components/urlApi";
import { useParams, Link } from "react-router-dom";
// import {}
const SanPhamTheoDanhMuc = () => {
  const params = useParams();
  console.log(params.id);
  const [danhMucSanPham, setDanhMucSanPham] = useState([]);

  useEffect(() => {
    axios
      .get(api.getDanhMucIdDanhMuc + params.id)
      .then((res) => {
        console.log(res.data.data);
        setDanhMucSanPham(res.data.data);
      })
      .catch((errors) => console.log(errors));
  }, [params.id]);

  const sanPhamTheoDanhMuc = () => {
    return danhMucSanPham.map((item, index) => {
      return (
        // <div key={index} className="col-3 mb-3">
        //   <Link
        //     to={"/san_pham/" + item.idSach}
        //     className="border p-3 color card"
        //     title={item.ten}
        //   >
        //     <div className="text-center mb-3">
        //       <img
        //         src={api.img + item.hinhAnh}
        //         className="img-fluid heightImage"
        //         alt="product image"
        //       />
        //     </div>
        //     <div>
        //       <p className=" fw-lighter fontsize">{item.ten}</p>
        //       <div>
        //         Giá tiền : <b className="textred">{item.giaSach}</b> VND
        //       </div>
        //     </div>
        //   </Link>
        // </div>

        <div className=" col-3 mb-3" key={index}>
          <div className="card">
            <img
              src={api.img + item.hinhAnh}
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">{item.ten}</h5>
              <p className="card-text ">Giá sách : {item.giaSach}</p>
            </div>
          </div>
        </div>
      );
    });
  };
  return (
    <div className="container-xxl py-4">
      <div className="row">{sanPhamTheoDanhMuc()}</div>
    </div>
  );
};

export default SanPhamTheoDanhMuc;
