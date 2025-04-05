import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Diabetes Prediction App',
  description: 'Predict diabetes risk with machine learning',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className} cz-shortcut-listen="true">
        <header className="bg-blue-600 text-white p-4">
          <div className="container mx-auto">
            <h1 className="text-xl font-bold">Diabetes Prediction Tool</h1>
          </div>
        </header>
        {children}
        <footer className="bg-gray-100 py-4">
          <div className="container mx-auto text-center text-gray-600 text-sm">
            <p>Disclaimer: This tool is for educational purposes and not a substitute for professional medical advice.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}