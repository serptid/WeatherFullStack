import { NextResponse } from 'next/server'; // Импортируем NextResponse для формирования ответа сервера

// Обработчик GET-запросов
export async function GET(request: Request) {
    // Получаем параметры запроса из URL
    const { searchParams } = new URL(request.url); // Извлекаем параметры поиска из URL
    const city = searchParams.get('city'); // Получаем значение параметра "city"

    // Проверяем, указан ли город в запросе
    if (!city) {
        // Если параметр "city" отсутствует, возвращаем ошибку 400 (Bad Request)
        return NextResponse.json({ error: 'Введите название города' }, { status: 400 });
    }

    try {
        // Отправляем запрос к API для получения данных о погоде
        const response = await fetch(`http://127.0.0.1:8000/weather?city=${city}`); // Подставляем название города в URL

        // Проверяем успешность ответа
        if (!response.ok) {
            throw new Error('Ошибка при запросе к FastAPI'); // Генерируем ошибку, если ответ некорректен
        }

        // Парсим данные из ответа
        const data = await response.json();

        // Возвращаем данные о погоде клиенту
        return NextResponse.json(data);
    } catch (error) {
        // Обрабатываем ошибки и возвращаем сообщение об ошибке с кодом 500 (Internal Server Error)
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
