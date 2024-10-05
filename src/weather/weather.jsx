import React, { useState } from 'react';

const Weather = () => {
    let api = {
        key: "86f2b12395b1f614ebf7d81f5d3deac8",
        org: "https://api.openweathermap.org/data/2.5/weather"
    };

    let [search, setsearch] = useState("");
    let [whe, setwhe] = useState({});
    let [errorMessage, setErrorMessage] = useState("");

    function searchwheather() {
        fetch(`${api.org}?q=${search}&appid=${api.key}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("City not found");
                }
                return response.json();
            })
            .then(data => {
                if (data.main) {
                    setwhe(data.main);
                    setErrorMessage(''); 
                }
            })
            .catch(error => {
                setErrorMessage(error.message);
                setwhe({}); 
            });
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            searchwheather();
        }
    };

    return (
       
        <div className="weather-container">
             <h2>Weather App</h2>
            <input 
                type='text' 
                className="weather-input"
                onChange={(e) => setsearch(e.target.value)} 
                onKeyPress={handleKeyPress}
                placeholder="Enter city name"
            />
            <button onClick={searchwheather} className="weather-button">Search</button>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <div className="weather-info">
                {whe.temp && <p>Temperature: {whe.temp} °K</p>}
                {whe.pressure && <p>Pressure: {whe.pressure} hPa</p>}
            </div>
        </div>
    );
}

export default Weather;
