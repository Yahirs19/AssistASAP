"use client"

import GoogleMapsSearchInputs from "./google-maps-search";
import GoogleMapsMapSection from "./google-maps-mapSection";

import { SourceContext } from "@/contexts/sourceContext";
import { useState } from "react";
import { DestinationContext } from "@/contexts/destinationContext";

import { type Point } from "@/types/googleTypes";

import { LoadScript } from "@react-google-maps/api";

export default function GoogleMapsInterface(){
    // Manejo de estados, que manejan los valores de los inputs para el desplegar los puntos y la ruta en el mapa
    const [source, setSource] = useState<Point | undefined>();
    const [destination, setDestination] = useState<Point | undefined>();


    
    console.log("Test");

    return(
        <SourceContext.Provider value={{source, setSource}}>
            <DestinationContext.Provider value={{destination, setDestination}}>
                <LoadScript
                libraries={['places']}
                googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string}
                >
                    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-5">
                        <div>
                            <GoogleMapsSearchInputs />
                        </div>

                        <div>
                            <GoogleMapsMapSection />
                        </div>
                    </div>
                </LoadScript>  
            </DestinationContext.Provider>
        </SourceContext.Provider>
    )
    
}