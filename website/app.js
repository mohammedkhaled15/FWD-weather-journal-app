/* Global Variables */

// zip code input
let zip = document.getElementById("zip")

// Personal API Key for OpenWeatherMap API
const apiKey = 'f3df22d37e0ab270347f62a9b3d4cc89&units=imperial';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getDate()+'.'+ (d.getMonth() + 1)+'.'+ d.getFullYear();

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
    // console.log(allData)
    }
    catch(error) {
        console.log("error", error);
    }
}

document.getElementById("generate").addEventListener("click",function(){
    retriveData("/latlon")
    triggerAll()
})

function triggerAll(){
    fetch(`http://api.openweathermap.org/geo/1.0/zip?zip=${zip.value}&appid=${apiKey}`)
    .then((response)=>{return response.json()})
    .then((response)=>postGeoData("/geo",response))
    .then((data)=>{
        retriveData("/latlon")
        console.log(data)
        // return data
    })
    .then((response)=>{console.log(response)})
}