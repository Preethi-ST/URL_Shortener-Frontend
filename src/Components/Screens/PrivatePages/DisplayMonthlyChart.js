import React,{useState,useEffect} from 'react'
import { Bar,defaults } from 'react-chartjs-2';
var randomColor = require('randomcolor');
  
function DisplayMonthlyChart(props) {
  defaults.color = 'green'
  const {monthlydata,labels,year} = props
  const [data,setData] = useState({})
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
  useEffect(() => {
    setData({
            labels: [...labels],
            datasets: [
            {
                label: `URL Creation`,
                data: [...monthlydata],
                backgroundColor: randomColor({
                  count :labels.length,
                  luminosity: 'light',
                  hue: 'blue'
               }),
               borderColor: randomColor({
                count :labels.length,
                luminosity: 'light',
                hue: 'red'
             })
            }]
    })
    return () => {
        <></>
    }
  }, [props])
    return (
          <Bar data={data} options = {options}/>
      
    )
}

export default DisplayMonthlyChart
