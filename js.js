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
 
 let tubeWidth=mapWidth/15
  let tubeHeight=mapHeight/2.5

 ctx.drawImage(tube, 50,0, tubeWidth, tubeHeight);
 
 
