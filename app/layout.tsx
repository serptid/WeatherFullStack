
import type { ReactNode } from 'react';

export const metadata = {
    title: 'Приложение Погоды',
    description: 'Узнавайте погоду в любом городе!'
};

export default function RootLayout({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <html lang="ru">

            <body style={{ margin: 0,padding: 0,fontFamily: 'Arial, sans-serif' }}>

                <header style={{ backgroundColor: '#0070f3',
                    color: 'white',
                    padding: '10px 20px' }}>

                    <h1 style={{ margin: 0 }}>Приложение Погоды</h1>

                </header>

                <main style={{ padding: '20px' }}>{children}</main>

                <footer style={{
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    textAlign: 'center',
                    padding: '10px 0',
                    backgroundColor: '#f1f1f1',
                    }}>
                    <p>© 2025 Приложение Погоды. Все права защищены.</p>
                </footer>

            </body>
        </html>
    );
}