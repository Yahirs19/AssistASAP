"use client"

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchUsuarioProps {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SearchUsuario = ({onChange}:SearchUsuarioProps) => {
    return(
        <>
            <div className="flex w-full max-w-sm items-center space-x-2">
                <Input 
                type="text" 
                onChange={onChange}
                placeholder="Busca al usuario por su ID o nombre..."
                />
            </div>
        </>
    )
}