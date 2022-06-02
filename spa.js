window.onhashchange = switchToStateFromURLHash;
let SPAState = {};
let mainButton=document.getElementById('main')
let recordsButton=document.getElementById('records')
let about=document.getElementById('about')
let startMenu=document.getElementById("startMenu")
let tableInput=document.getElementById('tableRecords')
tableInput.addEventListener("animationend", buildTable, false);
function switchToStateFromURLHash() {
  let URLHash = window.location.hash;
  let stateStr = URLHash.substr(1);
  let mainScreen = document.getElementById("mainScreen")
  let aboutScreen=document.getElementById("aboutScreen")
  let recordsScreen = document.getElementById("recordsScreen")
  let playScreen = document.getElementById("recordsScreen")
  let gameScreen= document.getElementById("gameScreen")
  // Настроки перехода
  if (stateStr != "") {
    // если закладка непустая, читаем из неё состояние и отображаем
    let parts = stateStr.split("_");
    SPAState = { pagename: parts[0] }; // номер страницы
  } else SPAState = { pagename: "Main" };
  
  table.style.display = "none";
  switch (SPAState.pagename) {
    case "Main":
      recordsScreen.innerHTML=""
      aboutScreen.innerHTML=""
      playScreen.innerHTML=""
      document.body.style.backgroundImage = "url('main.png')"
      document.body.style.backgroundAttachment="fixed"
      document.body.style.backgroundSize="contain";
      document.body.style.backgroundRepeat="round"
      //mainScreen
      mainScreen.innerHTML+="<h1>Welcome to the flappy birds</h1>"
      mainScreen.innerHTML+="<img src='welcome.png'>"

      tableInput.style.display="none"
      addResult.style.display="none"
      start.style.display="none"
      startMenu.style.display="inline"
      mainButton.style.color="#3498db"
      recordsButton.style.color="white"
      startMenu.style.color="white"
      about.style.color="white"
      startBird.style.display="none"
      reload.style.display="none"
      break;
    case "Records":
      mainScreen.innerHTML = "";
      playScreen.innerHTML=""
      aboutScreen.innerHTML=""
      tableInput.style.display="block"
      tableInput.style.height=61+"px"
      document.body.style.backgroundImage = "url('records.png')";
      document.body.style.backgroundAttachment="fixed"
      document.body.style.backgroundSize="contain";
      document.body.style.backgroundRepeat="round"
      start.style.display="none"
      addResult.style.display="none"
      startMenu.style.display="inline"
      recordsButton.style.color="#3498db"
      startMenu.style.color="white"
      about.style.color="white"
      mainButton.style.color="white"
      startBird.style.display="none"
      reload.style.display="none"
      break;
      case "About":
      mainScreen.innerHTML=""
      recordsScreen.innerHTML=""
      playScreen.innerHTML=""
      aboutScreen.innerHTML+="<h2>Hello, my name is Dmitri Shemet. Welcome to my game. This web application is my final project within the course  'Development of web applications in JavaScript' at IT-Academy. That is my first complete web application.  I really want to improve it, so let's make this game better together.  Below on that page I left  links to my social networks, you can write me  your impressions and  suggestions of any improvements for this game. That's all I wanted to tell you, now start the game! P.S. Try to beat my record :)</h2>"
      aboutScreen.innerHTML+= '<div class="telegram"><a href="https://t.me/DmitriShemet" target="_blank"></a></div>'
      aboutScreen.innerHTML+= '<div class="vk"><a href="https://vk.com/id143649828" target="_blank"> </a></div>'

      tableInput.style.display = "none";
      document.body.style.backgroundImage = "url('about.png')"
      document.body.style.backgroundAttachment="fixed"
      document.body.style.backgroundSize="contain"
      document.body.style.backgroundRepeat="round"
      start.style.display="none"
      addResult.style.display="none"
      startMenu.style.display="inline"
      about.style.color="#3498db"
      mainButton.style.color="white"
      recordsButton.style.color="white"
      startMenu.style.color="white"
      startBird.style.display="none"
      reload.style.display="none"
      break;
      case "Play":
        mainScreen.innerHTML=""
        aboutScreen.innerHTML=""
        recordsScreen.innerHTML=""
        tableInput.style.display = "none";
        document.body.style.backgroundImage = "url('play.gif')";
        document.body.style.backgroundAttachment="fixed"
        document.body.style.backgroundSize="contain";
        document.body.style.backgroundRepeat="round"
        start.style.display="inline"
        startMenu.style.color="#3498db"
        about.style.color="white"
        recordsButton.style.color="white"
        mainButton.style.color="white"
        startBird.style.display="none"
        canvas.style.display="none"
        addResult.style.display="none"
        reload.style.display="none"
        break;
        case "Game":
         document.body.style.backgroundImage = "url('game.png')";
         document.body.style.backgroundAttachment="fixed"
         document.body.style.backgroundSize="contain";
         document.body.style.backgroundRepeat="round"
         startBird.style.display="block"
        startBird.addEventListener('click',play,false)
        reload.addEventListener('click',play,false)
        mainScreen.innerHTML=""
        aboutScreen.innerHTML=""
        recordsScreen.innerHTML=""
        tableInput.style.display = "none";
        start.style.display="none"
        startMenu.style.color="white"
        about.style.color="white"
        recordsButton.style.color="white"
        mainButton.style.color="white"
        reload.style.display="none"
        break;
  
  
  }
  
  
}

function switchToState(newState) {
  // устанавливаем закладку УРЛа
  // нужно для правильной работы кнопок навигации браузера
  // (т.к. записывается новый элемент истории просмотренных страниц)
  // и для возможности передачи УРЛа другим лицам
  var stateStr = newState.pagename;
  location.hash = stateStr;
  // switchToStateFromURLHash();

  // АВТОМАТИЧЕСКИ вызовется switchToStateFromURLHash()
  // т.к. закладка УРЛа изменилась (ЕСЛИ она действительно изменилась)
}

function switchToMainPage() {
  switchToState({ pagename: "Main" });
  canvas.style.display = "none"

}

function switchToAboutPage() {
  switchToState({ pagename: "About" });
  canvas.style.display = "none";
}

function switchToRecordsPage() {
  switchToState({ pagename: "Records" });
 
  canvas.style.display = "none";
}
function switchToPlayPage() {
  switchToState({ pagename: "Play" });
  canvas.style.display = "none";
  document.body.style.backgroundImage = "url('play.gif')";
  document.body.style.backgroundAttachment="fixed"
  document.body.style.backgroundSize="contain"
  document.body.style.backgroundRepeat="round"
  start.style.display="inline"
  tableInput.style.display="none"
  addResult.style.display="none"
}
function switchToGamePage(){
  switchToState({ pagename: "Game" });

}
// переключаемся в состояние, которое сейчас прописано в закладке УРЛ
switchToStateFromURLHash();