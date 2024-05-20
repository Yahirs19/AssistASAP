"use client"

import ProductGrid from "@/components/products/productGrid";
import { Button } from "@/components/ui/button";
import { SearchProduct } from "@/components/products/componentesFiltrarProduct/searchProduct";
import { filtrarProductos, mostrarProducto } from "@/lib/queries/productQueries";
import Link from "next/link";
import React, { useState, useEffect } from "react";

import axios from "axios";

import { type Categoria, Proveedor } from "@prisma/client";
import { SelectCategoria } from "@/components/products/componentesFiltrarProduct/selectCategoria";
import { SelectProveedor } from "@/components/products/componentesFiltrarProduct/selectProveedor";

type Producto = {
  id:string,
  name:string,
  price:string,
  slug:string,
  imageUrl:string,
  provedor: {
    Empresa:string
  },
  categoria: {
    nombre: string
  }
}

export default function ProductsPage() {
  const [productos, setProductos] = useState<Producto[]>([]); 
  const [resultados, setResultados] = useState<Producto[]>([]);

  const [busqueda, setBusqueda] = useState<string>("");

  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [categoria, setCategoria] = useState<string>("");


  const [proveedores, setProveedores] = useState<Proveedor[]>([]);
  const [proveedor, setProveedor] = useState<string>("");

  const [loaded, setLoaded] = useState<boolean>(false);
  


  const getProducts = async () => {
    const res = await axios.get("/api/products").catch((error) => {
      console.log("Error: ", error);
    });

    if (res && res.data) {
      console.log(res.data);
      setProductos(res.data);
      setResultados(res.data);
    }
  };

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

  useEffect(() => {
    getProducts();
    obtenerCategorias();
    obtenerProveedores();

    setLoaded(true);
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




  return (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-25 lg:max-w-7xl lg:px-8">
          <div className="flex flex-col md:flex md:items-center md:justify-between">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 m-8">
              Filtrar productos
            </h2>
            <SearchProduct onChange={handleSearchChange} />
            <SelectCategoria categorias={categorias} onChange={handleCategoriaChange}/>
            <SelectProveedor proveedores={proveedores} onChange={handleProveedorChange} />
          </div>
          
          
          <div className="md:flex md:items-center md:justify-between">
            <h2 className="mt-5 text-2xl font-bold tracking-tight text-gray-900">
              Todos los productos
            </h2>
          </div>

          {
            loaded ? (
            <ProductGrid products={resultados} />
            ) : (
              <p> Cargando... </p>
            )
          }
          <Link href="/agregar-producto">
            <Button variant="outline">Agregar Producto</Button>
          </Link>
        </div>
      </div>
    </>
  );
}
