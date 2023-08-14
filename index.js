const usertab = document.querySelector("[data-userWeather");
const  searchtab = document.querySelector("[data-SearchWeather]");
const usercontainer = document.querySelector(".weather-container");

const grantAccesscontainer = document.querySelector(".grant-location-container");
const searchForm = document.querySelector("[data-searchForm]");
const loadingscreen = document.querySelector(".loading-container");
const userInforcontainer = document.querySelector( ".user-infor-container");
const grantaccessbtn = document.querySelector("[data-grantAccess]");

const API_key = 'a173a9475981faa920d7213a714f3194';
// let city = 'dewas';
// var lat ;
// var lon ;

let currentTab = usertab;
currentTab.classList.add("current-tab");

getFromsessionStorage();

function switchTab(clickedtab){
   if(clickedtab != currentTab) {

    currentTab.classList.remove("current-tab");
    currentTab = clickedtab;
    currentTab.classList.add("current-tab");  

    if(!searchForm.classList.contains("active")){
        userInforcontainer.classList.remove("active");
        grantAccesscontainer.classList.remove("active");
        searchForm.classList.add("active");
    }
    else{
        searchForm.classList.remove("active");
        userInforcontainer.classList.remove("active");
        getFromsessionStorage();
    }
   }
}

usertab.addEventListener("click",()=>{
    switchTab(usertab);
});


searchtab.addEventListener("click",()=>{
    switchTab(searchtab);
});


function getFromsessionStorage(){
   const localcoordinates = sessionStorage.getItem("user-coordinates");
   if(!localcoordinates){
    grantAccesscontainer.classList.add("active");
   }
   else{
     const coordinates = JSON.parse(localcoordinates);
     fetchuserweatherinfor(coordinates);
   }

}

async function fetchuserweatherinfor(coordinates){
    const {lat ,lon} = coordinates;
    grantAccesscontainer.classList.remove("active");

    loadingscreen.classList.add("active");

    //API Call

    try{
        let responce = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}`);
    let data = await responce.json();
    loadingscreen.classList.remove("active");
    userInforcontainer.classList.add("active");

     randerweatherinfo(data);
    }
    catch(err){
     loadingscreen.classList.remove("active");     
    }
 }

 function randerweatherinfo(weatherinfo){
    // fetach element 

    const cityname = document.querySelector("[data-cityname]");
    const countyicon  = document.querySelector("[data-countyIcon]");
    const desc = document.querySelector("[data-weatherDisc]");
    const weathericon = document.querySelector("[data-waathericon]");
    const temp = document.querySelector("[data-temp]");
    const windspeed = document.querySelector("[data-windspeed]");
    const humidity = document.querySelector("[data-humidity]");
    const coudiness = document.querySelector("[data-cloudiness]");

    // fetch value from the data object 
    cityname.innerText = weatherinfo?.name;  
   
    countyicon.src = `https://flagcdn.com/144x108/${weatherinfo?.sys?.country.toLowerCase()}.png`;

    desc.innerText = weatherinfo?.weather?.[0]?.description;

      weathericon.src = `https://openweathermap.org/img/w/${weatherinfo?.weather?.[0]?.icon}.png`;

     temp.innerText = `${weatherinfo?.main?.temp}` + '°C';

     windspeed.innerText = `${weatherinfo?.wind?.speed}` + 'm/s' ;

     humidity.innerText = `${weatherinfo?.main?.humidity}` + '%';

     coudiness.innerText =`${ weatherinfo?.clouds.all}`+'%';

 }

  grantaccessbtn.addEventListener("click",getLocation)


// var x = document.getElementById("demo");
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert("Geolocation is not supported by this browser." );
  }
}

function showPosition(position) {
 const usercondinates ={
    lat : position.coords.latitude,
    lon : position.coords.longitude,   
} 
  sessionStorage.setItem("user-coordinates",JSON.stringify(usercondinates));
  fetchuserweatherinfor(usercondinates);
}

const searchinput = document.querySelector("[data-searchInput]");

searchForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    let cityname = searchinput.value;

    if(cityname === "") return;
    else fetchuserweatherinfo(cityname);
});

async function fetchuserweatherinfo(cityname){
    loadingscreen.classList.add("active");
    userInforcontainer.classList.remove("active");
    
    grantAccesscontainer.classList.remove("active");

    try{
            let responce = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${API_key}&units=metric`);
  
            let data = await responce.json();

            loadingscreen.classList.remove("active");
            userInforcontainer.classList.add("active");

            randerweatherinfo(data);
    
    }
    catch{
        alert("Plese enter valid city name");
    }

};
// async function weatherfind(){;
//     let responce = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}&units=metric`);
  
//     // let responce = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}`);

//     let data = await responce.json();

//     console.log(data);
// }



