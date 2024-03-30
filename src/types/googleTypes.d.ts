import { Option } from 'react-google-places-autocomplete/build/types';
import { SingleValue } from 'react-select';


type Point = {lat:number, lng:number, name?:string, label?:string};

export type Source = {source: Point; setSource: React.Dispatch<React.SetStateAction<Point|undefined>>;} | null;

export type Destination = {destination: Point; setDestination: React.Dispatch<React.SetStateAction<Point|undefined>>;} | null;