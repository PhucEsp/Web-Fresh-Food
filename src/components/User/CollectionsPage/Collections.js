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



function Collections({productsData, fetchProducts}) {

    const [listProducts, setListProducts] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [detailProduct, setDetailProduct] = useState({});

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

    const newList = productsData.data.filter(val => val.MADM == 2);
    // const newList = list.filter(val => val.MADM != 2)

    const setCloseModal = () => {
        setModalIsOpen(false);
      }
    const setOpenModal = (product) => {
    setDetailProduct({
      ID: product.ID,
      TENSP: product.TENSP,
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
            <Header ></Header>
            <HeaderCrumb category = 'Danh Mục' productName = 'Rau Củ Quả Tươi'></HeaderCrumb>
            <TitleProducts  title='Rau Củ Quả Tươi' 
            description='Mỗi ngày chúng tôi đều đưa đến cho bạn những sản phẩm tươi và sạch nhất' 
            ></TitleProducts>

            <RenderListProducts listProducts={newList} handleOnclick={setOpenModal}  ></RenderListProducts>
            <SendGmail></SendGmail>
            <Footer></Footer>

            <ModalProduct show={modalIsOpen} product={detailProduct} handleChange = {handleChange}   ></ModalProduct>
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
