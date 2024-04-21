import Image from 'next/image'

export default function HomePage() {
    return (
        <main className='container flex flex-col gap-6 py-4 text-2xl'>
            <h2 className='text-2xl font-semibold leading-none tracking-tight md:text-4xl'>
                Choose a word pack:
            </h2>
            <div className='grid grid-cols-[repeat(auto-fill,minmax(min(180px,40%),1fr))] gap-4'>
                {mockWordPacks.map((pack) => (
                    <div
                        key={pack.category}
                        className='flex cursor-pointer flex-col items-center overflow-clip rounded-md border-2 shadow-md'
                    >
                        <Image
                            className='w-full'
                            src={pack.image}
                            alt={pack.category}
                            width={200}
                            height={200}
                            style={{
                                width: '100%',
                                height: 'auto',
                            }}
                        />

                        <h3 className='p-2 lg:p-4'>{pack.category}</h3>
                    </div>
                ))}
            </div>
        </main>
    )
}

const mockWordPacks = [
    {
        category: 'Animals',
        image: 'https://picsum.photos/200/200?random=1',
    },
    {
        category: 'Food',
        image: 'https://picsum.photos/200/200?random=2',
    },
    {
        category: 'Travel',
        image: 'https://picsum.photos/200/200?random=3',
    },
    {
        category: 'Sports',
        image: 'https://picsum.photos/200/200?random=4',
    },
    {
        category: 'Nature',
        image: 'https://picsum.photos/200/200?random=5',
    },
    {
        category: 'Technology',
        image: 'https://picsum.photos/200/200?random=6',
    },
    {
        category: 'Music',
        image: 'https://picsum.photos/200/200?random=7',
    },
    {
        category: 'Movies',
        image: 'https://picsum.photos/200/200?random=8',
    },
    {
        category: 'History',
        image: 'https://picsum.photos/200/200?random=9',
    },
    {
        category: 'Space',
        image: 'https://picsum.photos/200/200?random=10',
    },
]
