import {
  Card,
  CardContent,
  CardHeader,
  CardFooter
} from '@/components/layout/ui/card'
import { Skeleton } from '@/components/layout/ui/skeleton'

export function ServiceListSkeleton() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
      {Array.from({ length: 6 }).map((_, i) => (
        <Card
          key={i}
          className='bg-background rounded-xl shadow-md border border-border hover:shadow-lg transition-all duration-200'
        >
          <CardHeader className='p-6'>
            <Skeleton className='h-6 w-3/4 bg-border rounded' />
            <Skeleton className='h-4 w-1/2 bg-border rounded mt-2' />
          </CardHeader>
          <CardContent className='px-6 space-y-3'>
            <Skeleton className='h-4 w-full bg-border rounded' />
            <Skeleton className='h-4 w-2/3 bg-border rounded' />
          </CardContent>
          <CardFooter className='p-6 border-t border-border'>
            <Skeleton className='h-6 w-24 bg-border rounded' />
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
