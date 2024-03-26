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

          <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8">
            {products.map((product) => (
              <div key={product.id} className="group relative">
                <div className="h-56 w-full overflow-hidden rounded-md  group-hover:opacity-75 lg:h-72 xl:h-80">
                  <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <h3 className="mt-4 text-sm text-gray-700">
                  <a href={product.href}>
                    <span className="absolute inset-0" />
                    {product.name}
                  </a>
                </h3>
                <p className="mt-1 text-sm font-medium text-gray-900">
                  {product.price}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
