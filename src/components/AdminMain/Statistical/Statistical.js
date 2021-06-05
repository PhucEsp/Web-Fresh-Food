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

// const data = [
//     { nam: "1", name: 2.525 },
//     { nam: "2", population: 3.018 },
//     { nam: "3", population: 3.682 },
//     { nam: "4", population: 4.44 },
//     { nam: "5", population: 5.31 },
//     { nam: "2000", population: 5.127 },
//     { nam: "2010", population: 5.93 }
//   ];

export default class Statistical extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    };

    
  }

  componentDidMount() {
    fetch("http://localhost:8081/thongkedoanhthu/2021")
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
    const { data: chartData } = this.state;
    console.log(`chartData`, chartData) 
    return (
        <Paper>
        <Chart
          data={chartData}
        >
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
    );
  }
}
