'use client'; // This component must be a client component

import { SessionProvider } from "next-auth/react";
import React from "react";

// Define a type for the component's props
type Props = {
    children?: React.ReactNode;
};

// Create the NextAuthProvider component
export const NextAuthProvider = ({ children }: Props) => {
    return <SessionProvider>{children}</SessionProvider>;
};