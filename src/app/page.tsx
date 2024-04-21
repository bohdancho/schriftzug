import Image from 'next/image'
import { db } from '~/server/db'

export default async function HomePage() {
    const packs = await db.query.pack.findMany()

    return (
        <main className='container flex flex-col gap-6 py-4 text-2xl'>
            <h2 className='text-2xl font-semibold leading-none tracking-tight md:text-4xl'>
                Choose a word pack:
            </h2>
            <div className='grid grid-cols-[repeat(auto-fill,minmax(min(180px,40%),1fr))] gap-4'>
                {packs.map((pack) => (
                    <div
                        key={pack.name}
                        className='flex cursor-pointer flex-col items-center overflow-clip rounded-md border-2 shadow-md'
                    >
                        <Image
                            className='w-full'
                            src={pack.imgUrl}
                            alt={pack.name}
                            width={200}
                            height={200}
                            style={{
                                width: '100%',
                                height: 'auto',
                            }}
                        />

                        <h3 className='p-2 lg:p-4'>{pack.name}</h3>
                    </div>
                ))}
            </div>
        </main>
    )
}
