'use client';

import { signOut } from 'next-auth/react';

export function SignOutButton() {
    return (
        <button
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="w-full text-left text-sm font-medium"
        >
            Sign Out
        </button>
    );
}