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
import * as L from "leaflet";
import 'leaflet/dist/leaflet.css';
import "leaflet-draw/dist/leaflet.draw.css"
import MarkerClusterGroup from "react-leaflet-cluster";
import { Icon, marker } from "leaflet";
import { EditControl } from "react-leaflet-draw"
import Map from './components/Map';
import { UseGeoLocation } from './components/useGeoLocation';
import Drawer from './components/SubmissionDrawer';

// markers
const defaultMarkers = [
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
    popUp: "RS1 awaiting approval",
    image: <img src='/sign_foot.jpg' width={250} height={300} center />,   
    status: "pending" 
  },

  {
    geocode: [-43.503099898593604, 172.63310329327456],
    popUp: "RS6",
    image: <img src='/white_30_speed.png' width={250} height={300} center />
  },

  {
    geocode: [-43.53061086098737, 172.66657726135682],
    popUp: "RS6V",
    image: <img src='/30_speed.png' width={250} height={300} center />
  }
];

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

  const redIcon = new Icon({
    iconUrl: "/location-pin.png",
    iconSize: [35, 35]
  })

  const orangeIcon = new Icon({
    iconUrl: "/orange_location.png",
    iconSize: [35, 35]
  })

   const [markers, setMarkers] = useState(defaultMarkers);
  //  const [buttons, setButton] = useState(buttons);


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
    <>
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
       {markers.map((marker) =>{
        let icon = marker.status === 'pending' ? orangeIcon : redIcon
        return(
          <Marker position={marker.geocode} status={marker.status} icon={icon}>
           <Popup className='popUpContainer'>
              <div className='signTitle'>
                {marker.popUp}
              </div><br />
              <div className='popupImage'>
                {marker.image}
              </div><br />
              <div className='button-container'>
              {marker.status === 'pending' ? <button className='btn-modal'>Open Approval page</button> : <button  onClick={() => {
                setOpenDrawer(true);
              }}
              className='btn-modal'>Open Submission Area </button>}
                {/* <button
                onClick={() => {
                  setOpenDrawer(true);
                }}
                className='btn-modal'
                >Open Submission Area</button> */}
              </div>
           </Popup>
          </Marker>
        )
       }
        )}
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
    {
      <Drawer
        isOpen={openDrawer}
        onClose={() => {
          setOpenDrawer(false);
        }}
      />
    }
    </>
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