import Link from "next/link";

import {UserButton, SignedOut, SignedIn} from "@clerk/nextjs";

const UserMenu = () => {
    return (
        <>
            <SignedOut>
                <Link 
                href="/sign-in"
                className="text-gray-500">
                    Iniciar sesión
                </Link>
            </SignedOut>

            <SignedIn>
                <UserButton 
                afterSignOutUrl="/"
                />
            </SignedIn>
        </>
    )
}

export default UserMenu;