import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../../components/urlApi";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";

// số phần tử trên mỗi trangs

const ThongKe = () => {
  const ITEMS_PER_PAGE = 5;
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
    axios
      .get(api.thongKeTheoThang + thang)
      .then((res) => {
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
            <th scope="col">{index}</th>
            <th scope="col">{item["khachHang"].ten}</th>
            <th scope="col">{item["khachHang"].diaChi}</th>
            <th scope="col">{item["khachHang"].soDienThoai}</th>
            <th scope="col">{item["sach"].ten}</th>
            <th scope="col">{item.soLuong}</th>
          </tr>
        );
      });
    } else {
      return <h3 text-center>Khong co don hang</h3>;
    }
  };

  return (
    <div className="container-xxl">
      <div className="row">
        <div className="col-3">
          <select onChange={handleInput} name="status" className="form-select">
            {renderThang()}
          </select>
        </div>
        <div className="col-3">
          <h6>Danh thu của tháng đạt được : {tongDanhThuCuaThang(thongKe)}</h6>
        </div>
      </div>
      <div className="row">
        <div className="py-5">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Tên người mua</th>
                <th scope="col">Địa chỉ</th>
                <th scope="col">Số điện thoại</th>
                <th scope="col">Tên sách</th>
                <th scope="col">Số lượng</th>
              </tr>
            </thead>
            <tbody>{render()}</tbody>
          </table>
        </div>
        <ReactPaginate
          previousLabel={<AiFillCaretLeft />}
          nextLabel={<AiFillCaretRight />}
          // breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />
      </div>
    </div>
  );
};

export default ThongKe;
