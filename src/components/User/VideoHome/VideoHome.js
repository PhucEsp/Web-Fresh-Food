import React from 'react'
import './VideoHome.scss'
function VideoHome() {
    return (
        <div class="video-home container mt-5">
          <div class="row">
            <div class="col-sm-6 send_email">
              <h3> Đăng kí nhận tin</h3>
              <p> Đăng ký Email để theo dõi những sản phẩm được giảm giá của chúng tôi</p>
              <div class="form_DK">
                <div>
                <input type="text" placeholder="Nhập email của bạn"/>
                </div>
                <button id="btn-subcribe" type="button" class="btn btn-outline-success">Gửi</button>
              </div>
            </div>
    
            <div class="col-sm-6 video">
              <iframe width="560" height="315" src="https://www.youtube.com/embed/8lDsGvTV5RI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
          </div>
        </div>
    )
}

export default VideoHome
