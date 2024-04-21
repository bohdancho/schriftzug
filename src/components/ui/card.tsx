import { type VariantProps, cva } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '~/lib/utils'

const cardVariants = cva('rounded-lg border bg-card text-card-foreground shadow-sm p-4', {
    variants: {
        size: { fullPage: 'p-2 md:min-w-96 md:p-8' },
    },
})

type CardProps = React.ComponentPropsWithRef<'div'> & VariantProps<typeof cardVariants>

const Card = React.forwardRef<HTMLDivElement, CardProps>(({ className, size, ...props }, ref) => (
    <div ref={ref} className={cn(cardVariants({ size, className }))} {...props} />
))
Card.displayName = 'Card'

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div ref={ref} className={cn('flex flex-col items-center space-y-1.5 p-6 text-center', className)} {...props} />
    ),
)
CardHeader.displayName = 'CardHeader'

const cardTitleVariants = cva('text-2xl font-semibold leading-none tracking-tight', {
    variants: {
        size: {
            lg: 'text-4xl md:text-7xl',
        },
    },
})

type CardTitleProps = React.ComponentPropsWithRef<'h3'> & VariantProps<typeof cardTitleVariants>
const CardTitle = React.forwardRef<HTMLParagraphElement, CardTitleProps>(({ className, size, ...props }, ref) => (
    <h3 ref={ref} className={cn(cardTitleVariants({ size, className }), className)} {...props} />
))
CardTitle.displayName = 'CardTitle'

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
    ({ className, ...props }, ref) => (
        <p ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />
    ),
)
CardDescription.displayName = 'CardDescription'

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />,
)
CardContent.displayName = 'CardContent'

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div ref={ref} className={cn('flex items-center p-6 pt-0', className)} {...props} />
    ),
)
CardFooter.displayName = 'CardFooter'

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
