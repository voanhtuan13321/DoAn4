import React, { useEffect, useState } from 'react'
import axios from 'axios'
import api from '../../components/urlApi'
import {useNavigate } from 'react-router-dom';
const TrangSuKien = () => {
  let navigation = useNavigate();

  const [input,setInput] = useState({
    tieuDe:'',
    noiDung:''
  })

  const [suKien,setSuKien] = useState([]);
  const [a,setA] = useState(true)

  const handleInput = (e) => {
    let nameKey = e.target.name;
    let nameValue = e.target.value;
    setInput(state => ({...state,[nameKey]:nameValue}))
  }

  const handlerSubmit = (e) => {
    e.preventDefault();
   
    const data = {
      tieuDe:input.tieuDe,
      noiDung:input.noiDung
    }
    axios.post(api.suKien,data)
    .then(res => {
      console.log(res);
      setA(!a)
    })
    .catch(errors => console.log(errors))
  }

  useEffect(()=>{
    axios.get(api.suKien)
    .then(res=>{   
      setSuKien(res.data.data)
      })
    .catch(errors=>console.log(errors));
  },[a]);

  function deleteId(e){
    let getId=e.target.value;
    axios.delete(api.suKienId + getId)
    .then(res=>{
      setA(!a)
    })
    .catch((error)=>{
      console.log(error);
    })
  }

  function checkId(item){
    localStorage.setItem('sukien', JSON.stringify(item))
    navigation('/admin/sua_su_kien');
  }

    const renderSuKien = () => {
      return suKien.map((item,index)=>{
        return(
          <tr key={index}>
            <th scope="row">{index}</th>
            <td>{item.tieuDe}</td>
            <td>{item.noiDung}</td>
            <td>
              <button onClick={()=>checkId(item)}>Sửa</button>
              <button value={item.id}  onClick={deleteId}>Xóa</button>
            </td>
          </tr>
        ) 
      })
    }




  return (
    <>

            <div className='d-flex align-items-center justify-content-center'>
              <form onSubmit={handlerSubmit} className="width-500">
                <p className="form-title py-4">Thêm sự kiện</p>
                  <div className="input-container">
                    <input type="text" name='tieuDe' onChange={handleInput} placeholder="Nhập tiêu đề" />
                    <span></span>
                  </div>
                  <div className="input-container pb-3">
                    <input type="text" name='noiDung' onChange={handleInput} placeholder="Nhập nội dung" />
                  </div>
                  <button type="submit" className="rounded-pill btn bg-secondary btn-width">
                    Thêm
                  </button>
                </form>
            </div>
          <div>
        <div className='py-5'>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Tiêu đề</th>
                <th scope="col">Nội dung</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {renderSuKien()}
            </tbody>
          </table>
        </div>
      </div>
    </>
    
  )
}

export default TrangSuKien