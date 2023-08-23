import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './App.css';
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
import Map from './components/Map';
import { UseGeoLocation } from './components/useGeoLocation';
import Drawer from './components/SubmissionDrawer';



export default function App(){

  // const location = UseGeoLocation();
  // console.log(location)

  const [backendData, setBackendData] = useState([{}])

  useEffect(() => {
    fetch("/api").then(
      response => response.json()
    ).then(
      data => {
        setBackendData(data)
      }
    )
  }, [])

  const [openDrawer, setOpenDrawer] = useState(false);

  const center = [-43.52679233751392, 172.65811563162737]

  // markers
  const markers = [
    {
      geocode: [-37.95336247127581, 176.98126593748108],
      popUp: "Hello, i am Whakatane"
    },
  
    {
      geocode: [-37.75708323492897, 175.28773140218408],
      popUp: "Hello, i am Waikato",
    },
  
    {
      geocode: [-43.53602636491899, 172.63110825035523],
      popUp: "Hello, i am Christchurch City",
      image: <img src='/sign_front.jpg' width={300} height={350} center />
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
    iconUrl: "/location-pin.png",
    iconSize: [35, 35]
  })

  // const showMyLocation = () => {
  //   if( location.loaded && !location.error){
  //     mapRef.current.leafletElement.flyTo([location.coordinates.lat, location.coordinates.lng],
  //       zoom,
  //       { animate: true }
  //       )
  //   }else{
  //     alert(location.error.message)
  //   }
  // }


  return(

    <MapContainer className='map'
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
           <Popup className='popUpContainer'>
              <div className='signTitle'>
                {marker.popUp}
              </div><br />
              <div>
                {marker.image}
              </div><br />
              <div className='button-container'>
                <button
                onClick={() => {
                  setOpenDrawer(true);
                }}
                className='btn-modal'
                >Open Submission Area</button>
              </div>
              {openDrawer && <Drawer />}
           </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>

      {/* <div className='row my-4'>
        <div className='col d-flex justify-content-center'>
           <button
             className='btn btn-primary'
             onClick={showMyLocation}
           >
           Locate Me <FontAwesomeIcon icon="globe" />
           </button>
        </div>
      </div> */}
    </MapContainer>
    // <UseGeoLocation>
    //   <Map/>
    //   {/* <div className='row my-4'>
    //     <div className='col d-flex justify-content-center'>
    //       <button
    //         className='btn btn-primary'
    //         onClick={showMyLocation}
    //       >
    //       Locate Me <FontAwesomeIcon icon="globe" />
    //       </button>
    //    </div>
    //   </div> */}
    // </UseGeoLocation>
  )
}