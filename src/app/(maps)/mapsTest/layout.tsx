"use client"

import {usePathname} from 'next/navigation';

import GoogleMapsInteface from '@/components/googleMaps/google-maps-interace';

const GoogleMapsLayout = ({children}:{children:React.ReactNode}) => {
    const pathname = usePathname();

    if(pathname === "/mapsTest"){
        return <GoogleMapsInteface/>
    }

    return (
        <div>
            {children}
        </div>
    )
}

export default GoogleMapsLayout;