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
import NumberFormat from 'react-number-format';
import Alert from '@material-ui/lab/Alert';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Moment from 'react-moment';
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
    notifi: {
        margin: theme.spacing(2),
    },
    list: {
        maxWidth: 600,
        marginBottom: 55
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
    const [comment, setComment] = useState('')
    const [listCommentForProduct,setListCommentForProduct] = useState([])
    const [SuccesAddComment,setSuccesAddComment] = useState(false)


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
       
    }, [ ])

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
      
      const fetchListCommentForProduct = async () => {
            try {
                const respone = await productsApi.getListCommentForProduct(ID);
                setListCommentForProduct(respone)
            } catch (error) {
                    console.log(error.message);
            }
        }
        fetchListCart()
        fetchListCommentForProduct()

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
        const account = localStorage.getItem("account")
        if(account == null) return;
        else {
            const data = {
                MASP : product.ID,
                MAKH : infoUser.MAKH,
                SOLUONG : quanty,
            }
            try {
                cartApi.addToCart(data);
                setFlag(!flag)
     
            } catch (error) {
                alert("Lỗi hệ thống. Vui lòng thử lại")
            }
        }
      }

      const onSubmitComment = async (e) => {
        if(comment === "")
        {
          return
        }

        e.preventDefault()
        const today = new Date(),
        date = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate();
        const data = {
            MAKH: infoUser.MAKH,
            MASP: ID,
            NOIDUNG: comment,
            THOIGIAN: date
        }
        try {
            await productsApi.addCommentForProduct(data)
            await setSuccesAddComment(true)
            setTimeout(() => {
                setSuccesAddComment(false)
            }, 3000);
            setFlag(!flag)
            setComment("")
        } catch (error) {
            console.log(`error`, error.message)
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
                            <h5>Giá: <NumberFormat value={product.GIA} displayType={'text'} thousandSeparator={true} prefix={'vnđ  '} /></h5>
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
            <div className="container" style={{padding: 10}}>
                <Box component="fieldset" mb={6} borderColor="transparent" style={{textAlign: 'start'}}>
                    <Typography component="legend">Đánh Giá</Typography>
                    <Rating
                    name="simple-controlled"
                    value={valueRating}
                    onChange={(event, newValue) => {
                        setValueRating(newValue);
                    }}
                    />
                </Box>
            </div>
            <hr className="container"></hr>
            {/* bình luận sản phẩm */}
            <h2 style={{marginBottom : 40}}>Bình luận sản phẩm</h2>
            <form className={classes.root} Validate autoComplete="off" >
                <div className="container comment">
                    <TextField
                    id="outlined-multiline-static"
                    label="Bình Luận"
                    multiline
                    rows={6}
                    variant="outlined"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    />
                </div>
                <div className="container comment">
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    endIcon={<Icon>send</Icon>}
                    onClick={onSubmitComment}
                >
                    Gửi
                </Button>
                </div>
                <div className={classes.notifi, "container"}>
                   {
                       SuccesAddComment && 
                       <Alert severity="info">Thành công ! Nội dung không phù hợp sẽ bị xóa bỏ</Alert>
                   }
                </div>
            </form>

            {/* danh sách các bình luận */}

            <div className="container">
            <List className={classes.list}>
                { 
                    listCommentForProduct.length > 0 && 
                    listCommentForProduct.map(item => (
                    <>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                            <Avatar alt="Img" src="/static/images/avatar/1.jpg" />
                            </ListItemAvatar>
                            <ListItemText
                            primary={item.HOTEN}
                            secondary={
                                <React.Fragment>
                                <Typography
                                    component="span"
                                    variant="body2"
                                    className={classes.inline}
                                    color="textPrimary"
                                >
                                </Typography>
                                {` — ${item.NOIDUNG} `}
                                <Typography 
                                style={{marginTop: 10}}
                                variant="body2"
                                color="textPrimary"
                                ><Moment format="DD/MM/YYYY">
                                {item.THOIGIAN}
                                </Moment></Typography>
                                </React.Fragment>
                            }
                            />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                    </>
                    ))
                }
                
                
                </List>
            </div>
            
            <TitleProducts title="Best Seller" 
            description='Những sản phẩm bán chạy nhất' 
            ></TitleProducts>
            <RenderListProducts listProducts={newList} handleOnclick={setOpenModal}></RenderListProducts>
           
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
