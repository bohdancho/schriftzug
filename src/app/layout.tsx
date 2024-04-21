import '~/styles/globals.css'

import { Inter } from 'next/font/google'
import { Toaster } from '~/components/ui/sonner'
import { Button } from '~/components/ui/button'

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
        <header className='sticky top-0 flex h-16 items-center justify-between gap-4 border-b bg-background px-4 md:px-6'>
            <h1 className='text-xl font-bold'>Schriftzug</h1>
            <Button variant='ghost'>Login</Button>
        </header>
    )
}
