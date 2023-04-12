import React from 'react'
import Header from './Header'
import Footer from './Footer'
import {Outlet} from 'react-router-dom'
import DanhMuc from './DanhMuc'

const LayOut = () => {
  return (
    <div>
        <Header/>
        <section className='container-xxl'>
          <div className='row'>
            <div className='col-2'>
              <DanhMuc/>
            </div>
            <div className='col-10'>
            <Outlet/>
            </div>
          </div>
        </section>
        <Footer/>
    </div>
  )
}

export default LayOut