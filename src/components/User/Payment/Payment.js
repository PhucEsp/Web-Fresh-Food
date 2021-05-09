
import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import './Payment.scss'

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }));

function Payment() {
    const classes = useStyles();
    const [value, setValue] = React.useState('female');
    const handleChange = (event) => {
        setValue(event.target.value);
      };
    return (
        <div className="payment">
        <div class="container mt-5">
        <div class="row">
            <div class="col-sm-6 pay_cart_left">
                <div class="header">
                    <div class="header_left">
                        <h1>
                            <a href="/html/home.html">SUNI GREEN FARM</a>
                        </h1>
                    </div>
                    <div class="container Breadc">
                        <nav id="Breadc_nd" aria-label="breadcrumb">
                            <ol class="breadcrumb">
                            <li class="breadcrumb-item"><a href="cart.html">Giỏ hàng</a></li>
                            <li class="breadcrumb-item" aria-current="page">
                                Thông tin giao hàng
                            </li>
                            <li class="breadcrumb-item active" aria-current="page">
                                Phương thức thanh toán
                            </li>
                            </ol>
                        </nav>
                    </div>
                </div>
                
                <div class="content">
                    <div class="header_content">
                        <h2>Thông tin giao hàng</h2>
                        <p>
                            Bạn đã có tài khoản?
                            <a href="login.html"> Đăng nhập</a>
                        </p>
                    </div>
                    
                    <div class="content_info">
                        <form action="">
                            <div class="text_box">
                                <input className="name" type="text" placeholder="Họ và tên" style={{width: "100%"}}/>
                                <input className="email" type="email" placeholder="Email" style={{width: "100%"}}/>
                                <input className="phonenumber" type="number" placeholder="Số điện thoại" style={{width: "30%"}}/>
                                <input type="text" placeholder="Địa chỉ" style={{width: "100%"}}/>
                              
                            </div>
                            <div class="radio_box">
                            <FormControl  component="fieldset">
                                <FormLabel className="title-box" component="legend">Chọn Phương Thức Nhận Hàng</FormLabel>
                                <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                                    <FormControlLabel value="female" control={<Radio />} label="Giao hàng tận nơi" />
                                    <FormControlLabel value="male" control={<Radio />} label="Nhận tại cửa hàng" />
                                </RadioGroup>
                            </FormControl>
                            </div>
                            <div class="radio_box">
                            <FormControl component="fieldset">
                                <FormLabel className="title-box" component="legend">Chọn Phương Thức Nhận Hàng</FormLabel>
                                <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                                    <FormControlLabel value="female" control={<Radio />} label="Giao hàng tận nơi" />
                                    <FormControlLabel value="male" control={<Radio />} label="Nhận tại cửa hàng" />
                                </RadioGroup>
                            </FormControl>
                            </div>

                            <div class="funtion">
                                <a href="/home/gio-hang">
                                    <i class="fa fa-reply"></i>
                                    Giỏ hàng
                                </a>
                                <a class="funtion_success" href="success.html">
                                    Đặt hàng
                                </a>
                                
                            </div>
                            
                        </form>
                    </div>
                </div>

            </div>

            <div class="col-sm-6 pay_cart_right">
                <div class="table_card">
                    <div class="line-item-container">
                        <div class="image">
                            <img src="https://product.hstatic.net/200000240163/product/bapnep_4e9e92dae68641b396e4ce2e1aa57945_medium.jpg" alt=""/>
                        </div>
                        <div class="item">
                            <div class="info_item">
                                <h3>Bắp nếp</h3>
                                <span class="variant_title">Trái</span>
                                <span id="number_pro">1</span>
                            </div>
                            
                            <p class="price">
                                <span>₫</span><span>28,800</span>
                            </p>
                        </div>
                    </div>

                      <div class="line-item-container">
                        <div class="image">
                            <img src="https://product.hstatic.net/200000240163/product/bapnep_4e9e92dae68641b396e4ce2e1aa57945_medium.jpg" alt=""/>
                        </div>
                        <div class="item">
                            <div class="info_item">
                                <h3>Bắp nếp</h3>
                                <span class="variant_title">Trái</span>
                                <span id="number_pro">1</span>
                            </div>
                            
                            <p class="price">
                                <span>₫</span><span>28,800</span>
                            </p>
                        </div>
                    </div>
                </div>

                <div class="discount">
                    <input type="text" id="discount_code"/>
                    <button disabled='true' type="button" class="btn btn-success"> <span >Sử dụng</span></button>
                </div>

                <div class="detail">
                    <div class="detail_price">
                        <p>
                            Tạm tính: 
                            <span>₫</span><span>0</span>
                        </p>

                        <p>
                            Phí vận chuyển: 
                            <span>₫</span><span>0</span>
                        </p>
                    </div>
                </div>

                <div class="detail_price">
                    <p>
                        Tổng tiền:  
                        <span>₫</span><span>28,800</span>
                    </p>
                </div>
            </div>
        </div>
    </div>
        </div>
    )
}

export default Payment
