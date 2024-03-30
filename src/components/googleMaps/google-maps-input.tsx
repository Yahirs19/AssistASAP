"use client"

import { useEffect, useState } from "react";

import GooglePlacesAutocomplete from "react-google-places-autocomplete";

import { Option } from "react-google-places-autocomplete/build/types";
import { SingleValue } from "react-select";

const GoogleMapsInput = ({type}:{type:string}) => {
    // Estado para almacenar el objeto de los lugares del Google Maps
    const [value, setValue] = useState<SingleValue<Option>>(null);
    
    // Estado para mostrar diferentes textos en los placeholders
    const [placeholder, setPlaceholder] = useState<string>("");

    // useEffect para renderizar el texto de los placeholders, dependiendo del valor de la prop 'type'
    useEffect(() => {
        type === 'source' ?
        setPlaceholder('Pickup Location') :
        setPlaceholder('Dropoff Location');
    }, []);

    // Función que nos va a regresar la longitud y latitud de los lugares de Google Maps
    const getLatAndLng = ({place, type}: {place:SingleValue<Option>, type:string}) => {
        // Se guarda el ID del lugar seleccionado
        const placeId = place?.value.place_id;
        // PlacesService es un servicio que nos permite realizar diversas operaciones con los lugares de Google Maps
        const service = new google.maps.places.PlacesService(document.createElement('div'));

        // La función getDetails, nos permitirá obtener detalles sobre la localización del lugar que indiquemos
        service.getDetails({placeId}, (place, status) => {
            // Si no hubo error, y el lugar que indicamos cuenta con una localización que se pueda mostrar, se prosigue
            if(status==='OK' && place?.geometry && place.geometry.location){
                console.log(place.geometry.location.lat()); // Se imprime la latitud
                console.log(place.geometry.location.lng()); // Se imprime la longitud
            }
        })
    }

    /*
    Los inputs que se usaron, fueron sacados de la librería de GooglePlacesAutocomplete,
    el cual despliega las direcciones almacenadas en Google Maps, conforme vamos escribiendo. 
    */
    return (
        <div className="bg-slate-200 p-3 rounded-lg mt-3 flex items-center gap-4">
            <GooglePlacesAutocomplete
            apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}
            selectProps={{
                value,
                onChange: (place) => {
                    getLatAndLng({place,type});
                    setValue(place);
                },
                placeholder: placeholder,
                isClearable: true,
                className: 'w-full',
                components: {
                    DropdownIndicator: null
                },
                styles: {
                    control: (provided) => ({
                        ...provided,
                        backgroundColor:'#00ffff00',
                        border: 'none',
                        textColor: '#000'
                    })
                }
            }}
            />
        </div>
    );
};

export default GoogleMapsInput;