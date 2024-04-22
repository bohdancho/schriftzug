import { type User } from '@clerk/nextjs/server'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function isAdmin(user: User | null) {
    // TODO: make it use currentUser()
    // TODO: use clerk roles
    return !!user?.privateMetadata?.isAdmin
}
