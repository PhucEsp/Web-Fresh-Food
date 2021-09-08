import axios from 'axios';
import React, { useEffect,useState} from 'react'
import NumberFormat from 'react-number-format';
import { useHistory } from 'react-router';
import accountApi from '../../../api/AccountApi';
import cartApi from '../../../api/CartApi';
import "./ModalProduct.scss";
function ModalProduct({product, handleChange, changeFlag}) {

  const [infoUser, setInfoUser] = useState({})
  const [flag, setFlag] = useState(false)
  const account = localStorage.getItem('account')
  const history = useHistory()
  
  useEffect(() => {
    const fetchUserInfo = async (account) => {
      try {
        const respone = await accountApi.getUser(account);
        setInfoUser(respone);
      } catch (error) {
          console.log(error.message)
      }
    }
    fetchUserInfo(account);
 }, [flag]) 
  
  const handleAddToCart = async (event) => {
    event.preventDefault();
    if(account == null) {
      history.push("/home/dang-nhap")
    }
    if(product.SOLUONG > product.TONGSOLUONG){
      alert("Số lượng đặt quá số lượng sản phẩm còn lại trong cửa hàng")
    }
    else {
      const data = {
        MASP : product.ID,
        MAKH : infoUser.MAKH,
        SOLUONG : product.SOLUONG,
     }
     try {
       await cartApi.addToCart(data);
       setFlag(!flag)
     } catch (error) {
       alert("Lỗi hệ thống. Vui lòng thử lại")
     }
    }
  }
  
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
                  <span className="id-product">ID: {product.ID}</span>
                  <span className="id-product">( Còn lại: {product.TONGSOLUONG} )</span>
                  <span>{product.DONVITINH}</span>
                  <h5 className='price'>Giá: <NumberFormat value={product.GIA} displayType={'text'} thousandSeparator={true} prefix={'vnđ '} /></h5>
                  <p>Tiêu Đề: <span> {product.MOTA}</span> </p>
                  <div className="choise">
                    <div className="cre-number">
                      {/* <input type="number" min='1' name="quanty"></input> */}
                      <input type="number" id="quantity" name="quantity" min="1" max={product.TONGSOLUONG} value ={product.SOLUONG }
                      onChange={handleChange}
                      ></input>
                     
                    </div>
                    <div className="add-to-card">
                       {
                         product.TONGSOLUONG === 0 ?
                         <button 
                          disabled={false}
                          style={{cursor: 'pointer'}}
                        >
                         HẾT HÀNG
                         </button> :
                          <button  data-dismiss="modal"
                          onClick={(e)=> {
                          handleAddToCart(e);
                          changeFlag(); 
                        }}>
                          THÊM VÀO GIỎ
                          </button>
                       }
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
