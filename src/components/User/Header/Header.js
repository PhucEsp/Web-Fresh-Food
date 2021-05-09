import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import accountApi from '../../../api/AccountApi';
import cartApi from '../../../api/CartApi';
import productsApi from '../../../api/ProductsApi';
import './Header.scss'
function Header(props) {

    const [showSearch, setShowSearch] = useState(false)
    const [showAccount, setShowAccount] = useState(false)
    const [showCart, setShowCart] = useState(false)
    const [flag,setFlag] = useState(false)
    const [listProducts, setListProducts] = useState([]);
    const [listSearchProducts, setListSearchProducts] = useState([])
    const [listCartRender, setListCartRender] = useState([]);
    const [infoUser, setInfoUser] = useState({})
    
    // get info user logged in
    const acc = localStorage.getItem('account')
    useEffect( async() => {
            try {
                const respone = await accountApi.getUser(acc);
                setInfoUser(respone);
            } catch (error) {
                console.log(error.message)
            }
    }, [flag ,props.flag])

   useEffect(() => {
    const list = props.listCartRender;
    setListCartRender(list)
   })

// get list products for search bar
    useEffect(() => {
        const fetchListProducts = async () => {
            try {
                const respone = await productsApi.getAll();
                setListProducts(respone)
            } catch (error) {
                    console.log(error.message);
            }
        }
        fetchListProducts()
    }, [])

    const showSearchBar = (e) => {
        e.preventDefault()
        setShowSearch(true)
        setShowAccount(false)
        setShowCart(false)
        setFlag(!flag)
    }
    const showInfoAccount = (e) => {
        e.preventDefault()
        setShowSearch(false)
        setShowAccount(true)
        setShowCart(false)
        setFlag(!flag)
    }
    const showInfoCart = (e) => {
        e.preventDefault()
        setShowSearch(false)
        setShowAccount(false)
        setShowCart(true)
        setFlag(!flag)
        
    }
    const closeBar = () => {
        setShowSearch(false)
        setShowAccount(false)
        setShowCart(false)
    }
    const onDeleteItemCart = (id) => {
        // // cartApi.deleteItem(id)
        // const newList = listCartRender.filter(val => val.ID !== id)
        // setListCartRender(newList)
    }

    const handleOnchange = (e) => {
        if(e.target.value === '') {
            setListSearchProducts(null)
        }
        const newlistSearch = listProducts.filter(product => {
            return  product.TENSP.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase());
        })
        setListSearchProducts(newlistSearch);
    }

    const totalPrice = () => {
       if(listCartRender != undefined)
       {
        return listCartRender.reduce((acc,val) => {
            return acc + (parseInt(val.SOLUONG,10) * parseInt(val.GIA,10));
        },0)
       }
    }
    
    return (
        <div>
               <div className="header" id="header">
                <div className="top">
                <p className="p-title">Miễn phí vận chuyển với đơn trên 500k</p>
                </div>
                <nav id ="menubar" className=" navbar navbar-expand-lg navbar-light ">
                <div className="container menu" id="menu-bar" >
                    <a className="navbar-brand mg_right" href="/home">
                    <img src="https://theme.hstatic.net/200000240163/1000672133/14/logo.png?v=405" alt="SUNI GREEN FARM"/>
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="flex collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                        <a className="nav-link active" href="/home" alt="Trang chủ">Trang chủ</a>
                        </li>

                        <li className="nav-item dropdown">
                            <a className="nav-link" href="#" id="navbarDropdown"  
                            alt="Sản Phẩm">Sản Phẩm <i class="fas fa-angle-down"></i> </a>
                           
                           {/* render list categoriesx */}
                            <div className="dropdown-content">
                                <a className="dropdown-item" href="/home/collections/rau-sach">Rau Củ Quả</a>
                                <a className="dropdown-item" href="/home/collections/trai-cay">Trái Cây</a>
                                <a className="dropdown-item" href="/home/collections/nam-tuoi">Nấm Tươi</a>
                                <a className="dropdown-item" href="/home/collections/cham-soc-suc-khoe">Chăm Sóc Sức Khỏe</a>
                            </div>
                        </li>

                        <li className="nav-item">
                        <a className="nav-link" href="/home/gioi-thieu" alt="Giới thiệu" >Giới thiệu</a>
                        </li>

                        <li className="nav-item">
                        <a className="nav-link" href="/home/blogs" alt="/home/blogs">Blog</a>
                        </li>

                        

                        <li className="nav-item">
                        <a className="nav-link" href="/home/lien-he" alt="Liên hệ" >Liên hệ</a>
                        </li>

                        <li className="nav-item">
                        <a className="nav-link" href="/home/dia-chi" alt="Địa chỉ cửa hàng" >Địa chỉ cửa hàng</a>
                        </li>

                    </ul>
                    <div className=" header-wrap-icon">
                        <div className="search-bar" href="#" alt="Tài khoản" onClick={showSearchBar}>
                            <i class="fas fa-search"></i>
                        </div>
                        <div className="account" href="/home/login" alt="Tài khoản"  onClick={showInfoAccount} >
                            <i className="fas fa-user"></i>
                            <span className="account-name" >icon</span>
                        </div>
                        <div className="addToCard" href="/home/cart" alt="Giỏ hàng" onClick={showInfoCart}>
                            <i className="fas fa-cart-plus"></i>
                            {
                                listCartRender == undefined  ? <span className="total-card">0</span>
                                : <span className="total-card">{listCartRender.length}</span>
                            //   props.listCartRender.length == undefined ?  <span className="total-card">{props.listCartRender.length}</span>
                            //   : <span className="total-card">0</span>
                            }
                            
                        </div>
                    </div>
                        {
                                showSearch && (
                                    <div className= "search show-Search">
                                        <div className="search-header fixed">
                                            <div className="title-search">
                                                <p>Tìm Kiếm</p>
                                                <span id="close-searchbar" onClick={closeBar} ><i class="fas fa-times"></i></span>
                                            </div>
                                            <div className="search-input">
                                                <input type="text" placeholder="Tên sản phẩm..." onChange={handleOnchange} /> 
                                                <button ><i class="fas fa-search"></i></button>
                                            </div>
                                        </div>                         
                                        <ul className="list-search" >
                                            {
                                            listSearchProducts != null?
                                            listSearchProducts.map(product => (
                                                <li key={product.ID}>
                                                    <a className="detail-product"  href={'/home/chi-tiet-san-pham/' + product.ID}>
                                                        <div className ="img-product">
                                                            <img src={product.HINHANH} alt="img"></img>
                                                        </div>
                                                        <div className="content">
                                                            <p>{product.TENSP}</p>
                                                            <span>{product.GIA} ₫</span>
                                                        </div>
                                                    </a>
                                                </li>
                                            ) ) :
                                            
                                                <li >
                                                        <div className="content">
                                                            <p>Tìm kiếm sản phẩm</p>
                                                        </div>
                                                </li>
                                            } 
                                        </ul>
                                    </div>
                                ) 
                            }       
                            {
                                showAccount && (
                                    <div className="info-account">
                                        <div className="wrap-info">
                                            <div className="name">
                                                <h6>
                                                    <span id="close-searchbar" onClick={closeBar} ><i class="fas fa-times"></i></span>
                                                </h6>
                                                <p>{infoUser.HOTEN}</p> 
                                            </div>
                                            <ul>
                                                <li><Link>Thong tin tai khoan</Link></li>
                                                <li><Link>Don Hang cua toi</Link></li>
                                                <li><Link>Dang Xuat</Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                )
                            }   
                            {
                                showCart && (
                                    <div className='info-carts'>
                                        <h2><span>Giỏ Hàng</span> <span id="close-searchbar" onClick={closeBar} ><i class="fas fa-times"></i></span></h2>
                                        <div className='list-carts'>
                                            <ul className="items">
                                                {
                                                    listCartRender && listCartRender.map(val => (
                                                        <li className="item" key={val.ID}>
                                                            <div className="img">
                                                                <img src={val.HINHANH}></img>
                                                            </div>
                                                            <div className="info-product">
                                                                <p id="head-info"><a>{val.TENSP}</a> 
                                                                <span id="close-searchbar"
                                                                 onClick={() => { onDeleteItemCart(val.ID) }} 
                                                                 >
                                                                    <i class="fas fa-times"></i></span></p>
                                                                <p>Trai</p>   
                                                                <span className="quanty">{val.SOLUONG}</span>   
                                                                <span className="price">{val.GIA}</span> 
                                                            </div>
                                                        </li>
                                                    ))
                                                    
                                                }
                                                
                                            </ul>
                                        </div>
                                        <div className='total-price'> 
                                                <p className="title-price">Tổng Tiền: <i> {totalPrice()}đ</i> </p>
                                               
                                        </div>
                                        <div className='group-button'>
                                            
                                            <button>
                                                <Link to="/home/gio-hang" >Xem Giỏ Hàng</Link>
                                            </button>
                                            <button>
                                                <Link to="/home/thanh-toan">Thanh Toán</Link>
                                            </button>
                                        </div>
                                    </div>
                                )
                            }                  
                    
                    </div>
                </div>
                </nav>
            </div>
       
        </div>
    )
}

export default Header
