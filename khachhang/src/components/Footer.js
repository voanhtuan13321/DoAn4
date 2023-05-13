import { Link } from "react-router-dom";
import { BsLinkedin, BsGithub, BsYoutube, BsInstagram } from "react-icons/bs";
import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../components/urlApi";
const Footer = () => {
  const [data, setData] = useState([]);
  console.log(data);
  useEffect(() => {
    axios.get(api.getCuaHang).then((res) => {
      setData(res.data.data[0]);
    });
  }, []);
  return (
    <>
      <footer className="py-4 text-center">
        <div className="container-xxl">
          <div className="row ">
            <div className="col-3"></div>
            <div className="col-3">
              <h4 className="text-white mb-4">Liên hệ với chúng tôis</h4>
              <div>
                <a
                  href="tel:+91 8264954234"
                  className="mt-3 d-block mb-1 text-white"
                >
                  Số điện thoại : {data.soDienThoai}
                </a>
                <a
                  href="mailto:navdeepdahiya753@gmail.com"
                  className="d-block mb-0 text-white"
                >
                  Email : {data.email}
                </a>
              </div>
            </div>
            <div className="col-3">
              <h4 className="text-white">Thông tin</h4>
              <div className="footer-link d-flex flex-column">
                <a to="/privacy-policy" className="text-white py-2">
                  {data.website}
                </a>
              </div>
              <a
                href="mailto:navdeepdahiya753@gmail.com"
                className="d-block mb-0 text-white"
              >
                Địa chỉ : {data.diaChi}
              </a>
            </div>
            <div className="col-3"></div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
