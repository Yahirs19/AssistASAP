import GoogleMapsInput from "./google-maps-input";

// Componente que muestra a los inputs que nos servirán para indicar un lugar de partida y un destino
const GoogleMapsSearchInputs = () => {
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

export default GoogleMapsSearchInputs;