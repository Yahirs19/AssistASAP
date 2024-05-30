"use client"

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { ScrollArea } from "@/components/ui/scroll-area";

import React, {useState, useEffect} from "react";

import axios from "axios";

import { useRouter } from "next/navigation";



interface AgregarProductoProps {
    children: React.ReactNode;
    idOrden: string
}

import { type Proveedor, Categoria } from "@prisma/client";
import { type ProductoCarrito } from "@/types/types";
import { SearchProduct } from "@/components/products/componentesFiltrarProduct/searchProduct";
import { SelectCategoria } from "@/components/products/componentesFiltrarProduct/selectCategoria";
import { SelectProveedor } from "@/components/products/componentesFiltrarProduct/selectProveedor";
import { ProductsOrden } from "@/components/ordenes/editarOrdenes/productsOrden";


export const AgregarProductoOrden = ({children, idOrden}: AgregarProductoProps) => {
    const [productos, setProductos] = useState<ProductoCarrito[]>([]);
    const [resultados, setResultados] = useState<ProductoCarrito[]>([]);
    
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [categoria, setCategoria] = useState<string>("");

    const router = useRouter();

    const [proveedores, setProveedores] = useState<Proveedor[]>([]);
    const [proveedor, setProveedor] = useState<string>("");

    const [busqueda, setBusqueda] = useState<string>("");

    const [isMounted, setIsMounted] = useState<boolean>(false);

    const [open, setOpen] = useState(false);

    const getProductosSinAgregar = async() => {
        const res = await axios.get(`/api/products/productosSinAsignar?idOrden=${idOrden}`).catch((error) => {
            console.log("Error: ", error);
        });
    
        if (res && res.data) {
            console.log(res.data);
            setProductos(res.data);
            setResultados(res.data);
        }
    }

    const obtenerCategorias = async () => {
        const res = await axios.get("/api/categorias").catch((error) => {
          console.log("Error: ", error);
        });
    
        if (res && res.data) {
          console.log(res.data);
          setCategorias(res.data);
        }
      }
    
    const obtenerProveedores = async () => {
        const res = await axios.get("/api/proveedores").catch((error) => {
            console.log("Error: ", error);
        });

        if (res && res.data) {
            console.log(res.data);
            setProveedores(res.data);
        }
    }

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
    
        if(e.target.value.length < 1){
          setBusqueda("");
        }
    
        setResultados(productos);
        setBusqueda(e.target.value);
      }
    
    const handleCategoriaChange = (value: string) => {
    setResultados(productos);

        if(value==="all"){
            setCategoria("");
        }
        else{
            setCategoria(value);
        }
    }


    const handleProveedorChange = (value: string) => {
    setResultados(productos);

        if(value==="all"){
            setProveedor("");
        }
        else{
            setProveedor(value);
        }
    }

    useEffect(() => {
        setIsMounted(true);
        
        getProductosSinAgregar();

        obtenerCategorias();
        obtenerProveedores();
    }, []);

    useEffect(()=>{
        if(busqueda.length < 1)
        {
          setResultados(productos);
        }
    
        console.log(proveedor, categoria);
    
        if(categoria !== "" && proveedor !== ""){
          setResultados(prevState => prevState.filter((producto) => producto.name.toLowerCase().includes(busqueda.toLowerCase()) && producto.categoria.nombre === categoria && producto.provedor.Empresa === proveedor));
        }
        else if(categoria!==""){
          setResultados(prevState => prevState.filter((producto) => producto.name.toLowerCase().includes(busqueda.toLowerCase()) && producto.categoria.nombre === categoria));
        }
        else if(proveedor!==""){
          setResultados(prevState => prevState.filter((producto) => producto.name.toLowerCase().includes(busqueda.toLowerCase()) && producto.provedor.Empresa === proveedor));
        }
        else{
          setResultados(prevState => prevState.filter((producto) => producto.name.toLowerCase().includes(busqueda.toLowerCase())));
    
        }
    
    },[busqueda, proveedor, categoria]);

    if(!isMounted) {
        return null;
    }
    
    return (
    
        <Dialog className="sm:max-w-fit" open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            {children}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
            <DialogTitle>Agregar productos a la orden</DialogTitle>
            <DialogDescription>
                Selecciona el producto que quieras agregar a tu orden.
            </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">

                <div className="flex flex-col md:flex md:items-center md:justify-between">
                <SearchProduct onChange={handleSearchChange} />
                </div>

                <div className="mx-auto mt-3 flex flex-row md:items-center md:justify-center gap-2">
                    <SelectCategoria categorias={categorias} onChange={handleCategoriaChange}/>
                    <SelectProveedor proveedores={proveedores} onChange={handleProveedorChange} />
                </div>

                <ScrollArea className="mx-auto max-h-44 min-h-44 border rounded-md w-10/12 h-30 mb-6 overflow-y-auto">
                {
                    resultados.map((producto) => (
                        <ProductsOrden idOrden={idOrden} producto={producto} setOpen={setOpen} routerExterno={router}/>
                    ))
                }
                </ScrollArea>
                
            </div>
        </DialogContent>
        </Dialog>
    )
}