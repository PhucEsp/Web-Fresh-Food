
import React from 'react'

const HeaderAdmin = () => {
    return(
        <div className="Header-basic">
            <div className="full-width head">
                <div className="logo">
                    <img src="https://logodix.com/logo/1707162.png" alt="Logo"></img>
                </div>
                <div className="admin-account">
                    <div><i class="fas fa-user-shield"></i></div>
                    <a href="/admin/dangnhap"
                    onClick={() => {localStorage.removeItem('token')}}
                    >Log out</a>
                </div>
            </div>
            {/* <div className="container">
                <div className="header_middle">
                    <img src="http://theme.hstatic.net/200000240163/1000672133/14/logo.png?v=405"></img>
                    <div className="search-products">
                        <input type="text" placeholder="Tìm Kiếm Sản Phẩm..." ></input>
                        <button><i class="fas fa-search"></i> </button>
                    </div>
                </div>
            </div> */}
        </div>
    )
}

export default HeaderAdmin;