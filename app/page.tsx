import WeatherForm from './components/WeatherForm';

interface WeatherData {
  name: string;
  main: { temp: number };
  weather: { description: string; icon: string }[];
}

async function fetchWeather(city: string): Promise<WeatherData | null> {
  const apiKey = process.env.OPENWEATHERMAP_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) {
      throw new Error('Failed to fetch weather data');
    }
    const data: WeatherData = await res.json();
    return data;
  } catch (error) {
    return null;
  }
}

export default async function Page() {
  const defaultCity = 'Frankfurt'
  const initialWeather = await fetchWeather(defaultCity);

  return <WeatherForm initialWeather={initialWeather} />;
}