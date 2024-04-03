import { buscarProductoSlug } from "@/utils/productsQueries/mostrarProducto";
import {
  CheckIcon,
  StarIcon,
  ChevronLeftIcon,
} from "@heroicons/react/20/solid";
import Link from "next/link";

/*const product = {
  id: 1,
  name: "Prestone Refrigerante anticongelante",
  slug: "prestone-refrigerante-anticongelante",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sollicitudin consequat nisl finibus cursus. Aenean placerat consectetur neque, sit amet dapibus massa scelerisque quis. Vestibulum elementum purus sapien, eu ullamcorper turpis rhoncus vitae. Vivamus vel dolor in elit sollicitudin aliquet et ac nunc.",
  imageSrc: "/aceite.png",
  imageAlt: "Anticongelante",
  price: "$640.00",
};*/
interface RouteParams {
  productSlug: string;
}
const reviews = { average: 4, totalCount: 1624 };

export default async function Example({ params }: { params: RouteParams }) {
  const product = await buscarProductoSlug(params.productSlug);

  return (
    <div className="bg-white">
      <Link href="/products" className="">
        {" "}
        <ChevronLeftIcon className="h-10 w-10" />
      </Link>
      <div className="mx-auto max-w-2xl px-4 pb-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
        {/* Product details */}
        <div className="lg:max-w-lg lg:self-end">
          <div className="mt-4">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {product.name}
            </h1>
          </div>

          <section aria-labelledby="information-heading" className="mt-4">
            <div className="flex items-center">
              <p className="text-lg text-gray-900 sm:text-xl">
                {product.price}
              </p>

              <div className="ml-4 border-l border-gray-300 pl-4">
                <h2 className="sr-only">Reviews</h2>
                <div className="flex items-center">
                  <div>
                    <div className="flex items-center">
                      {[0, 1, 2, 3, 4].map((rating) => (
                        <StarIcon
                          key={rating}
                          className={`
                            ${
                              reviews.average > rating
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }
                            h-5 w-5 flex-shrink-0
                            `}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <p className="sr-only">{reviews.average} out of 5 stars</p>
                  </div>
                  <p className="ml-2 text-sm text-gray-500">
                    {reviews.totalCount} reviews
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-6">
              <p className="text-base text-gray-500">{product.description}</p>
            </div>

            <div className="mt-6 flex items-center">
              <CheckIcon
                className="h-5 w-5 flex-shrink-0 text-green-500"
                aria-hidden="true"
              />
              <p className="ml-2 text-sm text-gray-500">Disponible</p>
            </div>
          </section>
        </div>

        {/* Product image */}
        <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
          <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg">
            <img
              src={product.imageSrc}
              alt={product.imageAlt}
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>

        {/* Product form */}
        <div className="mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
          <section aria-labelledby="options-heading">
            <form>
              <div className="mt-10">
                <button
                  type="submit"
                  className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                >
                  Agregar al carrito
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}
