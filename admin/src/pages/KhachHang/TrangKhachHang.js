import React, { useEffect, useState } from 'react'
import axios from 'axios'
import api from '../../components/urlApi'

const TrangKhachHang = () => {
  const [input,setInput] = useState({
    ten:'',
    email:'',
    soDienThoai:'',
    diaChi:'',
    taiKhoan:'',
    matKhau:''
  })
  const [khachHang,setKhachHang] = useState([]);
  const [a,setA] = useState(true)


  const handleInput = (e) => {
    let nameKey = e.target.name;
    let nameValue = e.target.value;
    setInput(state => ({...state,[nameKey]:nameValue}))
  }

  const handlerSubmit = (e) => {
    e.preventDefault();
   
    const data = {
      ten:input.ten,
      email:input.email,
      soDienThoai:input.soDienThoai,
      diaChi:input.diaChi,
      taiKhoan:input.taiKhoan,
      matKhau:input.matKhau
    }
    axios.post(api.khachHang,data)
    .then(res => {
      console.log(res);
      setA(!a)
    })
    .catch(errors => console.log(errors))
  }

  useEffect(()=>{
    axios.get(api.khachHang)
    .then(res=>{   
      setKhachHang(res.data.data)
      })
    .catch(errors=>console.log(errors));
  },[a]);

  function checkId(e){
    let getId=e.target.value;
    axios.delete(api.khachHangId + getId)
    .then(res=>{
      setA(!a)
    })
    .catch((error)=>{
      console.log(error);
    })
  }

    const renderKhachHang = () => {
      return khachHang.map((item,index)=>{
        return(
          <tr key={index}>
            <th scope="row">{index}</th>
            <td>{item.ten}</td>
            <td>{item.email}</td>
            <td>{item.soDienThoai}</td>
            <td>{item.diaChi}</td>
            <td>{item.taiKhoan}</td>
            <td>{item.matKhau}</td>
            <td>
              <button value={item.idDanhMuc}  onClick={checkId}>Xóa</button>
            </td>
          </tr>
        ) 
      })
    }
  return (
    <div>
      <div className=''>
        <div className='d-flex justify-content-center'>
              <form className="" onSubmit={handlerSubmit}>
                <h3><b>Thêm mới khách hàng</b></h3>
                  <div className='p-3'>
                    <div className="input_container">
                      <label className="input_label">
                        Tên
                      </label>
                      <input
                        placeholder="Tên"
                        name="ten"
                        type="text"
                        className="input_field"
                        onChange={handleInput}
                      />
                    </div>
                    <div className="input_container">
                      <label className="input_label" htmlFor="password_field">
                        Email
                      </label>
                      <input
                        placeholder="Email"
                        name="email"
                        type="text"
                        className="input_field"
                        onChange={handleInput}
                      />
                    </div>
                    <div className="input_container">
                      <label className="input_label">
                        Số điện thoại
                      </label>
                      <input
                        placeholder="Số điện thoại"
                        name="soDienThoai"
                        type="text"
                        className="input_field"
                        onChange={handleInput}
                      />
                    </div>
                    <div className="input_container">
                      <label className="input_label">
                        Địa chỉ
                      </label>
                      <input
                        placeholder="Địa chỉ"
                        name="diaChi"
                        type="text"
                        className="input_field"
                        onChange={handleInput}
                      />
                    </div>
                    <div className="input_container">
                      <label className="input_label" htmlFor="password_field">
                        Tài khoản
                      </label>
                      <input
                        placeholder="Tài khoản"
                        name="taiKhoan"
                        type="text"
                        className="input_field"
                        onChange={handleInput}
                      />
                    </div>

                    <div className="input_container">
                      <label className="input_label">
                      Mật khẩu
                      </label>
                      <input
                        placeholder="Nhà xuất bản"
                        name="nhaXuatBan"
                        type="text"
                        className="input_field"
                        onChange={handleInput}
                      />
                    </div>

                  </div>
                <button title="Sign In" type="submit" className="sign-in_btn">
                  <span>Thêm</span>
                </button>
              </form>

        </div>



        <div className='py-5'>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Tên</th>
                <th scope="col">Email</th>
                <th scope="col">Số điện thoại</th>
                <th scope="col">Địa chỉ</th>
                <th scope="col">Tài khoản</th>
                <th scope="col">Mật khẩu</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {renderKhachHang()}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default TrangKhachHang