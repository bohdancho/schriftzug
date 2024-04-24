import { notFound } from 'next/navigation'
import { getPackByIdWithWords } from '~/server/queries'
import { Game } from './_components'
import { Suspense } from 'react'
import { Skeleton } from '~/components/ui/skeleton'

export default async function PlayPackPage({ params: { packId } }: { params: { packId: string } }) {
    return (
        <div className='flex h-full flex-col py-4'>
            <Suspense fallback={<PageContentSkeleton />}>
                <PageContent packId={packId} />
            </Suspense>
        </div>
    )
}

async function PageContent({ packId }: { packId: string }) {
    const pack = await getPackByIdWithWords(+packId)
    if (!pack) notFound()

    return (
        <>
            <div className='relative border-b pb-4 text-5xl'>
                <h1 className='container grid h-14 grid-cols-[auto,1fr] items-center gap-2'>
                    <PackIcon />
                    <span className='-mt-2'>{pack.name}</span>
                </h1>
            </div>
            <div className='container h-full'>
                <Game pack={pack} words={pack.words} />
            </div>
        </>
    )
}

function PageContentSkeleton() {
    return (
        <>
            <div className='relative border-b pb-4 text-5xl'>
                <h1 className='container grid h-14 grid-cols-[auto,1fr] items-center gap-2'>
                    <PackIcon />
                    <Skeleton className='h-full' />
                </h1>
            </div>
            <div className='container pt-4 text-3xl'>
                <p>Loading...</p>
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
