import React, {useEffect, useState} from 'react'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import HeaderCrumb from '../HeaderCrumb/HeaderCrumb'
import cartApi from '../../../api/CartApi'
import accountApi from '../../../api/AccountApi'
function BlogPage() {

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

    return (
        <div>
            <Header listCartRender={listCartRender}></Header>
            <HeaderCrumb category = 'Blogs' ></HeaderCrumb>
            <Footer></Footer>
        </div>
    )
}

export default BlogPage
