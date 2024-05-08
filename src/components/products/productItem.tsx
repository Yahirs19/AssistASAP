import { ProductoZSchema } from "@/zod/schemas/productSchemaZos";
import Link from "next/link";

export default function ProductItem({
  id,
  slug,
  name,
  description,
  imageUrl,
  price,
}: {
  id: number;
  slug: string;
  name: string;
  description: string;
  imageUrl: string;
  price: string;
}) {
  return (
    <>
      <div className="h-56 w-full overflow-hidden rounded-md  group-hover:opacity-75 lg:h-72 xl:h-80">
        <img
          src={imageUrl}
          alt={name}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <h3 className="mt-4 text-sm text-gray-700">
        <Link href={`/products/${slug}`}>
          <span className="absolute inset-0" />
          {name}
        </Link>
      </h3>
      <p className="mt-1 text-sm font-medium text-gray-900">${price}</p>
    </>
  );
}
