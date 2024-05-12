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
import { useState } from "react";
import Link from "next/link";

export default function FormCreateProductPage() {
  const [imageUrl, setImageUrl] = useState<string>("");

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
    <div className="flex flex-col items-center mx-auto">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 bg-gray-100 p-6 rounded-md w-6/12 opacity-100 absolute z-[10] left-52 m-4 "
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
                    <SelectItem value="138314e7-1184-49db-871b-fe1d1d87be07">
                      Lubricantes Quimicos
                    </SelectItem>
                    <SelectItem value="446b39b3-d90a-473e-80dc-930c24445243">
                      Herramientas Electricas
                    </SelectItem>
                    <SelectItem value="887b398a-8cb6-4192-8a22-f497d162b0f1">
                      Herramientas Especializadas
                    </SelectItem>
                    <SelectItem value="c5f734c4-0bf0-4f99-b281-8f375427de36">
                      Equipos de Medicion
                    </SelectItem>
                    <SelectItem value="dc41da93-10c3-4e8a-9a63-752dfc82fb62">
                      Aceites
                    </SelectItem>
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
                    <SelectItem value="05e4c0c8-bd9a-4c47-9ebe-b6a7ee6a8639">
                      Amazon MX
                    </SelectItem>
                    <SelectItem value="1c9b1dfc-31ca-4561-8d0e-d27d6eb102fa">
                      Mercado Libre
                    </SelectItem>
                    <SelectItem value="3bf1900e-5338-47ed-ad6b-034ff1189765">
                      Grainger Mexico
                    </SelectItem>
                    <SelectItem value="3f31adcb-780b-4dec-9be6-398436be2bfc">
                      Productos Castrol
                    </SelectItem>
                    <SelectItem value="c5f4a347-0c60-454c-8223-25714e030f9c">
                      LTH
                    </SelectItem>
                    <SelectItem value="ed5b07fd-486c-46e3-b0c8-cba8dc86b3a3">
                      Autozone
                    </SelectItem>
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

{
  /* <div
  style={{
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "30%",
    backgroundColor: "#e0e0e0",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    marginTop: "3%",
    opacity: 0,
    zIndex: -1, // Asegura que el formulario esté por encima de otros elementos
  }}
>
  <h1 style={{ fontWeight: 700, textAlign: "center" }}>NUEVO PRODUCTO</h1>
  <form
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "100%",
    }}
    onSubmit={handleSubmit}
  >
    {error && <p style={{ color: "red" }}>{error}</p>}

    <label
      htmlFor="name"
      style={{
        marginBottom: "10px",
        color: "#333",
        fontSize: "14px",
        fontWeight: "bold",
        width: "100%",
        textAlign: "left",
      }}
    >
      Nombre:
    </label>
    <input
      onChange={HandleChange}
      value={pro.name}
      type="text"
      name="name"
      style={{
        marginBottom: "15px",
        padding: "10px",
        width: "100%",
        border: "1px solid #ccc",
        borderRadius: "4px",
        fontSize: "14px",
      }}
    />

    <label
      htmlFor="imageUrl"
      style={{
        marginBottom: "10px",
        color: "#333",
        fontSize: "14px",
        fontWeight: "bold",
        width: "100%",
        textAlign: "left",
      }}
    >
      Url de la imagen:
    </label>

    <input
      onChange={HandleChange}
      value={pro.imageUrl}
      type="text"
      name="imageUrl"
      style={{
        marginBottom: "15px",
        padding: "10px",
        width: "100%",
        border: "1px solid #ccc",
        borderRadius: "4px",
        fontSize: "14px",
      }}
    />
    <label
      htmlFor="price"
      style={{
        marginBottom: "10px",
        color: "#333",
        fontSize: "14px",
        fontWeight: "bold",
        width: "100%",
        textAlign: "left",
      }}
    >
      Precio:
    </label>
    <input
      onChange={HandleChange}
      value={pro.price}
      type="text"
      name="price"
      style={{
        marginBottom: "15px",
        padding: "10px",
        width: "100%",
        border: "1px solid #ccc",
        borderRadius: "4px",
        fontSize: "14px",
      }}
    />

    <label
      htmlFor="cantidad"
      style={{
        marginBottom: "10px",
        color: "#333",
        fontSize: "14px",
        fontWeight: "bold",
        width: "100%",
        textAlign: "left",
      }}
    >
      Cantidad:
    </label>
    <input
      onChange={HandleChange}
      value={pro.cantidad}
      type="text"
      name="cantidad"
      style={{
        marginBottom: "15px",
        padding: "10px",
        width: "100%",
        border: "1px solid #ccc",
        borderRadius: "4px",
        fontSize: "14px",
      }}
    />

    <label
      htmlFor="slug"
      style={{
        marginBottom: "10px",
        color: "#333",
        fontSize: "14px",
        fontWeight: "bold",
        width: "100%",
        textAlign: "left",
      }}
    >
      Modelo:
    </label>
    <input
      onChange={HandleChange}
      value={pro.slug}
      type="text"
      name="slug"
      style={{
        marginBottom: "15px",
        padding: "10px",
        width: "100%",
        border: "1px solid #ccc",
        borderRadius: "4px",
        fontSize: "14px",
      }}
    />

    <label
      htmlFor="description"
      style={{
        marginBottom: "10px",
        color: "#333",
        fontSize: "14px",
        fontWeight: "bold",
        width: "100%",
        textAlign: "left",
      }}
    >
      Descripción:
    </label>
    <input
      onChange={HandleChange}
      value={pro.description}
      type="text"
      name="description"
      style={{
        marginBottom: "15px",
        padding: "10px",
        width: "100%",
        border: "1px solid #ccc",
        borderRadius: "4px",
        fontSize: "14px",
      }}
    />

    <label
      htmlFor="categoriaId"
      style={{
        marginBottom: "10px",
        color: "#333",
        fontSize: "14px",
        fontWeight: "bold",
        width: "100%",
        textAlign: "left",
      }}
    >
      Categoría:
    </label>
    <select
      value={selectedCategoria}
      onChange={handleCategoriaChange}
      name="categoriaId"
      style={{
        marginBottom: "15px",
        padding: "10px",
        width: "100%",
        border: "1px solid #ccc",
        borderRadius: "4px",
        fontSize: "14px",
      }}
    >
      <option value="">Seleccionar categoria</option>
      {categs.map((categoria) => (
        <option key={categoria.id} value={categoria.id}>
          {categoria.nombre}
        </option>
      ))}
    </select>

    <label
      htmlFor="Proveedor"
      style={{
        marginBottom: "10px",
        color: "#333",
        fontSize: "14px",
        fontWeight: "bold",
        width: "100%",
        textAlign: "left",
      }}
    >
      Proveedor:
    </label>

    <select
      value={selectedProveedorID}
      onChange={handleProveedorChange}
      name="proveedorID"
      style={{
        marginBottom: "15px",
        padding: "10px",
        width: "100%",
        border: "1px solid #ccc",
        borderRadius: "4px",
        fontSize: "14px",
      }}
    >
      <option value="">Seleccionar Proveedor</option>
      {provs.map((prov) => (
        <option key={prov.id} value={prov.id}>
          {prov.Empresa}
        </option>
      ))}
    </select>

    <div
      style={{
        marginTop: "10px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <button
        type="submit"
        style={{
          padding: "8px 16px",
          backgroundColor: "#4CAF50",
          color: "#FFFFFF",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          marginRight: "8px",
          fontSize: "14px",
        }}
      >
        Añadir
      </button>
      <button
        onClick={() => {
          setShowForm(false), ResetProductos(), setError("");
        }}
        style={{
          padding: "8px 16px",
          backgroundColor: "#F87171",
          color: "#FFFFFF",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "14px",
        }}
      >
        Cancelar
      </button>
    </div>
  </form>
</div>; */
}
