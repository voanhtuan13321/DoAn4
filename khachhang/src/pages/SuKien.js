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
    <div className="container-xxl py-4">
      <div className="row">{renderSuKien()}</div>
      <div>
        <div className="d-flex">
          <div>Lê viết tâm</div>
        </div>
        <div className="d-flex">
          <div>Sán phẩm ni đẹp nè</div>
          <div>12/06/2001</div>
        </div>
        <>
          <div className="d-flex">
            <button>
              {/* // onClick={() => xoaBinhLuan(item.id)} className="btn-danger">{" "} */}
              {/* <AiFillDelete /> */}
              Xóa
            </button>
            <button
            // onClick={() => suaBinhLuan(item.id)}
            // className="btn-warning"
            >
              {/* <AiFillEdit /> */}
              Sửa
            </button>
          </div>
        </>
      </div>
    </div>
  );
};

export default SuKien;
