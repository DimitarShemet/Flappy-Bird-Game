window.onhashchange = switchToStateFromURLHash;
let SPAState = {};

function switchToStateFromURLHash() {
  let URLHash = window.location.hash;
  let stateStr = URLHash.substr(1);
  let mainScreen = document.getElementById("mainScreen")
  let aboutScreen=document.getElementById("aboutScreen")
  let recordsScreen = document.getElementById("recordsScreen")
  let playScreen = document.getElementById("recordsScreen")
  // Настроки перехода
  if (stateStr != "") {
    // если закладка непустая, читаем из неё состояние и отображаем
    let parts = stateStr.split("_");
    SPAState = { pagename: parts[0] }; // номер страницы
  } else SPAState = { pagename: "Main" };
  

  // Настройки динамических элементов
  table.style.display = "none";
  let buildTable=document.getElementById('tableRecords')
  document.body.prepend(buildTable)
  
  
  
  switch (SPAState.pagename) {
    case "Main":
      recordsScreen.innerHTML=""
      aboutScreen.innerHTML=""
      playScreen.innerHTML=""
      document.body.style.backgroundImage = "url('main.png')"
      document.body.style.backgroundAttachment="fixed"
      document.body.style.backgroundSize="contain";
      document.body.style.backgroundRepeat="round"
      mainScreen.innerHTML = "<h3>Главная</h3>"
      buildTable.style.display="none"
      break;
    case "About":
      mainScreen.innerHTML=""
      recordsScreen.innerHTML=""
      playScreen.innerHTML=""
      buildTable.style.display = "none";
      document.body.style.backgroundImage = "url('about.png')"
      document.body.style.backgroundAttachment="fixed"
      document.body.style.backgroundSize="contain"
      document.body.style.backgroundRepeat="round"
      break;
    case "Records":
      mainScreen.innerHTML = "";
      playScreen.innerHTML=""
      aboutScreen.innerHTML=""
      recordsScreen.innerHTML += "<h3>Рекорды</h3>";
      buildTable.style.display="inline"
      document.body.style.backgroundImage = "url('records.png')";
      document.body.style.backgroundAttachment="fixed"
      document.body.style.backgroundSize="contain";
      document.body.style.backgroundRepeat="round"
      break;
      case "Play":
        mainScreen.innerHTML=""
        aboutScreen.innerHTML=""
        recordsScreen.innerHTML=""
        buildTable.style.display = "none";
        playScreen.innerHTML="<h3>Готовы начать игру?</h3>";
        document.body.style.backgroundImage = "url('play.gif')";
        document.body.style.backgroundAttachment="fixed"
        document.body.style.backgroundSize="contain";
        document.body.style.backgroundRepeat="round"
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
  canvas.style.display = "none";
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
  
}
// переключаемся в состояние, которое сейчас прописано в закладке УРЛ
switchToStateFromURLHash();