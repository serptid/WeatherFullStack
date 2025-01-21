'use client';

import { useState } from 'react';

// Главная страница приложения
export default function Home() {
    // Состояние для хранения введенного города
    const [city, setCity] = useState('');
    // Состояние для хранения информации о погоде
    const [weather, setWeather] = useState<any | null>(null);
    // Состояние для хранения ошибок
    const [error, setError] = useState('');

    // Функция для запроса погоды
    const fetchWeather = async () => {
        setError(''); // Сбрасываем ошибку
        setWeather(null); // Очищаем данные о погоде

        // Проверяем, если поле города пустое
        if (!city) {
            setError('Введите название города.'); // Устанавливаем сообщение об ошибке
            return;
        }

        try {
            // Делаем запрос к API для получения данных о погоде
            const response = await fetch(`/api/weather?city=${city}`);
            if (!response.ok) {
                // Если ответ не успешен, выбрасываем ошибку
                throw new Error('Город не найден или произошла ошибка.');
            }

            // Парсим JSON-ответ от API
            const data = await response.json();
            setWeather(data); // Сохраняем данные о погоде
        } catch (err: any) {
            // Обрабатываем ошибки запроса
            setError(err.message);
        }
    };

    return (
        // Основной контейнер с центровкой содержимого
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh', fontFamily: 'Arial, sans-serif' }}>
            <div style={{ textAlign: 'center' }}> {/* Центровка текста */}
                <h1 style={{ fontSize: '3rem' }}>Погода</h1> {/* Заголовок страницы */}
                <input
                    type="text" // Поле ввода города
                    placeholder="Введите город" // Подсказка в поле ввода
                    value={city} // Привязка к состоянию
                    onChange={(e) => setCity(e.target.value)} // Обновление состояния при вводе
                    style={{ padding: '12px', marginRight: '10px', fontSize: '1.2rem', width: '300px' }} // Стилизация поля ввода
                />
                <button
                    onClick={fetchWeather} // Обработчик нажатия кнопки
                    style={{ padding: '12px 20px', fontSize: '1.2rem' }} // Стилизация кнопки
                >
                    Узнать погоду
                </button>

                {/* Вывод сообщения об ошибке, если оно есть */}
                {error && <p style={{ color: 'red', marginTop: '20px', fontSize: '1.2rem' }}>{error}</p>}

                {/* Вывод данных о погоде, если они есть */}
                {weather && (
                    <div style={{ marginTop: '20px', fontSize: '1.5rem' }}>
                        <h2>Погода в {weather.name}</h2> {/* Название города */}
                        <p>Температура: {weather.temp}°C</p> {/* Температура */}
                        <p>Описание: {weather.description}</p> {/* Описание погоды */}
                    </div>
                )}
            </div>
        </div>
    );
}