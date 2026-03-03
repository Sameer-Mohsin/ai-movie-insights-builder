import './globals.css';

export const metadata = {
  title: 'AI Movie Insight Builder',
  description:
    'Enter an IMDb ID and get rich movie details, cast info, ratings, and AI-powered audience sentiment analysis powered by Google Gemini.',
  keywords: ['movie', 'IMDb', 'sentiment analysis', 'AI', 'Gemini', 'reviews'],
  openGraph: {
    title: 'AI Movie Insight Builder',
    description: 'AI-powered movie analysis & audience sentiment',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0a0a0f" />
      </head>
      <body>{children}</body>
    </html>
  );
}
