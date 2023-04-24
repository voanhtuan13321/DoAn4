import React, { useEffect, useState } from "react";
import api from "../components/urlApi";
import axios from "axios";

const SuKien = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(api.suKien).then((res) => setData(res.data.data));
  }, []);
  const renderSuKien = () => {
    return data.map((item, index) => {
      return (
        <div key={index} className="col-12 mb-2 rounded text-center">
          <div class="card-body bsd">
            <h5 class="card-title">{item.tieuDe}</h5>
            <p class="card-text">{item.noiDung}</p>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="container-xxl py-4 mh400">
      <div className="row">{renderSuKien()}</div>
    </div>
  );
};

export default SuKien;
