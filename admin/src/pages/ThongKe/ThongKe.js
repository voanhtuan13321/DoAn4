import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../../components/urlApi";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import Chart from "chart.js/auto";

// số phần tử trên mỗi trangs

const ThongKe = () => {
  const ITEMS_PER_PAGE = 15;
  let navigation = useNavigate();
  // let admin = JSON.parse(localStorage.getItem("admin"));
  // if (!admin) {
  //   alert("Bạn phải đăng nhập");
  //   navigation("/");
  // }
  // Mặc định lấy tháng 1 ra đầu tiên
  const [thang, setThang] = useState("1");
  const [thongKe, setThongKe] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const apiLichSuMua = "http://192.168.1.82:8080/api/lich-su-mua";
    const barChart = document.getElementById("barChart");
    const pieChart = document.getElementById("pieChart");

    showThongKeTheoThang();

    async function showThongKeTheoThang() {
      const response = await axios.get(`${apiLichSuMua}/thong-ke-theo-thang`);
      const list = await response.data.data;
      console.log(list);

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
              backgroundColor: ["rgba(75, 192, 192, 0.2)"],
              borderColor: ["rgb(75, 192, 192)"],
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
    }

    showTopSachBanChay();

    async function showTopSachBanChay() {
      const response = await axios.get(`${apiLichSuMua}/top-sach-ban-chay`);
      const list = await response.data.data;
      console.log(list);

      let labels = [];
      let data = [];

      list.forEach((item) => {
        labels.push(item.sach.ten);
        data.push(item.soLuongBan);
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
                "rgba(255, 99, 132, 0.2)",
                "rgba(255, 159, 64, 0.2)",
                "rgba(255, 205, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(54, 162, 235, 0.2)",
              ],
              hoverOffset: 4,
            },
          ],
        },
      });
    }

    axios
      .get(api.thongKeTheoThang + thang)
      .then((res) => {
        console.log(res);
        setThongKe(res.data.data);
        setPageCount(Math.ceil(res.data.data.length / ITEMS_PER_PAGE));
      })
      .catch((err) => console.log(err));
  }, [thang]);

  // Thống kê giá tiền đả bán sách trog tháng
  const tongDanhThuCuaThang = (data) => {
    return data.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.sach.giaSach * currentValue.soLuong;
    }, 0);
  };

  const tongSoLuong = (data) => {
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
    if (currentData.length > 0) {
      return currentData.map((item, index) => {
        return (
          <tr>
            <td scope="col">{index}</td>
            <td scope="col">
              <p className="fs14 mb-0">{item["khachHang"].ten}</p>
            </td>
            <td scope="col">
              <p className="fs14 mb-0">{item["khachHang"].diaChi}</p>
            </td>
            <td scope="col">
              <p className="fs14 mb-0">{item["khachHang"].soDienThoai}</p>
            </td>
            <td scope="col">
              <p className="fs14 mb-0">{item["sach"].ten}</p>
            </td>
            <td scope="col">
              <p className="fs14 mb-0">{item.soLuong}</p>
            </td>
          </tr>
        );
      });
    } else {
      return (
        <h5 className="d-flex align-item-center">
          Không có đơn hàng trong tháng {thang}
        </h5>
      );
    }
  };

  return (
    <>
      <div class="container-chart">
        <h1>Sách bán theo tháng</h1>
        <canvas id="barChart"></canvas>
        <br />
        <br />
        <br />
        <br />
        <h1>Sách bán chạy nhất</h1>
        <canvas id="pieChart"></canvas>
        <br />
        <br />
        <br />
        <br />
      </div>

      <div className="container-xxl">
        <div className="row">
          <div className="col-2">
            <select
              onChange={handleInput}
              name="status"
              className="form-select"
            >
              {renderThang()}
            </select>
          </div>

          <div className="col-5">
            <h6 className="mb-0">
              Danh thu của tháng đạt được :{" "}
              <input
                className="inputwidth"
                value={tongDanhThuCuaThang(thongKe).toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              />{" "}
              VND
            </h6>
          </div>
          <div className="col-5">
            <h6 className="mb-0">
              Tổng số lượng mặt hàng đả bán :
              <input className="inputwidth" value={tongSoLuong(thongKe)} />
              sản phẩm
            </h6>
          </div>
        </div>
        <div className="row">
          <div className="py-2">
            <table className="table">
              <thead className="table-dark">
                <tr>
                  <th scope="col">#</th>
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
            </table>
          </div>
          {currentData.length < 15 ? (
            ""
          ) : (
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
          )}
        </div>
      </div>
    </>
  );
};

export default ThongKe;
