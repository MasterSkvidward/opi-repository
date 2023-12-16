const BASE_URL = "../public/flights.json";
const API_URL = "http://localhost:3000";


async function fetchDataAsync (url = BASE_URL) {
   let response = await fetch(url);
   let data = await response.json();
   console.log(data)

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
