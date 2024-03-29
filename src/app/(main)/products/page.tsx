import ProductGrid from "@/components/products/productGrid";

{
  /*LISTA DE PRODUCTOS Es un simple mapeo basado al array */
}
const products = [
  {
    id: 1,
    name: "Prestone Refrigerante anticongelante",
    href: "#",
    imageSrc: "/aceite.png",
    imageAlt: "Anticongelante",
    price: "$640.00",
  },
  {
    id: 2,
    name: "Bujía para carro ",
    href: "#",
    imageSrc: "/bujia.png",
    imageAlt: "Bujía",
    price: "$1,500.00",
  },
  {
    id: 3,
    name: "Llanta para coche",
    href: "#",
    imageSrc: "/llanta.png",
    imageAlt: "llanta",
    price: "$2,500.00",
  },
  {
    id: 4,
    name: "Prestone Refrigerante anticongelante",
    href: "#",
    imageSrc: "/aceite.png",
    imageAlt: "Anticongelante",
    price: "$640.00",
  },
  {
    id: 5,
    name: "Bujía para carro ",
    href: "#",
    imageSrc: "/bujia.png",
    imageAlt: "Bujía",
    price: "$1,500.00",
  },
  {
    id: 6,
    name: "Llanta para coche",
    href: "#",
    imageSrc: "/llanta.png",
    imageAlt: "llanta",
    price: "$2,500.00",
  },
];
export default function ProductsPage() {
  return (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              Todos los productos
            </h2>
          </div>

          <ProductGrid products={products} />
        </div>
      </div>
    </>
  );
}
