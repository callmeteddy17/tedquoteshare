import Nav from '@/components/Nav';
import Provider from '@/components/Provider';
import '@/styles/globals.css';

export const metadata = {
  title: 'TedQuote',
  description: 'Share & Connect',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Provider>
        <body>
          <div className="main">
            <div className="gradient"></div>
          </div>

          <main className="app">
            <Nav />
            {children}
          </main>
        </body>
      </Provider>
    </html>
  );
}
