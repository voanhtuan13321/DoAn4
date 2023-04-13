import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../../components/urlApi";
import { useNavigate } from "react-router-dom";
const KhuyenMai = () => {
  const [suKien, setSuKien] = useState([]);

  useEffect(() => {
    axios
      .get(api.suKien)
      .then((res) => {
        setSuKien(res.data.data);
      })
      .catch((errors) => console.log(errors));
  }, [a]);

  const renderSuKien = () => {
    return suKien.map((item, index) => {
      return (
        <div key={index} className="col-4">
          <p>{item.tieuDe}</p>
          <p>{item.noiDung}</p>
        </div>
      );
    });
  };

  return (
    <>
      <div className="container-xxl">
        <div className="row">{renderSuKien()}</div>
      </div>
    </>
  );
};

export default KhuyenMai;
