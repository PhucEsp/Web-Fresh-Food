import { Input } from '@material-ui/core';
import React from 'react'
import "./ModalProduct.scss";
function ModalProduct({product, handleChange}) {

    return (
        <div className="modal fade" id="myModal">
          <div id="modal-log" className="modal-dialog modal-dialog-centered">
            <div className="modal-content">

              <div className="modal-img content-left">
                  <img src={product.HINHANH}></img>
              </div>
              <div className="content-right">
                <div className="modal-header">
                  <h4 className="modal-title">{product.TENSP}</h4>
                  <button type="button" className="close" data-dismiss="modal">&times;</button>
                </div>
                {/* <br></br> */}
                <div className="modal-body">
                  <span>ID: {product.ID}</span>
                  <h5>Price: {product.GIA}</h5>
                  <p>Tiêu Đề: <span> {product.MOTA}</span> </p>
                  <div className="choise">
                    <div className="cre-number">
                      {/* <input type="number" min='1' name="quanty"></input> */}
                      <input type="number" id="quantity" name="quantity" min="1" value ={product.SOLUONG }
                      onChange={handleChange}
                      ></input>
                     
                    </div>
                    <div className="add-to-card">
                        <button>THÊM VÀO GIỎ</button>
                    </div>
                  </div>
                </div>
              </div>
              
              
            </div>
          </div>
        </div>
    )
}

export default ModalProduct
