"use client"

import GoogleMapsSearchInputs from "./google-maps-search";
import GoogleMapsMapSection from "./google-maps-mapSection";

import { SourceContext } from "@/contexts/sourceContext";
import { useState, useEffect } from "react";
import { DestinationContext } from "@/contexts/destinationContext";

import { supabase } from "@/lib/supabaseClient";

import { type Point } from "@/types/googleTypes";

import { LoadScript } from "@react-google-maps/api";
import { useAuth } from "@clerk/nextjs";

import getUserName from "@/utils/servicesQueries/getUserName";

export default function GoogleMapsInterface(){
    // Manejo de estados, que manejan los valores de los inputs para el desplegar los puntos y la ruta en el mapa
    const [source, setSource] = useState<Point | undefined>();
    const [destination, setDestination] = useState<Point | undefined>();
    const [Name, setUserName] = useState<string>();

    const user = useAuth();


    useEffect(() => {

        const channel = supabase.channel("room1");

        if(user.userId){
            const getName = async () => {
                const fetchedName = await getUserName(user.userId);
                setUserName(fetchedName?.name);
            };

            getName();
        

            channel
                .on("presence", {event:"sync"}, () => {
                    console.log("Synced presence state: ", channel.presenceState());
                    console.log("Usuario: " + Name);
                })
                .subscribe(async (status) => {
                    if(status==="SUBSCRIBED" && user.userId) {
                        await channel.track({
                            online_at: new Date().toISOString(), 
                            user_name: Name
                        })
                    }
                })
        }

        return () => {
            channel.unsubscribe();
        };

    }, [user]);


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