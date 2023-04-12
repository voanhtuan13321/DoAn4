import React from 'react'
import { Link } from "react-router-dom";
const GioHang = () => {
  return (
    <div className='container-xxl'>
        <div className="row">
            <div className='pt-5'><h3>Giỏ hàng</h3></div>
          <div className="col-12">
            <div className="cart-header py-3 d-flex justify-content-between align-items-center">
              <h4 className="cart-col-1">Sản phẩm</h4>
              <h4 className="cart-col-3">Tên sách</h4>
              <h4 className="cart-col-2">Giá</h4>
              <h4 className="cart-col-3">Số lượng</h4>
              <h4 className="cart-col-4">Tổng tiền</h4>
              
            </div>
            <div className="cart-data py-3 mb-2 d-flex justify-content-between align-items-center">
              <div className="cart-col-1 gap-15 d-flex align-items-center">
                <input className="form-check-input" type='checkbox' />
                <div className="w-25">
                  <img src='https://cdn0.fahasa.com/media/catalog/product/i/m/image_195509_1_36793.jpg' className="img-fluid" alt="product image" />
                </div>
                <div className="w-75">
                  <p>GDffdhg</p>
                  <p>Size: hgf</p>
                  <p>Color: gfd</p>
                </div>
              </div>
              <div className="cart-col-2">
                <h5 className="price">Sách giáo khoa</h5>
              </div>
              <div className="cart-col-2">
                <h5 className="price">$ 100</h5>
              </div>
              <div className="cart-col-3 d-flex align-items-center gap-15">
                <div className='d-flex'>
                  {/* <button className='btn'>+</button> */}
                  <input
                    type="number"
                    name=""
                    className='text-center'
                    defaultValue={1}
                    min={1}
                    max={10}
                  />
                  {/* <button className='btn'>-</button> */}
                </div>
                <div>
                  {/* <AiFillDelete className="text-danger " /> */}
                </div>
              </div>
              <div className="cart-col-4">
                <h5 className="price">$ 100</h5>
              </div>
            </div>
            <div className="cart-data py-3 mb-2 d-flex justify-content-between align-items-center">
              <div className="cart-col-1 gap-15 d-flex align-items-center">
                <input className="form-check-input" type='checkbox' />
                <div className="w-25">
                  <img src='https://cdn0.fahasa.com/media/catalog/product/i/m/image_195509_1_36793.jpg' className="img-fluid" alt="product image" />
                </div>
                <div className="w-75">
                  <p>GDffdhg</p>
                  <p>Size: hgf</p>
                  <p>Color: gfd</p>
                </div>
              </div>
              <div className="cart-col-2">
                <h5 className="price">Sách giáo khoa</h5>
              </div>
              <div className="cart-col-2">
                <h5 className="price">$ 100</h5>
              </div>
              <div className="cart-col-3 d-flex align-items-center gap-15">
                <div className='d-flex'>
                  {/* <button className='btn'>+</button> */}
                  <input
                    type="number"
                    name=""
                    className='text-center'
                    defaultValue={1}
                    min={1}
                    max={10}
                  />
                  {/* <button className='btn'>-</button> */}
                </div>
                <div>
                  {/* <AiFillDelete className="text-danger " /> */}
                </div>
              </div>
              <div className="cart-col-4">
                <h5 className="price">$ 100</h5>
              </div>
            </div>
          </div>
          <div className="col-12 py-2 mt-4">
            <div className="d-flex justify-content-between align-items-baseline">
              <Link to="/" className="button">
                Tiếp tục mua
              </Link>
              <Link to="/lich_su_mua_hang" className="button">
                Lịch sử mua hàng
              </Link>
              <div className="d-flex flex-column align-items-end">
                <h4>SubTotal: $ 1000</h4>
                <p>Taxes and shipping calculated at checkout</p>
                <Link to="/checkout" className="button">
                  Checkout
                </Link>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default GioHang