import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Literasea | Web3 Books',
  description: 'Literasea is a web3 book platform that allows authors to publish their books on the blockchain and readers to purchase them with cryptocurrency.',
  icons: {
    icon: './favicon.ico'
  }
}



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}