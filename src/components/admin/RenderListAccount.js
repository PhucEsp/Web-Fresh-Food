import RenderListProducts from "./RenderListProducts"

const RenderListAccount = ({listUsers, setOpenModal, handleDelete}) => {

    return (
        <div className='listAccount'>
            <table className="table table-account" >
            <thead>
                <tr className="table-success">
                    <th scope="col" className="name">Họ Tên</th>
                    <th scope="col" className="account">Tài Khoản</th>
                    <th scope="col" className="phoneNumber">Số Điện Thoại</th>
                    <th scope="col" className="email">Email</th>
                    <th scope="col" className="address">Địa Chỉ</th>
                    <th scope="col">Delete
                </th>
                </tr>
            </thead>
            <tbody>
                {
                    listUsers.map(user => (
                        <tr key={user.TAIKHOANG}>
                            <th scope="row">{user.HOTEN}</th>
                            <td >{user.TAIKHOAN}</td>
                            <td>{user.SDT}</td>
                            <td>{user.MAIL}</td>
                            <td>{user.DIACHI}</td>
                            <td>
                                <button className="btn-delete" onClick={() => {handleDelete(user.TAIKHOAN)}}>
                                    <i class="far fa-trash-alt"></i>
                                </button>
                            </td>
                        </tr>
                    ))
                }
               
            </tbody>
        </table>
        
        </div>  
    )
}

export default RenderListAccount