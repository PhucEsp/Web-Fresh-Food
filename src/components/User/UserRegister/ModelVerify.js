import React,  { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import TextField from '@material-ui/core/TextField';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import axios from "axios";


function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 550,
    backgroundColor: theme.palette.background.paper,
    // border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  root: {
    '& > *': {
    //   margin: theme.spacing(1),
      width: '50ch',
    },
  },
  iconDelete: {
      fontWeight: 500,
      cursor: "pointer",
      marginBottom: 25
  },
  modalTitle: {
    marginBottom: 25 
  },
  button: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 10
  },
  error: {
      color: "red",
      marginTop: 20
  }
}));

export default function ModelVerify({isOpenModel,handleCloseModel, data, setFlag}) {
    const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const [code, setCode]= useState('')
    const [error, setError] = useState(false)
    

    const handleVerify = (e) => {
        e.preventDefault();
        const userInfo = {...data, CODE: code}
        try {
            const url = 'http://localhost:8081/taikhoan/xacthuc';
            axios.post(url,userInfo)
            .then(res => {
                console.log(`res`, res)
                if(res.data.success === false){
                    setError(true)
                }
                else {
                    setError(false)
                    handleCloseModel()
                    alert("Tạo Tài Khoản Thành Công")
                    
                }
            })
        } catch (error) {
            alert("Hệ thống lỗi. Vui lòng thử lại")
        }
    }

    return (
        <div>
        <Modal
            open={isOpenModel}
            // onClose={handleCloseModel}
            disableEnforceFocus={true}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            <div style={modalStyle} className={classes.paper}>
                <div>
                <CloseIcon className={classes.iconDelete}
                onClick={handleCloseModel}
                />
                
                </div>
                
                <p className={classes.modalTitle}>Mã xác thực đã được đến Email của bạn. Vui lòng kiểm tra Email</p>
                <div>
                    <form className={classes.root} noValidate autoComplete="off">
                        <TextField 
                        variant="outlined" 
                        id="standard-basic" 
                        label="Mã xác thực" 
                        onChange={(e) => setCode(e.target.value)}
                        />
                        
                    </form>
                    {
                        error && 
                        (
                            <p className={classes.error}>
                                <ErrorOutlineIcon/> Mã xác thực không chính xác
                            </p>
                        )
                    }
                    
                   <div className={classes.button}>
                    <Button 
                        color="primary" 
                        // variant="outlined"
                        onClick={handleVerify}
                    >Xác nhận</Button>
                    
                   </div>
                </div>
                
            </div>
        </Modal>
        </div>
    );
}

