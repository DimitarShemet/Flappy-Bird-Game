
let canvas=document.getElementById('canvas')
canvas.width=innerWidth
canvas.height=innerHeight    
let mapWidth=canvas.width
let mapHeight=canvas.height
 
 let ctx=canvas.getContext("2d")

  //Настройки труб
  let tube=document.getElementById('tube')
  let distance=mapHeight/4.5
  let tubeWidth=mapWidth/15
  let tubeHeight1=Math.random()*mapHeight/2+distance
  let tubeHeight2=Math.random()*mapHeight/2+distance
  let tubeHeight3=Math.random()*mapHeight/2+distance
   let tubeX1=(mapWidth*0.33)+mapWidth/2         
   let tubeX2=(mapWidth*0.66)+mapWidth/2    
   let tubeX3=mapWidth+mapWidth/2         // Позиционируем трубы на равноудаленное расстояние
  
 let mapSpeed=mapWidth/350

 
  // Настройки птицы
   let bird=document.getElementById('bird')
   let birdX=mapWidth/10
   let birdY=innerHeight/2
   let birdWith=innerHeight/18
   let birdHeight=innerHeight/16
   let gravity=0
  
    
   // Обработчики событий для птицы
   canvas.addEventListener("click",birdUp,false)
function birdUp(){
   gravity=gravity-mapHeight/140
}      


canvas.addEventListener("touchstart",birdup,false)
 
function birdup(){
   gravity=gravity-mapHeight/670
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
    ctx.drawImage(tube,tubeX1, 0, tubeWidth, tubeHeight1);
    ctx.drawImage(tube,tubeX1,tubeHeight1+distance,tubeWidth, mapHeight); // 1-я пара

    ctx.drawImage(tube,tubeX2, 0, tubeWidth, tubeHeight2);
    ctx.drawImage(tube,tubeX2,tubeHeight2+distance,tubeWidth, mapHeight); // 2-я пара

    ctx.drawImage(tube,tubeX3, 0, tubeWidth, tubeHeight3);
    ctx.drawImage(tube,tubeX3,tubeHeight3+distance,tubeWidth, mapHeight); // 3-я пара
    tubeX1=tubeX1-mapSpeed
    tubeX2=tubeX2-mapSpeed
    tubeX3=tubeX3-mapSpeed
        // Уход труб за экран 
    const tubeOut1=tubeX1+tubeWidth<0
    const tubeOut2=tubeX2+tubeWidth<0
    const tubeOut3=tubeX3+tubeWidth<0
    if(tubeOut1){
     tubeX1=mapWidth
     tubeHeight1=Math.random()*mapHeight/2+distance
    }
    if(tubeOut2){
      tubeX2=mapWidth
       tubeHeight2=Math.random()*mapHeight/2+distance
     }
     if(tubeOut3){
      tubeX3=mapWidth
      tubeHeight3=Math.random()*mapHeight/2+distance
     }
    
    
    

    // Рисуем птицу и движение птицы
    ctx.drawImage(bird,birdX,birdY,birdWith, birdHeight);
    birdY=birdY+gravity
    gravity=gravity+1.5*9.8/1000*1000/60   // Высчитываем свободное падение за один проход функции
    const  birdFell=birdY>mapHeight-birdHeight
    if(birdFell){
     reset()
   }


 }
