'use client';

import { useState } from 'react';
import styles from '../Home.module.scss'

interface WeatherData {
    name: string;
    main: { temp: number };
    weather: { description: string; icon: string}[];
}

export default function WeatherForm({ initialWeather }: { initialWeather: WeatherData | null }) {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState<WeatherData | null>(initialWeather)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!city) return

        const res = await fetch(`/api/weather?city=${city}`);
        const data = await res.json();
        if (res.ok) {
            setWeather(data)
        } else {
            alert("city not found")
            setWeather(null);
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.formwrapper}>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Enter city name"
                        aria-label="City name"
                        className={styles.input}
                    />
                    <button type='submit' className={styles.button}>
                        Get Weather
                    </button>
                </form>
            </div>

            {weather && weather.main && weather.weather?.[0] ? (
                <div className={styles.wrapper}>
                    <div className={styles.weather}>
                        <div className={styles.weathercontainer}>
                            <div className={styles.weatherinfo}>
                                <h2>{weather.name}</h2>
                                <div className={styles.weatherwrapper}>
                                    <h3>{Math.round(weather.main.temp)}°C</h3>
                                    <div className={styles.weatherminmaxwrapper}>
                                        <div className={styles.weatherminmax}>
                                            <p>{Math.round(weather.main.temp_min)}°C</p>
                                            <p>Min</p>
                                        </div>
                                        <div className={styles.weatherminmax}>
                                            <p>{Math.round(weather.main.temp_max)}°C</p>
                                            <p>Max</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <img
                                    src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                                    alt='Weather icon'
                                />
                        </div>
                    </div>
                    <div className={ styles.weathercards }>
                        <div className={styles.weathercardwrapper}>
                            <div className={styles.weathercardcolumn}>
                                <div className={styles.weathercard}>
                                    <h3>Feels like</h3>
                                    <h4>{Math.round(weather.main.feels_like)}°C</h4>
                                </div>
                                <div className={styles.weathercard}>
                                    <h3>Humidity</h3>
                                    <h4>{weather.main.humidity}%</h4>
                                </div>
                            </div>
                            <div className={styles.weathercardcolumn}>
                                <div className={styles.weathercard}>
                                    <h3>Wind</h3>
                                    <h4>{weather.wind.speed} km/h</h4>
                                </div>
                                <div className={styles.weathercard}>
                                    <h3>Pressure</h3>
                                    <h4>{weather.main.pressure} hPa</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <p>No weather data available</p>
            )}
        </div>
    );
}
