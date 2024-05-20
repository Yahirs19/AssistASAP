"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { CrearProductoZSchema } from "@/zod/schemas/productSchemaZos";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import ImagePicker from "@/components/products/componentsCrearProduct/imagepickerProduct";
import { useState, useEffect } from "react";
import { type Categoria, type Proveedor } from "@prisma/client";

import axios from "axios";

export default function AgregarProductoPage() {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [proveedores, setProveedores] = useState<Proveedor[]>([]);

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

  useEffect(()=>{
    obtenerCategorias();
    obtenerProveedores();
  },[])

  const form = useForm<z.infer<typeof CrearProductoZSchema>>({
    resolver: zodResolver(CrearProductoZSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
      imageUrl: "",
      cantidad: "",
      categoriaId: "",
      modelo: "",
      proveedorID: "",
    },
  });

  function onSubmit(values: z.infer<typeof CrearProductoZSchema>) {
    event?.preventDefault();
    values.imageUrl = imageUrl;
    try {
      fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
    } catch (error) {
      console.error(error);
    }

    console.log("values:", values);
  }
  return (
    <div className="flex flex-col items-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 bg-gray-100 p-6 rounded-md w-6/12 absolute"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre del producto</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descripcion del producto</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Precio del producto</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cantidad"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cantidad</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categoriaId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categoria</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categorias.map((categoria) => (
                      <SelectItem key={categoria.id} value={categoria.id}>
                        {categoria.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="proveedorID"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Proveedor</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {proveedores.map((proveedor)=>(
                      <SelectItem key={proveedor.id} value={proveedor.id}>
                        {proveedor.Empresa}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="modelo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Modelo</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Imagen</FormLabel>
                <FormControl>
                  <ImagePicker setImage={setImageUrl} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
