import React, {useEffect, useState} from 'react'
import Header from '../Header/Header'
import HeaderCrumb from '../HeaderCrumb/HeaderCrumb'
import TitleProducts from '../TitleProducts/TitleProducts'
import RenderListProducts from '../RenderListProducts/RenderListProducts'
import ModalProduct from '../ModalDetailProduct/ModalProduct'
import SendGmail from '../SendGmail/SendGmail'
import Footer from '../Footer/Footer'

import productsApi from '../../../api/ProductsApi'
import accountApi from '../../../api/AccountApi'
import cartApi from '../../../api/CartApi'

function Healthy() {

    const [listProducts, setListProducts] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [detailProduct, setDetailProduct] = useState({});

    const [listCartRender, setListCartRender] = useState([]);
    const [infoUser, setInfoUser] = useState({})
    const [flag,setFlag] = useState(false)

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
    const newList = listProducts.filter(val => val.MADM == 4);

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
        <Header listCartRender={listCartRender}></Header>
        <HeaderCrumb category = 'Danh Mục' productName = 'Chăm Sóc Sức Khỏe'></HeaderCrumb>
        <div class="container-fluid mt-5">
            <img id="image" src="//theme.hstatic.net/200000240163/1000672133/14/collection_banner.jpg?v=426"/>
        </div>
        <TitleProducts  title='Chăm Sóc Sức Khỏe' 
        description='Mỗi ngày chúng tôi đều đưa đến cho bạn những sản phẩm tươi và sạch nhất' 
        ></TitleProducts>

        <RenderListProducts listProducts={newList} handleOnclick={setOpenModal}  ></RenderListProducts>
        <SendGmail></SendGmail>
        <Footer></Footer>

        <ModalProduct changeFlag={changeFlag} show={modalIsOpen} product={detailProduct} handleChange = {handleChange}   ></ModalProduct>
    </div>
    )
}

export default Healthy
