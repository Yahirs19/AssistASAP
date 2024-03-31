import ProductGrid from "@/components/products/productGrid";
import { Button } from "@/components/ui/button";
import { mostrarProducto } from "@/lib/queries/productQueries";
import Link from "next/link";

{
  /*LISTA DE PRODUCTOS Es un simple mapeo basado al array */
}
/*const products = [
  {
    id: 1,
    name: "Prestone Refrigerante anticongelante",
    slug: "prestone-refrigerante-anticongelante",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sollicitudin consequat nisl finibus cursus. Aenean placerat consectetur neque, sit amet dapibus massa scelerisque quis. Vestibulum elementum purus sapien, eu ullamcorper turpis rhoncus vitae. Vivamus vel dolor in elit sollicitudin aliquet et ac nunc.",
    imageSrc: "/aceite.png",
    imageAlt: "Anticongelante",
    price: "$640.00",
  },
  {
    id: 2,
    name: "Bujía para carro ",
    slug: "bujia-para-carro",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sollicitudin consequat nisl finibus cursus. Aenean placerat consectetur neque, sit amet dapibus massa scelerisque quis. Vestibulum elementum purus sapien, eu ullamcorper turpis rhoncus vitae. Vivamus vel dolor in elit sollicitudin aliquet et ac nunc.",
    imageSrc: "/bujia.png",
    imageAlt: "Bujía",
    price: "$1,500.00",
  },
  {
    id: 3,
    name: "Llanta para coche",
    slug: "llanta-para-coche",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sollicitudin consequat nisl finibus cursus. Aenean placerat consectetur neque, sit amet dapibus massa scelerisque quis. Vestibulum elementum purus sapien, eu ullamcorper turpis rhoncus vitae. Vivamus vel dolor in elit sollicitudin aliquet et ac nunc.",
    imageSrc: "/llanta.png",
    imageAlt: "llanta",
    price: "$2,500.00",
  },
  {
    id: 4,
    name: "Prestone Refrigerante anticongelante",
    slug: "prestone-refrigerante-anticongelante",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sollicitudin consequat nisl finibus cursus. Aenean placerat consectetur neque, sit amet dapibus massa scelerisque quis. Vestibulum elementum purus sapien, eu ullamcorper turpis rhoncus vitae. Vivamus vel dolor in elit sollicitudin aliquet et ac nunc.",
    imageSrc: "/aceite.png",
    imageAlt: "Anticongelante",
    price: "$640.00",
  },
  {
    id: 5,
    name: "Bujía para carro ",
    slug: "bujia-para-carro",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sollicitudin consequat nisl finibus cursus. Aenean placerat consectetur neque, sit amet dapibus massa scelerisque quis. Vestibulum elementum purus sapien, eu ullamcorper turpis rhoncus vitae. Vivamus vel dolor in elit sollicitudin aliquet et ac nunc.",
    imageSrc: "/bujia.png",
    imageAlt: "Bujía",
    price: "$1,500.00",
  },
  {
    id: 6,
    name: "Llanta para coche",
    slug: "llanta-para-coche",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sollicitudin consequat nisl finibus cursus. Aenean placerat consectetur neque, sit amet dapibus massa scelerisque quis. Vestibulum elementum purus sapien, eu ullamcorper turpis rhoncus vitae. Vivamus vel dolor in elit sollicitudin aliquet et ac nunc.",
    imageSrc: "/llanta.png",
    imageAlt: "llanta",
    price: "$2,500.00",
  },
];*/
export default async function ProductsPage() {
  const products = await mostrarProducto();

  return (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-25 lg:max-w-7xl lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              Todos los productos
            </h2>
          </div>

          <ProductGrid products={products} />
          <Link href="/agregar-producto">
            <Button variant="outline">Agregar Producto</Button>
          </Link>
        </div>
      </div>
    </>
  );
}
