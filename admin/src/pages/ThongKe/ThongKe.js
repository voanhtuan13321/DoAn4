import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import api from "../../components/urlApi";
import { Link, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import Chart from "chart.js/auto";
import Swal from "sweetalert2";

const ThongKe = () => {
  const ITEMS_PER_PAGE = 15;
  let navigation = useNavigate();

  // check dang nhap
  let admin = JSON.parse(localStorage.getItem("taiKhoanAdmin"));
  if (!admin) {
    Swal.fire("Bạn phải đăng nhập").then(() => navigation("/"));
  }

  // Mặc định lấy tháng 1 ra đầu tiên
  const [thang, setThang] = useState("1");
  const [thongKe, setThongKe] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalMonth, setTotalMonth] = useState([]);

  useEffect(() => {
    const barChart = document.getElementById("barChart");
    const pieChart = document.getElementById("pieChart");

    (async function showThongKeTheoThang() {
      const response = await axios.get(`${api.donHang}/thong-ke-theo-thang`);
      const list = await response.data.data;

      let labels = [];
      let data = [];

      list.forEach((item) => {
        labels.push(`Tháng: ${item.thang}`);
        data.push(item.soLuong);
      });

      new Chart(barChart, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Sách bán theo tháng",
              data: data,
              backgroundColor: ["rgb(54, 162, 235)"],
              borderColor: ["rgb(54, 162, 235)"],
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    })();

    (async function showTopSachBanChay() {
      const response = await axios.get(`${api.chiTietDonHang}top-5`);
      const list = await response.data.data;

      let labels = [];
      let data = [];

      list.forEach((item) => {
        labels.push(item.sach.ten);
        data.push(item.soLuong);
      });

      new Chart(pieChart, {
        type: "pie",
        data: {
          labels: labels,
          datasets: [
            {
              label: "sách bán theo tháng",
              data: data,
              backgroundColor: [
                "rgb(255, 99, 132)",
                "rgba(255, 159, 64)",
                "rgb(255, 205, 86)",
                "rgb(75, 192, 192)",
                "rgb(54, 162, 235)",
              ],
              hoverOffset: 4,
            },
          ],
        },
      });
    })();

    axios
      .get(`${api.donHang}/thong-ke-theo-thang/` + thang)
      .then((res) => {
        setThongKe(res.data.data);
        setPageCount(Math.ceil(res.data.data.length / ITEMS_PER_PAGE));
      })
      .catch((err) => console.log(err));
  }, [thang]);

  useEffect(() => {
    if (!thongKe.length) return;
    thongKe.forEach((el) => {
      axios.get(`${api.chiTietDonHang}tong-tien-don-hang/${el.id}`).then((res) => {
        if (res.data.data) {
          setTotalMonth((prev) => [...prev, res.data.data]);
        }
      });
    });
  }, [thongKe]);

  // Thống kê giá tiền đả bán sách trog tháng
  const tongDanhThuCuaThang = useMemo(() => {
    if (!totalMonth.length) return;

    return totalMonth.reduce((prev, cur) => prev + cur, 0);

    // goi api tinh tong tien trong don hang do

    // if (!data.length) return;
    // return data.reduce((accumulator, currentValue) => {
    //   return accumulator + currentValue.sach.giaSach * currentValue.soLuong;
    // }, 0);
  }, [totalMonth]);

  const tongSoLuong = (data) => {
    if (!data.length) return;
    console.log("Data:  ", data);
    return data.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.soLuong;
    }, 0);
  };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * ITEMS_PER_PAGE;
  const currentData = thongKe.slice(offset, offset + ITEMS_PER_PAGE);

  // render ra select option
  const renderThang = () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    return arr.map((item) => {
      return (
        <option key={item} value={item}>
          Tháng {item}
        </option>
      );
    });
  };

  // Khi kích vô chọn option thì set giá trị value lên Thang để biết nhận vào tháng thấy
  const handleInput = (e) => {
    setThang(e.target.value);
  };

  // render ra giao diện
  const render = () => {
    if (currentData.length) {
      return currentData.map((item, index) => {
        return (
          <tr key={item.id}>
            <td>
              <Link to={"/admin/chi_tiet_don_hang/" + item.id}>
                <p className="fs14 mb-0">{item.maDonHang}</p>
              </Link>
            </td>
            <td>
              <p className="fs14 mb-0">{item["khachHang"].ten}</p>
            </td>
            <td>
              <p className="fs14 mb-0">{item.ngayMua}</p>
            </td>
            <td>
              <p className="fs14 mb-0">{item.phuongThucThanhToan}</p>
            </td>
          </tr>
        );
      });
    } else {
      return (
        <tr>
          <td>
            <h5 className="d-flex align-item-center">Không có đơn hàng trong tháng {thang}</h5>
          </td>
        </tr>
      );
    }
  };

  return (
    <>
      <div
        className="container-chart mb-5 mt-3"
        style={{
          display: "flex",
          justifyContent: "space-around",
        }}>
        <div>
          <h1>Sách bán theo tháng</h1>
          <canvas id="barChart"></canvas>
        </div>
        <div>
          <h1>Sách bán chạy nhất</h1>
          <canvas id="pieChart"></canvas>
        </div>
      </div>

      <div className="container-xxl">
        <div className="row">
          <div className="col-2">
            <select onChange={handleInput} name="status" className="form-select">
              {renderThang()}
            </select>
          </div>

          <div className="col-5">
            <h6 className="mb-0">
              Danh thu của tháng đạt được:{" "}
              <input readOnly className="inputwidth" value={tongDanhThuCuaThang?.toLocaleString()} /> VND
            </h6>
          </div>
          <div className="col-5">
            {/* <h6 className="mb-0">
              Tổng số lượng mặt hàng đã bán: <input readOnly className="inputwidth" value={tongSoLuong(thongKe)} /> sản
              phẩm
            </h6> */}
          </div>
        </div>
        <div className="row">
          <div className="py-2">
            <table className="table">
              <thead className="table-dark">
                <tr>
                  <th scope="col">
                    <p className="fs14 mb-0">Mã đơn hàng</p>
                  </th>
                  <th scope="col">
                    <p className="fs14 mb-0">Tên khách hàng</p>
                  </th>
                  <th scope="col">
                    <p className="fs14 mb-0 w103">Ngày mua</p>
                  </th>
                  <th scope="col">
                    <p className="fs14 mb-0 w103">Phương thức thanh toán</p>
                  </th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>{render()}</tbody>
            </table>
            {/* <table className="table">
              <thead className="table-dark">
                <tr>
                  <th scope="col">
                    <p className="fs14 mb-0">Tên người </p>
                  </th>
                  <th scope="col">
                    <p className="fs14 mb-0">Địa chỉ</p>
                  </th>
                  <th scope="col">
                    <p className="fs14 mb-0">Số điện thoại</p>
                  </th>
                  <th scope="col">
                    <p className="fs14 mb-0">Tên sách</p>
                  </th>
                  <th scope="col">
                    <p className="fs14 mb-0">Số lượng</p>
                  </th>
                </tr>
              </thead>
              <tbody>{render()}</tbody>
            </table> */}
          </div>

          <ReactPaginate
            previousLabel={<AiFillCaretLeft />}
            nextLabel={<AiFillCaretRight />}
            breakLabel={"..."}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName={"pagination justify-content-center"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
            activeClassName={"active"}
          />
        </div>
      </div>
    </>
  );
};

export default ThongKe;
