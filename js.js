
  let gameState = 1; // 0-игра, 1-пауза
  let start = document.getElementById("start");
  let addResult = document.getElementById("addResult");
  addResult.style.display="none"
  start.addEventListener("click", play, false);
  start.style.display="none"
  addResult.style.display = "none"
  function play() {
    document.body.style.backgroundImage="none"
    canvas.style.display = "block";
    let inputs = document.getElementsByTagName("input");
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].style.display = "none";
    }
    gameState = 0;
    birdX = mapWidth / 10;
    birdY = innerHeight / 2;
    gravity = 0;
    tubeX1 = mapWidth * 0.33 + mapWidth / 2;
    tubeX2 = mapWidth * 0.66 + mapWidth / 2;
    tubeX3 = mapWidth + mapWidth / 2;
    mapSpeed = mapWidth / 400;
    score = 0;
    tube1Flag = false;
    tube2Flag = false;
    tube3Flag = false;
    tube5Flag = false;
    sunX1 = 0;
    sunX2 = mapWidth - sunWidth;
    clickSoundInit();
  }
  function clickSoundInit() {
    birdDie.play(); // запускаем звук
    birdDie.pause(); // и сразу останавливаем
    birdHit.play();
    birdHit.pause();
  }
  function clickSoundFell() {
    birdDie.currentTime = 0; // в секундах
    birdDie.play();
  }
  function clickSoundHit() {
    birdHit.currentTime = 0; // в секундах
    birdHit.play();
  }
  
  let canvas = document.getElementById("canvas");
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  let mapWidth = canvas.width;
  let mapHeight = canvas.height;
  
  let ctx = canvas.getContext("2d");
  
  //Настройки труб
  let tube = new Image();
  tube.src = "tube.png";
  let distance = mapHeight / 4.5;
  let tubeWidth = mapWidth / 15;
  let tubeHeight1 = (Math.random() * mapHeight) / 2 + distance;
  let tubeHeight2 = (Math.random() * mapHeight) / 2 + distance;
  let tubeHeight3 = (Math.random() * mapHeight) / 2 + distance;
  let tubeX1 = mapWidth * 0.33 + mapWidth / 2;
  let tubeX2 = mapWidth * 0.66 + mapWidth / 2;
  let tubeX3 = mapWidth + mapWidth / 2; // Позиционируем трубы на равноудаленное расстояние
  let mapSpeed = mapWidth / 400;
  let tube1Flag = false; // Флаг для пролета 1-й трубы
  let tube2Flag = false; //Флаг для пролета 2-й трубы
  let tube3Flag = false; //Флаг для пролета 3-й трубы
  let tube5Flag = false; //Флаг для пролета каждой 5-й трубы
  
  // Настройки птицы
  let bird = new Image();
  bird.src = "bird.gif";
  let birdX = mapWidth / 10;
  let birdY = innerHeight / 2;
  let birdWith = innerHeight / 18;
  let birdHeight = innerHeight / 16;
  let gravity = 0;
  let score = 0;
  let birdFlap = new Audio();
  birdFlap.src = "music/bird-flap.wav"; // Звук подлета птицы
  birdFlap.volume = 0.03;
  let angle = 0;
  
  // Обработчики событий для птицы
  canvas.addEventListener("touchstart", birdup, false);
  
  function birdup() {
    if (gameState === 0) {
      let timer = setInterval(birdRotate, 1000 / 120);
      function birdRotate() {
        if (angle >= -10) {
          angle = angle - 2;
        }
        if (angle > -20) {
          angle = angle - 0.6;
        }
        if (angle <= -20) {
          clearInterval(timer);
        }
      }
      birdFlap.volume = 0.03;
      birdFlap.play();
      gravity = gravity - mapHeight / 1240;
    }
  }
  canvas.addEventListener("click", birdUp, false);
  function birdUp() {
    if (gameState === 0) {
      let timer = setInterval(birdRotate, 1000 / 120);
      function birdRotate() {
        if (angle >= -10) {
          angle = angle - 2;
        }
        if (angle > -20) {
          angle = angle - 0.6;
        }
        if (angle <= -20) {
          clearInterval(timer);
        }
      }
      gravity = gravity - mapHeight / 140;
      birdFlap.volume = 0.03;
      birdFlap.play();
    }
  }
  
  // Звуки
  
  const birdHit = new Audio();
  birdHit.src = "music/bird-hit.wav"; // Птица попала в трубу
  birdHit.volume = 0.03;
  
  const birdDie = new Audio();
  birdDie.src = "music/bird-die.wav"; // Птица упала
  birdDie.volume = 0.06;
  
  const birdPass = new Audio();
  birdPass.src = "music/pass.mp3"; // Птица пролетела через трубу
  birdPass.volume = 0.06;
  
  const bonus = new Audio(); // Бонус за каждую 10-ую трубу
  bonus.src = "music/bonus.mp3";
  bonus.volume = 0.1;
  // Настройки облаков
  let sun = new Image();
  sun.src = "sun.png";
  let sunSpeed = mapWidth / 880;
  let sunWidth = mapHeight / 11;
  let sunHeight = mapHeight / 11;
  
  let sunX1 = 0;
  let sunX2 = mapWidth - sunWidth;
  
  function showInputs() {
    let inputs = document.getElementsByTagName("input");
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].style.display = "inline";
      inputs[inputs.length-1].style.display="none"
    }
  }
  setInterval(render, 1000 / 60);
  
  function render() {
    if (gameState == 0) {
      //Рисуем карту
      ctx.fillStyle = "lightblue";
      ctx.fillRect(0, 0, mapWidth, mapHeight);
      // Рисуем 2 солнца
      ctx.drawImage(sun, sunX1, 0, sunWidth, sunHeight);
      ctx.drawImage(sun, sunX2, 0, sunWidth, sunHeight);
  
      sunX1 = sunX1 + sunSpeed;
      sunX2 = sunX2 - sunSpeed;
      if (sunX1 + sunWidth >= sunX2) {
        // При столкновении  движутся в обратную сторону
        sunSpeed = -mapWidth / 880;
      }
      if (sunX1 <= 0)
        // При lдостижении полюсов движутся в обратную сторону
        sunSpeed = mapWidth / 880;
  
      //Рисуем трубы и движение труб
      ctx.drawImage(tube, tubeX1, 0, tubeWidth, tubeHeight1);
      ctx.drawImage(tube, tubeX1, tubeHeight1 + distance, tubeWidth, mapHeight); // 1-я пара
  
      ctx.drawImage(tube, tubeX2, 0, tubeWidth, tubeHeight2);
      ctx.drawImage(tube, tubeX2, tubeHeight2 + distance, tubeWidth, mapHeight); // 2-я пара
  
      ctx.drawImage(tube, tubeX3, 0, tubeWidth, tubeHeight3);
      ctx.drawImage(tube, tubeX3, tubeHeight3 + distance, tubeWidth, mapHeight); // 3-я пара
      tubeX1 = tubeX1 - mapSpeed;
      tubeX2 = tubeX2 - mapSpeed;
      tubeX3 = tubeX3 - mapSpeed;
      // Уход труб за экран
      const tubeOut1 = tubeX1 + tubeWidth < 0;
      const tubeOut2 = tubeX2 + tubeWidth < 0;
      const tubeOut3 = tubeX3 + tubeWidth < 0;
      if (tubeOut1) {
        tubeX1 = mapWidth;
        tubeHeight1 = (Math.random() * mapHeight) / 2 + distance;
      }
      if (tubeOut2) {
        tubeX2 = mapWidth;
        tubeHeight2 = (Math.random() * mapHeight) / 2 + distance;
      }
      if (tubeOut3) {
        tubeX3 = mapWidth;
        tubeHeight3 = (Math.random() * mapHeight) / 2 + distance;
      }
      //Пропишем увеличение скорости
      if (birdX > tubeX3 + tubeWidth) {
        mapSpeed = mapSpeed + mapWidth / 96480; // 96480 -подобранная цифра для плавного увеличения скорости карты
      }
  
      // Рисуем птицу и движение птицы
      function inRad(num) {
        // Функция для вычисления rad в deg
        return (num * Math.PI) / 180;
      }
      birdY = birdY + gravity;
      gravity = gravity + mapHeight / 4000;
  
      angle = angle + 0.6;
  
      if (angle >= 42) angle = 42;
      ctx.save(); // поворачиваем только птицу
      ctx.translate(birdX, birdY);
      ctx.rotate(inRad(angle));
  
      // Рисуем  картинку
      ctx.drawImage(bird, 0, 0, birdWith, birdHeight);
  
      ctx.restore();
      // Падение птицы на дно
      const birdFell = birdY > mapHeight - birdHeight;
      if (birdFell) {
        clickSoundFell();
        window.navigator.vibrate(300);
        gameState = 1;
        birdFlap.volume = 0;
        gravity = 0;
        showInputs();
      }
      if (birdY < 0) {
        // параметры для потолка
        birdY = 0;
        window.navigator.vibrate(300);
        gravity = 0;
      }
      // Логика для 1 пары труб
  
      const isTube1ReachBird =
        tubeX1 < birdX + birdWith - birdWith / 5 && tubeX1 + tubeWidth > birdX; // где birdWidth/5 -погрешность за счёт того, что фигура не идеальная
      if (isTube1ReachBird) {
        const isTube1HitBird =
          tubeHeight1 - birdHeight / 4 > birdY ||
          birdY + birdHeight - birdHeight / 4 > tubeHeight1 + distance; // где birdHeight/4 -погрешность за счёт того, что фигура не идеальная
        if (isTube1HitBird) {
          clickSoundHit();
          gameState = 1;
          birdFlap.volume = 0;
          gravity = 0;
          showInputs();
        }
      }
  
      // Логика для 2 пары труб
      const isTube2ReachBird =
        tubeX2 < birdX + birdWith - birdWith / 5 && tubeX2 + tubeWidth > birdX; // где birdWidth/5 -погрешность за счёт того, что фигура не идеальная
      if (isTube2ReachBird) {
        const isTube2HitBird =
          tubeHeight2 - birdHeight / 4 > birdY ||
          birdY + birdHeight - birdHeight / 4 > tubeHeight2 + distance; // где birdHeight/4 -погрешность за счёт того, что фигура не идеальная
        if (isTube2HitBird) {
          clickSoundHit();
          gameState = 1;
          birdFlap.volume = 0;
          gravity = 0;
          showInputs();
        }
      }
  
      // Логика для 3 пары труб
      const isTube3ReachBird =
        tubeX3 < birdX + birdWith - birdWith / 5 && tubeX3 + tubeWidth > birdX; // где birdWidth/5 -погрешность за счёт того, что фигура не идеальная
      if (isTube3ReachBird) {
        const isTube3HitBird =
          tubeHeight3 - birdHeight / 4 > birdY ||
          birdY + birdHeight - birdHeight / 4 > tubeHeight3 + distance; // где birdHeight/4 -погрешность за счёт того, что фигура не идеальная
        if (isTube3HitBird) {
          clickSoundHit();
          gameState = 1;
          birdFlap.volume = 0;
          gravity = 0;
          showInputs();
        }
      }
      // Счёт игры
      ctx.fillStyle = "black";
      ctx.font = mapHeight / 30 + "px" + " serif";
      ctx.fillText(+score, mapWidth / 2, mapHeight / 10);
      if (birdX > tubeX1 + tubeWidth && !tube1Flag) {
        score = score + 1;
        birdPass.play();
        tube1Flag = true;
        tube3Flag = false;
      }
  
      if (birdX > tubeX2 + tubeWidth && !tube2Flag) {
        score = score + 1;
        birdPass.play();
        tube2Flag = true;
        tube1Flag = false;
      }
      if (birdX > tubeX3 + tubeWidth && !tube3Flag) {
        score = score + 1;
        birdPass.play();
        tube3Flag = true;
        tube2Flag = false;
      }
      if (score !== 0 && score % 5 === 0 && !tube5Flag) {
        // Бонус за каждую 5-ую трубу
        birdPass.volume = 0;
        bonus.play();
        tube5Flag = true;
      }
      if (score !== 0 && score % 5 !== 0) {
        tube5Flag = false;
        birdPass.volume = 0.06;
      }
    }
  }
  