/* Global Variables */

// zip code input
let zip = document.getElementById("zip")
// feeling input
let feeling = document.getElementById("feelings")

// Personal API Key for OpenWeatherMap API
const apiKey = 'f3df22d37e0ab270347f62a9b3d4cc89&units=imperial';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getDate()+' / '+ (d.getMonth() + 1)+' / '+ d.getFullYear();



document.getElementById("generate").addEventListener("click",function(){
    triggerAll()
})


const postGeoData = async (url="", data = [])=>{
    const resp = await fetch(url,{
        method:"POST",
        credentials:"same-origin",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify(data)
    })
    try{
        const newData = await resp.json()
        console.log(newData)
        return newData
    }catch(error){
        console.log("error",error)
    }
}

const retriveData = async (url="")=>{
    const resp = await fetch(url)
    try {
    // Transform into JSON
    const allData = await resp.json()
    console.log(allData)
    document.getElementById("date").innerHTML = `Date: ${newDate}`;
    document.getElementById('temp').innerHTML = `Temp now is ${Math.round(allData.temp)} degrees`;
    document.getElementById('content').innerHTML = `My feelings:  ${allData.feelings} `;
    }
    catch(error) {
        console.log("error", error);
    }
}



function triggerAll(){
    fetch(`http://api.openweathermap.org/geo/1.0/zip?zip=${zip.value}&appid=${apiKey}`)
    .then((response)=>{return response.json()})
    .then((response)=>fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${response.lat}&lon=${response.lon}&appid=${apiKey}`))
    .then((response)=>{return response.json()})
    .then((response)=>postGeoData("/geo",[response,feeling.value]))
    .then(retriveData("/latlon"))
}