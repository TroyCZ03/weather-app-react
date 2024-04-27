import React, { useState } from 'react';
import "./WeatherApp.css"

// Icon images
import search_icon from '../Assets/search.png';
import clear_icon from '../Assets/clear.png';
import cloud_icon from '../Assets/clear.png';
import drizzle_icon from '../Assets/drizzle.png';
import rain_icon from '../Assets/rain.png';
import snow_icon from '../Assets/snow.png';
import wind_icon from '../Assets/wind.png'
import humidty_icon from '../Assets/humidity.png';

const WeatherApp = () => {


    let api_key = "98dfa7b282a50d683ecaef2c4bddce65";
    // create search function

    // dynamic weathe icon;
    const [wicon, setWicon] = useState(cloud_icon);

    const search = async () => {


        const element =  document.getElementsByClassName("cityInput");
        if(element[0].value === "") 
        {
            return 0;
        }
        // fetches data stores in response variable
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Imperial&appid=${api_key}`;
        // will wait until parsed into json
        let response = await fetch(url);
        //data parsed into jason format
        let data = await response.json();

        const humidity = document.getElementsByClassName("humidity-percent")
        const wind = document.getElementsByClassName("wind-rate");
        const tempature = document.getElementsByClassName("weather-temp");
        const location = document.getElementsByClassName("weather-location");

        humidity[0].innerHTML = data.main.humidity+"%";
        wind[0].innerHTML = data.wind.speed+"mph";
        tempature[0].innerHTML = data.main.temp+"f°";
        location[0].innerHTML = data.name;

        if(data.weather[0].icon === "01d" || data.weather[0].icon ==="01n") {
            setWicon(drizzle_icon);
        } else if (data.weather[0].icon === "02d" || data.weather[0].icon === "02n"|| data.weather[0].icon === "03d"|| data.weather[0].icon === "03n" || data.weather[0].icon === "04d" || data.weather[0].icon === "04n") {
            setWicon(cloud_icon);
        }  else if (data.weather[0].icon === "09d" || data.weather[0].icon === "09n"|| data.weather[0].icon === "10d") {
            setWicon(drizzle_icon);
        } else if(data.weather[0].icon ==="13D" || data.weather[0].icon ==="13n") {
            setWicon(snow_icon)
        }

    }

    return (
        <div className= 'container'>
            <div className = "top-bar">
            <input type = 'text' className="cityInput" placeholder="Search"/>
           
            <div className="search-icon" onClick={()=>{search()}}>
                <img src = {search_icon}/>
                </div>
            </div>
            <div className="weather-image">
                <img src={wicon} alt=""/>
            </div>
            <div className="weather-temp">24°c</div>
            <div className="weather-location">London</div>
            <div className="data-container"> 
                <div className="element"> 
                <img src={humidty_icon} alt="" className="icon" />
                <div className="data">
                    <div className="humidity-percent">64%</div>
                    <div className="text">Hunidity</div>
                </div>
                </div>
                <div className="element"> 
                <img src={wind_icon} alt="" className="icon" />
                <div className="data">
                    <div className="wind-rate">18 km/hr</div>
                    <div className="text">Wind-Speed</div>
                    </div>
                </div>
        </div>
        </div>
    )
}

export default WeatherApp;
