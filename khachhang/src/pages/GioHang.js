import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import api from "../components/urlApi";
import { AiFillDelete } from "react-icons/ai";

const GioHang = () => {
  let idKhachHang = JSON.parse(sessionStorage.getItem("idKhachHang"));
  const [data, setData] = useState([]);
  const [getNameImage, setNameImage] = useState([]);
  const [a, setA] = useState("");
  const navigator = useNavigate();

  // kiem tra nguoi dung dang nhap chua, neu chua thì phai dang nhap
  if (!idKhachHang) {
    Swal.fire("Bạn chưa đăng nhập?", "Vui lòng đăng nhập để thực hiện chức năng này", "info");
    window.setTimeout(() => {
      navigator("/dang_nhap");
    }, 1000);
  }

  useEffect(() => {
    axios
      .get(api.gioHang + "/" + idKhachHang)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [a]);

  // thanh toan
  const subThanhToan = (getNameImage, selectValue) => {
    // lap va cap nhat trang thai gio hang
    if (getNameImage) {
      if (selectValue === 1) {
        // neu la thanh toan online
        handleThanhToan("online");
      } else {
        // neu la thanh toan offline
        handleThanhToan("truc_tiep");
      }
      window.localStorage.removeItem("listIdGioHang");
    }

    function handleThanhToan(phuongThucThanhToan) {
      const promises = [];
      const listSanPham = [];
      const listId = [];

      for (const idGioHang of getNameImage) {
        const data2 = {
          id: Number(idGioHang),
          phuongThucThanhToan: phuongThucThanhToan,
        };

        listSanPham.push(data2);
        listId.push(idGioHang);
      }

      const promise1 = axios.post(api.donHang, { listSanPham });
      const promise2 = axios.post(api.gioHang + "/delete", { listId });
      promises.push(promise1, promise2);

      Promise.all(promises)
        .then(() => {
          Swal.fire(
            "Đặt hàng thành công",
            "Bạn có thể huỷ đơn hàng trong ngày hôm nay, sau 23h59 thì bạn không được phép huỷ",
            "info"
          ).then((data) => (window.location.href = `http://${api.ip}:3000/gio_hang`));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  // check thanh toan thanh cong hay that bai
  useEffect(() => {
    const url = new URL(window.location);
    const param1 = url.searchParams.get("vnp_ResponseCode");

    if (param1 != null) {
      if (Number(param1) === 0) {
        const listIdGioHang = JSON.parse(localStorage.getItem("listIdGioHang"));
        subThanhToan(listIdGioHang, 1);
      } else {
        Swal.fire("Đặt hàng không thành công", "có vẻ quá trình đặt hàng đã gặp vấn đề", "error");
      }
    }
  }, []);

  const deleteCart = (id) => {
    console.log(id);
    axios
      .delete(api.gioHang + "/" + id)
      .then((res) => {
        setA(!a);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const themSoLuongSanPham = (item) => {
    if (item.soLuong === item["sach"].soLuong) {
      Swal.fire("Sách đả hết");
    }

    const data = {
      id: item.id,
      idKhachHang: item["khachHang"].idKhachHang,
      idSach: item["sach"].idSach,
    };
    axios
      .post(api.gioHang, data)
      .then((res) => {
        setA(!a);
        console.log(res.data.data);
      })
      .catch();
  };

  const giamSoLuongSanPham = (item) => {
    const data = {
      id: item.id,
      idKhachHang: item["khachHang"].idKhachHang,
      idSach: item["sach"].idSach,
    };
    axios
      .put(api.gioHang, data)
      .then((res) => {
        setA(!a);
        console.log(res);
      })
      .catch();
  };

  function checKed(e) {
    let idGioHang = e.target.value;
    let check = e.target.checked;
    if (check) {
      setNameImage((state) => [...state, idGioHang]);
    } else {
      let c = getNameImage.filter((item, i) => {
        return item !== idGioHang;
      });
      setNameImage(c);
    }
  }

  const sum = (data) => {
    return data.reduce((accumulator, currentValue) => {
      const id = currentValue.id;
      return getNameImage.includes(id + "")
        ? accumulator + currentValue.sach.giaSach * currentValue.soLuong
        : accumulator + 0;
    }, 0);
  };

  const total = sum(data);

  const renderGioHang = () => {
    return data.map((item, index) => {
      return (
        <div
          key={index}
          className={
            item.trangThai === "online" || item.trangThai === "truc tiep"
              ? "cart-data py-3 mb-2 d-flex justify-content-between align-items-center anButtun text-center"
              : "cart-data py-3 mb-2 d-flex justify-content-between align-items-center text-center"
          }>
          <div className="cart-col-1 gap-15 d-flex align-items-center">
            <input value={item.id} onChange={checKed} name="chon" className="form-check-input" type="checkbox" />
            <div className="w-25 h-25">
              <img className="img-fluid imageHeight" src={api.img + item["sach"].hinhAnh} alt="..." />
            </div>
            <div>{item.trangThai === "online" || item.trangThai === "truc tiep" ? "Chờ phê duyêt" : ""}</div>
          </div>
          <div className="cart-col-2">
            <h5 className="price">{item["sach"].ten}</h5>
          </div>
          <div className="cart-col-2">
            <h5 className="price">{item["sach"].giaSach.toLocaleString() + " VNĐ"}</h5>
          </div>
          <div className="cart-col-3 d-flex justify-content-end align-items-center gap-15">
            <div className={item.trangThai === "thanh_toan" ? "d-flex anButtun" : "d-flex"}>
              <button
                onClick={() => {
                  themSoLuongSanPham(item);
                }}
                className={item.soLuong == item["sach"].soLuong ? "btn d-none anButtun" : "btn"}>
                +
              </button>
              <input
                type="text"
                name=""
                className="text-center wh50"
                value={item.soLuong}
                onChange={checKed}
                min={1}
                max={10}
              />
              <button
                onClick={() => {
                  giamSoLuongSanPham(item);
                }}
                className={item.soLuong == 1 ? "btn d-none" : "btn"}>
                -
              </button>
            </div>
          </div>
          <div className="cart-col-4">
            <h5 className="price">{(Number(item["sach"].giaSach) * Number(item.soLuong)).toLocaleString() + " VNĐ"}</h5>
          </div>
          <button className="btn btn-danger" onClick={() => deleteCart(item.id)}>
            <AiFillDelete />
          </button>
        </div>
      );
    });
  };

  const thanhToan = () => {
    if (getNameImage.length === 0) {
      Swal.fire("Bạn chưa chọn mặt hàng cần thành toán?", "Vui lòng chọn mặt hàng để thực hiện chức năng này", "info");
      return;
    }
    // tinh thanh tien cac san pham da chon
    let khachHang = JSON.parse(localStorage.getItem("ten"));
    // check lua chon phuong thuc thanh toan
    let selectValue = document.getElementById("luaChon").value;
    if (Number(selectValue) === 1) {
      // thanh toan online
      window.localStorage.setItem("listIdGioHang", JSON.stringify(getNameImage));
      let datThanhToan = {
        amount: sum(data),
        vnp_OrderInfo: `${khachHang} mua hàng`,
        vnp_ResponseCode: "0",
        vnp_ReturnUrl: `http://${api.ip}:3000/gio_hang`,
      };
      axios.post(api.thanhToan, datThanhToan).then((res) => (window.location = res.data.data));
    } else {
      // thanh toan offline
      subThanhToan(getNameImage, selectValue);
    }
  };

  return (
    <div className="container-xxl mh700 mt150px">
      <div className="row">
        <div className="pt-5">
          <h3>Giỏ hàng</h3>
        </div>
        <div className="col-12">
          <div className="cart-header py-3 d-flex justify-content-between align-items-center text-center">
            <h4 className="cart-col-1">Sản phẩm</h4>
            <h4 className="cart-col-2">Tên sách</h4>
            <h4 className="cart-col-2">Giá</h4>
            <h4 className="cart-col-3">Số lượng</h4>
            <h4 className="cart-col-4">Tổng tiền</h4>
          </div>
          {renderGioHang()}
        </div>
        <div className="col-12 py-2 mt-4">
          <div className="d-flex justify-content-between align-items-baseline">
            <Link to="/" className="button">
              Tiếp tục mua
            </Link>
            <Link to="/lich_su_mua_hang" className="button">
              Lịch sử mua hàng
            </Link>
            <div className="d-flex flex-column align-items-end">
              <h4>Tổng tiền: {total.toLocaleString() + " VNĐ"} </h4>
              <p></p>
              <div className="d-flex">
                <select id="luaChon" className="rounded">
                  <option value="1">Thanh toán Online</option>
                  <option value="2">Thanh toán trực tiếp</option>
                </select>
                <button onClick={() => thanhToan()} className="button">
                  Thanh toán
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GioHang;
