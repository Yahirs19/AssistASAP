import { buscarProductoSlug } from "@/utils/Queries/productQueries";
import {
  CheckIcon,
  StarIcon,
  ChevronLeftIcon,
} from "@heroicons/react/20/solid";
import Link from "next/link";
import { notFound } from "next/navigation";
import AgregarCarritoButton from "@/components/products/mainPageProducts/agregarCarritoButton";

interface RouteParams {
  productSlug: string;
}
const reviews = { average: 4, totalCount: 1624 };

export default async function Example({ params }: { params: RouteParams }) {
  console.log(params.productSlug)
  const product = await buscarProductoSlug(params.productSlug);

  console.log(product);

  if (!product) {
    notFound();
  }
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
                ${product.price}
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
              src={product.imageUrl}
              alt={product.name}
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>

        <AgregarCarritoButton product={product} />
      </div>
    </div>
  );
}
