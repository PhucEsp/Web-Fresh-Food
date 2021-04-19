import React, {useState, useEffect} from 'react'

function UserPage() {

    return(
        <div className="Products-page">
            <div className="card products-card border-dark mb-3" >
                {/* <div className="card-header">Products name</div> */}
                <div className="card-body text-dark">
                    <div className="card-img">
                        <img src="https://product.hstatic.net/200000240163/product/bidowado3_48422345d4184ea1b44b04a51051c12c_large.jpg"></img>
                    </div>
                    <h5 className="card-title">Products Name</h5>
                    <p className="card-text">Products Description</p>
                    <p className="price">12.000 vnd</p>
                </div>
                <div className="button-control">
                    <button>Edit</button>
                    <button>Delete</button>
                </div>
            </div>
        </div>
    )
}

export default UserPage