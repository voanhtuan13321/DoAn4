import React, { useState ,useEffect} from 'react'
import { useParams } from "react-router-dom";
import axios from "axios"
import api from '../../components/urlApi'

const TrangSuaSuKien = () => {

  const item = JSON.parse(localStorage.getItem('sukien'))
  const [input,setInput] = useState({
    id:item.id,
    tieuDe:item.tieuDe,
    noiDung:item.noiDung
  })

  const handleInput = (e) => {
    let nameKey = e.target.name;
    let nameValue = e.target.value;
    setInput(state => ({...state,[nameKey]:nameValue}))
  }
  const handlerSubmit = (e) => {
    e.preventDefault();
   
    const data = {
      id:input.id,
      tieuDe:input.tieuDe,
      noiDung:input.noiDung
    }

    axios.post(api.suKien, data)
    .then(res => {
      console.log(res);
    })
    .catch(errors => console.log(errors))
  }

  
  return ( 
    <>
       <div className='d-flex justify-content-center py-5'>
            <form className="form" onSubmit={handlerSubmit}>
                <p className="form-title">Sự kiện</p>
                <div className="input-container">
                    <input type="text" name='tieuDe' value={input.tieuDe} onChange={handleInput} placeholder="Nhập tiêu đề" />
                    <span></span>
                </div>
                <div className="input-container">
                    <input type="text" name='noiDung' value={input.noiDung} onChange={handleInput} placeholder="Nhập nội dung" />
                </div>
                <button type="submit" className="submit">
                  Sửa
                </button>
            </form>
        </div>
    </>
  )
}

export default TrangSuaSuKien
