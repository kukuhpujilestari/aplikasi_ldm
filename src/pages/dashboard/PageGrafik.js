import React, { Component } from 'react';

import CanvasJSReact from '../../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


class PageGrafik extends Component {
    render(){
        const options = {
			animationEnabled: true,
			title:{
				text: "Data Job 2021"
			},
			axisX: {
				valueFormatString: "MMM"
			},
			axisY: {
				title: "Total Job / Bulan",
				prefix: ""
			},
			data: [{
				yValueFormatString: "#",
				xValueFormatString: "MMMM",
				type: "spline",
				dataPoints: [
					{ x: new Date(2017, 0), y: 1 },
					{ x: new Date(2017, 1), y: 10 },
					{ x: new Date(2017, 2), y: 0 },
					{ x: new Date(2017, 3), y: 9 },
					{ x: new Date(2017, 4), y: 2 },
					{ x: new Date(2017, 5), y: 5 },
					{ x: new Date(2017, 6), y: 9 },
					{ x: new Date(2017, 7), y: 9 },
					{ x: new Date(2017, 8), y: 10 },
					{ x: new Date(2017, 9), y: 30 },
					{ x: new Date(2017, 10), y: 90 },
					{ x: new Date(2017, 11), y: 4 }
				]
			}]
		}

        return (
            <div className="card mb-4">
                <CanvasJSChart options = {options}/>
            </div>
        )
    }
}

export default PageGrafik;