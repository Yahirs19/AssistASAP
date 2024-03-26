import Image from "next/image";
import MecanicoImg from "@/app/assets/mecanico.png";

export default function Banner() {
  return (
    <>
      <div className="w-full h-full items-center bg-blue-300 rounded-xl flex">
        <p className="font-bold text-white text-center text-4xl">
          Servicios y productos de calidad
        </p>
        <div className="bg-indigo-600 rounded-xl ml-auto">
          <Image src={MecanicoImg} alt="Foto de Mecanico" />
        </div>
      </div>
    </>
  );
}
