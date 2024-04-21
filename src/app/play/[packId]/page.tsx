import { notFound } from 'next/navigation'
import { getPackById } from '~/server/queries'

export default async function Game({
    params: { packId },
}: {
    params: { packId: string }
}) {
    const pack = await getPackById(+packId)
    if (!pack) notFound()

    return <div className='container py-4'>{pack.name}</div>
}
