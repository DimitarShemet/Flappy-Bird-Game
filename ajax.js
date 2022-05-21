var ajaxHandlerScript="https://fe.it-academy.by/AjaxStringStorage2.php";
var updatePassword;
var stringName='SHEMET_FLAPPYBIRD_TABLEOFRECORDS';       // Добавить  строку на сервер
let info           // Основной массив



function restoreInfo() {                    // Функция чтения таблицы из строки на сервере
    $.ajax(
        {
            url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
            data : { f : 'READ', n : stringName },
            success : readReady, error : errorHandler
        }
    );

}

function readReady(callresult) {
    if ( callresult.error!=undefined )
        alert(callresult.error);
    else if ( callresult.result!="" ) {
        info=JSON.parse(callresult.result);
        let array=info;
        return(array)
    }
}

function errorHandler(jqXHR,statusStr,errorStr) {
    alert(statusStr+' '+errorStr);
}
restoreInfo()   

 let table = document.getElementById('table');

 function buildTable(){   // Функция, которая построит таблицу из массива
   let array= info
   array.length=10
       array.sort((a, b) => a[1] > b[1] ? -1 : 1);
	for (let subArr of array) {
	let tr = document.createElement('tr');
	
	for (let elem of subArr) {
		let td = document.createElement('td');
        td.style.padding=mapWidth/250+"px"
		td.innerHTML = elem
		tr.appendChild(td)
        
	}
	table.appendChild(tr)
}
	
}

function addScore(){    // Функция, которая добавит имя и результат  в таблицу           
    let userName=prompt('Введите свое имя')
    let userScore=score      
    let scoreArray=[userName,userScore]        
    info.push(scoreArray)                  //Заносим данные в исходный массив
    storeInfo()
   
}
function storeInfo() {                        //Функция, которая апдейтит значения в таблице на сервере
    updatePassword=Math.random();
    $.ajax( {
            url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
            data : { f : 'LOCKGET', n : stringName, p : updatePassword },
            success : lockGetReady, error : errorHandler
        }
    );
}

function lockGetReady(callresult) {
    if ( callresult.error!=undefined )
        alert(callresult.error);
    else {
        // нам всё равно, что было прочитано -
        // всё равно перезаписываем
     
        $.ajax( {
                url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
                data : { f : 'UPDATE', n : stringName, v : JSON.stringify(info), p : updatePassword },
                success : updateReady, error : errorHandler
            }
        );
    }

}

function updateReady(callresult) {
    if ( callresult.error!=undefined){
        alert(callresult.error);
    }
    alert("Ваш результат добавлен!")
}
