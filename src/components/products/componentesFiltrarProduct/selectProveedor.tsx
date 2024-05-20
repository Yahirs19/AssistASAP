import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";

import { type Proveedor } from "@prisma/client";
import React from "react";

interface FiltrarProveedores {
    proveedores: Proveedor[];
    onChange: (e: string) => void;
}


export const SelectProveedor = ({proveedores, onChange}: FiltrarProveedores) => {
    return (
        <>
            <Select onValueChange={onChange}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Selecciona una categoria" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                    <SelectLabel>Proveedor</SelectLabel>
                    <SelectItem key="1" value="all">Todas los proveedores</SelectItem>
                    {proveedores.map((proveedor)=>(
                            <SelectItem key={proveedor.id} value={proveedor.Empresa}>{proveedor.Empresa}</SelectItem>
                    ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </>
    )
}