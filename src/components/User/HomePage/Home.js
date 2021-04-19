import React, {useEffect, useState} from 'react'
import { connect } from 'react-redux'
import { createLogger } from 'redux-logger'
import { fetchProducts } from '../../../actions/ProductActions'
import productsApi from '../../../api/ProductsApi'
import Banner from '../BannerHome/Banner'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import ModalProduct from '../ModalDetailProduct/ModalProduct'
import Carousel from '../OwlCarousel/Carousel'
import RenderListProducts from '../RenderListProducts/RenderListProducts'
import TitleProducts from '../TitleProducts/TitleProducts'
import VideoHome from '../VideoHome/VideoHome'


import './Home.scss'

function Home({productsData, fetchProducts}) {

  // const [listProducts, setListProducts] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [detailProduct, setDetailProduct] = useState({});

//   useEffect(() => {
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
        fetchProducts()
    }, [])

    const listProducts = productsData.data.filter(val => val.MADM == 2)
    // setListProducts(productsData);
    // console.log('data ne ',productsData)
    

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
  const setCloseModal = () => {
    setModalIsOpen(false);
  }

  const handleChange = (e) => {
    setDetailProduct({
      ...detailProduct,
      SOLUONG: e.target.value,
    })
  }

    return (
      productsData.loading ? (
        <h2>Loading...</h2>
      ) : productsData.error ? (
        <h2>{productsData.error}</h2>
      ) :

       ( <div>
          <Header></Header>
          <Carousel></Carousel>

          {/* list new Products */}
          <TitleProducts title='Rau Củ Quả Mới Nhập' 
          description='Mỗi ngày cửa hàng Suni Green Farm đều nhập rau củ quả hữu cơ sạch từ nông trại Đà Lạt.' 
          ></TitleProducts>
          <RenderListProducts listProducts={listProducts} handleOnclick={setOpenModal}  ></RenderListProducts>
          
          {/* list sale products */}
          <TitleProducts title='Sản phẩm khuyến mãi' 
          description='Bão Sale Nhà Suni' 
          ></TitleProducts>
          <RenderListProducts listProducts={productsData.data} handleOnclick={setOpenModal}  ></RenderListProducts>

          <Banner></Banner>

          {/* Modal detail product */}
          <ModalProduct show={modalIsOpen} product={detailProduct} handleChange = {handleChange}   ></ModalProduct>
          <VideoHome></VideoHome>
          <Footer> </Footer>
        </div> )
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
)(Home)
