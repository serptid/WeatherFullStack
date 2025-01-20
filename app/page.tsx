'use client';

import { useState } from 'react';

export default function Home() {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState<any | null>(null);
    const [error, setError] = useState('');

    const fetchWeather = async () => {
        setError('');
        setWeather(null);

        if (!city) {
            setError('Введите название города.');
            return;
        }

        try {
            const response = await fetch(`/api/weather?city=${city}`);
            if (!response.ok) {
                throw new Error('Город не найден или произошла ошибка.');
            }

            const data = await response.json();
            setWeather(data);
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>Погода</h1>
            <input
                type="text"
                placeholder="Введите город"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                style={{ padding: '8px', marginRight: '10px' }}
            />
            <button onClick={fetchWeather} style={{ padding: '8px' }}>
                Узнать погоду
            </button>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {weather && (
                <div style={{ marginTop: '20px' }}>
                    <h2>Погода в {weather.name}</h2>
                    <p>Температура: {weather.temp}°C</p>
                    <p>Описание: {weather.description}</p>
                </div>
            )}
        </div>
    );
}
