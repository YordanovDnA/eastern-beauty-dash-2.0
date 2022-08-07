import React, { Component } from "react";
import Chart from "chart.js/auto";
import { PropTypes } from "prop-types";

class CustomChart extends Component {
  constructor({ title, type, labels, data, min, max, controls }) {
    super();
    this.state = {
      //Graph configuration
      title,
      type,
      labels,
      data,
      min,
      max,
      controls: controls ? true : false,

      //Actual graph
      graph: null,
    };
  }

  //Create ref
  chartRef = React.createRef();

  //Create a graph when loading the component
  componentDidMount() {
    //Object destructuring
    const { title, type, labels, data, min, max } = this.state;

    //Assigning myChartRef to the vanva ref.
    const myChartRef = this.chartRef.current.getContext("2d");

    //Drawing the graph using chart.js
    const graph = new Chart(myChartRef, {
      type,
      data: {
        labels: labels
          ? labels
          : [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Nov",
              "Dec",
            ],
        datasets: [
          {
            label: title
              ? title
              : `${new Date().getFullYear() - 1} customers report`,
            lineTension: 0.3,
            backgroundColor: "rgba(2,117,216,0.2)",
            borderColor: "rgba(2,117,216,1)",
            pointRadius: 5,
            pointBackgroundColor: "rgba(2,117,216,1)",
            pointBorderColor: "rgba(255,255,255,0.8)",
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(2,117,216,1)",
            pointHitRadius: 50,
            pointBorderWidth: 2,
            data: data
              ? data
              : [
                  1540, 1820, 2200, 1700, 1880, 1900, 2500, 2705, 2000, 1650,
                  2560, 2910,
                ],
          },
        ],
      },
      options: {
        scales: {
          xAxes: [
            {
              time: {
                unit: "date",
              },
              gridLines: {
                display: false,
              },
              ticks: {
                maxTicksLimit: 7,
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                min: this.state.min,
                max: this.state.max,
                maxTicksLimit: 5,
              },
              gridLines: {
                color: "rgba(0, 0, 0, .125)",
              },
            },
          ],
        },
        legend: {
          display: false,
        },
      },
    });

    //Stting the graph in the state
    this.setState({ graph });
  }

  //OnChange from the controls - type
  updateConfigAsNewObject(event, chart) {
    chart.config.type = event.currentTarget.value;
    chart.update();
  }

  render() {
    //Object destructuring of the store
    const { type, title, controls } = this.state;
    return (
      //Render the chart component
      <React.Fragment>
        <div className="card mb-4">
          <div className="card-header">
            <div className="d-flex justify-content-between">
              <h5>{title}</h5>
              {/* Render the controls if controls is true in the state */}
              {controls && (
                <div className="row">
                  {/* Render select button for the chart type */}
                  <select
                    onChange={(event) =>
                      this.updateConfigAsNewObject(event, this.state.graph)
                    }
                    name="chartType"
                  >
                    <option
                      selected={type === "line" ? true : false}
                      defaultValue="line"
                    >
                      Line
                    </option>
                    <option
                      selected={type === "bar" ? true : false}
                      defaultValue="bar"
                    >
                      Bar
                    </option>
                    <option
                      selected={type === "pie" ? true : false}
                      defaultValue="pie"
                    >
                      Pie
                    </option>
                    <option
                      selected={type === "radar" ? true : false}
                      defaultValue="radar"
                    >
                      Radar
                    </option>
                    <option
                      selected={type === "doughnut" ? true : false}
                      defaultValue="doughnut"
                    >
                      Doughnut
                    </option>
                  </select>
                </div>
              )}
            </div>
          </div>
          {/* The actual chart */}
          <div className="card-body">
            <canvas key="chart" id="myChart" ref={this.chartRef} />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

CustomChart.propTypes = {
  // Type of the chart: "line"(By default), "bar", "pie", "radar", "doughnut"
  type: PropTypes.oneOf(["line", "bar", "pie", "radar", "doughnut"]),
  // Title is the lable/name of the chart/data
  title: PropTypes.string,
  //Lables are the names underneath
  labels: PropTypes.arrayOf(PropTypes.string),
  //Data is an array of numbers represents each month(by default) or label of lables if provided.
  data: PropTypes.arrayOf(PropTypes.number),
  min: PropTypes.number,
  max: PropTypes.number,
};

export default CustomChart;
