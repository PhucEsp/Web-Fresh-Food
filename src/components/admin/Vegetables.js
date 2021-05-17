import React, {useState, useEffect} from 'react'
import { Link, Redirect , useHistory, useRouteMatch} from 'react-router-dom'
import Modal from 'react-modal'
import productsApi from '../../api/ProductsApi';
import RenderListProducts from './RenderListProducts';

//ui
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


function Vegetable() {

    const history = useHistory();

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [listProducts, setListProducts] = useState([]);
    const [flag, setFlag] = useState(false);

    // set thong tin san pham -> edit 
    const [id, setID] = useState('');
    const [tensp, setTenSp] = useState('');
    const [loaisp, setLoaiSp] = useState('');
    const [gia, setGia] = useState(0);
    const [donvitinh, setDonViTinh] = useState('');
    const [soluong, setSoLuong] = useState(0);
    const [mota, setMoTa] = useState('');
    const [hinhanh,SetHinhAnh] = useState('');


    // ui style
    const useStyles = makeStyles((theme) => ({
        root: {
          '& > *': {
            margin: theme.spacing(1),
          },
        },
      }));

    useEffect(() => {
        const fetchProductsList = async () => {
            try {
                const responds = await productsApi.getAll();
                const newList = responds.filter(val => val.MADM == 2)
                setListProducts(newList);
            } catch (error) {
                console.log(error.message)
            }
        }
        fetchProductsList();
     }, [flag])

     console.log('list vegetable ------- ' , listProducts)
    
     const setOpenModal = (product) => {
        setModalIsOpen(true)
        setID(product.ID)
        setTenSp(product.TENSP)
        setLoaiSp(product.MADM)
        setGia(product.GIA)
        setDonViTinh(product.DONVITINH)
        setSoLuong(product.SOLUONG)
        setMoTa(product.MOTA)
        SetHinhAnh(product.HINHANH);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const product = {
            ID: id,
            TENSP: tensp,
            MADM: loaisp,
            GIA: gia,
            DONVITINH: donvitinh,
            SOLUONG: soluong,
            MOTA: mota,
            HINHANH: hinhanh,
        }
        // post product
        setTimeout(() => {
            try {
                productsApi.update(id,product);
                setModalIsOpen(false);
                setFlag(!flag);
            } catch (error) {
                console.log(error.message);
            }
        }, 300);
    }

    const handleDelete = (id) => {
        let agree = window.confirm(` Bạn có chắc chắn muốn xóa sản phẩm ${id} ?` );
        if(!agree) return;
        else {
            setFlag(!flag)
            try {
                productsApi.delete(id);
                setFlag(!flag)
            } catch (error) {
                console.log(error.message);
            }
        }
    }

    const textAreaStyle = {
        width: '100%',
        height: '100px',
    }
    

    let acc = localStorage.getItem('token');
    if(acc === null) {
       
        history.push("/admin/dangnhap");
    }

    console.log('Loại sản phẩm  --------- ',loaisp)
    return(
      <div>
          <div>
          <div className="header-products container">
                <h1>
                    rau cu
                </h1>
                {/* <Link to="/admin/themoisanpham" className="add-new" >
                    <p>Thêm</p>
                    <i className="fas fa-plus"></i>      
                </Link> */}
                <Button className="button-link" variant="contained" color="primary" href="/admin/themoisanpham">
                 Thêm Mới <i className="fas fa-plus"></i> 
                </Button>
            </div>
            <RenderListProducts listProducts={listProducts} setOpenModal={setOpenModal} handleDelete={handleDelete}></RenderListProducts>
            <Modal isOpen={modalIsOpen}>
                <div id="modal-form">
                <div className="modal-head">
                    <h2>Chỉnh sửa sản phẩm</h2>
                    <span className="btn-close" onClick={() => {setModalIsOpen(false)}}>
                    <i className="fas fa-times"></i>
                    </span>
                </div>
                    <div className="form-edit">
                        <form id="form" > 
                            <div className="input-username wrap-input" >
                                <label for="validationCustom03" className="form-label">Tên Sản Phẩm</label>
                                <div>
                                    <input type="text" className="form-control" id="validationCustom03" required
                                    name="tensp"
                                    value={tensp}
                                    onChange={(e) => {setTenSp(e.target.value)}} /> 
                                </div>
                                <div className="invalid-feedback">
                                Please provide a valid city.
                                </div>
                            </div>

                            <div className=" wrap-input" >
                                <div className="">
                                    <label for="validationCustom04" className="form-label">Loại Sản Phẩm ne</label>
                                    <div>
                                        <select className="form-select" id="validationCustom04" required  
                                        value={loaisp}
                                        onChange={(e) => {setLoaiSp(e.target.value)}}
                                        >
                                            <option value='1'>Trái Cây</option>
                                            <option value='2'>Rau Củ Quả</option>
                                            <option value='3'>Nấm Tươi</option>
                                            <option value='4'>Thực Phẩm Sức Khỏe</option>
                                        </select>
                                    </div>
                                    <div className="invalid-feedback">
                                        Please select a valid state.
                                    </div>    
                                </div>
                            </div>

                            <div className="merge-input" >
                                <div className="wrap-input" >
                                    <label for="validationCustom03" className="form-label">Số Lượng</label>
                                    <div>
                                        <input type="text" className="form-control" id="validationCustom03" required
                                        name="soluong" value={soluong}
                                        onChange={(e) => {setSoLuong(e.target.value)}} /> 
                                    </div>
                                    <div className="invalid-feedback">
                                    Please provide a valid city.
                                    </div>
                                </div>

                                <div className=" wrap-input" >
                                    <label for="validationCustom02" className="form-label">Giá</label>
                                    <div>
                                        <input type="text" className="form-control" id="validationCustom02" required
                                        name="gia" value={gia}
                                        onChange={(e) => {setGia(e.target.value)}} /> 
                                    </div>
                                    <div className="invalid-feedback">
                                    Please provide a valid city.
                                    </div>
                                </div>

                                <div className=" wrap-input" >
                                    <label for="validationCustom01" className="form-label">Đơn Vị Tính</label>
                                    <div>
                                        <input type="text" className="form-control" id="validationCustom01" required 
                                        value={donvitinh} name="donvitinh" 
                                        onChange={(e) => {setDonViTinh(e.target.value)}}/> 
                                    </div>
                                    <div className="invalid-feedback">
                                    Please provide a valid city.
                                    </div>
                                </div>
                            </div>
                            
                            <div className=" wrap-input" >
                                    <label for="validationCustom06" className="form-label">Hình Ảnh</label>
                                    <div>
                                        <input type="text" className="form-control" id="validationCustom06" required 
                                        value={hinhanh} name="donvitinh" 
                                        onChange={(e) => {SetHinhAnh(e.target.value)}}/> 
                                    </div>
                                    <div className="invalid-feedback">
                                    Please provide a valid city.
                                    </div>    
                            </div>
                        
                            <div className=" wrap-input" >
                                <label for="validationCustom07" className="form-label">Mô Tả</label>
                                <div>
                                    {/* <input type="text" className="form-control" id="validationCustom03" required
                                    name="mota" value={mota} />  */}
                                    <textarea style={textAreaStyle } type="text" name="mota" value={mota}
                                    id="validationCustom07"
                                    onChange={(e) => {setMoTa(e.target.value)}}
                                    />
                                    
                                </div>
                                <div className="invalid-feedback">
                                Please provide a valid city.
                                </div>
                            </div>
                            
                            <div id="btn-formEdit">
                                <button type="submit" onClick={handleSubmit}>Edit </button>
                            </div>

                            
                        </form>
                    </div> 
                </div>
            </Modal>
        

        </div>
      </div>
   )
}

export default Vegetable