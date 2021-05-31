import React, {useEffect, useState} from 'react'
import { connect } from 'react-redux'
import { createLogger } from 'redux-logger'
import { fetchProducts } from '../../../actions/ProductActions'
import accountApi from '../../../api/AccountApi'
import cartApi from '../../../api/CartApi'
import productsApi from '../../../api/ProductsApi'
import Banner from '../BannerHome/Banner'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import ModalProduct from '../ModalDetailProduct/ModalProduct'
import Carousel from '../OwlCarousel/Carousel'
import RenderListProducts from '../RenderListProducts/RenderListProducts'
import TitleProducts from '../TitleProducts/TitleProducts'
import VideoHome from '../VideoHome/VideoHome'
import Pagination from '../Pagination/Pagination'

import './Home.scss'

function Home({productsData, fetchProducts}) {

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [detailProduct, setDetailProduct] = useState({});

  const [listCartRender, setListCartRender] = useState([]);
  const [infoUser, setInfoUser] = useState({})
  const [flag,setFlag] = useState(false)

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);

    useEffect(() => {
        fetchProducts()
    }, [])

    const acc = localStorage.getItem('account')
    useEffect( async() => {
            try {
                const respone = await accountApi.getUser(acc);
                setInfoUser(respone);
                setFlag(!flag)
            } catch (error) {
                console.log(error.message)
            }
    }, [])

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

  const setOpenModal = (product) => {
    setFlag(!flag)
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
  const changeFlag = () => {
    setFlag(!flag)
}
  const handleChange = (e) => {
    setDetailProduct({
      ...detailProduct,
      SOLUONG: e.target.value,
    })
  }
  
  const listProducts = productsData.data.filter((val,index) =>
  { 
    if(index < 10) 
    return val.MADM == 2 
  })
  // get current page product
  const indexOfLastPost = currentPage * productsPerPage;
  const indexOfFirstPost = indexOfLastPost - productsPerPage;
  const currentProductPage = productsData.data.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = pageNumber => setCurrentPage(pageNumber);

    return (  
      productsData.loading ? (
        <h2>Loading...</h2>
      ) : productsData.error ? (
        <h2>{productsData.error}</h2>
      ) :

       ( <div>
          <Header listCartRender={listCartRender}></Header>
          <Carousel></Carousel>

          {/* list new Products */}
          <TitleProducts title='Rau Củ Quả Mới Nhập' 
          description='Mỗi ngày cửa hàng Suni Green Farm đều nhập rau củ quả hữu cơ sạch từ nông trại Đà Lạt.' 
          ></TitleProducts>
          <RenderListProducts listProducts={listProducts} handleOnclick={setOpenModal}  ></RenderListProducts>
          
          {/* list sale products */}
          <TitleProducts title='Sản phẩm' 
          description='Bão Sale Nhà Suni' 
          ></TitleProducts>
          <RenderListProducts listProducts={currentProductPage} handleOnclick={setOpenModal}  ></RenderListProducts>
          <Pagination
            productsPerPage={productsPerPage}
            totalProducts={productsData.data.length}
            paginate={paginate}
          />
          <Banner></Banner>

          {/* Modal detail product */}
          <ModalProduct changeFlag={changeFlag} show={modalIsOpen} product={detailProduct} handleChange = {handleChange}   ></ModalProduct>
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
