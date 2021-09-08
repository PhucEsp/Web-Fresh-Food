import React, {useState, useEffect} from 'react'
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  BarSeries,
  ArgumentAxis,
  ValueAxis,
  Tooltip,
  Title,
} from '@devexpress/dx-react-chart-material-ui';

import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { EventTracker } from '@devexpress/dx-react-chart';
import { Redirect } from 'react-router';
import axios from 'axios';


const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    paper: {
        height: "70vh"
    }
  }));

function RevenueStatistical() {
    const [data,setData] = useState([]) 
    const [year,setYear] = useState('2021')
    const [listYear,setListYear] = useState([])
    const classes = useStyles();
    const url = `http://localhost:8081/thongkedoanhthu/${year}`
    const url_year = `http://localhost:8081/laydanhsachnam`
    
    useEffect(() => {
        axios.get(url)
        .then(res => {
            const data = res.data
            const transfer_list = data.map(val => {
                const new_val = {
                    ...val,
                    Thang: val.Thang.toString()
                }
                return new_val
            })
            setData(transfer_list)
        })
        .catch(err => {
            alert("Error System")
        })
        
    },[year])

    useEffect(() => {
        axios.get(url_year)
        .then(res => {
            setListYear(res.data)
        })
        .catch(err => {
            alert("Error System")
        })
    }, [])

    
    const handleChange = (event) => {
        setYear(event.target.value);
    };
    console.log(`data`, data)

    if(localStorage.getItem("token") === null){
        return(
          <Redirect to="/admin/dangnhap"></Redirect>
        )
    }
    
    return (
        <div className={classes.paper}>
            <Paper>
                <Chart data={data}>
                    <ArgumentAxis />
                    <ValueAxis />
                    <BarSeries
                    valueField="DoanhThu"
                    argumentField="Thang"
                    />
                    <Title
                    text="Thống Kê Doanh Thu Theo Từng Năm" 
                    />
                    <EventTracker />
                    <Tooltip />
                </Chart>
            </Paper>
            <div>
            <FormControl className={classes.formControl}>
                <Select
                value={year}
                onChange={handleChange}
                displayEmpty
                className={classes.selectEmpty}
                >
                    {
                        listYear.length > 0 && listYear.map(val => (
                            <MenuItem value={val.NAM}>{val.NAM}</MenuItem>
                        ))
                    }
                </Select>
                <FormHelperText>Thống kê theo năm</FormHelperText>
            </FormControl>
            </div>
        </div>
    )
}

export default RevenueStatistical
