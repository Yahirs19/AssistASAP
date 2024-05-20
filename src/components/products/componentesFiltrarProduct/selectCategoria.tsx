import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";

import { type Categoria } from "@prisma/client";
import React, {useState} from "react";

interface FiltrarCategorias {
    categorias: Categoria[];
    onChange: (e: string) => void;
}



export const SelectCategoria = ({categorias, onChange}: FiltrarCategorias) => {
    return (
        <>
            <Select onValueChange={onChange}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Selecciona una categoria" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                    <SelectLabel>Categoría</SelectLabel>
                    <SelectItem key="1" value="all">Todas las categorías</SelectItem>
                    {categorias.map((categoria)=>(
                            <SelectItem key={categoria.id} value={categoria.nombre}>{categoria.nombre}</SelectItem>
                    ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </>
    )
}