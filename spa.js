window.onhashchange=switchToStateFromURLHash;
let  SPAState={}
function switchToStateFromURLHash() {
    let  URLHash=window.location.hash
     let stateStr=URLHash.substr(1)
     if ( stateStr!="" ) { // если закладка непустая, читаем из неё состояние и отображаем
        let  parts=stateStr.split("_")
        SPAState={ pagename: parts[0] }   // номер страницы
     } 
    
     else
    SPAState={pagename:'Main'}
    table.style.display="none"
    let tableRecords=document.getElementById('tableRecords')
    let pageHTML="";
    switch ( SPAState.pagename ) {
      case 'Main':
        pageHTML+="<h3 id='main'>Главная страница</h3>";
        let records= document.getElementById('TABLE')
        pageHTML+=records
        document.body.style.backgroundAttachment="fixed"
        document.body.style.backgroundSize="contain";
        document.body.style.backgroundRepeat="round"
        document.body.style.backgroundImage = "url('background.png')"
        break;
      case 'About':
      
        tableRecords.style.display="none"
        break;
        case 'Records':
          pageHTML+="<h3>Рекорды</h3>";
         
          tableRecords.style.display="inline"
          document.body.style.backgroundImage = "url('records.png')";
          document.body.style.backgroundAttachment="fixed"
          document.body.style.backgroundSize="contain";
          document.body.style.backgroundRepeat="round"
            break;
    }
    document.getElementById('IPage').innerHTML=pageHTML;
    
}



function switchToState(newState) {
    // устанавливаем закладку УРЛа
    // нужно для правильной работы кнопок навигации браузера
    // (т.к. записывается новый элемент истории просмотренных страниц)
    // и для возможности передачи УРЛа другим лицам
    var stateStr=newState.pagename;
    location.hash=stateStr;

    // АВТОМАТИЧЕСКИ вызовется switchToStateFromURLHash()
    // т.к. закладка УРЛа изменилась (ЕСЛИ она действительно изменилась)
  }

  function switchToMainPage() {
    switchToState( { pagename:'Main' } );
    canvas.style.display="none"
  }


  function switchToAboutPage() {
    switchToState( { pagename:'About' } );
    canvas.style.display="none"

  }
  function switchToRecordsPage() {
    switchToState( { pagename:'Records' } );
    canvas.style.display="none"

  }
  // переключаемся в состояние, которое сейчас прописано в закладке УРЛ
  switchToStateFromURLHash();

 