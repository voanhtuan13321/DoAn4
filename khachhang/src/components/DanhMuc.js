import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../components/urlApi";
import { Link } from "react-router-dom";
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
        <li className="mb-1" key={index}>
          <p>
            <Link
              className="text-white"
              to={"/san_theo_danh_muc/" + item.idDanhMuc}
            >
              {item.ten}
            </Link>
          </p>
        </li>
      );
    });
  };
  return (
    <div className="col-2 py-2">
      <div className="p-3 rounded bg3b4149 text-white">
        <h4 className="mb-4">Danh mục</h4>
        <ul className="list-unstyled ps-0">{rederDanhMuc()}</ul>
      </div>
    </div>
  );
};

export default DanhMuc;
