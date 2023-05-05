import React, {useEffect, useState} from "react";
import {Link, useParams, useNavigate} from "react-router-dom";
import axios from "axios";
import api from "../components/urlApi";
import {AiFillDelete} from "react-icons/ai";

const GioHang = () => {
  let idKhachHang = JSON.parse(localStorage.getItem("idKhachHang"));
  const [data, setData] = useState([]);
  const [getNameImage, setNameImage] = useState([]);
  const [a, setA] = useState("");

  let navigator = useNavigate();

  console.log(getNameImage);

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

  // thanh toan
  const subThanhToan = (arr) => {
    // lap va cap nhat trang thai gio hang
    if (arr) {
      let selectValue = document.getElementById("luaChon").value;
      let data = {
        trangThai: "",
      };
      if (selectValue == 1) {
        data.trangThai = "online";
      } else {
        alert("Đặt hàng thành công");
        data.trangThai = "truc tiep";
      }
      const promises = [];
      arr.forEach((element) => {
        const promise1 = axios.put(api.gioHang + "/cap-nhat-trang-thai/" + element.id, data);
        promises.push(promise1);
      });
      Promise.all(promises).then(() => {
        localStorage.removeItem("gioHang");
        // navigator("/gio_hang");

        window.location.href = `http://${api.ip}:3000/gio_hang`;
      });
    }
  };

  // check thanh toan thanh cong hay that bai
  useEffect(() => {
    const url = new URL(window.location);
    const param1 = url.searchParams.get("vnp_ResponseCode");
    let arr = JSON.parse(localStorage.getItem("gioHang"));

    if (param1 != null) {
      if (param1 == 0) {
        alert("Thanh toán thành công");

        subThanhToan(arr);
      } else {
        alert("Thanh toán không thành công");
      }
    }
  }, []);

  const deleteCart = (id) => {
    console.log(id);
    axios
      .delete(api.gioHang + "/" + id)
      .then((res) => {
        console.log(res);
        setA(!a);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const themSoLuongSanPham = (item) => {
    // console.log(item);
    if (item.soLuong > item["sach"].soLuong) {
      alert("Sách đả hết");
      return;
    }

    let idKhachHang = item["khachHang"].idKhachHang;
    let idSach = item["sach"].idSach;
    const data = {
      id: item.id,
      idKhachHang,
      idSach,
    };
    axios
      .post(api.gioHang, data)
      .then((res) => {
        setA(!a);
        console.log(res.data.data);
      })
      .catch();
    // }
  };

  const giamSoLuongSanPham = (item) => {
    let idKhachHang = item["khachHang"].idKhachHang;
    let idSach = item["sach"].idSach;
    const data = {
      id: item.id,
      idKhachHang,
      idSach,
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
    let name = e.target.value;
    let check = e.target.checked;
    // console.log(check);
    if (check) {
      setNameImage((state) => [...state, name]);
    } else {
      let c = getNameImage.filter((item, i) => {
        return item != name;
      });
      setNameImage(c);
    }
  }

  const sum = (data) => {
    return data.reduce((accumulator, currentValue) => {
      const id = currentValue.id;
      if (getNameImage.includes(id + "")) {
        return accumulator + currentValue.sach.giaSach * currentValue.soLuong;
      } else {
        return accumulator + 0;
      }
    }, 0);
  };

  const total = sum(data);

  const renderGioHang = () => {
    return data.map((item, index) => {
      return (
        <div
          key={index}
          // className="cart-data py-3 mb-2 d-flex justify-content-between align-items-center"

          className={
            item.trangThai === "online" || item.trangThai === "truc tiep"
              ? "cart-data py-3 mb-2 d-flex justify-content-between align-items-center anButtun"
              : "cart-data py-3 mb-2 d-flex justify-content-between align-items-center"
          }>
          <div className="cart-col-1 gap-15 d-flex align-items-center">
            <input value={item.id} onChange={checKed} name="chon" className="form-check-input" type="checkbox" />
            <div className="w-25 h-25">
              <img className="img-fluid imageHeight" src={api.img + item["sach"].hinhAnh} />
            </div>
            <div>{item.trangThai === "online" || item.trangThai === "truc tiep" ? "Chờ phê duyêt" : ""}</div>
          </div>
          <div className="cart-col-2">
            <h5 className="price">{item["sach"].ten}</h5>
          </div>
          <div className="cart-col-2">
            <h5 className="price">{item["sach"].giaSach.toLocaleString() + " VNĐ"}</h5>
          </div>
          <div className="cart-col-3 d-flex align-items-center gap-15">
            <div className={item.trangThai === "thanh_toan" ? "d-flex anButtun" : "d-flex"}>
              <button
                onClick={() => {
                  themSoLuongSanPham(item);
                }}
                className={item.soLuong == item["sach"].soLuong ? "btn d-none anButtun" : "btn"}>
                +
              </button>
              <input type="number" name="" className="text-center" value={item.soLuong} min={1} max={10} />
              <button
                onClick={() => {
                  giamSoLuongSanPham(item);
                }}
                className={item.soLuong == 1 ? "btn d-none" : "btn"}>
                -
              </button>
            </div>
            <div>{/* <AiFillDelete className="text-danger " /> */}</div>
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
    // tinh thanh tien cac san pham da chon
    let khachHang = JSON.parse(localStorage.getItem("ten"));
    getNameImage.map((element) => {
      axios.get(api.gioHang + "/find-by/" + element).then((res) => {
        let arr = JSON.parse(localStorage.getItem("gioHang"));
        if (arr == null) {
          arr = [];
        }
        const check = !isTonTai(arr, res.data.data.id);
        console.log(check);
        if (check) {
          arr.push(res.data.data);
        }
        localStorage.setItem("gioHang", JSON.stringify(arr));
      });
    });

    function isTonTai(arr, id) {
      for (const a of arr) {
        if (a.id == id) {
          return true;
        }
      }
      return false;
    }

    // check lua chon phuong thuc thanh toan
    let selectValue = document.getElementById("luaChon").value;
    if (selectValue == 1) {
      // thanh toan online
      let datThanhToan = {
        amount: sum(data),
        vnp_OrderInfo: `${khachHang} mua hàng`,
        vnp_ResponseCode: "0",
        vnp_ReturnUrl: `http://${api.ip}:3000/gio_hang`,
      };
      axios.post(api.thanhToan, datThanhToan).then((res) => (window.location = res.data.data));
      alert(sum(data));
    } else {
      // thanh toan truc tiep
      let arr = JSON.parse(localStorage.getItem("gioHang"));
      if (arr == null) {
        arr = [];
      }
      subThanhToan(arr);
    }
  };

  return (
    <div className="container-xxl mh700 mt150px">
      <div className="row">
        <div className="pt-5">
          <h3>Giỏ hàng</h3>
        </div>
        <div className="col-12">
          <div className="cart-header py-3 d-flex justify-content-between align-items-center">
            <h4 className="cart-col-1">Sản phẩm</h4>
            <h4 className="cart-col-3">Tên sách</h4>
            <h4 className="cart-col-2">Giá</h4>
            <h4 className="cart-col-3">Số lượng</h4>
            <h4 className="cart-col-4">Tổng tiền</h4>
            <h4 className=""></h4>
          </div>
          {renderGioHang()}
          {/* {ra()} */}
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
              <h4>Tổng tiền: {total + " VNĐ"} </h4>
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
