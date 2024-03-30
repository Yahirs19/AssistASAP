import GoogleMapsInput from "./google-maps-input";

import { useContext, useEffect } from "react";
import { SourceContext } from "@/contexts/sourceContext";
import { DestinationContext } from "@/contexts/destinationContext";

// Componente que muestra a los inputs que nos servirán para indicar un lugar de partida y un destino
const GoogleMapsSearchInputs = () => {

    // Obtenemos los valores de los inputs usando el useContext
    const contextSource = useContext(SourceContext);
    const contextDestination = useContext(DestinationContext);
    
    if(contextSource && contextDestination) {
        const {source, setSource} = contextSource;
        const {destination, setDestination} = contextDestination;

        // Desplegamos y confirmamos que funciona el useContext, además de ver que si se actualizan los valores de los inputs
        // Se ejecuta este efecto cada vez que se actualizan los valores de los inputs
        useEffect(() => {
            if(source){
                console.log(source);
                console.log(destination)
            }
        }, [source, destination])
    
        return (
            <div className="p-2 md:pd-5 border-[2px] rounded-xl">
                <p className="text-[20px] font-bold">Get a ride</p>
                <GoogleMapsInput type="source" />
                <GoogleMapsInput type="destination" />

                <button
                className="p-3 bg-black w-full mt-5 text-white rounded-lg">
                    Search
                </button>
            </div>
        )
    }
}

export default GoogleMapsSearchInputs;