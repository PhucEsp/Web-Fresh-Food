import React, {useEffect, useState} from 'react'
import Header from '../Header/Header'
import HeaderCrumb from '../HeaderCrumb/HeaderCrumb'
import TitleProducts from '../TitleProducts/TitleProducts'
import RenderListProducts from '../RenderListProducts/RenderListProducts'
import ModalProduct from '../ModalDetailProduct/ModalProduct'
import SendGmail from '../SendGmail/SendGmail'
import Footer from '../Footer/Footer'
import Pagination from '../Pagination/Pagination'

import productsApi from '../../../api/ProductsApi'
import cartApi from '../../../api/CartApi'
import accountApi from '../../../api/AccountApi'

function Mushroom() {

    const [listProducts, setListProducts] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [detailProduct, setDetailProduct] = useState({});
    
    const [listCartRender, setListCartRender] = useState([]);
    const [infoUser, setInfoUser] = useState({})
    const [flag,setFlag] = useState(false)

    // pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(10);


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
     
    const setCloseModal = () => {
        setModalIsOpen(false);
    }
    const changeFlag = () => {
        setFlag(!flag)
    }

    const setOpenModal = (product) => {

    setDetailProduct({
      ID: product.ID,
      TENSP: product.TENSP,
      DONVITINH: product.DONVITINH,
      GIA: product.GIA,
      MOTA: product.MOTA,
      HINHANH: product.HINHANH,
      SOLUONG: 1,
      TONGSOLUONG: product.SOLUONG
        })
    }
    const handleChange = (e) => {
        setDetailProduct({
          ...detailProduct,
          SOLUONG: e.target.value,
        })
    }

    const newList = listProducts.filter(val => val.MADM == 3);
    const indexOfLastPost = currentPage * productsPerPage;
    const indexOfFirstPost = indexOfLastPost - productsPerPage;
    const currentProductPage = newList.slice(indexOfFirstPost, indexOfLastPost);
    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div className="collections">
        <Header listCartRender={listCartRender}></Header>
        <HeaderCrumb category = 'Danh Mục' productName = 'Nấm Tươi'></HeaderCrumb>
        <div class="container-fluid mt-5">
            <img id="image" src="//theme.hstatic.net/200000240163/1000672133/14/collection_banner.jpg?v=426"/>
        </div>
        <TitleProducts  title='Nấm Tươi' 
        description='Mỗi ngày chúng tôi đều đưa đến cho bạn những sản phẩm tươi và sạch nhất' 
        ></TitleProducts>

        <RenderListProducts listProducts={newList} handleOnclick={setOpenModal}  ></RenderListProducts>
        <Pagination
            productsPerPage={productsPerPage}
            totalProducts={newList.length}
            paginate={paginate}
        />
        <SendGmail></SendGmail>
        <Footer></Footer>

        <ModalProduct changeFlag={changeFlag} show={modalIsOpen} product={detailProduct} handleChange = {handleChange} changeFlag={changeFlag}   ></ModalProduct>
    </div>
    )
}

export default Mushroom
