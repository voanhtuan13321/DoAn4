import React from "react";
import { NavLink, Link } from "react-router-dom";
import { BsSearch ,BsFillCartCheckFill} from "react-icons/bs";
import {BiLogIn} from "react-icons/bi";
const Header = () => {
    return (
        <>
          {/* <header className="header-top-strip py-3">
            <div className="container-xxl">
              <div className="row">
                <div className="col-6">
                  <p className="text-white mb-0">
                    Free Shipping Over $100 & Free Returns
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-end text-white mb-0">
                    Hotline:
                    <a className="text-white" href="tel:+91 8264954234">
                      +91 8264954234
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </header> */}
          <header className="header-upper py-3">
            <div className="container-xxl">
              <div className="row align-items-center">
                <div className="col-2">
                  <h2>
                    <Link className="text-white">Dev Corner</Link>
                  </h2>
                </div>
                <div className="col-5">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control py-2"
                      placeholder="Search Product Here..."
                      aria-label="Search Product Here..."
                      aria-describedby="basic-addon2"
                    />
                    <span className="input-group-text p-3" id="basic-addon2">
                      <BsSearch className="fs-6" />
                    </span>
                  </div>
                </div>
                <div className="col-5 text-start">
                  <div className="header-upper-links d-flex align-items-center justify-content-between">
                    <div>
                      <Link
                        to="/dang_nhap"
                        className="d-flex align-items-center gap-10 text-white"
                      >
                        <BiLogIn/>
                        <p className="mb-0">
                          Đăng nhập
                        </p>
                      </Link>
                    </div>
                    <div>
                      <Link to="/gio_hang" className="d-flex align-items-center gap-10 text-white">
                        <BsFillCartCheckFill/>
                        <div className="d-flex flex-column gap-10">
                          <span className="badge bg-white text-dark">0</span>
                          <p className="mb-0">$ 500</p>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>
          <header className="header-bottom py-3">
            <div className="container-xxl">
              <div className="row">
                <div className="col-12">
                  <div className="menu-bottom d-flex justify-content-center align-items-center gap-30">
                    <div className="menu-links">
                      <div className="d-flex align-items-center gap-15">
                        <NavLink to="/">Trang chủ</NavLink>
                        <NavLink to="/su_kien">Thông tin sự kiện</NavLink>
                        <NavLink to="/blogs">Blogs</NavLink>
                        <NavLink to="/contact">Contact</NavLink>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>
        </>
      );
}

export default Header