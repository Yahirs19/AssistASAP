import Banner from "../../components/banner";
import TestProduct from "../../components/products/mainPageProducts/ProductComponent";
import Link from "next/link";
import { CartProvider } from "@/contexts/contextCarrito";

import { initialProfile } from "@/lib/initial-profile";
import { hasTypeOfUser } from "@/utils/typeOfUser";

export default async function Home() {
  // Obtenemos el perfil del usuario
  // const profile = await initialProfile();

  return (
    <>
      {/*Pagina principal*/}

      {/*          SUPUESTA A MUCHOS CAMBIOS             */}
      <div className="felx felx-col gap-8 ">
        <div className="pb-8">
          {/*banner basico como en figma*/}
          <Banner />
        </div>
        <div>
          {/*Ruta a todos los productos desde la pagina principal*/}

          {/*ESTA EN DUDA TAMBIEN AGREGAR ESTA RUTA AL DASHBOARD*/}
          <Link
            className="font-bold text-4xl flex flex-row pb-4"
            href="/products"
          >
            <p>Products</p>
            <p className="text-xl font-bold text-indigo-600 ml-auto pt-2">
              Ver todo
            </p>
          </Link>
          <div className=" mx-auto max-w-md">
            {/*Ejemplo de una vista a un producto y sus detalles*/}
            <TestProduct />
          </div>
        </div>
      </div>
    </>
  );
}
