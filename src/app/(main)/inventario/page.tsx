"use client";

import { Proveedor, Product, Categoria } from "@prisma/client";
import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import axios from "axios";
import ImagePicker from "@/components/products/componentsCrearProduct/imagepickerProduct";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import * as React from "react";
import Link from "next/link";
import FormCreateProductPage from "@/components/products/formCreateProduct";

export default function Home() {
  const [prods, setProds] = useState<Product[]>([]);
  const [provs, setProvs] = useState<Proveedor[]>([]);
  const [categs, setCategorias] = useState<Categoria[]>([]);
  const [search, setSearch] = useState("");
  //Constantes del formulario
  const [showForm, setShowForm] = useState(false);

  const [showForm2, setShowForm2] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>("");

  //Variables de error
  const [error, setError] = useState("");

  // Estado para controlar la visibilidad del modal
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDialogOpen2, setIsDialogOpen2] = useState(false);
  const [isDialogOpen3, setIsDialogOpen3] = useState(false);

  const [isDialogOpen5, setIsDialogOpen5] = useState(false);

  //Constantes de eliminacion
  const [productToDelete, setProductToDelete] = useState<string | null>(null);

  const [pro, setPro] = useState<Product>({
    id: "",
    name: "",
    imageUrl: "",
    price: 0,
    cantidad: 0,
    slug: "",
    description: "",
    categoriaId: "",
    usuarioAdminID: "c32d8b45-92fe-44f6-8b61-42c2107dfe87",
    proveedorID: "",
    inventarioId: "",
    RegDate: new Date(),
    UpdatedDate: new Date(),
  });

  const GetProductos = async () => {
    const res = await axios.get("/api/products/productosGenerales").catch((error) => {
      console.log("catch: ", error.message);
    });

    if (res && res.data) {
      setProds(res.data);
      console.log("GetUsers->res.data: ", res.data);
    }
  };

  // Estado para la selección actual del proveedor
  const [selectedProveedorID, setSelectedProveedorID] = useState("");

  const GetProveedores = async () => {
    const res = await axios.get("/api/proveedores").catch((error) => {
      console.log("catch: ", error.message);
    });

    if (res && res.data) {
      console.log(res.data);
      setProvs(res.data);
    }
  };

  const GetCategorias = async () => {
    const res = await axios.get("/api/categorias").catch((error) => {
      console.log("Error: ", error);
    });

    if (res && res.data) {
      console.log(res.data);
      setCategorias(res.data);
    }
  };

  // Llama a las funciones para obtener productos y proveedores
  useEffect(() => {
    GetProductos();
    GetProveedores();
    GetCategorias();

    setSelectedCategoria(categs[0]?.id);
  }, []);

  const AddProductos = async (e: SyntheticEvent) => {
    e.preventDefault();

    // Verificar si el nombre del producto ya existe en `prods`
    const productExists = prods.some(
      (product) => product.name.toLowerCase() === pro.name.toLowerCase()
    );

    if (productExists) {
      // Si el producto ya existe, muestra el cuadro de diálogo de advertencia
      setIsDialogOpen(true);
      ResetProductos();
      return;
    }

    console.log(pro);

    const resp = await axios.post("/api/products/productosGenerales", {
      name: pro.name,
      imageUrl: pro.imageUrl,
      price: pro.price,
      cantidad: pro.cantidad,
      slug: pro.slug,
      description: pro.description,
      categoriaId: pro.categoriaId,
      usuarioAdminID: "3d436c5c-846d-45e0-b60f-505f9b3703df",
      proveedorID: pro.proveedorID,
    });

    if (resp && resp.data) {
      console.log("AddUser->resp.data: ", resp.data);
      GetProductos();
    }

    ResetProductos();

    setShowForm(false);
  };

  const UpdateProductos = async (e: SyntheticEvent) => {
    e.preventDefault();

    const resp = await axios.put("/api/products/productosGenerales", {
      id: pro.id,
      name: pro.name,
      imageUrl: pro.imageUrl,
      price: pro.price,
      cantidad: pro.cantidad,
      slug: pro.slug,
      description: pro.description,
      UpdatedDate: new Date(),
    });

    if (resp && resp.data) {
      console.log("UpdateUser->resp.data: ", resp.data);
      GetProductos();
    }

    ResetProductos();
    setShowForm2(false);
  };

  const ResetProductos = () => {
    setPro((prevState) => ({
      ...prevState,
      id: "",
      name: "",
      imageUrl: "",
      price: 0,
      cantidad: 0,
      slug: "",
      description: "",
      categoriaId: "",
    }));
  };

  const EditProductos = async (userId: string) => {
    const userFound = prods.find((user) => user.id === userId);
    if (userFound) {
      setPro(userFound);
    }
  };

  const DeleteProductos = async (userId: string) => {
    console.log(userId)
    const resp = await axios
      .delete(`/api/products/productosGenerales?id=${userId}`)
      .catch((error) => {
        console.log("catch: ", error.message);
      });

    if (resp && resp.data) {
      console.log("DeleteUser->resp.data: ", resp.data);
      GetProductos();
    }
  };

  const searcher = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    console.log(e.target.value);
  };

  //const resultados = !search ? prods : prods.filter((dato) => dato.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
  //Funcion de busqueda
  const [isSearchButtonPressed, setSearchButtonPressed] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearchButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setSearchButtonPressed(true);
    if (isSearchButtonPressed && resultados.length === 0) {
      console.log("dato no encontrado");
      setIsDialogOpen5(true);
    }
  };

  const resultados = isSearchButtonPressed
    ? prods.filter((dato) =>
        dato.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      )
    : prods;

  // Update specific input field
  const HandleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setPro((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));

  // Función para manejar el cambio de selección en el combobox
  const handleProveedorChange = (e: ChangeEvent<HTMLSelectElement>) => {
    // Obtiene el valor seleccionado del evento
    const selectedID = e.target.value;

    // Actualiza el estado `selectedProveedorID`
    setSelectedProveedorID(selectedID);

    // Actualiza el objeto `pro` con el `id` del proveedor seleccionado
    setPro((prevPro) => ({
      ...prevPro,
      proveedorID: selectedID,
    }));
  };

  // Función para cerrar el cuadro de diálogo
  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  // Función para cerrar el cuadro de diálogo
  const handleDialogClose2 = () => {
    setIsDialogOpen2(false);
  };

  // Función para cerrar el cuadro de diálogo
  const handleDialogClose3 = () => {
    setIsDialogOpen3(false);
  };

  // Función para cerrar el cuadro de diálogo
  const handleDialogClose5 = () => {
    setIsDialogOpen5(false);
  };

  //FORMULARIO DE INGRESO DE DATOS

  const validateForm = () => {
    // Verifica si todos los campos obligatorios están llenos
    if (
      pro.name.trim() === "" || // Campo 'name' debe ser string
      pro.imageUrl.trim() === "" || // Campo 'imageUrl' debe ser string
      pro.price === null ||
      pro.price === undefined ||
      pro.price.toString().trim() === "" || // Convertir 'price' a string y aplicar 'trim()'
      pro.cantidad === null ||
      pro.cantidad === undefined ||
      pro.cantidad.toString().trim() === "" || // Convertir 'cantidad' a string y aplicar 'trim()'
      pro.slug.trim() === "" || // Campo 'slug' debe ser string
      pro.description.trim() === "" || // Campo 'description' debe ser string
      selectedCategoria?.trim() === "" ||
      selectedCategoria === undefined ||
      selectedProveedorID?.trim() === "" ||
      selectedProveedorID === undefined // Campo 'selectedProveedorID' debe ser string
    ) {
      return false; // Si algún campo está vacío, devuelve false
    }

    // Verificar si 'pro.price' contiene solo dígitos y un punto decimal
    const priceRegex = /^\d*\.?\d*$/;
    const isPriceValid = priceRegex.test(pro.price.toString().trim());
    if (!isPriceValid) {
      setIsDialogOpen2(true);
      return false; // Devuelve false si 'price' contiene letras o signos especiales
    }
    // Verificar si 'pro.cantidad' contiene solo dígitos y ningún otro carácter
    const cantidadRegex = /^\d+$/; // Expresión regular para verificar solo dígitos (números enteros)
    const isCantidadValid = cantidadRegex.test(pro.cantidad.toString().trim());
    if (!isCantidadValid) {
      setIsDialogOpen2(true);
      return false; // Devuelve false si 'cantidad' contiene letras, signos especiales o puntos
    }

    // Todos los campos están llenos y 'price' es un número válido
    return true;
  };

  // Función de manejo de envío del formulario
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Evita el comportamiento predeterminado del formulario

    if (validateForm()) {
      // Si la validación es exitosa, llama a AddProductos para agregar el producto
      console.log(e);
      AddProductos(e);
      setShowForm(false);
    } else {
      // Muestra un mensaje de error si los campos obligatorios no están llenos
      setError("Por favor, rellena todos los campos correctamente.");
    }
  };

  //Funcion para envio de datos actualizados
  const validateForm2 = () => {
    // Verifica si todos los campos obligatorios están llenos
    if (
      pro.name.trim() === "" || // Campo 'name' debe ser string
      pro.imageUrl.trim() === "" || // Campo 'imageUrl' debe ser string
      pro.price === null ||
      pro.price === undefined ||
      pro.price.toString().trim() === "" || // Convertir 'price' a string y aplicar 'trim()'
      pro.cantidad === null ||
      pro.cantidad === undefined ||
      pro.cantidad.toString().trim() === "" || // Convertir 'cantidad' a string y aplicar 'trim()'
      pro.slug.trim() === "" || // Campo 'slug' debe ser string
      pro.description.trim() === "" || // Campo 'description' debe ser string
      pro.categoriaId?.trim() === "" // Campo 'description' debe ser string
    ) {
      return false; // Si algún campo está vacío, devuelve false
    }
    // Verificar si 'pro.price' contiene solo dígitos y un punto decimal
    const priceRegex = /^\d*\.?\d*$/;
    const isPriceValid = priceRegex.test(pro.price.toString().trim());
    if (!isPriceValid) {
      setIsDialogOpen2(true);
      return false; // Devuelve false si 'price' contiene letras o signos especiales
    }
    // Verificar si 'pro.cantidad' contiene solo dígitos y ningún otro carácter
    const cantidadRegex = /^\d+$/; // Expresión regular para verificar solo dígitos (números enteros)
    const isCantidadValid = cantidadRegex.test(pro.cantidad.toString().trim());
    if (!isCantidadValid) {
      setIsDialogOpen2(true);
      return false; // Devuelve false si 'cantidad' contiene letras, signos especiales o puntos
    }

    // Todos los campos están llenos y 'price' es un número válido
    return true;
  };

  // Función de manejo de envío del formulario
  const handleSubmitUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Evita el comportamiento predeterminado del formulario

    if (validateForm2()) {
      // Si la validación es exitosa, llama a Actualizar productos
      UpdateProductos(e);
      setShowForm2(false);
    } else {
      // Muestra un mensaje de error si los campos obligatorios no están llenos
      setError("Por favor, rellena todos los campos.");
    }
  };

  //Manejador de eventos
  const handleDeleteClick = (id: string) => {
    setProductToDelete(id);
    setIsDialogOpen3(true);
  };

  //Abrir o cerrar
  const handleConfirmDelete = () => {
    // Verifica que productToDelete no sea null antes de llamar a DeleteProductos
    if (productToDelete !== null) {
      // Llama a la función para eliminar el producto solo si productToDelete no es null
      DeleteProductos(productToDelete);
    }

    // Cierra el cuadro de confirmación
    setIsDialogOpen3(false);
  };

  const handleCancelDelete = () => {
    // Cierra el cuadro de confirmación
    setIsDialogOpen3(false);
  };

  //Constante de categorias
  //   const categorias = [
  //     { value: '', label: 'Seleccione una categoría' },
  //     { value: 'Aceites', label: 'Aceites' },
  //     { value: 'Herramientas_mano', label: 'Herramientas de mano' },
  //     { value: 'Herramientas_electricas', label: 'Herramientas eléctricas' },
  //     { value: 'Herramientas_neumaticas', label: 'Herramientas neumáticas' },
  //     { value: 'Equipos_medicion', label: 'Equipos de medición y diagnóstico' },
  //     { value: 'Componentes_repuestos', label: 'Componentes y repuestos' },
  //     { value: 'Lubricantes_quimicos', label: 'Lubricantes y productos químicos' },
  //     { value: 'Suministros_taller', label: 'Suministros de taller y seguridad' },
  //     { value: 'Sistemas_elevacion', label: 'Sistemas de elevación y sujeción' },
  //     { value: 'Maquinaria_equipos_pesados', label: 'Maquinaria y equipos pesados' },
  //     { value: 'Herramientas_especializadas', label: 'Herramientas especializadas' }
  // ];

  const getNombreCategoria = (id: string | null) => {
    if (id !== null) {
      const category = categs.find((category) => category.id === id);

      return category?.nombre;
    }

    return null;
  };

  const [selectedCategoria, setSelectedCategoria] = useState("");

  // Función para manejar el cambio de categoría
  const handleCategoriaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    // Actualizar la propiedad `cate` de `pro` con el valor seleccionado
    setPro((prevPro) => ({
      ...prevPro,
      categoriaId: value,
    }));
    // Actualizar el estado de categoría seleccionada
    setSelectedCategoria(value);
    console.log(selectedCategoria);
  };

  return (
    <main style={{ marginTop: "5px", display: "flex", position: "relative" }}>
      {/* Formulario condicional */}
      {showForm && (
        <div>
          <FormCreateProductPage categorias={categs} proveedores={provs} />
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
      )}

      {isDialogOpen && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#f8d7da",
            border: "1px solid #f5c6cb",
            borderRadius: "8px",
            padding: "20px",
            alignItems: "center",
            justifyContent: "center", // Agrega justifyContent para centrar los elementos de forma horizontal
            display: "flex", // Agrega display: flex para usar el modelo de caja flexible
            flexDirection: "column", // Establece la dirección del contenedor flex como column
            zIndex: 1000,
          }}
        >
          <h3 style={{ color: "#721c24", textAlign: "center" }}>Advertencia</h3>
          <p style={{ color: "#721c24", textAlign: "center" }}>
            El producto ya existe. Por favor, ingrese otro producto.
          </p>
          <button
            onClick={handleDialogClose}
            style={{
              backgroundColor: "#721c24",
              color: "#fff",
              padding: "8px 16px",
              borderRadius: "4px",
              border: "none",
            }}
          >
            Cerrar
          </button>
        </div>
      )}

      {/*Segundo Formulario*/}
      {showForm2 && (
        <div
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
            marginTop: "1%",
            zIndex: 1000, // Asegura que el formulario esté por encima de otros elementos
          }}
        >
          <h1 style={{ fontWeight: 700, textAlign: "center" }}>
            ACTUALIZAR PRODUCTO
          </h1>
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
            onSubmit={handleSubmitUpdate}
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
              readOnly
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
                Actualizar
              </button>
              <button
                onClick={() => {
                  setShowForm2(false), ResetProductos(), setError("");
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
        </div>
      )}

      {isDialogOpen2 && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#f8d7da",
            border: "1px solid #f5c6cb",
            borderRadius: "8px",
            padding: "20px",
            alignItems: "center",
            justifyContent: "center", // Agrega justifyContent para centrar los elementos de forma horizontal
            display: "flex", // Agrega display: flex para usar el modelo de caja flexible
            flexDirection: "column", // Establece la dirección del contenedor flex como column
            zIndex: 1000,
          }}
        >
          <h3 style={{ color: "#721c24", textAlign: "center" }}>Advertencia</h3>
          <p style={{ color: "#721c24", textAlign: "center" }}>
            Ingresa un numero valido
          </p>
          <button
            onClick={handleDialogClose2}
            style={{
              backgroundColor: "#721c24",
              color: "#fff",
              padding: "8px 16px",
              borderRadius: "4px",
              border: "none",
            }}
          >
            Cerrar
          </button>
        </div>
      )}

      <br></br>

      <div style={{ width: "90%", marginLeft: "10px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            maxWidth: "1500px",
            marginBottom: "20px",
          }}
        >
          <input
            type="text"
            value={search}
            onChange={handleInputChange} // Vincula handleInputChange a onChange para actualizar searchTerm
            style={{
              width: "70%",
              padding: "12px",
              borderRadius: "12px",
              border: "1px solid #c3cfe2",
              marginRight: "10px",
              backgroundColor: "#f0f4f7",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          />
          <button
            onClick={handleSearchButtonClick}
            style={{
              width: "15%",
              padding: "12px",
              borderRadius: "12px",
              backgroundColor: "#42a5f5",
              color: "#ffffff",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            Busqueda
          </button>
        </div>
        {isDialogOpen5 && (
          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "#f8d7da",
              border: "1px solid #f5c6cb",
              borderRadius: "8px",
              padding: "20px",
              alignItems: "center",
              justifyContent: "center", // Agrega justifyContent para centrar los elementos de forma horizontal
              display: "flex", // Agrega display: flex para usar el modelo de caja flexible
              flexDirection: "column", // Establece la dirección del contenedor flex como column
              zIndex: 1000,
            }}
          >
            <h3 style={{ color: "#721c24", textAlign: "center" }}>Aviso</h3>
            <p style={{ color: "#721c24", textAlign: "center" }}>
              Este producto no existe
            </p>
            <button
              onClick={handleDialogClose5}
              style={{
                backgroundColor: "#721c24",
                color: "#fff",
                padding: "8px 16px",
                borderRadius: "4px",
                border: "none",
              }}
            >
              Cerrar
            </button>
          </div>
        )}
        <br></br>
        {/* Botón para mostrar el formulario */}
        {/* <Link href="agregar-producto"> */}
        <button
          onClick={() => setShowForm(true)}
          style={{
            margin: "20px",
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
            color: "#FFFFFF",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          Añadir Producto
        </button>
        {/* </Link> */}

        <br></br>

        <table
          style={{
            marginTop: "8%",
            borderCollapse: "collapse",
            marginLeft: "0px",
            width: "100%",
            maxWidth: "1700px",
            margin: "auto",
            backgroundColor: "#FFF5",
            borderRadius: "20px",
            boxShadow:
              "0 8px 16px -4px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.05)",
            backdropFilter: "blur(7px)",
            border: "none",
            overflow: "hidden",
          }}
        >
          <thead>
            <tr
              style={{
                borderBottom: "1px solid #E5E7EB",
                borderRadius: "20px 20px 0 0",
              }}
            >
              <th
                style={{
                  border: "1px solid #E5E7EB",
                  padding: "8px",
                  textAlign: "center",
                }}
              >
                ID
              </th>
              <th
                style={{
                  border: "1px solid #E5E7EB",
                  padding: "8px",
                  textAlign: "center",
                }}
              >
                Nombre
              </th>
              <th
                style={{
                  border: "1px solid #E5E7EB",
                  padding: "8px",
                  textAlign: "center",
                }}
              >
                Imagen
              </th>
              <th
                style={{
                  border: "1px solid #E5E7EB",
                  padding: "8px",
                  textAlign: "center",
                }}
              >
                Precio
              </th>
              <th
                style={{
                  border: "1px solid #E5E7EB",
                  padding: "8px",
                  textAlign: "center",
                }}
              >
                Cantidad
              </th>
              <th
                style={{
                  border: "1px solid #E5E7EB",
                  padding: "8px",
                  textAlign: "center",
                }}
              >
                Modelo
              </th>
              <th
                style={{
                  border: "1px solid #E5E7EB",
                  padding: "8px",
                  textAlign: "center",
                }}
              >
                Descripción
              </th>
              <th
                style={{
                  border: "1px solid #E5E7EB",
                  padding: "8px",
                  textAlign: "center",
                }}
              >
                Categoria
              </th>
              <th
                style={{
                  border: "1px solid #E5E7EB",
                  padding: "8px",
                  textAlign: "center",
                }}
              >
                usuarioAdminID
              </th>
              <th
                style={{
                  border: "1px solid #E5E7EB",
                  padding: "8px",
                  textAlign: "center",
                }}
              >
                proveedorID
              </th>
              <th
                style={{
                  border: "1px solid #E5E7EB",
                  padding: "8px",
                  textAlign: "center",
                }}
              >
                Fecha de registro
              </th>
              <th
                style={{
                  border: "1px solid #E5E7EB",
                  padding: "8px",
                  textAlign: "center",
                }}
              >
                Fecha de actualizacion
              </th>
              <th
                style={{
                  border: "1px solid #E5E7EB",
                  padding: "8px",
                  textAlign: "center",
                  borderRadius: "0 0 20px 20px",
                }}
              >
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {resultados.map((prodss: Product) => (
              <tr key={prodss.id} style={{ borderBottom: "1px solid #E5E7EB" }}>
                <td
                  style={{
                    border: "1px solid #E5E7EB",
                    padding: "8px",
                    textAlign: "center",
                  }}
                >
                  {prodss.id}
                </td>
                <td
                  style={{
                    border: "1px solid #E5E7EB",
                    padding: "8px",
                    textAlign: "center",
                  }}
                >
                  {prodss.name}
                </td>
                <td
                  style={{
                    border: "1px solid #E5E7EB",
                    padding: "8px",
                    textAlign: "center",
                  }}
                >
                  <img
                    src={prodss.imageUrl}
                    style={{ maxWidth: "60px", maxHeight: "60px" }}
                  />
                </td>
                <td
                  style={{
                    border: "1px solid #E5E7EB",
                    padding: "8px",
                    textAlign: "center",
                  }}
                >
                  ${prodss.price}
                </td>
                <td
                  style={{
                    border: "1px solid #E5E7EB",
                    padding: "8px",
                    textAlign: "center",
                  }}
                >
                  {prodss.cantidad}
                </td>
                <td
                  style={{
                    border: "1px solid #E5E7EB",
                    padding: "8px",
                    textAlign: "center",
                  }}
                >
                  {prodss.slug}
                </td>
                <td
                  style={{
                    border: "1px solid #E5E7EB",
                    padding: "8px",
                    textAlign: "center",
                  }}
                >
                  {prodss.description}
                </td>
                <td
                  style={{
                    border: "1px solid #E5E7EB",
                    padding: "8px",
                    textAlign: "center",
                  }}
                >
                  {getNombreCategoria(prodss.categoriaId)}
                </td>
                <td
                  style={{
                    border: "1px solid #E5E7EB",
                    padding: "8px",
                    textAlign: "center",
                  }}
                >
                  {prodss.usuarioAdminID}
                </td>
                <td
                  style={{
                    border: "1px solid #E5E7EB",
                    padding: "8px",
                    textAlign: "center",
                  }}
                >
                  {prodss.proveedorID}
                </td>
                <td
                  style={{
                    border: "1px solid #E5E7EB",
                    padding: "8px",
                    textAlign: "center",
                  }}
                >
                  {prodss.RegDate.toString()}
                </td>
                <td
                  style={{
                    border: "1px solid #E5E7EB",
                    padding: "8px",
                    textAlign: "center",
                  }}
                >
                  {prodss.UpdatedDate.toString()}
                </td>
                <td
                  style={{
                    border: "1px solid #E5E7EB",
                    padding: "8px",
                    textAlign: "center",
                  }}
                >
                  <button
                    onClick={() => {
                      setShowForm2(true), EditProductos(prodss.id);
                    }}
                    style={{
                      backgroundColor: "#4CAF50",
                      color: "#FFFFFF",
                      border: "none",
                      padding: "6px 12px",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDeleteClick(prodss.id)}
                    style={{
                      backgroundColor: "#F87171",
                      color: "#FFFFFF",
                      border: "none",
                      padding: "6px 12px",
                      borderRadius: "4px",
                      cursor: "pointer",
                      marginTop: "6px",
                    }}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {isDialogOpen3 && (
          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "#f8d7da",
              border: "1px solid #f5c6cb",
              borderRadius: "8px",
              padding: "20px",
              zIndex: 1000,
            }}
          >
            <h3 style={{ color: "#721c24", textAlign: "center" }}>
              Confirmación de eliminación
            </h3>
            ;
            <p style={{ color: "#721c24", textAlign: "center" }}>
              ¿Estás seguro de que deseas eliminar este producto?
            </p>
            <br></br>
            <div
              style={{
                display: "flex",
                justifyContent: "center", // Centra los botones
                gap: "10px",
              }}
            >
              <button
                onClick={handleConfirmDelete}
                style={{
                  backgroundColor: "#28a745",
                  color: "#fff",
                  padding: "8px 16px",
                  borderRadius: "4px",
                  border: "none",
                }}
              >
                Confirmar
              </button>
              <button
                onClick={handleCancelDelete}
                style={{
                  backgroundColor: "#dc3545",
                  color: "#fff",
                  padding: "8px 16px",
                  borderRadius: "4px",
                  border: "none",
                }}
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
