import React,{useState,useRef} from 'react'
import { Bar } from 'react-chartjs-2'
import {Chart as ChartJS} from 'chart.js/auto'
// import { options } from 'pg/lib/defaults'

export default function BarChart({chartData}) {
  const [options,setOptions]=useState({
    
    maintainAspectRatio:false,
    layout:{
      padding:{
        right:10
      }
    },
    scales: {
          x:{
            min:0,
         max:6
          },
          y:{
            beginAtZero:true
          }
      }, plugins: {tooltip: {
        enabled: false // Disable tooltips
      }
    }
   
})

    const myChart=useRef()
    const moveChart={
      id:'moveChart',
      afterEvent(chart,args){
        const {ctx,canvas,chartArea:{left,right,top,bottom,width,height}}=chart;
        canvas.addEventListener('mousemove',(event)=>{
          const x=args.event.x;
          const y=args.event.y;

          if(x>=left-15&&x<=left+15 &&y>=height/2+top-15
          && y<=height/2+top+15){
            canvas.style.cursor='pointer'
         
         
            
          }
          else if(x>=right-15&&x<=right+15 &&y>=height/2+top-15
          && y<=height/2+top+15){
            canvas.style.cursor='pointer'
           
            }
          else {
            canvas.style.cursor='default'
          }
        })
      },
      afterDraw(chart,args,pluginsOptions){
        const {ctx,chartArea:{left,right,top,bottom,width,height}}=chart;
      console.log(height,width)
      class CircleChevron{
        draw(ctx,x1,y1,pixel){
          const angle=Math.PI/100;
          ctx.save();
          ctx.lineWidth=3;
          // ctx.strokeStyle='rgba(102,102,102,0.5)'
          ctx.fillStyle='white'
          ctx.arc(x1,height/2+top,10,angle*0,angle*360,false)
      
        ctx.fill();
        ctx.closePath() 
        
        ctx.beginPath()
        ctx.lineWidth=3;
        ctx.strokeStyle='rgba(102,102,102,0.5)'
        ctx.moveTo(x1+pixel,height/2+top-5.5)
        ctx.lineTo(x1-pixel,height/2+top);
        ctx.lineTo(x1+pixel,height/2+top+5.5);
         ctx.stroke();
    
      ctx.closePath() 
    
        }
      }
      let drawCircleLeft=new CircleChevron();
      drawCircleLeft.draw(ctx,left,1,5)
      let drawCircleRight=new CircleChevron();
      drawCircleRight.draw(ctx,right,1,-5)
    }
    }
    const moveScroll=()=>{
      // console.log(myChart)

   const {ctx,canvas,chartArea:{left,right,top,bottom,width,height}}=myChart.current;
        canvas.addEventListener('click',(event)=>{

            const rect=canvas.getBoundingClientRect();
            

            const x=event.clientX-rect.left;
            const y=event.clientY-rect.top;
            
            if(x>=right-15&&x<=right+15 &&y>=height/2+top-15
            && y<=height/2+top+15){
              // console.log(x,y,myChart.current.options.scales)
              setOptions(
                {
    
                  maintainAspectRatio:false,
                  layout:{
                    padding:{
                      right:10
                    }
                  },
                  scales: {
                        x:{
                          min:6,
                       max:12
                        },
                        y:{
                          beginAtZero:true
                        }
                    },
                 
              }
              )
              // myChart.current.options.scales.x.min=6
              // myChart.currentoptons.scales.x.max=12
            }
            if(x>=left-15&&x<=left+15 &&y>=height/2+top-15
            && y<=height/2+top+15){
              // console.log(x,y,myChart.current.options.scales)
              setOptions(
                {
    
                  maintainAspectRatio:false,
                  layout:{
                    padding:{
                      right:10
                    }
                  },
                  scales: {
                        x:{
                          min:0,
                       max:5
                        },
                        y:{
                          beginAtZero:true
                        }
                    },
                 
              }
              )
              // myChart.current.options.scales.x.min=6
              // myChart.currentoptons.scales.x.max=12
            }
            
          })
         
      
      
    }
  return (
   <Bar data={chartData}
    options={options}
    plugins={[moveChart]}
    ref={myChart}
    onClick={()=>moveScroll()}
    />
  )
}
