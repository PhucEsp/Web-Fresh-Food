import React, {useEffect, useState} from 'react'
import { connect } from 'react-redux'
import { fetchProducts } from '../../../actions/ProductActions'
import productsApi from '../../../api/ProductsApi';
import Footer from '../Footer/Footer';
import Header from '../Header/Header'
import HeaderCrumb from '../HeaderCrumb/HeaderCrumb';
import RenderListProducts from '../RenderListProducts/RenderListProducts';
import SendGmail from '../SendGmail/SendGmail';
import TitleProducts from '../TitleProducts/TitleProducts';
import './Detail.scss'

// meterial UI
import Rating from '@material-ui/lab/Rating';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import TextField from "@material-ui/core/TextField";
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import ModalProduct from '../ModalDetailProduct/ModalProduct';
import accountApi from '../../../api/AccountApi';
import cartApi from '../../../api/CartApi';

 //style UI
 const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: "70ch"
      }
    },
    button: {
        margin: theme.spacing(1),
    },
}));

function DetailProduct({match: {params: {ID}},productsData, fetchProducts}) {
    
    const [product, setProduct] = useState({})
    const [quanty, setQuanty] = useState(1);
    const [valueRating, setValueRating] = React.useState(0);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [detailProduct, setDetailProduct] = useState({});

    const [listCartRender, setListCartRender] = useState([]);
    const [infoUser, setInfoUser] = useState({})
    const [flag,setFlag] = useState(false)


    const classes = useStyles();
    const account = localStorage.getItem('account')

    useEffect(() => {
        fetchProducts();
       const fetchDetailProduct =  async () => {
            try {
                const response = await productsApi.detail(ID);
                setProduct(response);
            } catch (error) {
                alert(error.message);
            }
       }
       fetchDetailProduct();
       
    }, [])

    const acc = localStorage.getItem('account')
    useEffect( async() => {
            try {
                const respone = await accountApi.getUser(acc);
                setInfoUser(respone);
            } catch (error) {
                console.log(error.message)
            }
    }, [flag])

    useEffect(() => {
      const fetchListCart = async () => {
          try {
              const respone = await cartApi.getCartUser(infoUser.MAKH);
              setListCartRender(respone)
          } catch (error) {
                  console.log(error.message);
          }
      }
      fetchListCart()
    }, [flag])

    const changeFlag = () => {
        setFlag(!flag)
    }

    const setOpenModal = (product) => {
    setFlag(!flag)
    setDetailProduct({
      ID: product.ID,
      TENSP: product.TENSP,
      DONVITINH: product.DONVITINH,
      GIA: product.GIA,
      MOTA: product.MOTA,
      HINHANH: product.HINHANH,
      SOLUONG: 1,
        })
    }
    const handleChange = (e) => {
        setDetailProduct({
          ...detailProduct,
          SOLUONG: e.target.value,
        })
    }

    const newList = productsData.data.filter(val => val.MADM == 2);

    const handleChangeQuanty = (e) => {
        e.preventDefault();
        setQuanty(e.target.value)
    }

    const handleAddToCart = async (event) => {
        event.preventDefault();
        setFlag(!flag)
        const data = {
           MASP : product.ID,
           MAKH : infoUser.MAKH,
           SOLUONG : quanty,
        }
        try {
            cartApi.addToCart(data);
        } catch (error) {
            alert("Lỗi hệ thống. Vui lòng thử lại")
        }
      }
    return (
        <div className="detail-product">
           <Header listCartRender={listCartRender}></Header>
            <HeaderCrumb category = 'Chi Tiết Sản Phẩm' ></HeaderCrumb>
            <div className='product container'>
                    <div className="img-product">
                        <img src={product.HINHANH} />
                    </div>
                    <div className="content">
                        <div className="content-header">
                            <h4 className="modal-title">{product.TENSP}</h4>
                        </div>
                        {/* <br></br> */}
                        <div className="content-body">
                            <span className="id-product">ID: {product.ID}</span>
                            <span>{product.DONVITINH} <i class="fas fa-check-circle"></i></span>
                            <h5>Giá: {product.GIA} ₫</h5>
                            <div className="choise">
                                <div className="cre-number">
                                <input type="number" id="quantity" name="quantity" min="1" value = {quanty}
                                onChange={handleChangeQuanty}
                                ></input>
                                
                                </div>
                                <div className="add-to-card">
                                    <button onClick={handleAddToCart}>THÊM VÀO GIỎ</button>
                                </div>
                            </div>
                            <p>Mô tả: <span> {product.MOTA}</span> </p>
                        </div>
                    </div>
            </div>
            
            {/* đánh giá sản phẩm  */}
            <Box component="fieldset" mb={3} borderColor="transparent">
                <Typography component="legend">Đánh Giá</Typography>
                <Rating
                name="simple-controlled"
                value={valueRating}
                onChange={(event, newValue) => {
                    setValueRating(newValue);
                }}
                />
            </Box>
            
            <TitleProducts title="Best Seller" 
            description='Những sản phẩm bán chạy nhất' 
            ></TitleProducts>
            <RenderListProducts listProducts={newList} handleOnclick={setOpenModal}></RenderListProducts>

            <hr className="container"></hr>
            {/* bình luận sản phẩm */}
            <form className={classes.root} Validate autoComplete="off">
                <div className="container comment">
                    <TextField
                    id="outlined-multiline-static"
                    label="Bình Luận"
                    multiline
                    rows={6}
                    variant="outlined"
                    />
                </div>
                <div className="container comment">
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    endIcon={<Icon>send</Icon>}
                >
                    Gửi
                </Button>
                </div>
            </form>
            <SendGmail></SendGmail>
            <Footer ></Footer>
            <ModalProduct show={modalIsOpen} product={detailProduct} handleChange = {handleChange}   ></ModalProduct>
        </div>
    )
}

const mapStateToProps = state => {
    return  {
        productsData: state.products
    }
}

const mapDispatchToProps = dispatch => {
    return {
      fetchProducts: () => dispatch(fetchProducts())
    }
  }

  export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DetailProduct)
