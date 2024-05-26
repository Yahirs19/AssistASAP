"use client"

import { Separator } from "@/components/ui/separator";

import { useState, useEffect } from "react";

import { useCart } from "@/contexts/contextCarrito";

import { type ProductoCarrito, ClientesMecanicos } from "@/types/types";

import { useToast } from "@/components/ui/use-toast";

import { useRouter } from 'next/navigation';

import axios from "axios";

import { AsignarCliente } from "@/components/ordenes/asignarCliente";
import { AsignarMecanico } from "@/components/ordenes/asignarMecanico";
import { TablaProductos } from "@/components/ordenes/tablaProductos";

import { type Categoria, Proveedor } from "@prisma/client";
import { UsuariosOrden } from "@/components/ordenes/usuariosOrden";
import { SearchUsuario } from "@/components/ordenes/buscarUsuario";



export default function AgregarPedido() {
    
    const { cart, setCart } = useCart();

    const router = useRouter()

    const {toast} = useToast();


    const [isMounted, setIsMounted] = useState<boolean>(false);
    
    const {v4: uuidv4} = require('uuid');
    const [idVenta, setIdVenta] = useState<string>(uuidv4());

    const [clientes, setClientes] = useState<ClientesMecanicos[]>([]);
    const [cliente, setCliente] = useState<ClientesMecanicos|null>(null);
    const [resultadosCliente, setResultadosCliente] = useState<ClientesMecanicos[]>([]);

    const [mecanicos, setMecanicos] = useState<ClientesMecanicos[]>([]);
    const [mecanico, setMecanico] = useState<ClientesMecanicos|null>(null);
    const [resultadosMecanico, setResultadosMecanico] = useState<ClientesMecanicos[]>([]);


    const [productos, setProductos] = useState<ProductoCarrito[]>([]);
    const [resultados, setResultados] = useState<ProductoCarrito[]>([]);
    
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [categoria, setCategoria] = useState<string>("");


    const [proveedores, setProveedores] = useState<Proveedor[]>([]);
    const [proveedor, setProveedor] = useState<string>("");

    const [busqueda, setBusqueda] = useState<string>("");

    const [busquedaCliente, setBusquedaCliente] = useState<string>("");
    const [busquedaMecanico, setBusquedaMecanico] = useState<string>("");

    let subtotal = cart
    .reduce((total, product) => total + (product.price*product.cantidad), 0)
    .toFixed(2);

    let totalIVA = (parseFloat(subtotal)*0.06).toFixed(2);

    let total = (parseFloat(subtotal) + parseFloat(totalIVA)).toFixed(2);

    const getClientes = async () => {
        const res = await axios.get("/api/profiles/obtenerClientes").catch((error) => {
            console.log("Error: ", error);
        });

        if(res && res.data){
            console.log(res.data);

            let addAttributeArray = res.data as ClientesMecanicos[]

            console.log(addAttributeArray);

            addAttributeArray.forEach((element) => {
                element.isSelected = false;
            });

            console.log(addAttributeArray);


            setClientes(addAttributeArray);
            setResultadosCliente(addAttributeArray);


        }
    }

    const getMecanicos = async () => {
        const res = await axios.get("/api/profiles/obtenerMecanicos").catch((error) => {
            console.log("Error: ", error);
        });

        if(res && res.data){
            console.log(res.data);

            let addAttributeArray = res.data as ClientesMecanicos[]

            addAttributeArray.forEach((element) => {
                element.isSelected = false;
            });

            setMecanicos(addAttributeArray);
            setResultadosMecanico(addAttributeArray);

            console.log(mecanicos);
        }
    }

    const getProductos = async () => {
        const res = await axios.get("/api/products").catch((error) => {
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

    useEffect(() => {
        setIsMounted(true);
        
        getProductos();
        getClientes();
        getMecanicos();

        obtenerCategorias();
        obtenerProveedores();

        console.log(clientes);

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


    useEffect(() => {
        if(busquedaCliente.length < 1){
            setResultadosCliente(clientes);
        }

        
        setResultadosCliente(prevState => prevState.filter((client) => ((client.profile.name + client.profile.apellidoP + client.profile.apellidoM).toLowerCase().includes(busquedaCliente.replace(/\s/g, '').toLowerCase()) || cliente.profile.id.includes(busquedaCliente.toLowerCase()))));
        
    }, [busquedaCliente]);

    useEffect(() => {
        if(busquedaMecanico.length < 1){
            setResultadosMecanico(mecanicos);
        }

    
        setResultadosMecanico(prevState => prevState.filter((mecanico) => ((mecanico.profile.name + mecanico.profile.apellidoP + mecanico.profile.apellidoM).toLowerCase().includes(busquedaMecanico.replace(/\s/g, '').toLowerCase()) || mecanico.profile.id.includes(busquedaMecanico.toLowerCase()))));

        console.log(resultadosMecanico)
        
    }, [busquedaMecanico]);


    if(!isMounted) {
        return null;
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

    const handleClienteSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        console.log(e.target.value);

        if(e.target.value.length < 1){
          setBusquedaCliente("");
        }
    
        setResultadosCliente(clientes);
        setBusquedaCliente(e.target.value);
      }

      const handleMecanicoSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        console.log(e.target.value);
        
        if(e.target.value.length < 1){
          setBusquedaMecanico("");
        }
    
        setResultadosMecanico(mecanicos);
        setBusquedaMecanico(e.target.value);
      }

    const handleSubmitOrden = async () => {
        if(cart.length > 0){
            let productosAOrden: ProductosEnOrden[] = [];

            cart.forEach((elemento)=>{
              productosAOrden.push({
                productoID: elemento.id,
                cantidad: elemento.cantidad
              })
            })
      
            console.log(productosAOrden);

            if(!mecanico){
                toast({
                    description: "Aún no has seleccionado a un mecánico para atender la orden.",
                  });

                return;
            }

            if(!cliente){
                toast({
                    description: "Aún no has seleccionado a un cliente para la orden.",
                  });

                return;
            }
      
            const resp = await axios.post("/api/orders", {
              total: total,
              tipo: "DOMICILIO",
              productos: productosAOrden,
              clienteId: cliente.id,
              mecanicoId: mecanico.id
            }).catch((error)=>{
              console.log(error);
            });
        
            if (resp && resp.data) {
              toast({
                description: "La orden se ha enviado.",
              })
              console.log("Se creó la orden: ", resp.data);
              setCart([]);

              setCliente(null);
              setMecanico(null);
      
              router.push("/pedidos");
            }
          }
          else{
            toast({
              description: "Tu orden no tiene productos aún.",
            })
          }
    }

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-25 lg:max-w-7xl lg:px-8">
                <div className="flex flex-col md:flex md:items-center md:justify-between">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900 m-8">
                        {`ID de la Venta: ${idVenta} `}  
                    </h2>
                </div>

                <h2 className="text-2xl font-bold tracking-tight text-gray-900 m-8">
                    Selecciona un cliente para atender
                </h2>

                <SearchUsuario onChange={handleClienteSearch} />

                {resultadosCliente.map((client) => (
                    <UsuariosOrden usuario={client} usuarios={clientes} usuarioAsignado={cliente} cambiarUsuarioAsignado={setCliente} />
                ))}
                {cliente && <AsignarCliente cliente={cliente}/>}

                <Separator className="my-4" />

                <h2 className="text-2xl font-bold tracking-tight text-gray-900 m-8">
                    Selecciona un mecanico para la orden
                </h2>

                <SearchUsuario onChange={handleMecanicoSearch}/>

                {resultadosMecanico.map((mechanic) => (
                    <UsuariosOrden usuario={mechanic} usuarios={mecanicos} usuarioAsignado={mecanico} cambiarUsuarioAsignado={setMecanico} />
                ))}
                {mecanico && <AsignarMecanico mecanico={mecanico}/>}

                <Separator className="my-4" />

                
                <div className="flex flex-col md:flex md:items-center md:justify-between">
                    <h2 className="mt-5 mb-6 text-2xl font-bold tracking-tight text-gray-900">
                        Lista de productos de la orden
                    </h2>

                    <TablaProductos 
                    productos={resultados}
                    categorias={categorias}
                    proveedores={proveedores} 
                    onChangeProductoSearch={handleSearchChange}
                    onChangeCategoria={handleCategoriaChange}
                    onChangeProveedor={handleProveedorChange}
                    />

                </div>
            
            </div>

            <Separator />

            <section aria-labelledby="summary-heading" className="mt-10">
            <h2 id="summary-heading" className="sr-only">
              Order summary
            </h2>

            <div className="pl-10 pr-10 pb-6">
            <dl className="space-y-4">
                <div className="flex items-center justify-between">
                  <dt className="text-base font-medium text-gray-900">Subtotal</dt>
                  <dd className="ml-4 text-base font-medium text-gray-900">
                    ${subtotal}
                  </dd>
                </div>
              </dl>
              <dl className="space-y-4">
                <div className="flex items-center justify-between">
                  <dt className="text-base font-medium text-gray-900">IVA (6%)</dt>
                  <dd className="ml-4 text-base font-medium text-gray-900">
                    ${totalIVA}
                  </dd>
                </div>
              </dl>
              <dl className="space-y-4">
                <div className="flex items-center justify-between">
                  <dt className="text-base font-medium text-gray-900">Total</dt>
                  <dd className="ml-4 text-base font-medium text-gray-900">
                    ${total}
                  </dd>
                </div>
              </dl>
              <p className="mt-1 text-sm text-gray-500">
                Se calculo un 6% de IVA
              </p>
            </div>

            <div className="mt-5 pl-10 pr-10 pb-6">
              <button
                type="button"
                onClick={() => handleSubmitOrden()}
                className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
              >
                Guardar orden
              </button>
            </div>
            </section>
        </div>

    )
}