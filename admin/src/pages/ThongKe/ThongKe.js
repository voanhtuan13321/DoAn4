import React, { useEffect, useState } from 'react'
import axios from 'axios'
import api from '../../components/urlApi'
import {useNavigate } from 'react-router-dom';

const ThongKe = () => {
  const [data,setData] = useState([])

  return (
    <div className='container-xxl'>
      <div className='row'>
        <div className='col-3'>
          <select class="form-select" aria-label="Default select example">
            <option selected>Thống kê theo tháng</option>
            <option value="1">Tháng 1</option>
            <option value="2">Tháng 2</option>
            <option value="3">Tháng 3</option>
            <option value="4">Tháng 4</option>
            <option value="5">Tháng 5</option>
            <option value="6">Tháng 6</option>
            <option value="7">Tháng 7</option>
            <option value="8">Tháng 8</option>
            <option value="9">Tháng 9</option>
            <option value="10">Tháng 10</option>
            <option value="11">Tháng 11</option>
            <option value="12">Tháng 12</option>
          </select>
        </div>
      </div>
      <div className='row'>
      <div className='py-5'>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Tên sách</th>
                <th scope="col">Tên người mua</th>
                <th scope="col">Giá sách</th>
                <th scope="col">Số lượng</th>
                <th scope="col">Danh mục</th>
              </tr>
            </thead>
            <tbody>
                
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}

export default ThongKe
