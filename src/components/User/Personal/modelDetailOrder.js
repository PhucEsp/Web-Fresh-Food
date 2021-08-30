import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import "./modelDetailOrder.scss"
import NumberFormat from 'react-number-format'

const useStyles = makeStyles((theme) => ({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      width: "60%",
      height: "80%",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      overflow: "scroll",
    },
  }));

export default function ModelDetailOrder({handleCloseModel,openModel, listDetailOrder}) {
    const classes = useStyles();
    const infoUser = {...listDetailOrder[0]}
    return (
        <div>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={openModel}
            onClose={handleCloseModel}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500
            }}
          >
            <Fade in={openModel}>
              <>
                <div className={classes.paper}>
                    <div className="Order-detail">
                        <div className="title-order-detail">
                            <h3>Chi tiết đơn hàng #123: <b>Suni đã tiếp nhận đơn hàng</b></h3>
                        </div>
                        <div className="order-CustomerInfo">
                            <div clasaName="address">
                                <h5>Thông tin khách hàng</h5>
                                <p>Họ Tên: {infoUser.HOTEN}</p>
                                <p>SĐT: {infoUser.SDT}</p>
                                <p>Địa Chỉ: {infoUser.DIACHI}</p>
                            </div>
                        </div>
                        <div className="order-items">
                            <table>
                                <thead>
                                    <tr>
                                        <th style={{width:"40%"}}>Sản Phẩm</th>
                                        <th style={{width:200}}>Giá</th>
                                        <th style={{width:200}}>Số lượng</th>
                                        <th style={{width:200}}>Tạm tính</th>
                                    </tr>
                                </thead>
                                <tbody style={{overflow:"scroll"}, {height:200}}>
                                    {
                                        listDetailOrder.length > 0 && listDetailOrder.map(val => (
                                            <>
                                                <tr>
                                                    <th>
                                                        <div className="detail-product">
                                                            <h6>{val.TENSP}</h6>
                                                            <div className="product-img">
                                                                <img src={val.HINHANH}></img>
                                                            </div>
                                                        </div>
                                                    </th>
                                                    <th>
                                                        <NumberFormat value=
                                                        {val.GIA } displayType={'text'} thousandSeparator={true} prefix={'vnđ '} /></th>
                                                    <th>{val.SOLUONG}</th>
                                                    <th>
                                                        <NumberFormat value=
                                                        {val.GIA * val.SOLUONG} displayType={'text'} thousandSeparator={true} prefix={'vnđ '} /></th>
                                                </tr>
                                                <hr style={{width:"100%"}}></hr>
                                            </>
                                        ))
                                    }
                                </tbody>
                            </table>
                            <div className="order-item">

                            </div>
                        </div>
                    </div>
    
                 
                </div>
              </>
            </Fade>
          </Modal>
        </div>
      );
}