import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../../components/urlApi";

const SanPhamTheoDanhMuc = () => {
  const [danhMucSanPham, setDanhMucSanPham] = useState([]);

  useEffect(() => {
    axios
      .get(api.sach)
      .then((res) => {
        console.log(res);
        setDanhMucSanPham(res.data.data);
      })
      .catch((errors) => console.log(errors));
  }, []);
  return <div></div>;
};

export default SanPhamTheoDanhMuc;
