window.onerror=function(msg, url, line){
    alert('Message: '+msg+ "\nurl: "+ url + "\n Line : " + line)
    return true

}


let canvas=document.getElementById('canvas')
canvas.width=innerWidth
canvas.height=innerHeight
let mapWidth=canvas.width
let mapHeight=canvas.height
 
 let ctx=canvas.getContext("2d")

  //Настройки труб
  let tube=document.getElementById('tube')
  let tubeWidth=mapWidth/15
   let tubeHeight=mapHeight/2
   let tubeX=mapWidth
 let speed=1
 let distance=innerHeight/5
  // Настройки птицы
   let bird=document.getElementById('bird')
   let birdX=50
   let birdY=100
   let birdWith=60
   let birdHeight=150

  
setInterval(render,1000/60)
function render(){
     //Рисуем карту
    ctx.fillStyle="lightblue"
    ctx.fillRect(0,0, mapWidth, mapHeight)
     //Рисуем трубы
    ctx.drawImage(tube,tubeX, 0, tubeWidth, tubeHeight);
    ctx.drawImage(tube,tubeX,tubeHeight+distance,tubeWidth, tubeHeight);
    tubeX=tubeX-1-speed
    // Рисуем птицу
     







 }
