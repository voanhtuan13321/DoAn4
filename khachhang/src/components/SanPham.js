import React from 'react'
import { Link } from 'react-router-dom';
const SanPham = () => {
    return (
      <>
        <div>
          <div className="container-xxl py-5">
            <div className='row'>
              <div className='col-4'>
                <div className="product-image">
                  <img src='https://cdn0.fahasa.com/media/catalog/product/i/m/image_195509_1_36793.jpg' className="img-fluid" alt="product image" />
                </div>
              </div>
              <div className='col-8'>
                <div className="product-details">
                  <h6 className="brand">Sách Giáo Khóa</h6>
                  <h5 className="product-title">
                    Kids headphones
                  </h5>
                  <p>At vero eos et</p>
                  <p>Tác giả</p>
                  <p>Nhà xuất bản</p>
                  <p>Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.</p>
                  <p className="price">$100.00</p>
                </div>
                <div className='d-flex justify-content-center align-items-center'>
                  <div class="input-group mb-0">
                    <button className="btn btn-outline-secondary">+</button>
                    <input type="text" value={1}/>
                    <button className="btn btn-outline-secondary">-</button>
                  </div>
                  <div>
                    <Link className="button" to="/gio_hang">Thêm vào giỏ hàng</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}

export default SanPham