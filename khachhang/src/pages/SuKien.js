import React, {useEffect, useState} from "react";
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
          <div className="card-body bsd">
            <h5 className="card-title">{item.tieuDe}</h5>
            <p className="card-text">{item.noiDung}</p>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="container-xxl py-4 mh500 mt150px">
      <div className="row">{renderSuKien()}</div>
    </div>
  );
};

export default SuKien;
