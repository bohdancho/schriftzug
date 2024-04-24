import { notFound } from 'next/navigation'
import { getPackByIdWithWords } from '~/server/queries'
import { Game } from './_components'
import { Suspense } from 'react'
import { Skeleton } from '~/components/ui/skeleton'
import { Button } from '~/components/ui/button'
import Link from 'next/link'
import { Undo2 } from 'lucide-react'
import type { Pack, Word } from '~/server/db/schema'

export default async function Page({ params: { packId } }: { params: { packId: string } }) {
    return (
        <div className='flex h-full flex-col py-4'>
            <Suspense fallback={<PageContent skeleton />}>
                <PageLoader packId={packId} />
            </Suspense>
        </div>
    )
}

async function PageLoader({ packId }: { packId: string }) {
    const pack = await getPackByIdWithWords(+packId)
    if (!pack) notFound()
    return <PageContent pack={pack} words={pack.words} />
}

type PageContentProps =
    | { pack?: Pack; words?: Word[]; skeleton?: false }
    | { pack?: undefined; words?: undefined; skeleton: true }
function PageContent({ pack, words }: PageContentProps) {
    return (
        <>
            <div className='relative border-b pb-4 text-5xl'>
                <h1 className='container grid h-14 grid-cols-[auto,1fr,auto] items-center gap-2'>
                    <PackIcon />
                    {pack?.name ? <span className='-mt-2'>{pack.name}</span> : <Skeleton className='h-full' />}
                    <Button variant='destructive' asChild>
                        <Link href='/'>
                            Go back <Undo2 className='ml-2' />
                        </Link>
                    </Button>
                </h1>
            </div>
            <div className='container h-full'>
                {pack && words ? <Game pack={pack} words={words} /> : <p className='pt-4 text-3xl'>Loading...</p>}
            </div>
        </>
    )
}

function PackIcon({ ...props }: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            fill='none'
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            viewBox='0 0 24 24'
            height='1em'
            width='1em'
            {...props}
        >
            <path d='M8 21h12a2 2 0 002-2v-2H10v2a2 2 0 11-4 0V5a2 2 0 10-4 0v3h4' />
            <path d='M19 17V5a2 2 0 00-2-2H4M15 8h-5M15 12h-5' />
        </svg>
    )
}
