import {UserButton, SignedOut, SignedIn, SignInButton} from "@clerk/nextjs";

const UserMenu = () => {
    return (
        <>
            <SignedOut>
                <SignInButton mode="modal">
                    <button className="text-gray-500">Iniciar sesión</button>
                </SignInButton>
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