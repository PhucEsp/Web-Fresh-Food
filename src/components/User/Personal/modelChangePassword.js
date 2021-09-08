import React, {useState, useEffect} from "react";

import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import axios from "axios";
import accountApi from "../../../api/AccountApi";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    // border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(2),
      width: '50ch',
    },
  },
  wrapButton: {
    display: "flex", 
    justifyContent: "center"
  },
  button: {
    padding:"10px 20px",
    fontSize: 18,
    margin: "10px 0px 20px 0px",
    border: "none",
    borderRadius: 5,
    color: "white", 
    background: "#0000b3", 
    fontWeight: 500
  },
  title: {
    textAlign: "center",
  }, 
  alert: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));


function ModelChangePassword({open, handleClose}) {
  const classes = useStyles();
  const [errorConfirmPass, setErrorConfirmPass] = useState(false)
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [message, setMessage] = useState("")
  const [errorSystem, setErrorSystem] = useState(false)
  const [success, setSuccess] = useState(false)
  const [messageSuccess, setMessageSucces] = useState("")
  const account = localStorage.getItem('account')

  const resetForm = () => {
    setOldPassword("")
    setNewPassword("")
    setConfirmPassword("")
    setMessage("")
    setErrorSystem(false)
    setErrorConfirmPass(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrorConfirmPass(false)
    setSuccess(false)
    setErrorSystem(false)
    if(newPassword !== confirmPassword){
      setErrorConfirmPass(true)
    }
    else {
      const data = {
        TAIKHOAN: account,
        MATKHAU: oldPassword,
        MATKHAUMOI: newPassword
      }
      console.log(`data`, data)
      const url = "http://localhost:8081/dangnhap/doimatkhau"
      try {
        axios.post(url,data)
          .then(res => {
            if(res.data.success === false){
              setErrorSystem(true)
              const message = res.data.message
              setMessage(message)
            }
            else {
              resetForm()
              setMessageSucces(res.data.message)
              setSuccess(true)
            }
          })
      } catch (error) {
          alert('Đăng kí thất bại ' + error.message);
      }
    }
  }

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 className={classes.title} id="transition-modal-title">Đổi mật khẩu</h2>
            <form className={classes.form} onSubmit={handleSubmit}>
                <div className={classes.root}>
                    <TextField 
                    id="outlined-basic"
                    label="Mật khẩu cũ" 
                    variant="outlined" type="password"
                    required={true}
                    value={oldPassword}
                    onChange={e => setOldPassword(e.target.value)}
                    />
                </div>
                <div className={classes.root}>
                    <TextField 
                    id="outlined-basic" 
                    label="Mật khẩu mới" 
                    variant="outlined" 
                    type="password" 
                    required={true}
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    />
                </div>
                <div className={classes.root}>
                    <TextField 
                    id="outlined-basic"
                    label="Xác nhận mật khẩu" 
                    variant="outlined" 
                    type="password" 
                    error = {errorConfirmPass}
                    required={true}
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    />
                </div>
                <div className={classes.wrapButton}>
                  <button className={classes.button}>Đổi mật khẩu</button>
                </div>
                {
                  errorSystem && (
                    <div className={classes.root}>
                      <Alert  variant="outlined" severity="error">
                        {message}
                      </Alert> 
                    </div>
                  )
                }
                {
                  success && (
                    <div className={classes.root}>
                      <Alert  variant="outlined" severity="success">
                        {messageSuccess}
                      </Alert> 
                    </div>
                  )
                }
                
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default ModelChangePassword
