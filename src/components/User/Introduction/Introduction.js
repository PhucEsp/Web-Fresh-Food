import React from 'react'
import Header from '../Header/Header'
import HeaderCrumb from '../HeaderCrumb/HeaderCrumb'
import TitleProducts from '../TitleProducts/TitleProducts'

function Introduction() {
    return (
        <div className='Introduction'>
            <Header></Header>
            <HeaderCrumb category='Giới thiệu'></HeaderCrumb>
            <TitleProducts title='GIỚI THIỆU' ></TitleProducts>

            <div className="intro-content container">
            <div class="row">
                <div class="col-sm-9 mt-4 ">
                    <p>
                        <strong>
                            PREMIUM QUALITY
                            <br></br>
                            HEALTHY.NUTURAL.FRESH
                        </strong>
                    </p>
                    <p>
                        <strong>Suni green farm</strong>
                        được thành lập với phương châm đặt sức khoẻ của người tiêu dùng lên hàng đầu. 
                        <br></br>
                        Chúng tôi cam kết luôn phân phối những loại rau củ quả, trái cây chất lượng, dinh dưỡng và an toàn vệ sinh thực phẩm.
                    </p>
                    <p>
                        Cửa hàng nông sản an toàn tại Thành Phố Hồ Chí Minh, luôn mong muốn đem đến cho các quý khách một trải nghiệm sản phẩm hoàn toàn an toàn từ các phương pháp nuôi trồng hữu cơ thuận tự nhiên từ khâu xử lý đất tại vùng trồng, xử lý nguồn nước tưới, chọn những giống rau củ quả ngon nhất trên thị trường để khai thác. Ngoài ra trồng trọt nông nghiệp nói chung và trồng rau củ quả nói riêng đều phải gặp các vấn đề khó khăn về cách xử lý dịch bệnh và sâu bọ đó cũng là một vấn đề cực kì khó khi duy trì tiêu chuẩn hữu cơ thông qua các phương pháp pha chế thuốc xử lý từ nguyên vật liệu thiên nhiên như tỏi, ớt ......
                    </p>
                    <p>
                        Nhìn nhận khách hàng là giá trị thiết yếu để tạo nên thành công – 
                        <strong>Suni green farm</strong>
                        trân trọng ghi nhận những phản hồi về sản phẩm cũng như cách phục vụ.
                    </p>
                    <p>
                        Khách hàng sử dụng những sản phẩm rau củ quả của cửa hàng để mang về chế biến cho gia đình và những người thân yêu thưởng thức. 
                        <strong>Suni Green Farm</strong>
                        tin chắc rằng nông sản an toàn luôn là đem đến cảm giác hài lòng từ hình thức bên ngoài, mùi hương đậm đà và vị ngọt tự nhiên bên trong của các dòng sản phẩm thuần thiên nhiên
                    </p>
                    <p>
                        Từ đó chăm sóc và hiểu hơn khách hàng, hướng đến mục tiêu trở thành nhà cung cấp thực phẩm đáng tin cận hàng đầu trong lòng người tiêu dùng.
                    </p>
                    <p>
                        Để tạo nên sự tin dùng của khách hàng, 
                        <strong>Suni green farm </strong>
                        xây dựng văn hoá cửa hàng dựa trên sự trung thực, tôn trọng với tính chuyên nghiệp và đạo đức cao.
                    </p>
                    <p>
                        Chất lượng sản phẩm và giá cả phải chăng chính là lợi thế cạnh tranh làm nên nền tảng cho sự phát triển, uy tín của thương hiệu 
                        <strong>Suni green farm</strong>
                        ngày một hoàn thiện.
                    </p>
                </div>

                <div class="col-sm-3 mt-4">
                    <div class="danh_muc">
                        <h2>DANH MỤC TRANG</h2>
                        <hr  width="100%" size="5px" color="#BED747 !important" />
                        <ul>
                            <li><a href="introduce.html">Giới thiệu</a></li>
                            <li><a href="chinh_sachDT.html">Chính sách đổi trả</a></li>
                            <li><a href="chinhSachBM.html">Chính sách bảo mật</a></li>
                            <li><a href="DieuKhoanDV.html">Điều khoản dịch vụ</a></li>
                        </ul>
                    </div>

                    <div class="hinh_sp">
                        <a href="list_product.html">
                            <img src="https://theme.hstatic.net/200000240163/1000672133/14/page_banner.jpg?v=405" alt="List product" />
                        </a>
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}

export default Introduction
