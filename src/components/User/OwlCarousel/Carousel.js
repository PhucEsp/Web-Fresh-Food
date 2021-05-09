import React from 'react'

function Carousel() {
    return (
        <div class="container">
            <div class="row heigh-row">
              <div class="col-sm-8">
                <div id="demo" class="carousel slide" data-ride="carousel">

                  <ul class="carousel-indicators">
                    <li data-target="#demo" data-slide-to="0" class="active"></li>
                    <li data-target="#demo" data-slide-to="1"></li>
                    <li data-target="#demo" data-slide-to="2"></li>
                  </ul>

                  <div class="carousel-inner">
                    <div class="carousel-item active">
                      <img src="//theme.hstatic.net/200000240163/1000672133/14/slideshow_1.jpg?v=409" alt="Los Angeles" style={{width:'100%'}}/>
                    </div>
                    <div class="carousel-item">
                      <img src="//theme.hstatic.net/200000240163/1000672133/14/slideshow_2.jpg?v=409" alt="Chicago" style={{width:'100%'}}/>
                    </div>
                    <div class="carousel-item">
                      <img src="//theme.hstatic.net/200000240163/1000672133/14/slideshow_3.jpg?v=409" alt="New York" style={{width:'100%'}}/>
                    </div>
                  </div>


                    <a class="carousel-control-prev" href="#demo" data-slide="prev">
                      <span class="carousel-control-prev-icon"></span>
                    </a>
                    <a class="carousel-control-next" href="#demo" data-slide="next">
                      <span class="carousel-control-next-icon"></span>
                    </a>
                </div>
              </div>

              <div class="col-sm-4">
                <div class="list_news">
                  <div class="khoi">
                    <div class="card mb-3">
                      <div class="row g-0">
                        <div class="col-md-4">
                          <a href="blog.html">
                            <img class="img-thumbnail" src="https://file.hstatic.net/200000240163/article/z2356601672618_6df9622ae67c94fc57ec0407f83bcbef_50e55bd305e04ae6a3818fbbe1b733c0.jpg"/>
                          </a>
                        </div>
                        <div class="col-md-8">
                          <div class="card-body news">
                            <a href="blog.html"><h5 class="card-title">NHỮNG TÁC DỤNG DIỆU KỲ KHI UỐNG CHANH MẬT ONG MỖI BUỔI SÁNG</h5></a>
                            <p class="card-text">Uống nước chanh mật ong vào buổi sáng là một....</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="khoi">
                    <div class="card mb-3">
                      <div class="row g-0">
                        <div class="col-md-4 ">
                          <a href="blog.html">
                            <img class="img-thumbnail" src="https://file.hstatic.net/200000240163/article/736c11ab8214724a2b05_0a7f1a53b0a0401aafaa200b9d903b01.jpg"/>
                          </a>
                        </div>
                        <div class="col-md-8">
                          <div class="card-body news">
                            <a href="blog.html"><h5 class="card-title">CÁC HOẠT ĐỘNG TRUYỀN THỐNG DÂN GIAN NGÀY TẾT CỔ TRUYỀN VIỆT NAM</h5></a>
                            <p class="card-text">Tết cổ truyền Việt Nam đa sắc màu với nhiều...</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>  
        
                  <div class="khoi">
                    <div class="card mb-3">
                      <div class="row g-0">
                        <div class="col-md-4">
                          <a class="" href="blog.html">
                            <img class="img-thumbnail" src="https://file.hstatic.net/200000240163/article/eadaf4a5c91739496006_1b4726d02fb74922b5a3e504a598a21d.jpg"/>
                          </a>
                        </div>
                        <div class="col-md-8">
                          <div class="card-body news">
                            <a href="blog.html"><h5 class="card-title">6 LOẠI BÁNH TRUYỀN THỐNG NGÀY TẾT</h5></a>
                            <p class="card-text">Mỗi độ Tết đến xuân về, phong tục gói bánh...</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
  </div> 
    )
}

export default Carousel
