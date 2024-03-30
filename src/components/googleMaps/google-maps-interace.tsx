import GoogleMapsSearchInputs from "./google-maps-search";
import GoogleMapsMapSection from "./google-maps-mapSection";

export default function GoogleMapsInteface(){
    return(
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
                <GoogleMapsSearchInputs />
            </div>

            <div>
                <GoogleMapsMapSection />
            </div>
        </div>
    )
}