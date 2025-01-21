from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import requests

app = FastAPI()

# Ваш ключ API OpenWeatherMap
API_KEY = "4f14c3e6f5db34ec1757665f8e40e33c"
BASE_URL = "https://api.openweathermap.org/data/2.5/weather"

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://frontend:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/weather")
async def get_weather(city: str):
    try:
        # Увеличение времени ожидания до 10 секунд
        timeout_duration = 10

        # Запрос к API OpenWeatherMap для получения информации о погоде
        weather_params = {
            "q": city,
            "appid": API_KEY,
            "units": "metric",  # Использование метрических единиц (градусы Цельсия)
            "lang": "ru"  # Локализация на русский язык
        }
        weather_response = requests.get(BASE_URL, params=weather_params, timeout=timeout_duration)

        # Проверка статуса ответа
        if weather_response.status_code != 200:
            raise HTTPException(
                status_code=weather_response.status_code,
                detail=f"Ошибка запроса погоды: {weather_response.text}"
            )

        weather_data = weather_response.json()

        # Проверка наличия данных о погоде
        if "weather" not in weather_data or "main" not in weather_data:
            raise HTTPException(status_code=404, detail="Погода не найдена.")

        # Возврат данных
        return {
            "name": weather_data["name"],
            "temp": weather_data["main"]["temp"],
            "description": weather_data["weather"][0]["description"].capitalize()
        }

    except Exception as e:
        # Логирование ошибки
        raise HTTPException(status_code=500, detail=f"Сбой: {str(e)}")
