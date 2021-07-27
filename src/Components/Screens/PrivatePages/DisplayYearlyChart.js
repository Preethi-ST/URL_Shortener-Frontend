import React, { useEffect, useState } from 'react'
import { Line,defaults } from 'react-chartjs-2'
// defaults.global.defaultColor = 'violet';
/* defaults.global.defaultFontColor = 'red';
defaults.global.defaultFontFamily = 'Arial'; */

function DisplayYearlyChart(props) {
    /* 
        We can also set color with defaults
        ref - https://github.com/reactchartjs/react-chartjs-2/issues/122
        defaults.color = 'green'
     */
    
    const {yearlydata,labels,year} = props
    const [data,setData] = useState({})
    useEffect(() => {
        setData({
                
                labels: [...labels],
                datasets: [
                {
                    label: `URL Creation ${year}`,
                    data: [...yearlydata],
                    borderColor: ['rgb(223, 60, 182)'],
                    backgroundColor: ['rgb(223, 60, 182)'],
                    pointBackgroundColor: 'rgb(92, 63, 89)',
                    pointBorderColor: 'rgb(92, 63, 89)' 
                }]
        })
        return () => {
            <></>
        }
    }, [props])
    const options = {
        responsive : true,
        maintainAspectRatio : false,
        legend: {
             labels: {
                  fontColor: 'orange'
                 }
              },
        title: {
            display: true,
            fontColor: 'green',
            text: 'Yearly Data of URL SHortner'
        }     ,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true,
                    fontColor: 'green'
                },
                gridLines: {
                    color: "rgba(0, 0, 0, 0)",
                }
            }],
          xAxes: [{
                ticks: {
                    fontColor: 'green'
                },
                gridLines: {
                    color: "rgba(0, 0, 0, 0)",
                }
            }]
        } 

    }
   
    return <Line data={data} options={options} />
}

export default DisplayYearlyChart
