import React, { useEffect, useState } from 'react'
import axios from 'axios'
import api from '../../components/urlApi'

const SuaDanhMuc = () => {
  const item = JSON.parse(localStorage.getItem('danhmuc'))
  const [input,setInput] = useState({
    idDanhMuc:item.idDanhMuc,
    ten:item.ten,
    moTa:item.moTa,
  })

  console.log(input);
  const [a,setA] = useState(false)

  const handleInput = (e) => {
    let nameKey = e.target.name;
    let nameValue = e.target.value;
    setInput(state => ({...state,[nameKey]:nameValue}))
  }


  const handlerSubmit = (e) => {
    e.preventDefault();
   
    const data = {
      idDanhMuc:input.idDanhMuc,
      ten:input.ten,
      moTa:input.moTa,
    }

    console.log(data);
    axios.post(api.getDanhMuc,data)
    .then(res => {
      console.log(res);
      setA(!a)
    })
    .catch(errors => console.log(errors))
  }
    return (
      <div className='text-center'>
        <h3>Cập nhật danh mục</h3>
        <form className='mt-5' onSubmit={handlerSubmit}>
          <div class="mb-3">
            <label class="form-label">Tên danh mục</label>
            <input type="text" name='ten' value={input.ten} placeholder="Nhập vào tên danh mục" onChange={handleInput}/>
          </div>
          <div class="mb-3">
            <label class="form-label">Mô tả</label>
            <input type="text" name='moTa' value={input.moTa} placeholder="Nhập vào mô tả" onChange={handleInput}/>
          </div>
          <button>Cập nhật</button>
        </form>
      </div>
    )
}

export default SuaDanhMuc
