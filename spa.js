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
    switch ( SPAState.pagename ) {
      case 'Main':
        document.body.style.backgroundAttachment="fixed"
          document.body.style.backgroundSize=100+"%"+100+"%"
          document.body.style.backgroundImage = "url('start.jpg')";
       
        break;
      case 'About':
      
        tableRecords.style.display="none"
        break;
        case 'Records':
          table.style.display="block"
          buildTable()
          tableRecords.style.display="inline"
          document.body.style.backgroundImage = "url('records.png')";
            break;
    }



}
//let inputRecords=document.getElementById('records')
 //inputRecords.style.width=400+"px"

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

