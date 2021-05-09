import React, {useEffect, useState} from 'react'
import { connect } from 'react-redux'
import { fetchProducts } from '../../../actions/ProductActions'
import productsApi from '../../../api/ProductsApi'
import './collection.scss'
import Header from '../Header/Header'
import HeaderCrumb from '../HeaderCrumb/HeaderCrumb'
import TitleProducts from '../TitleProducts/TitleProducts'
import RenderListProducts from '../RenderListProducts/RenderListProducts'
import ModalProduct from '../ModalDetailProduct/ModalProduct'
import SendGmail from '../SendGmail/SendGmail'
import Footer from '../Footer/Footer'
import cartApi from '../../../api/CartApi'
import accountApi from '../../../api/AccountApi'



function Collections({productsData, fetchProducts}) {

    const [listProducts, setListProducts] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [detailProduct, setDetailProduct] = useState({});
    const [listCartRender, setListCartRender] = useState([]);
    const [infoUser, setInfoUser] = useState({})
    const [flag,setFlag] = useState(false)

    //  ============= Fetch api cách 1 =============
    // useEffect(() => {
    //     const fetchProductsList = async () => {
    //         try {
    //             const responds = await productsApi.getAll();
    //             setListProducts(responds);
    //         } catch (error) {
    //             console.log(error.message)
    //         }
    //     }
    //     fetchProductsList();
    //  }, [])
    
    // fetch list Products using Action Creator 'fetchProducts'
    useEffect(() => {
      fetchProducts();
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
              setFlag(!flag)
          } catch (error) {
                  console.log(error.message);
          }
      }
      fetchListCart()
    }, [flag])

    const newList = productsData.data.filter(val => val.MADM == 2);
    // const newList = list.filter(val => val.MADM != 2)

    const setCloseModal = () => {
        setModalIsOpen(false);
    }

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
    return (
        <div className="collections">
            <Header listCartRender={listCartRender} ></Header>
            <HeaderCrumb category = 'Danh Mục' productName = 'Rau Củ Quả Tươi'></HeaderCrumb>
            <div class="container-fluid mt-5">
                <img id="image" src="//theme.hstatic.net/200000240163/1000672133/14/collection_banner.jpg?v=426"/>
            </div>
            <TitleProducts  title='Rau Củ Quả Tươi' 
            description='Mỗi ngày chúng tôi đều đưa đến cho bạn những sản phẩm tươi và sạch nhất' 
            ></TitleProducts>

            <RenderListProducts listProducts={newList} handleOnclick={setOpenModal}  ></RenderListProducts>
            <SendGmail></SendGmail>
            <Footer></Footer>

            <ModalProduct changeFlag={changeFlag} show={modalIsOpen} product={detailProduct} handleChange = {handleChange}   ></ModalProduct>
        </div>
    )
}

const mapStateToProps = state => {
  return {
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
  )(Collections)
