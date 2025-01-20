import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get('city');

    if (!city) {
        return NextResponse.json({ error: 'Введите название города' }, { status: 400 });
    }

    try {
        const response = await fetch(`http://127.0.0.1:8000/weather?city=${city}`);
        if (!response.ok) {
            throw new Error('Ошибка при запросе к FastAPI');
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
