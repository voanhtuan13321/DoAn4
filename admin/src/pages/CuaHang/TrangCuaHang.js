
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import api from '../../components/urlApi'
import {useNavigate } from 'react-router-dom';

const TrangCuaHang = () => {
  let navigation = useNavigate();

    const [input,setInput] = useState({
        id:'',
        tenCuaHang:'',
        moTa:'',
        soDienThoai:'',
        diaChi:'',
        website:'',
        email:''
      })
      const [cuaHang,setCuaHang] = useState([]);
      const [a,setA] = useState(false)
    
      useEffect(()=>{
        axios.get(api.cuaHang)
        .then(res=>{   
          setCuaHang(res.data.data)
          })
        .catch(errors=>console.log(errors));
      },[a]);
      
      const handleInput = (e) => {
        let nameKey = e.target.name;
        let nameValue = e.target.value;
        setInput(state => ({...state,[nameKey]:nameValue}))
      }
    
      const handlerSubmit = (e) => {
        e.preventDefault();
       
        const data = {
            tenCuaHang:input.tenCuaHang,
            moTa:input.moTa,
            soDienThoai:input.soDienThoai,
            diaChi:input.diaChi,
            website:input.website,
            email:input.email
        }
        axios.post(api.cuaHang,data)
        .then(res => {
          console.log(res);
          setA(!a)
        })
        .catch(errors => console.log(errors))
      }
    
      
    
      function checkId(item){
        localStorage.setItem('cuahang', JSON.stringify(item))
        navigation('/admin/trang_sua_cua_hang');
      }
    
        const renderCuaHang = () => {
          return cuaHang.map((item,index)=>{
            return(
              <tr key={index}>
              {/* {console.log(item)} */}
                <th scope="row">{index}</th>
                <td>{item.tenCuaHang}</td>
                <td>{item.moTa}</td>
                <td>{item.soDienThoai}</td>
                <td>{item.diaChi}</td>
                <td>{item.website}</td>
                <td>{item.email}</td>
                <td>
                <button onClick={()=>checkId(item)}>Sửa</button>
                </td>
              </tr>
            ) 
          })
        }
    
    
    
      return (
        <>
        <div className='d-flex align-items-center justify-content-center'>
          <form onSubmit={handlerSubmit} className="width-500">
            <p className="form-title py-4">Thêm thông tin của hàng</p>
            <div className='d-flex'>
              <div className='pr-5'>
                <div className="input-container">
                  <label className="input_label">
                    Nhà xuất bản
                  </label>
                  <input type="text" name='tenCuaHang' onChange={handleInput} placeholder="Nhập tên cửa hàng" />
                  <span></span>
                </div>
                <div className="input-container">
                  <label className="input_label">
                    Nhà xuất bản
                  </label>
                  <input type="text" name='moTa' onChange={handleInput} placeholder="Nhập mô tả" />
                </div>
                  <label className="input_label">
                    Nhà xuất bản
                  </label>
                <div className="input-container">
                  <input type="text" name='soDienThoai' onChange={handleInput} placeholder="Nhập số điện thoại" />
                </div>
              </div>
              <div>
                  <div className="input-container">
                    <label className="input_label">
                      Nhà xuất bản
                    </label>
                    <input type="text" name='diaChi' onChange={handleInput} placeholder="Nhập số điạ chỉ"/>
                  </div>
                  <div className="input-container">
                    <label className="input_label">
                      Nhà xuất bản
                    </label>
                    <input type="text" name='website' onChange={handleInput} placeholder="Website" />
                  </div>
                  <div className="input-container pb-3">
                    <label className="input_label">
                      Nhà xuất bản
                    </label>
                    <input type="text" name='email' onChange={handleInput} placeholder="Email" />
                  </div>
              </div>
            </div>

            <button type="submit" className="rounded-pill btn bg-secondary btn-width">
              Thêm
            </button>
          </form>
        </div>
    
    
        <div className='py-5'>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Tên cửa hàng</th>
                <th scope="col">Mô tả</th>
                <th scope="col">Số điện thoại</th>
                <th scope="col">Dia chỉ</th>
                <th scope="col">Website</th>
                <th scope="col">Email</th>
              </tr>
            </thead>
            <tbody>
              {renderCuaHang()}
            </tbody>
          </table>
        </div>
    
    
        </>
        
      )
}

export default TrangCuaHang