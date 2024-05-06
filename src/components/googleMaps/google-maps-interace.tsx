"use client"

import GoogleMapsSearchInputs from "./google-maps-search";
import GoogleMapsMapSection from "./google-maps-mapSection";

import { SourceContext } from "@/contexts/sourceContext";
import { useState, useEffect } from "react";
import { DestinationContext } from "@/contexts/destinationContext";
import { LocationContext } from "@/contexts/locationContext";

import supabase from "@/lib/supabaseClient";

import { useAuth } from "@clerk/nextjs";

import { type Point } from "@/types/googleTypes";

import { LoadScript } from "@react-google-maps/api";
import { RealtimeChannel } from "@supabase/supabase-js";


export default function GoogleMapsInterface(){
    // Manejo de estados, que manejan los valores de los inputs para el desplegar los puntos y la ruta en el mapa
    const [source, setSource] = useState<Point | undefined>();
    const [destination, setDestination] = useState<Point | undefined>();
    const [location, setLocation] = useState<Point|undefined>();

    const user = useAuth();


    useEffect(() => {
        let id: number;
        // HTML5 geolocation
        if(navigator.geolocation) {
            id = navigator.geolocation.watchPosition((position: GeolocationPosition)=>{
              const pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              };
  
              setLocation(pos);
  
            },
            () => {
              handleLocationError(true);
            });
            
        }
        else
        {
        // Browser doesn't support Geolocation
        handleLocationError(false);
        }


        const receiveUserLocation = (payload:any) => {
            console.log(`
                User: ${payload.userId}
                Location: ${payload.latitude}, ${payload.longitude}
            `);
        }

        const channelA = supabase.channel("room1");
        const channelB = supabase.channel("room1");
        
        // Listening to changes
        channelA.on(
            "broadcast", 
            { event: "location"},
            (payload) => { 
                console.log(payload);
                receiveUserLocation(payload.payload);

             }
        );

        channelB.subscribe(async (status) => {
            if(status !== "SUBSCRIBED") {return;}

            if(user.userId && location){
                // Send changes
                const serverResponse  = await sendUserPosition(channelB, user.userId, location);

                console.log('serverResponse', serverResponse);
            }
        })

        console.log("useEffect Broadcast");

        return () => {
            channelA.unsubscribe();
            channelB.unsubscribe();
            if(id){
                navigator.geolocation.clearWatch(id);
            }
        };

    }, [user]);

    const handleLocationError = (
        browserHasGeolocation: boolean
      ) => {
        
        console.log(browserHasGeolocation
            ? "Error: The Geolocation service failed."
            : "Error: Your browser doesn't support geolocation.");
        
      }


    const sendUserPosition = (
        channel: RealtimeChannel, 
        userId: string, 
        location: Point) => {
            const latitude = location.lat;
            const longitude = location.lng;
            return channel.send({
                type: "broadcast",
                event: "location",
                payload: {userId, latitude, longitude}
            });
    }


    // useEffect para Presences
    useEffect(() => {
        if(user.userId && location){
            const room = supabase.channel("room2", {
                config: {
                    presence: {
                        key: user.userId
                    }
                }
            });
    
            room
            .on('presence',
                {event: 'sync'},
                () => {
                    console.log('sync', room.presenceState())
                }
            )
            .on('presence',
                {event: 'join'},
                ({key, newPresences}) => {
                    console.log('join', key, newPresences);
                }
            )
            .on('presence',
                {event: 'leave'},
                ({key, leftPresences}) => {
                    console.log('leave', key, leftPresences);
                }
            )
            .subscribe(async (status) => {
                if(status === "SUBSCRIBED") {
                    await room.track({
                        user: user.userId,
                        online_at: new Date().toISOString()
                    });
                }


            });

            console.log("useEffect Presencek");
            
            
            return () => {
                // untrackPresente(room);
                room.unsubscribe();
            }
        }
    }, [user])

    const untrackPresente = async (room: RealtimeChannel) => {
        const presenceUntrackStatus = await room.untrack();
        console.log(presenceUntrackStatus);
    }



    return(
        <LocationContext.Provider value={{location, setLocation}}>
            <SourceContext.Provider value={{source, setSource}}>
                <DestinationContext.Provider value={{destination, setDestination}}>
                    <LoadScript
                    libraries={['places']}
                    googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string}
                    >
                        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-5">                    
                            <GoogleMapsMapSection />
                        </div>
                    </LoadScript>  
                </DestinationContext.Provider>
            </SourceContext.Provider>
        </LocationContext.Provider>
    )
    
}