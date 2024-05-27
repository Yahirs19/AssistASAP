import { useContext, useEffect } from "react";
import { SourceContext } from "@/contexts/sourceContext";
import { DestinationContext } from "@/contexts/destinationContext";
import GoogleMapsInput from "./google-maps-input";
import Link from "next/link"; // Importamos Link de next/link

const GoogleMapsSearchInputs = () => {
    const contextSource = useContext(SourceContext);
    const contextDestination = useContext(DestinationContext);

    if (contextSource && contextDestination) {
        const { source, setSource } = contextSource;
        const { destination, setDestination } = contextDestination;

        useEffect(() => {
            if (source) {
                console.log(source);
                console.log(destination);
            }
        }, [source, destination]);

        return (
            <div className="p-2 md:pd-5 border-[2px] rounded-xl">
                <p className="text-[20px] font-bold">Get a ride</p>
                <GoogleMapsInput type="source" />
                <GoogleMapsInput type="destination" />

                <button className="p-3 bg-blue-500 w-full mt-5 text-white rounded-lg">
                    Search
                </button>
                {/* Utilizamos el componente Link de Next.js para el botón "Continuar" */}
                <Link href="/pedidos">
                    <button className="p-3 bg-blue-500 w-full mt-5 text-white rounded-lg">
                        Continuar
                    </button>
                </Link>
            </div>
        );
    }
};

export default GoogleMapsSearchInputs;
