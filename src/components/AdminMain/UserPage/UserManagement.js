import React, { useState, useEffect } from 'react'
import { withStyles, makeStyles } from "@material-ui/core/styles";
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

// dialog UI
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import { useTheme } from "@material-ui/core/styles";

import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Select from "@material-ui/core/Select";
import { columnAdmin, columnsUser } from '../../../common/ColumnType';
import { Button, DialogContentText, Slide } from '@material-ui/core';
import TableProducts from '../../admin/Table/TableProducts';
import productsApi from '../../../api/ProductsApi';
import accountApi from '../../../api/AccountApi';
import TableUser from '../../admin/Table/TableUser';
import loginAdminApi from '../../../api/LoginAdminApi';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`scrollable-auto-tabpanel-${index}`}
        aria-labelledby={`scrollable-auto-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
}

function a11yProps(index) {
    return {
      id: `scrollable-auto-tab-${index}`,
      "aria-controls": `scrollable-auto-tabpanel-${index}`
    };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  table: {
      minWidth: 700
  },
  dialog: {
    "& > *": {
      margin: theme.spacing(1),
      width: "100%"
    },
  },
  appBar: {
    position: "relative"
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
    color: "white",
  },
}));

// table 
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const StyleSelect = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(Select);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover
    }
  }
}))(TableRow);

function createData( id, name, price, dvt, quanty,des) {
  return { id, name, price, dvt, quanty,des};
}

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;
  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
    />
  );
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});





// amin 
function UserManagement() {
    const classes = useStyles();
    const [value, setValue] = useState(0);
    const [flag, setFlag] = useState(false);
    const columnsAdmin = columnAdmin

    const [listUser, setListUser] = useState([]);
    const [listStaff, setListStaff] = useState([])
    const [listAdmin, setListAdmim] = useState([])
  
     // set thong tin san pham -> edit 
     const [MANV, setMANV] = useState('');
     const [MAKH, setMAKH] = useState('');
     const [HOTEN, setHOTEN] = useState('');
     const [DIACHI, setDIACHI] = useState('');
     const [TAIKHOAN, setTAIKHOAN] = useState(0);
     const [SDT, setSDT] = useState('');
     const [MAIL, SETMAIL] = useState(0);

     const [open, setOpen] = React.useState(false);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        const fetchListUser = async () => {
            try {
                 const responds = await accountApi.getAccountKhachHang()
                 setListUser(responds);
                
            } catch (error) {
                console.log(error.message)
            }
        }
        fetchListUser();
     },[flag])

     useEffect(() => {
        const fetchListAdmin = async () => {
            try {
                 const responds = await accountApi.getAccountAdmin()
                 setListAdmim(responds);
                
            } catch (error) {
                console.log(error.message)
            }
        }
        fetchListAdmin();
     },[flag])

     useEffect(() => {
        const fetchListStaff = async () => {
            try {
                 const responds = await accountApi.getAccountNhanVien()
                 setListStaff(responds);
                
            } catch (error) {
                console.log(error.message)
            }
        }
        fetchListStaff();
     },[flag])

     const handleClose = () => {
        setOpen(false)
      };

     const handleEdit = (user) => {
        setOpen(true);
      
    }

    const handleDelete = (TAIKHOAN) => {
        let agree = window.confirm(` Bạn có chắc chắn muốn xóa tài khoản?` );
        if(!agree) return;
        else {
            try {
                accountApi.deleteNhanVien(TAIKHOAN);
                loginAdminApi.delete(TAIKHOAN);
                setFlag(!flag);
            } catch (e) {
                alert(`${e.message}`)
            }
        }
      }

      const handleSubmit = (e) => {
          e.preventDefault();
          console.log('submit')
      }
    return (
        <div className="namagement-user">
            <div className={classes.root}>
                <AppBar position="relative" color="default">
                    <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                    >
                    <Tab label="Khách Hàng" {...a11yProps(0)} />
                    <Tab label="Quản Lí" {...a11yProps(1)} />
                    <Tab label="Admin" {...a11yProps(2)} />
                    {/* <Tab label="Chăm Sóc Sức Khỏe" {...a11yProps(3)} /> */}
                    </Tabs>
                </AppBar>
                <TabPanel value={value} index={0}>
                    <Typography variant="h1" component="h2">
                        <TableUser columns={columnsUser} rows={listUser} handleEdit={handleEdit} handleDelete={handleDelete} ></TableUser>
                    </Typography>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <TableUser columns={columnsAdmin} rows={listStaff} handleEdit={handleEdit} handleDelete={handleDelete} ></TableUser>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <TableUser columns={columnsAdmin} rows={listAdmin} handleEdit={handleEdit} handleDelete={handleDelete} ></TableUser>
                </TabPanel>
            </div>

        {/* dialog */}
        <Dialog
              fullScreen
              open={open}
              onClose={handleClose}
              TransitionComponent={Transition}
            >
              <AppBar className={classes.appBar}>
                <Toolbar>
                  <IconButton
                    edge="start"
                    color="inherit"
                    onClick={handleClose}
                    aria-label="close"
                  >
                    <CloseIcon />
                  </IconButton>
                  <Typography variant="h6" className={classes.title}>
                    Thoát
                  </Typography>
                  <Button autoFocus color="inherit" onClick={handleSubmit}>
                    Lưu
                  </Button>
                </Toolbar>
              </AppBar>
              <div className="wrap-form--dialog">
                <div style={{ width: "600px"}}>
                <h1 className="dialog-title" style={{textAlign:'center', margin:'0px 0px 20px 0px', fontWeight: '600'}}>Chỉnh Sửa</h1>
                <form className={classes.dialog} Validate  autoComplete="off" onSubmit={handleClose}>
                  <TextField
                    className={classes.Input}
                    id="outlined-basic"
                    label="Tên Sản Phẩm"
                    variant="outlined"
                    required
                    value={HOTEN}
                    onChange={(e) => {setHOTEN(e.target.value)}}
                  />
                  <TextField
                    required 
                    variant='outlined'
                    label="Giá"
                    value={SDT}
                    onChange={(e) => {setSDT(e.target.value)}}
                    name="numberformat"
                    id="formatted-numberformat-input"
                  />
                  
                  <TextField
                    required 
                    className={classes.Input}
                    id="outlined-basic"
                    label="Đơn Vị Tính"
                    variant="outlined"
                    value={DIACHI} name="donvitinh" 
                    onChange={(e) => {setDIACHI(e.target.value)}}
                  />
                  <TextField
                    required 
                    variant='outlined'
                    label="Số Lượng"
                    value={MAIL}
                    onChange={(e) => {SETMAIL(e.target.value)}} 
                    name="numberformat"
                    id="formatted-numberformat-input"
                    InputProps={{
                      inputComponent: NumberFormatCustom,
                    }}
                  />
                
                </form>
                </div>
              </div>
            </Dialog>
        </div>
    )
}

export default UserManagement
