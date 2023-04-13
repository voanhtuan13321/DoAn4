import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../../components/urlApi";
const DanhMuc = () => {
  const [danhMuc, setDanhMuc] = useState([]);
  useEffect(() => {
    axios
      .get(api.getDanhMuc)
      .then((res) => {
        console.log(res);
        setDanhMuc(res.data.data);
      })
      .catch((errors) => console.log(errors));
  }, []);

  const rederDanhMuc = () => {
    return danhMuc.map((item, index) => {
      return (
        <li className="mb-1">
          <Link to>{item.ten}</Link>
        </li>
      );
    });
  };
  return (
    <div>
      <h4>Danh mục</h4>
      <ul className="list-unstyled ps-0">{rederDanhMuc()}</ul>
    </div>
  );
};

export default DanhMuc;
