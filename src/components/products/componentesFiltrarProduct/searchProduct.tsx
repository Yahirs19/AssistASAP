"use client"

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchProductProps {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SearchProduct = ({onChange}:SearchProductProps) => {
    return(
        <>
            <div className="flex w-full max-w-sm items-center space-x-2">
                <Input 
                type="text" 
                onChange={onChange}
                placeholder="Llantas, bujías, aceites..."
                />
            </div>
        </>
    )
}