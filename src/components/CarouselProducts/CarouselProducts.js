import React from 'react'
import './CarouselProducts.scss'
function CarouselProducts({listProducts}) {
    return (
       <>
            <div class="col-sm-8">
                <div id="demo" class="carousel slide" data-ride="carousel">

                  <ul class="carousel-indicators">
                    <li data-target="#demo" data-slide-to="0" class="active"></li>
                    <li data-target="#demo" data-slide-to="1"></li>
                    <li data-target="#demo" data-slide-to="2"></li>
                  </ul>
                    <div class="carousel-item active">
                      <img src="//theme.hstatic.net/200000240163/1000672133/14/slideshow_1.jpg?v=409" alt="Los Angeles" style={{width:'100%'}}/>
                    </div>
                    <div class="carousel-item">
                      <img src="//theme.hstatic.net/200000240163/1000672133/14/slideshow_2.jpg?v=409" alt="Chicago" style={{width:'100%'}}/>
                    </div>
                    <div class="carousel-item">
                      <img src="//theme.hstatic.net/200000240163/1000672133/14/slideshow_3.jpg?v=409" alt="New York" style={{width:'100%'}}/>
                    </div>
                    <a class="carousel-control-prev" href="#demo" data-slide="prev">
                      <span class="carousel-control-prev-icon"></span>
                    </a>
                    <a class="carousel-control-next" href="#demo" data-slide="next">
                      <span class="carousel-control-next-icon"></span>
                    </a>
                </div>
              </div>
       </>
    )
}

export default CarouselProducts
