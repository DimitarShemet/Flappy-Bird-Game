let canvas=document.getElementById('canvas')
canvas.width=innerWidth
canvas.height=innerHeight
let mapWidth=canvas.width
let mapHeight=canvas.height
let ctx=canvas.getContext("2d")
ctx.fillStyle="lightblue"
ctx.fillRect(0,0, mapWidth, mapHeight)
 //Рисуем трубу
 let tube=document.getElementById('tube')
 
 tube.width=64
 tube.height=400
 window.onload=function(){
 ctx.drawImage(tube, 50,0,mapWidth/15, mapHeight/2.5);
 
 }
setInterval(render,1000/60)
function render(){


}