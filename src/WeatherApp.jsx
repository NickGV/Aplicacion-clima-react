import { useState } from "react";

export const WeatherApp = () => {
    const urlBase = "https://api.openweathermap.org/data/2.5/weather";
    const API_KEY = "27bd5af2b01679c9b581e24c277b2294";
    const difKelvin = 273.15;
    const [ciudad, setCiudad] = useState("");
    const [dataClima, setDataClima] = useState(null);

    const handleCambioCiudad = (e) => {
        setCiudad(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (ciudad.length > 0) {
            fetchClima();
        }
    };

    const fetchClima = async () => {
        try {
            const response = await fetch(
                `${urlBase}?q=${ciudad}&appid=${API_KEY}`
            );
            const data = await response.json();
            console.log(data);
            setDataClima(data);
        } catch (error) {
            console.error("ocurrio el siguiente problema: ", error);
        }
    };
    return (
        <div className="container">
            <h1>Aplicacion de clima</h1>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={ciudad}
                    onChange={(e) => handleCambioCiudad(e)}
                />
                <button type="submit">Buscar</button>
            </form>
            {dataClima && (
                <div>
                    <h2>{dataClima.name}</h2>
                    <p>
                        Temperatura:{" "}
                        {parseInt(dataClima?.main.temp - difKelvin)}ºC
                    </p>
                    <p>Humedad: {parseInt(dataClima.main.humidity)}</p>
                    <p>
                        Condicion meteorologica{" "}
                        {dataClima.weather[0].description}
                    </p>
                    <img
                        src={`https://openweathermap.org/img/wn/${dataClima.weather[0].icon}@2x.png`}
                        alt=""
                    />
                </div>
            )}
        </div>
    );
};
