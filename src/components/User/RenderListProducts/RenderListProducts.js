import React from 'react'
import './RenderListProducts.scss'

function RenderListProducts({listProducts, handleOnclick}) {
    return (
        <div className="listproducts">
            <div className='container'>
                <div className='items'>

                    {/* render item */}
                    {
                        listProducts.map(product => (
                            <div className='item' key={product.ID}>
                                <div className="card">
                                    <div className="card-img1 img">
                                        <a href="product.html">
                                            <img className="img-a" src={product.HINHANH} alt="img-product"/>
                                        </a>
                                        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal"
                                        onClick={() => {handleOnclick(product)}}
                                        >
                                           <i className="fas fa-search-dollar" ></i>
                                        </button>
                                    </div>

                                    <div className="card-img2 img">
                                        <a href="product.html">
                                            <img className="img-a" src={product.HINHANH1} className="card-img-top" alt="img-product"/>
                                        </a>
                                    </div>
                                </div>
                                <div className="card-info">
                                        <a href="product.html">{product.TENSP}</a>
                                        <p>
                                        <span>{product.GIA} ₫</span>
                                        </p>
                                </div>
                            </div>
                        ))
                    }

                </div>
            </div>
        </div>
    )
}

export default RenderListProducts
