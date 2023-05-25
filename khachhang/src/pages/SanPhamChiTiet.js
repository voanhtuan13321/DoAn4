import React, {useEffect, useState} from "react";
import {BsCartCheckFill} from "react-icons/bs";
import {AiFillDelete} from "react-icons/ai";
import {AiOutlineUser} from "react-icons/ai";
import axios from "axios";
import Swal from "sweetalert2";
import api from "../components/urlApi";
import {useNavigate, useParams} from "react-router-dom";

const SanPhamChiTiet = () => {
  const [binhLuan, setBinhLuan] = useState([]);
  const [sanPham, setSanPham] = useState("");
  const [input, setInput] = useState("");
  const [a, setA] = useState(true);
  const params = useParams();
  const navigate = useNavigate();

  const idKhachHang = JSON.parse(localStorage.getItem("idKhachHang"));
  const animationLoad = document.getElementById("load");
console.log(idKhachHang);
  // render san pham chi tiet
  useEffect(() => {
    animationLoad.classList.remove("d-none");
    axios
      .get(api.sachId + params.id)
      .then((res) => {
        setSanPham(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => animationLoad.classList.add("d-none"));
  }, []);

  // render binh luan
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
    setInput(e.target.value);
  }

  // xu li khi click binh luan
  const handleSubmitBinhLuan = (e) => {
    e.preventDefault();
    if (idKhachHang === null) {
      Swal.fire("Bạn chưa đăng nhập?", "Vui lòng đăng nhập trước khi thực hiện chức năng này", "info");
      window.setTimeout(() => navigate("/dang_nhap"), 1000);
    } else if (input) {
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
      Swal.fire("Bạn chưa nhập góp ý?", "Vui lòng nhập vào góp ý của bạn để sử dụng chức năng này", "info");
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
      let isId = idKhachHang === item.khachHang.idKhachHang;
      console.log(isId);
      return (
        <div key={index}>
          <div className="">
            <div className="card-body">
              <h5 className="card-title">
                <AiOutlineUser /> {item["khachHang"].ten}
              </h5>
              <div className="d-flex justify-content-between">
                <div className="comment">
                  <input className="card-text custumBinhLuan" defaultValue={item.noiDung} />
                  <p className="card-text">{thoiGian}</p>
                </div>
                <div className={isId ? "d-flex" : "d-none"}>
                  <button onClick={() => xoaBinhLuan(item.id)} className="classdelete btn btn-danger">
                    <AiFillDelete />
                    Xóa
                  </button>
                  {/* <button onClick={() => suaBinhLuan(item)} className="btn btn-warning">
                    <AiFillEdit />
                    Sửa
                  </button> */}
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

  const suaBinhLuan = (item) => {};

  // xu li khi them vao gio hang
  const handelThemVaoGioHang = (Sach) => {
    let idSach = Sach.idSach;
    if (Sach.soLuong < 1) {
      Swal.fire("Sản phẩm đả hết hàng", "Vui lòng chọn sản phẩm khác", "info");
      return;
    }

    // kiem tra khach hang da dang nhap chua
    if (!idKhachHang) {
      Swal.fire("Bạn chưa đăng nhập?", "Vui lòng đăng nhập để thực hiện chức năng này", "info");
      window.setTimeout(() => {
        navigate("/dang_nhap");
      }, 1000);
    } else {
      const data = {
        idKhachHang,
        idSach,
      };

      // them sach vao gio hang cua khach hang trong database
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
  };

  return (
    <>
      <div className="container-xxl py-4 mh700 mt150px">
        <div className="row rounded border-light border-4 bg-light bg-gradient p-5">
          <div className="col-4 ">
            <img
              className="rounded mx-auto d-block img-fluid"
              src={api.img + sanPham.hinhAnh}
              alt="Hình ảnh của sách"
            />
          </div>
          <div className="col-8">
            <p className="fs-3">{sanPham.ten}</p>
            <div>
              <div>
                <div className="d-flex justify-content-between">
                  <span>
                    Tác giả: <b>{sanPham.tacGia}</b>
                  </span>
                </div>
              </div>
              <div className="py-2">
                  <span>
                    Nhà xuất bản: <b>{sanPham.nhaXuatBan}</b>
                  </span>
                </div>
              <p>Ngày xuất bản: {sanPham.ngayXuatBan}</p>
              <div className="py-2">
                <div className="d-flex ">
                  <b className="text-danger fs-3">Giá: {sanPham.giaSach?.toLocaleString() + " VNĐ"}</b>
                </div>
                <div className="d-flex py-2">
                  <span>Số lượng: <b className="text-danger">{sanPham.soLuong}</b></span>
                  
                </div>
              </div>
            </div>
            
            <p>{sanPham.moTa}</p>
            {/* <p>Ngày phát hành: {sanPham.ngayXuatBan}</p> */}
            <div>
              <button onClick={() => handelThemVaoGioHang(sanPham)} className="button d-flex">
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
              <h3>Phần góp ý</h3>
              <form action="#" onSubmit={handleSubmitBinhLuan}>
                <p>
                  <textarea className="comment p-3" onChange={handleInput} rows={4} placeholder="Góp ý ...." />
                </p>
                <button className="btn btn-primary">Góp ý</button>
              </form>
            </div>
          </div>
          <div className="col-3"></div>
        </div>
        <div className="row rounded border-light border-4 bg-light bg-gradient p-3">{binhLuanSanPham()}</div>
      </div>
    </>
  );
};

export default SanPhamChiTiet;
