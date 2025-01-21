from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import requests

app = FastAPI()

# Ваш ключ API AccuWeather
API_KEY = "1OW5pCs0doJ9CJ0pX7JmEiElmdDcDDTF"
BASE_URL = "http://dataservice.accuweather.com"

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # URL вашего Next.js
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/weather")
async def get_weather(city: str):
    try:
        # Получение информации о городе
        location_url = f"{BASE_URL}/locations/v1/cities/search"
        location_params = {"apikey": API_KEY, "q": city}
        location_response = requests.get(location_url, params=location_params)
        location_data = location_response.json()

        if not location_data:
            raise HTTPException(status_code=404, detail="Город не найден.")

        location_key = location_data[0]["Key"]

        # Получение информации о погоде
        weather_url = f"{BASE_URL}/currentconditions/v1/{location_key}"
        weather_params = {"apikey": API_KEY}
        weather_response = requests.get(weather_url, params=weather_params)
        weather_data = weather_response.json()

        if not weather_data:
            raise HTTPException(status_code=404, detail="Погода не найдена.")

        return {
            "name": city,
            "temp": weather_data[0]["Temperature"]["Metric"]["Value"],
            "description": weather_data[0]["WeatherText"]
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
