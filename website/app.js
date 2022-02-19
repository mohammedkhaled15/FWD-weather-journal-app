/* Global Variables */

// zip code input
let zip = document.getElementById("zip")
// feeling input
let feeling = document.getElementById("feelings")

// Personal API Key for OpenWeatherMap API
const apiKey = 'f3df22d37e0ab270347f62a9b3d4cc89&units=metric';
const baseUrl = "https://api.openweathermap.org/geo/1.0/zip?zip="

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getDate()+' / '+ (d.getMonth() + 1)+' / '+ d.getFullYear();



document.getElementById("generate").addEventListener("click",function(){
    if(zip.value === "" || zip.value.length!==5){
        alert("incorrect or empty zip code")
    }else{
        triggerAll()
    }
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
    const allData = await resp.json();
    // console.log(allData)
    document.getElementById('city').innerHTML = `City Name:  ${allData.name} `;
    document.getElementById("date").innerHTML = `Date: ${newDate}`;
    document.getElementById('temp').innerHTML = `Temp now is <span>${Math.round(allData.temp)}</span> degrees`;
    document.getElementById('content').innerHTML = `My feelings:  ${allData.feelings} `;
    document.getElementById("icon").setAttribute("src",` http://openweathermap.org/img/wn/${allData.icon}@2x.png`)
    }
    catch(error) {
        console.log("error", error);
    }
}



function triggerAll(){

    fetch(`${baseUrl}${zip.value}&appid=${apiKey}`)

    .then((response)=>{return response.json()})

    // .then((response)=>{
    //     response.cod === "404"?alert("Cannot Find ZipCode"):response
    //     // console.log(response.cod)
    // })
    // .then((response)=>console.log(response))

    .then((response)=>fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${response.lat}&lon=${response.lon}&appid=${apiKey}`))

    .then((response)=>{return response.json()})

    .then((response)=>postGeoData("/geo",[response,feeling.value]))

    .then(retriveData("/allData"))

}