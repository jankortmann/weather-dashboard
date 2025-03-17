export interface WeatherData {
    name: string;
    main: { 
        temp: number 
        temp_min: number
        temp_max: number
        pressure: number
        humidity: number
        feels_like: number
    };
    weather: { description: string; icon: string }[];
    wind: { speed: number };
}
