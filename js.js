
let canvas=document.getElementById('canvas')
canvas.width=innerWidth
canvas.height=innerHeight    
let mapWidth=canvas.width
let mapHeight=canvas.height
 
 let ctx=canvas.getContext("2d")

  //Настройки труб
  let tube=new Image()
  tube.src="tube.png"
  let distance=mapHeight/4.5
  let tubeWidth=mapWidth/15
  let tubeHeight1=Math.random()*mapHeight/2+distance
  let tubeHeight2=Math.random()*mapHeight/2+distance
  let tubeHeight3=Math.random()*mapHeight/2+distance
   let tubeX1=(mapWidth*0.33)+mapWidth/2         
   let tubeX2=(mapWidth*0.66)+mapWidth/2    
   let tubeX3=mapWidth+mapWidth/2         // Позиционируем трубы на равноудаленное расстояние
 let mapSpeed=mapWidth/400
 let tube1Flag=false  // Флаг для пролета 1-й трубы 
 let tube2Flag=false  //Флаг для пролета 1-й трубы 
 let tube3Flag=false  //Флаг для пролета 1-й трубы 
 let tube5Flag=false  //Флаг для пролета каждой 5-й трубы 
 

 
  // Настройки птицы
   let bird=new Image()
   bird.src="bird.gif"
   let birdX=mapWidth/10
   let birdY=innerHeight/2
   let birdWith=innerHeight/18
   let birdHeight=innerHeight/16
   let gravity=0
   let score=0
  
  
  
   
  
  
    
   // Обработчики событий для птицы
   canvas.addEventListener("click",birdUp,false)
function birdUp(){
   gravity=gravity-mapHeight/140
   
  
}      


canvas.addEventListener("touchstart",birdup,false)
 
function birdup(){
  gravity=gravity-mapHeight/1240
}    
   // функция сброса
   function reset(){
      birdY=innerHeight/2-birdHeight
      gravity=1
      score=0
   }
   // Звуки
   
   const birdHit = new Audio()
   birdHit.src = 'music/bird-hit.wav' // Птица попала в трубу
   birdHit.volume = 0.03

   const birdDie = new Audio()
  birdDie.src = 'music/bird-die.wav' // Птица упала
  birdDie.volume = 0.06

  const birdPass = new Audio()
  birdPass.src = 'music/pass.mp3' // Птица пролетела через трубу
  birdPass.volume = 0.06
  
  const bonus=new Audio()  // Бонус за каждую 10-ую трубу
  bonus.src="music/bonus.mp3"
  bonus.volume=0.1
 
  
setInterval(render,1000/60)
                           

function render(){
     //Рисуем карту
    ctx.fillStyle="lightblue"
    ctx.fillRect(0,0, mapWidth, mapHeight)

     //Рисуем трубы и движение труб 
    ctx.drawImage(tube,tubeX1, 0, tubeWidth, tubeHeight1)
    ctx.drawImage(tube,tubeX1,tubeHeight1+distance,tubeWidth, mapHeight) // 1-я пара

    ctx.drawImage(tube,tubeX2, 0, tubeWidth, tubeHeight2)
    ctx.drawImage(tube,tubeX2,tubeHeight2+distance,tubeWidth, mapHeight) // 2-я пара

    ctx.drawImage(tube,tubeX3, 0, tubeWidth, tubeHeight3)
    ctx.drawImage(tube,tubeX3,tubeHeight3+distance,tubeWidth, mapHeight) // 3-я пара
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
      //Пропишем увеличение скорости
      if(birdX>tubeX3+tubeWidth){
        mapSpeed=mapSpeed+mapWidth/96480 // 96480 -подобранная цифра для плавного увеличения скорости карты
        
      }
     
     
    // Рисуем птицу и движение птицы
    ctx.drawImage(bird,birdX,birdY,birdWith, birdHeight)
    birdY=birdY+gravity
    gravity=gravity+mapHeight/4000            // Высчитываем свободное падение за один проход функции
    const  birdFell=birdY>mapHeight-birdHeight
     // Падение птицы на дно 
    if(birdFell){
      birdDie.play()  
      window.navigator.vibrate(300)  
      birdY=mapHeight-birdHeight           
     
     
   } 
    // Логика для 1 пары труб
  
   const isTube1ReachBird = (tubeX1 < birdX +birdWith-birdWith/5) && (tubeX1 + tubeWidth > birdX) // где birdWidth/5 -погрешность за счёт того, что фигура не идеальная 
   if (isTube1ReachBird) {
     const isTube1HitBird = tubeHeight1-birdHeight/4 > birdY || birdY + birdHeight-birdHeight/4 > tubeHeight1 + distance // где birdHeight/4 -погрешность за счёт того, что фигура не идеальная 
     if(isTube1HitBird){
      birdHit.play()
     alert('труба')
     reset()
     }
   }
 
     // Логика для 2 пары труб
   const isTube2ReachBird = (tubeX2 < birdX +birdWith-birdWith/5) && (tubeX2 + tubeWidth > birdX) // где birdWidth/5 -погрешность за счёт того, что фигура не идеальная 
   if (isTube2ReachBird) {
     const isTube2HitBird = tubeHeight2-birdHeight/4 > birdY || birdY + birdHeight-birdHeight/4 > tubeHeight2 + distance // где birdHeight/4 -погрешность за счёт того, что фигура не идеальная 
     if(isTube2HitBird){
      birdHit.play()
     alert('труба')
     reset()
     }
   }

     // Логика для 3 пары труб
   const isTube3ReachBird = (tubeX3 < birdX +birdWith-birdWith/5) && (tubeX3 + tubeWidth > birdX) // где birdWidth/5 -погрешность за счёт того, что фигура не идеальная 
   if (isTube3ReachBird) {
     const isTube3HitBird = tubeHeight3-birdHeight/4 > birdY || birdY + birdHeight-birdHeight/4 > tubeHeight3 + distance // где birdHeight/4 -погрешность за счёт того, что фигура не идеальная 
     if(isTube3HitBird){
      birdHit.play()
     alert('труба')
     reset()
     }
    
   }
      // Счёт игры
       ctx.fillStyle="black"
      ctx.font=mapWidth/30+"px"+" serif"
      ctx.fillText(+score,mapWidth/2, mapHeight/10)
      if ( birdX>tubeX1+tubeWidth && !tube1Flag ) {
        score=score+1
        birdPass.play()
        tube1Flag=true;
        tube3Flag=false

      }
      
      if ( birdX>tubeX2+tubeWidth && !tube2Flag ) {
        score=score+1
        birdPass.play()
        tube2Flag=true;
        tube1Flag=false;
      }
      if ( birdX>tubeX3+tubeWidth && !tube3Flag ) {
        score=score+1
        birdPass.play()
        tube3Flag=true
        tube2Flag=false;
      }
      if (score!==0  && score % 5===0 && !tube5Flag ) {   // Бонус за каждую 5-ую трубу
        birdPass.volume = 0
        bonus.play()
        tube5Flag=true
       }
       if (score!==0  && score % 5!==0 ) {  
        tube5Flag=false
        birdPass.volume = 0.06
       }
      

      
   
      
      
       
       }
     

 

 


   
