window.onload=function(){
let canvas=document.getElementById('canvas')
canvas.width=innerWidth
canvas.height=innerHeight
let mapWidth=canvas.width
let mapHeight=canvas.height
 
 let ctx=canvas.getContext("2d")

  //Рисуем трубу
  let tube=document.getElementById('tube')
  let tubeWidth=mapWidth/15
   let tubeHeight=mapHeight/2.5
   let tubeX=mapWidth
 
  


setInterval(render,1000/60)
function render(){
     //рисуем карту
    ctx.fillStyle="lightblue"
    ctx.fillRect(0,0, mapWidth, mapHeight)
     //Рисуем трубу
    ctx.drawImage(tube, tubeX,0, tubeWidth, tubeHeight);
    tubeX=tubeX-1
 
 console.log("1")
}





 }
