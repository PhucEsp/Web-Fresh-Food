import Modal from 'react-modal'
import { Link} from 'react-router-dom'
import {useState} from 'react'
import NumberFormat from 'react-number-format';

const RenderListProducts =({listProducts, setOpenModal,handleDelete}) => {
    

    return (
        <div>
        <div className="list-products">
         <table class="table">
            <thead>
                <tr class="table-success">
                <th scope="col" className="id">Mã</th>
                <th scope="col" className="categories">Mã Loại</th>
                <th scope="col" className="img">Hình Ảnh</th>
                <th scope="col" className="ProductName">Tên Sản Phẩm</th>
                <th scope="col" className="Price">Giá</th>
                <th scope="col">Đơn Vị Tính</th>
                <th scope="col">Số Lượng</th>
                <th scope="col" className="description">Mô Tả</th>
                <th scope="col" className="Edit">Edit</th>
                <th scope="col" className="Delete">Delete </th>
                </tr>
            </thead>
            <tbody>
                {
                    listProducts.map(product => (
                        <tr key={product.ID}>
                            <th scope="row">{product.ID}</th>
                            <td >{product.MADM}</td>
                            <td >
                                <img src={product.HINHANH}></img>
                            </td>
                            <td>{product.TENSP}</td>
                            
                            {/* <NumberFormat thousandSeparator={true} prefix={'$'} /> */}
                           
                            <td>
                            <NumberFormat value={product.GIA} displayType={'text'} thousandSeparator={true} prefix={'vnđ  '} />
                            </td>
                            <td>{product.DONVITINH}</td>
                            <td>{product.SOLUONG}</td>
                            <td className="desc">{product.MOTA}</td>
                            <td>
                               <button className="btn-edit"
                               onClick={() => {setOpenModal(product)}}
                                >
                                <i class="fas fa-pen-alt"></i>
                                </button>
                            </td>
                            <td>
                                <button className="btn-delete" onClick={() => {handleDelete(product.ID)}}>
                                    <i class="far fa-trash-alt"></i>
                                </button>
                            </td>
                        </tr>
                    ))
                }
               
            </tbody>
        </table>
       
        
        </div>
        </div>
    )
}

export default RenderListProducts
