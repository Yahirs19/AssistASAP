import Banner from "../../components/banner";
import TestProduct from "../../components/products/ProductComponent";
import Link from "next/link";

import { initialProfile } from "@/lib/initial-profile";
import { hasTypeOfUser } from "@/utils/typeOfUser";

export default async function Home() {
  // Obtenemos el perfil del usuario
  const profile = await initialProfile()
  
  // Función para checar si el usuario es forzosamente un cliente, o un mecánico
  const typeOfUser = await hasTypeOfUser();

  /*
   Se renderiza componente si el usuario tiene un perfil registrado, 
   pero no tiene un tipo de usuario asignado 
  */
  if(profile && !typeOfUser) { 
    return (
      <>
        {
        /* Se renderiza componente para que el usuario 
          indique si se va a registrar como un cliente o un mecánico
        */
        }
      </>
    )
  }

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
