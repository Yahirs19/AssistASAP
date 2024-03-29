export default function ProductItem({
  id,
  name,
  href,
  imageSrc,
  imageAlt,
  price,
}: {
  id: number;
  name: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
  price: string;
}) {
  return (
    <>
      <div className="h-56 w-full overflow-hidden rounded-md  group-hover:opacity-75 lg:h-72 xl:h-80">
        <img
          src={imageSrc}
          alt={imageAlt}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <h3 className="mt-4 text-sm text-gray-700">
        <a href={href}>
          <span className="absolute inset-0" />
          {name}
        </a>
      </h3>
      <p className="mt-1 text-sm font-medium text-gray-900">{price}</p>
    </>
  );
}
