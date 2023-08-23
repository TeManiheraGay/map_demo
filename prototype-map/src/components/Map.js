import {
  MapContainer,
  TileLayer,
  Marker,
  FeatureGroup,
  Popup
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import "leaflet-draw/dist/leaflet.draw.css"
import MarkerClusterGroup from "react-leaflet-cluster";
import { Icon, marker } from "leaflet";
import { EditControl } from "react-leaflet-draw"
import { useContext } from 'react';
import { GeoLocationContext } from './useGeoLocation';

export default function Map(){

  const location = useContext(GeoLocationContext);

  console.log(location)

  const center = [-43.52679233751392, 172.65811563162737]

  // markers
  const markers = [
    {
      geocode: [-37.95336247127581, 176.98126593748108],
      popUp: "Hello, i am Whakatane"
    },
  
    {
      geocode: [-37.75708323492897, 175.28773140218408],
      popUp: "Hello, i am Waikato"
    },
  
    {
      geocode: [-43.53602636491899, 172.63110825035523],
      popUp: "Hello, i am Christchurch City"
    },

    {
      geocode: [-43.503099898593604, 172.63310329327456],
      popUp: "Hello, i am St Albans"
    },

    {
      geocode: [-43.53061086098737, 172.66657726135682],
      popUp: "Hello, i am Linwood"
    }
  ];

  const customIcon = new Icon({
    iconUrl: "/location.png",
    iconSize: [25, 25]
  })

  return(
    <MapContainer
    center={center}
    zoom={10}
    style={{ width: '100vw', height: '100vh' }}
    >
      <FeatureGroup>
        <EditControl position="topright"/>
      </FeatureGroup>
      <TileLayer
      url='https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=DFwHYIstp8bYzZmraIIc'
      attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
      />

      {/* {location?.loaded && !location.error && (
        <Marker 
        position={[location.coordinates.lat, location.coordinates.lng]} 
        icon={customIcon}
        ></Marker>
      )} */}

      <MarkerClusterGroup>
       {markers.map((marker) =>(
          <Marker position={marker.geocode} icon={customIcon}>
           <Popup>{marker.popUp}</Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  )
};