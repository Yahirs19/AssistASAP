"use client"

import {usePathname} from 'next/navigation';


const GoogleMapsLayout = ({children}:{children:React.ReactNode}) => {
    const pathname = usePathname();

    // Esto se hizo para que no se viera el layout de la aplicación (motivos de testeo para el Google Maps)
    // if(pathname === "/mapsTest"){
    //     return <GoogleMapsInteface />
    // }

    return (
        <div>
            {children}
        </div>
    )
}

export default GoogleMapsLayout;