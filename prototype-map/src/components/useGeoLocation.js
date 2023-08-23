import React, { useState, useEffect, createContext } from 'react'

const GeoLocationContext = createContext()


const UseGeoLocation = () => {
    const [location, setLocation] = useState({
        loaded: false,
        coordinates: { lat: "", lng: "" }
    });

    const onSuccess = (location) => {
        setLocation({
            loaded: true,
            coordinates: {
                lat: location.coords.latitude,
                lng: location.coords.longitude,
            },
        });
    };

    const onError = (error) => {
        setLocation({
            loaded: true,
            error, 
        });
    };

    useEffect(() => {
        if( !("getlocation" in navigator) ){
            onError({
                code: 0,
                message: "Geolocation not supported",
            });
        }

        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }, []);

    return location;

    // return (
    //     <GeoLocationContext.Provider value={location}>{
    //         children
    //     }
    //     </GeoLocationContext.Provider>
    // )

}

export {UseGeoLocation, GeoLocationContext}