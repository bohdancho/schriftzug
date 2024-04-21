import Link from 'next/link'
import { Button } from '~/components/ui/button'
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardFooter,
} from '~/components/ui/card'

export default function NotFound() {
    return (
        <div className='flex items-center justify-center'>
            <Card className='w-[420px]'>
                <CardHeader className='text-center'>
                    <CardTitle className='text-4xl lg:text-7xl'>404</CardTitle>
                    <CardDescription>
                        The page you’re looking for doesn’t exist.
                    </CardDescription>
                </CardHeader>
                <CardFooter className='flex justify-center'>
                    <Button asChild>
                        <Link href='/'>Go Back</Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}
