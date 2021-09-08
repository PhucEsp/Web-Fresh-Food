import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  BarSeries,
  ArgumentAxis,
  ValueAxis,
  Tooltip,
  Title,
} from '@devexpress/dx-react-chart-material-ui';
import { EventTracker } from '@devexpress/dx-react-chart';
import { Redirect } from 'react-router';

export default class Statistical extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    };

    
  }

  componentDidMount() {
    fetch("http://localhost:8081/thongkedoanhthu")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            data: result
          });
        },
        (error) => {
            console.log(error.message)
        }
    )
  }
  
  render() {
    
    if(localStorage.getItem("token") === null){
      return(
        <Redirect to="/admin/dangnhap"></Redirect>
      )
    }
    
    const { data: chartData } = this.state;
    return (
      <>
        <Paper>
          <Chart data={chartData}>
            <ArgumentAxis />
            <ValueAxis />
            <BarSeries
              valueField="DoanhThu"
              argumentField="Thang"
            />
            <Title
              text="Doanh Thu Năm 2021"
            />
            <EventTracker />
            <Tooltip />
          </Chart>
        </Paper>
      </>
    );
  }
}
