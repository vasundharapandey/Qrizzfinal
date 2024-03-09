// BarChart.js
import React, { Component } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

class BarChart extends Component {
    render() {
        const options = {
            width: 200, // Set width to 200px
    height: 80, 
    credit: "", 
            title: {
                text: "" // Remove the title
            },
            data: [
                {
                    type: "column",
                    dataPoints: [
                        { label: "",  y: 10  }, // Remove labels for each data point
                        { label: "", y: 15  },
                        { label: "", y: 25  },
                        { label: "",  y: 30  },
                        { label: "",  y: 28  }
                    ],
                    color: "blue",
                     // Set the color for all bars
                }
            ],
            axisX: {
                lineThickness: 0, // Hide x-axis line
                labelFontColor: "transparent" ,
                   tickLength: 0, // Hide x-axis ticks
            },
            axisY: {
                lineThickness: 0, // Hide y-axis line
                labelFontColor: "transparent" ,
                tickLength: 0, // Hide y-axis ticks
            },
            backgroundColor: "transparent" // Set background color to transparent
        };
        
        return (
            <div>
                <CanvasJSChart options={options} />
            </div>
        );
    }
}

export default BarChart;
