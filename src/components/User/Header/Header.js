import React from 'react'
import './Header.scss'
function Header() {
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
                        <a className="nav-link" href="/home-blogs" alt="/home/blogs">Blog</a>
                        </li>

                        

                        <li className="nav-item">
                        <a className="nav-link" href="/home/lien-he" alt="Liên hệ" >Liên hệ</a>
                        </li>

                        <li className="nav-item">
                        <a className="nav-link" href="/home/dia-chi" alt="Địa chỉ cửa hàng" >Địa chỉ cửa hàng</a>
                        </li>

                    </ul>
                    <div className="icon">
                    <a href="#" alt="Tài khoản"><i class="fas fa-search"></i></a>
                        <a href="/home/login" alt="Tài khoản"><i className="fas fa-user"></i></a>
                        <a href="/home/cart" alt="Giỏ hàng"><i className="fas fa-cart-plus"></i></a>
                    </div>
                    </div>
                </div>
                </nav>
            </div>
       
        </div>
    )
}

export default Header
