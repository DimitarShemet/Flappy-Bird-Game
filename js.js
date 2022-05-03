
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
 let mapSpeed=1
 let distance=innerHeight/5
 
  // Настройки птицы
   let bird=document.getElementById('bird')
   let birdX=50
   let birdY=innerHeight/2
   let birdWith=innerHeight/12
   let birdHeight=innerHeight/10
   let gravity=0
  
    
   // Обработчики событий для птицы
   canvas.addEventListener("click",birdUp,false)
function birdUp(){
   gravity=gravity-mapHeight/208
}      


canvas.addEventListener("touchstart",birdup,false)
 
function birdup(){
   gravity=gravity-4.5
}    
   // функция сброса
   function reset(){
      birdY=innerHeight/2-birdHeight
      gravity=1
   }

  
setInterval(render,1000/60)
                           

function render(){
     //Рисуем карту
    ctx.fillStyle="lightblue"
    ctx.fillRect(0,0, mapWidth, mapHeight)
     //Рисуем трубы и движение труб 
    ctx.drawImage(tube,tubeX, 0, tubeWidth, tubeHeight);
    ctx.drawImage(tube,tubeX,tubeHeight+distance,tubeWidth, tubeHeight);
    tubeX=tubeX-1-mapSpeed
    // Рисуем птицу и движение птицы
    ctx.drawImage(bird,birdX,birdY,birdWith, birdHeight);
    birdY=birdY+gravity
    gravity=gravity+1.5*9.8/1000*1000/60   
    const  birdFell=birdY>mapHeight-birdHeight
    if(birdFell){
     reset()
   }


 }
