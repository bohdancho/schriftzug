import '~/styles/globals.css'

import { Inter } from 'next/font/google'
import { Toaster } from '~/components/ui/sonner'
import { Button } from '~/components/ui/button'
import Link from 'next/link'

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-sans',
})

export const metadata = {
    title: 'Schriftzug - your board game',
    description: 'A board game with AI features',
    icons: [{ rel: 'icon', url: '/favicon.ico' }],
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang='en'>
            <body className={`font-sans ${inter.variable} dark`}>
                <div className='grid min-h-screen grid-rows-[auto,1fr]'>
                    <Topnav />
                    {children}
                </div>
                <Toaster />
            </body>
        </html>
    )
}

function Topnav() {
    return (
        <header className='sticky top-0 h-16 border-b bg-background'>
            <div className='container flex h-full items-center justify-between gap-4'>
                <Link className='text-xl font-bold underline' href='/'>
                    Schriftzug
                </Link>
                <Button variant='ghost'>Login</Button>
            </div>
        </header>
    )
}
