import React from "react";
import {Link} from "react-router-dom";
import {BsLinkedin, BsGithub, BsYoutube, BsInstagram} from "react-icons/bs";
const Footer = () => {
  return (
    <>
      <footer className="py-4">
        <div className="container-xxl">
          <div className="row">
            <div className="col-4">
              <h4 className="text-white mb-4">Liên hệ với chúng tôis</h4>
              <div>
                <address className="text-white fs-6">
                  Hno : 277 Near Vill chopal, <br /> Sonipat, Haryana <br />
                  PinCode: 131103
                </address>
                <a href="tel:+91 8264954234" className="mt-3 d-block mb-1 text-white">
                  +91 8264954234
                </a>
                <a href="mailto:navdeepdahiya753@gmail.com" className="mt-2 d-block mb-0 text-white">
                  navdeepdahiya753@gmail.com
                </a>
                <div className="social_icons d-flex align-items-center gap-30 mt-4">
                  <p className="text-white">
                    <BsLinkedin className="fs-4" />
                  </p>
                  <p className="text-white">
                    <BsInstagram className="fs-4" />
                  </p>
                  <p className="text-white">
                    <BsGithub className="fs-4" />
                  </p>
                  <p className="text-white">
                    <BsYoutube className="fs-4" />
                  </p>
                </div>
              </div>
            </div>
            <div className="col-3">
              <h4 className="text-white mb-4">Thông tin</h4>
              <div className="footer-link d-flex flex-column">
                <Link to="/privacy-policy" className="text-white py-2 mb-1">
                  Chính sách bảo mật
                </Link>
                <Link to="/refund-policy" className="text-white py-2 mb-1">
                  Chính sách hoàn tiền
                </Link>
                <Link to="/shipping-policy" className="text-white py-2 mb-1">
                  Chính sách vận chuyển
                </Link>
                <Link to="/term-conditions" className="text-white py-2 mb-1">
                  Điều khoản &� Điều kiện
                </Link>
              </div>
            </div>
            <div className="col-3">
              <h4 className="text-white mb-4">Tài khoản</h4>
              <div className="footer-link d-flex flex-column">
                <Link className="text-white py-2 mb-1">Về chúng tôi</Link>
                <Link className="text-white py-2 mb-1">Sự tiếp xúc</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
