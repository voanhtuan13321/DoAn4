import React, { useEffect, useState } from "react";
import { BsCartCheckFill } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
import axios from "axios";
import api from "../components/urlApi";
import { useNavigate, useParams } from "react-router-dom";

const SanPhamChiTiet = () => {
  const [data, setData] = useState([]);
  const [binhLuan, setBinhLuan] = useState([]);
  const [sanPham, setSanPham] = useState("");
  const [input, setInput] = useState("");
  const [a, setA] = useState(true);
  const params = useParams();
  const navigate = useNavigate();
  const idKhachHang = JSON.parse(localStorage.getItem("idKhachHang"));
  useEffect(() => {
    axios
      .get(api.gioHang + "/" + idKhachHang)
      .then((res) => {
        console.log(res.data.data);
        setData(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [a]);

  useEffect(() => {
    axios
      .get(api.sachId + params.id)
      .then((res) => {
        console.log(res.data.data);
        setSanPham(res.data.data);
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(api.binhLuan + "/" + params.id)
      .then((res) => {
        setBinhLuan(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [a]);

  function handleInput(e) {
    console.log(e.target.value);
    setInput(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!idKhachHang) {
      alert("Bạn chưa đăng nhập");
      navigate("/dang_nhap");
    } else {
      if (input) {
        let data = {
          idKhachHang: idKhachHang,
          idSach: sanPham.idSach,
          noiDung: input,
        };

        axios
          .post(api.binhLuan, data)
          .then((res) => {
            setA(!a);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        alert("Vui lòng nhập vào bình luận");
      }
    }
  };

  const binhLuanSanPham = () => {
    return binhLuan.map((item, index) => {
      const date = new Date(Date.parse(item.dateTime));
      const gio = date.getHours();
      const phut = date.getMinutes();
      const ngay = date.getDate();
      const thang = date.getMonth() + 1;
      const nam = date.getFullYear();
      const thoiGian = `${gio}:${phut} ${ngay}/${thang}/${nam}`;
      console.log(date);
      return (
        <div key={index}>
          <div className="card">
            <div className="card-body">
              <p className="card-title">{item["khachHang"].ten}</p>
              <div className="d-flex justify-content-between">
                <div className="comment">
                  <p className="card-text">{item.noiDung}</p>
                  <p className="card-text">{thoiGian}</p>
                </div>
                <div className="d-flex">
                  <button
                    onClick={() => xoaBinhLuan(item.id)}
                    className="classdelete btn btn-danger"
                  >
                    {" "}
                    <AiFillDelete />
                    Xóa
                  </button>
                  <button
                    onClick={() => suaBinhLuan(item.id)}
                    className="btn btn-warning"
                  >
                    <AiFillEdit />
                    Sửa
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  const xoaBinhLuan = (id) => {
    axios.delete(api.binhLuan + "/" + id).then((res) => {
      setA(!a);
    });
  };
  const suaBinhLuan = () => {};

  const themVaoGioHang = (Sach) => {
    let idSach = Sach.idSach;
    if (Sach.soLuong < 1) {
      alert("Sản phẩm đả hết hàng");
      return;
    }
    let idKhachHang = JSON.parse(localStorage.getItem("idKhachHang"));
    if (!idKhachHang) {
      alert("Bạn chưa đăng nhập");
      navigate("/dang_nhap");
    } else {
      const data = {
        idKhachHang,
        idSach,
      };

      axios
        .post(api.gioHang, data)
        .then((res) => {
          console.log(res);
          navigate("/gio_hang");
        })
        .catch((error) => {
          console.log(error);
        });
    }
    /////////////////////////////////////////////////////
    // Tổng cart đả mua
    // let check = 1;
    // let cart = JSON.parse(localStorage.getItem("cart"));
    // if (cart) {
    //   Object.keys(cart).map((value, key) => {
    //     console.log(value);
    //     if (idSach == value) {
    //       check = 2;
    //       cart[value] += 1;
    //     }
    //   });
    // }
    // if (check == 1) {
    //   cart[idSach] = 1;
    // }

    // localStorage.setItem("cart", JSON.stringify(cart));
    /////////////////////////////////////////////////////
  };
  return (
    <>
      <div className="container-xxl py-4 mh700 mt150px">
        <div className="row rounded border-light border-4 bg-light bg-gradient p-5">
          <div className="col-4 ">
            <img
              className="rounded mx-auto d-block img-fluid"
              src={api.img + sanPham.hinhAnh}
            />
          </div>
          <div className="col-8">
            <p className="fs-3">{sanPham.ten}</p>
            <div>
              <div>
                <div className="d-flex justify-content-between">
                  <span>
                    Nhà cung cấp: <b>{sanPham.tacGia}</b>
                  </span>
                  <span>
                    Tác giả: <b>{sanPham.tacGia}</b>
                  </span>
                </div>
                <div className="d-flex justify-content-between py-2">
                  <span>
                    Nhà xuất bản: <b>{sanPham.nhaXuatBan}</b>
                  </span>
                  <span>Ngày xuất bản: {sanPham.ngayXuatBan}</span>
                </div>
              </div>
              <div className="py-2">
                <div className="d-flex ">
                  <b className="text-danger fs-3">
                    Giá :{" "}
                    {sanPham.giaSach?.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </b>
                </div>
                <div className="d-flex py-2">
                  <span>Số lượng : </span>
                  <b className="text-danger"> {sanPham.soLuong}</b>
                </div>
              </div>
            </div>
            <p>{sanPham.moTa}</p>
            <p>Ngày phát hành : {sanPham.ngayXuatBan}</p>
            <div>
              <button
                onClick={() => themVaoGioHang(sanPham)}
                className="button"
              >
                <span>
                  <BsCartCheckFill />
                </span>
                <span>Thêm vào giỏ hàng</span>
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-3"></div>
          <div className="col-6">
            <div className="p-5">
              <h3>Phần bình luận</h3>
              <form action="#" onSubmit={handleSubmit}>
                <p>
                  <textarea
                    className="comment p-3"
                    onChange={handleInput}
                    rows={4}
                    placeholder="Bình luận ...."
                  />
                </p>
                <button className="btn btn-primary">Bình luận</button>
              </form>
            </div>
          </div>
          <div className="col-3"></div>
        </div>

        <div className="row rounded border-light border-4 bg-light bg-gradient p-3">
          {binhLuanSanPham()}
        </div>
      </div>
    </>
  );
};

export default SanPhamChiTiet;
