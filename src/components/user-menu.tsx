"use client"

import {UserButton, SignInButton, useAuth, ClerkLoading, ClerkLoaded} from "@clerk/nextjs";

const UserMenu = () => {
    const {isLoaded, userId} = useAuth();

    if(!isLoaded || !userId) {
        return (
            <>
                <ClerkLoading>
                    <div>Cargando...</div>
                </ClerkLoading>

                <ClerkLoaded>
                    <SignInButton mode="modal">
                        <button className="text-gray-500">Iniciar sesión</button>
                    </SignInButton>
                </ClerkLoaded>
            </>
        )
    }

    return (

        <>
            <ClerkLoading>
                <div>Cargando...</div>
            </ClerkLoading>

            <ClerkLoaded>
                <UserButton 
                afterSignOutUrl="/"              
                /> 
            </ClerkLoaded>
        </>
    )
}

export default UserMenu;