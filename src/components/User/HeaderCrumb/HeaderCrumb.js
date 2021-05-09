import React from 'react'
import './HeaderCrumb.scss'
function HeaderCrumb(props) {
    const category = props.category;
    const productName = props.productName;
    return (
        <div className="HeaderCrumb">
            <div class="container-fluid Breadc">
                <nav id="Breadc_nd">
                    <ol class="breadcrumb">
                    <li class="breadcrumb-item">Trang chủ</li>
                    <li class="breadcrumb-item"><a href="#">{category}</a></li>
                    <li class="breadcrumb-item active" aria-current="page"><a href="/home/collections/rau-sach">{productName}</a></li>
                    </ol>
                </nav>
            </div>
        </div>
    )
}

export default HeaderCrumb
