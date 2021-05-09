import React, {useState, useEffect} from 'react'
import './Renderform.scss'
import { Link, Redirect , useHistory} from 'react-router-dom'
import productsApi from '../../../api/ProductsApi';


// UI
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';

const BootstrapInput = withStyles((theme) => ({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #ced4da',
      fontSize: 16,
      padding: '10px 26px 10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        borderRadius: 4,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
  }))(InputBase);
  
  const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
  }));
  

function AddProduct() {

    // const [id, setID] = useState('');
    const [tensp, setTenSp] = useState('');
    const [loaisp, setLoaiSp] = useState('');
    const [gia, setGia] = useState(0);
    const [donvitinh, setDonViTinh] = useState('');
    const [soluong, setSoLuong] = useState(0);
    const [mota, setMoTa] = useState('');
    const [hinhanh,SetHinhAnh] = useState('');
    const [hinhanh1,SetHinhAnh1] = useState('');
    const [success, setSuccess] = useState(false)

    const history = useHistory();

    const [listProducts, setListProducts] = useState([]);

    const classes = useStyles();

    const textAreaStyle = {
        width: '100%',
        height: '100px',
    }

    useEffect(() => {
        const fetchProductsList = async () => {
            try {
                const responds = await productsApi.getAll();
                setListProducts(responds);
            } catch (error) {
                console.log(error.message)
            }
        }
        fetchProductsList();
    }, [])

    const checkIdProduct = () => {
        for(let i = 0; i < listProducts.length; i++) {
            if( tensp.trim() == listProducts[i].TENSP.trim()){
                alert('Tên sản phẩm đã tồn tại')
                return true;
            }
        }
        return false;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const product = {
            TENSP: tensp,
            MADM: loaisp,
            GIA: gia,
            GIAMGIA: 0,
            DONVITINH: donvitinh,
            SOLUONG: soluong,
            HINHANH: hinhanh,
            HINHANH1: hinhanh1,
            MOTA: mota,
        }
        if(gia === 0 || soluong === 0) {
            alert("Giá hoặc số lượng phải lớn hơn 0")
            return;
        }
        else if(checkIdProduct()){
            setSuccess(false)
            return;
        }
        else if(donvitinh === '') {
            alert('Vui lòng chọn đơn vị tính')
        }
        else if(loaisp === '') {
            alert('Vui lòng chọn loại sản phẩm')
        }
        else {
            try {
                productsApi.add(product);
                setSuccess(true);
            } catch (error) {
                console.log(error.message)
            }
        }


    }

    let acc = localStorage.getItem('token');
    if(acc === null) {
       return <Redirect to='/admin/dangnhap' ></Redirect>
    }

    if(success){
        return(
            <Redirect to='/admin'></Redirect>
        )
    }

    return (
      <div className='wrap-form'>
           <div className="form-control">
            <form className="form-add" onSubmit={handleSubmit}>

                {/* <div className="input-username wrap-input col-md-12" >
                    <label for="validationCustom03" className="form-label">Mã Sản Phẩm</label>
                    <div>
                        <input type="number" className="form-control" id="validationCustom03"
                         required
                        name="tensp"
                        value={id}
                        onChange={(e) => {setID(e.target.value)}} />
                    </div>
                    <div className="invalid-feedback">
                        Vui lòng điền thông tin
                    </div>        
                 </div> */}

                <div className="input-username wrap-input col-md-12" >
                    <label for="validationCustom03" className="form-label">Tên Sản Phẩm</label>
                    <div>
                        <input type="text" className="form-control" id="validationCustom03"
                         required
                        name="tensp"
                        value={tensp}
                        onChange={(e) => {setTenSp(e.target.value)}} />                         </div>
                    <div className="invalid-feedback">
                        Vui lòng điền thông tin
                    </div>        
                 </div>
                        <div className=" wrap-input" >
                            <div className="col-md-3">
                                <label for="validationCustom04" className="form-label">Loại Sản Phẩm</label>
                               <div>
                               <select className="form-select" id="validationCustom04" required  
                               value={loaisp}
                               onChange={(e) => {setLoaiSp(e.target.value)}}
                               >
                                <option value='1'>---</option>
                                <option value='1'>Trái Cây</option>
                                <option value='2'>Rau Củ Quả</option>
                                <option value='12'>Nấm Tươi</option>
                                <option value='4'>Thực Phẩm Sức Khỏe</option>
                                </select>
                               </div>
                               <div className="invalid-feedback">
                                    Vui lòng điền thông tin
                                </div>
                            </div>
                        </div>

                        <div className="merge-input col-md-12" >
                            <div className="wrap-input"  >
                                <label for="validationCustom03" className="form-label">Số Lượng</label>
                                <div>
                                    <input type="number" className="form-control" id="validationCustom03"
                                     required
                                    name="soluong" value={soluong}
                                    onChange={(e) => {setSoLuong(e.target.value)}} /> 
                                </div>
                                <div className="invalid-feedback">
                                    Vui lòng điền thông tin
                                </div>
                            </div>

                            <div className=" wrap-input" >
                                <label for="validationCustom02" className="form-label">Giá</label>
                                <div>
                                    <input type="number" className="form-control" id="validationCustom02"
                                    required
                                    name="gia" value={gia}
                                    onChange={(e) => {setGia(e.target.value)}} /> 
                                </div>
                                <div className="invalid-feedback">
                                    Vui lòng điền thông tin
                                </div>
                            </div>


                                <div className=" wrap-input" > 
                                <label for="validationCustom04" className="form-label">Đơn Vị Tính</label>
                               <div>
                               <select className="form-select" id="validationCustom04" required  
                               value={donvitinh}
                               onChange={(e) => {setDonViTinh(e.target.value)}}
                               >
                                <option value=''>---</option>
                                <option value='250g'>250g</option>
                                <option value='500g'>500g</option>
                                <option value='1kg'>1Kg</option>
                                <option value='Trái'>Trái</option>
                                <option value='Hủ'>Hủ</option>
                                </select>
                               </div>
                                <div className="invalid-feedback">
                                    Vui lòng điền thông tin
                                </div>
                            </div>
                        </div>
                        
                        <div className=" wrap-input col-md-12" >
                                <label for="validationCustom06" className="form-label">Hình Ảnh 1</label>
                                <div>
                                    <input type="text" className="form-control" id="validationCustom06" 
                                    required 
                                    value={hinhanh} name="donvitinh" 
                                    onChange={(e) => {SetHinhAnh(e.target.value)}}/> 
                                </div>
                                <div className="invalid-feedback">
                                Vui lòng điền thông tin
                                </div>    
                        </div>
                        <div className=" wrap-input col-md-12" >
                                <label for="validationCustom06" className="form-label">Hình Ảnh 2</label>
                                <div>
                                    <input type="text" className="form-control" id="validationCustom06" 
                                    required 
                                    value={hinhanh1} name="donvitinh" 
                                    onChange={(e) => {SetHinhAnh1(e.target.value)}}/> 
                                </div>
                                <div className="invalid-feedback">
                                Vui lòng điền thông tin
                                </div>    
                        </div>

                        <div className=" wrap-input col-md-12" >
                            <label for="validationCustom07" className="form-label">Mô Tả</label>
                            <div>
                                <textarea style={textAreaStyle } type="text" name="mota" 
                                value={mota}
                                id="validationCustom07"
                                onChange={(e) => {setMoTa(e.target.value)}}
                                />
                                
                            </div>
                            <div className="invalid-feedback">
                            Vui lòng điền thông tin
                            </div>
                        </div>
                        
                        <div id="btn-formEdit">
                            <button type="submit" >Add</button>
                        </div>    

                        {/* <FormControl className={classes.margin}>
        <InputLabel htmlFor="demo-customized-textbox">Age</InputLabel>
        <BootstrapInput id="demo-customized-textbox" />
      </FormControl>     */}
                             
            </form>
       </div>
    
      </div>
    )
}

export default AddProduct
