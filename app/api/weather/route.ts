import { NextResponse } from 'next/server';
import { WeatherData } from '../../types/weather';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get('city')
    if (!city) {
        return NextResponse.json ({ error: 'City is required' }, { status: 400 })
    }

    const apiKey = process.env.OPENWEATHERMAP_API_KEY;
    
    if (!apiKey) {
        console.error('API key is missing');
        return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const weatherRes = await fetch(url)
        if (!weatherRes.ok) {
            console.error('API error response:', weatherRes.status, weatherRes.statusText);
            return NextResponse.json({ error: 'City not found' }, { status: 404 });
        }
        const data: WeatherData = await weatherRes.json();
        console.log('API weather data:', data);
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error in API route:', error);
        return NextResponse.json({ error: 'Failed to fetch weather data' }, { status: 500 });
    }
}
