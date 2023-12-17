const BASE_URL = "../public/flights.json";
const API_URL = "http://localhost:3000";

let tableRowCount = 1;

function handleSubmit(event) {
   event.preventDefault();
}



// -------------------------------------------------Manipulating data-------------------------------------------------
function clearInputs() {
   document.getElementById("placeFromInput").value = "";
   document.getElementById("placeToInput").value = "";
   document.getElementById("dateFromInput").value = "";
   document.getElementById("dateToInput").value = "";
   document.getElementById("fioInput").value = "";
}


function addData() {
   let placeFrom = document.getElementById("placeFromInput").value;
   let placeTo = document.getElementById("placeToInput").value;
   let dateFrom = document.getElementById("dateFromInput").value;
   let dateTo = document.getElementById("dateToInput").value;
   let fio = document.getElementById("fioInput").value;

   if (placeFrom === "" || placeTo === "" || dateFrom === "" || dateTo === "" || fio === "") {
      alert("Заполните все поля!");
      return;
   }
   insertData(placeFrom, placeTo, dateFrom, dateTo, fio);

}

function insertData(placeFrom, placeTo, dateFrom, dateTo, fio) {
   let table = document.getElementById("table");
   let newRow = table.insertRow(table.rows.length);

   newRow.insertCell(0).innerHTML = tableRowCount;
   newRow.insertCell(1).innerHTML = placeFrom;
   newRow.insertCell(2).innerHTML = placeTo;
   newRow.insertCell(3).innerHTML = dateFrom;
   newRow.insertCell(4).innerHTML = dateTo;
   newRow.insertCell(5).innerHTML = fio;
   newRow.insertCell(6).innerHTML =
   '<button class="button button_edit" onclick="editData(this)">Изменить</button>' +
   '<button class="button button_delete" onclick="deleteData(this)">Удалить</button>'
    ;

   tableRowCount++;
   clearInputs();
}

function deleteData(button) {
   let row = button.parentNode.parentNode;
   row.parentNode.removeChild(row);
   tableRowCount--;
}

function editData(button) { 
            
   let row = button.parentNode.parentNode; 
   
   let placeFrom = row.cells[1]; 
   let placeTo = row.cells[2]; 
   let dateFrom = row.cells[3]; 
   let dateTo = row.cells[4]; 
   let fio = row.cells[5]; 
   
   let placeFromInput = 
       prompt("Введите новое место отправления:", 
         placeFrom.innerHTML); 
   let placeToInput = 
       prompt("Введите новое место назначения:", 
         placeTo.innerHTML); 
   let dateFromInput = 
       prompt("Введите дату отправления:", 
         dateFrom.innerHTML 
       ); 
   let dateToInput = 
       prompt("Введите новую дату прилета:", 
         dateTo.innerHTML 
       ); 
   let fioInput = 
      prompt("Введите новое ФИО пассажира:", 
         fio.innerHTML 
      ); 

   placeFrom.innerHTML = placeFromInput; 
   placeTo.innerHTML = placeToInput; 
   dateFrom.innerHTML = dateFromInput; 
   dateTo.innerHTML = dateToInput; 
   fio.innerHTML = fioInput; 
} 



// -------------------------------------------------Requests-------------------------------------------------
async function fetchDataAsync (url) {
   let response = await fetch(url);
   let data = await response.json();

   data.forEach(element => {
      insertData(element.placeFrom, element.placeTo, element.dateFrom, element.dateTo, element.fio)
   });

   return data;
}

function postData (flight){
   let options = { 
      method: 'POST', 
      headers: { 
       'Content-Type': 'application/json;charset=utf-8' 
      }, 
      body: JSON.stringify(flight) 
     } 
   
   let response = fetch(API_URL, options); 
      response.then(res => 
      res.json()).then(d => { 
             console.log(d) 
      }) 
}


let form = document.getElementById("form");
form.addEventListener("submit", handleSubmit);
fetchDataAsync(BASE_URL)
