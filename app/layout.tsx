import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Inbox Guardian',
  description: 'Email triage dashboard',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
