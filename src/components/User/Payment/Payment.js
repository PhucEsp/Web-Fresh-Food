
import React, {useEffect, useState} from 'react'
import NumberFormat from 'react-number-format';

import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import { Button, TextField } from '@material-ui/core';
import { ValidatorForm} from 'react-material-ui-form-validator';

import accountApi from '../../../api/AccountApi'
import cartApi from '../../../api/CartApi'
import './Payment.scss'

import { useHistory } from 'react-router';



const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: "100%"
      },
    },
    TextField: {
        "& > *": {
          margin: theme.spacing(1),
          height: "55px",
          width: "614px"
        }
      }
  }));

function Payment() {

    const history = useHistory();
    const classes = useStyles();
    const [value, setValue] = React.useState('female');
    const [listCartRender, setListCartRender] = useState([]);
    const [infoUser, setInfoUser] = useState({})
    const [flag,setFlag] = useState(false)
    const [isOrderSuccess, setIsOrderSuccess] = useState(false)
    // input form value
    const [name,setName] = useState('')
    const [mail,setMail] = useState('')
    const [phoneNumber,setPhoneNumber] = useState("")
    const [address,setAddress] = useState('')

    const acc = localStorage.getItem('account')
    useEffect( async() => {
            try {
                const respone = await accountApi.getUser(acc);
                console.log(respone)
                setInfoUser(respone);
                setFlag(!flag)
                setName(respone.HOTEN)
                setMail(respone.MAIL)
                setPhoneNumber(respone.SDT)
                setAddress(respone.DIACHI)
            } catch (error) {
                console.log(error.message)
            }
            
    }, [])
    useEffect(() => {
      const fetchListCart = async () => {
          try {
              const respone = await cartApi.getCartUser(infoUser.MAKH);
              setListCartRender(respone)
          } catch (error) {
                  console.log(error.message);
          }
      }
      fetchListCart()
    },[flag])

    const totalPrice = () => {
        return listCartRender.reduce((acc,val) => {
            return acc + (parseInt(val.SOLUONG,10) * parseInt(val.GIA,10));
        },0)
    }

    const handleSubmit = async () => {
        if(totalPrice() == 0){
            return;
        }
        const data = {
            MAKH : infoUser.MAKH,
            DIACHI: address,
            HOTEN: name,
            SDT: phoneNumber,
            MAIL: mail 
        }

        try {
            await cartApi.order(data)
            setIsOrderSuccess(true)
            history.push("/home/dat-hang-thanh-cong");
        } catch (error) {
            setIsOrderSuccess(false)
            console.log(error.message)
        }
        

    }

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
                    
                    <ValidatorForm className={classes.root}
                    onSubmit={(e) => handleSubmit(e)}
                    >

                        <TextField
                            className={classes.TextField}
                            id="outlined-basic"
                            label="Họ Tên"
                            variant="outlined"
                            type="text"
                            required
                            onChange={(e) => {setName(e.target.value)}}
                            value={name}
                        />

                        <TextField
                            className={classes.TextField}
                            id="outlined-basic"
                            label="Số điện thoại"
                            variant="outlined"
                            type="number"
                            required
                            validators={['minNumber:0', 'maxNumber:10', 'matchRegexp:^[0-9]$']}
                            onChange={(e) => {setPhoneNumber(e.target.value)}}
                            value={phoneNumber}
                        />
                        <TextField
                            className={classes.TextField}
                            id="outlined-basic"
                            label="Email"
                            variant="outlined"
                            type="email"
                            required
                            onChange={(e) => {setMail(e.target.value)}}
                            value={mail}
                        />
                        <TextField
                            className={classes.TextField}
                            id="outlined-basic"
                            label="Địa Chỉ"
                            variant="outlined"
                            type="text"
                            required
                            onChange={(e) => {setAddress(e.target.value)}}
                            value={address}
                        />

                       

                        <FormLabel className="title-box" component="legend">Chọn Phương Thức Nhận Hàng</FormLabel>
                                    <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                                        <FormControlLabel value="atHome" control={<Radio />} label="Giao hàng tận nơi" />
                                        <FormControlLabel value="atStore" control={<Radio />} label="Nhận tại cửa hàng" />
                                    </RadioGroup>
                        <div>
                        <a id='back-to-cart' href="/home/gio-hang">
                            <i class="fa fa-reply"></i>
                            Giỏ hàng
                       </a>
                        <Button id="order" variant="contained" color="primary" type='submit'>
                           Đặt Hàng
                        </Button>
                        </div>
                    </ValidatorForm>
                       
                            </div>
                               
                            </div>

            </div>

            <div class="col-sm-6 pay_cart_right">
                <div class="table_card">
                    {
                        listCartRender && listCartRender.map(item => (
                            <div class="line-item-container">
                                <div class="image">
                                    <img src={item.HINHANH} alt=""/>
                                </div>
                                <div class="item">
                                    <div class="info_item">
                                        <h3>{item.TENSP}</h3>
                                        <span class="variant_title">{item.DONVITINH}</span>
                                        <span id="number_pro">{item.SOLUONG}</span>
                                        <p class="price_product">
                                        <NumberFormat value={item.GIA} displayType={'text'} thousandSeparator={true} prefix={'vnđ '} />
                                            {/* <span>{item.GIA}₫</span> */}
                                         </p>
                                    </div>
                                    
                                    
                                </div>
                            </div>
                        ))
                    }
                </div>

                <div class="discount">
                    <input type="text" id="discount_code"/>
                    <button disabled='true' type="button" class="btn btn-success"> <span >Sử dụng</span></button>
                </div>

                <div class="detail">
                    <div class="detail_price">
                        <p>
                            Tạm tính: 
                            <NumberFormat value={totalPrice()} displayType={'text'} thousandSeparator={true} prefix={'vnđ '} />
                        </p>

                        <p>
                            Phí vận chuyển: 
                            <span>0₫</span>
                        </p>
                    </div>
                </div>

                <div class="detail_price">
                    <p>
                        Tổng tiền:  
                        <NumberFormat value={totalPrice()} displayType={'text'} thousandSeparator={true} prefix={'vnđ '} />
                    </p>
                </div>
            </div>
        </div>
    </div>
        </div>
    )
}

export default Payment
