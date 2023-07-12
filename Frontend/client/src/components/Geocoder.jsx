import React, { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";

const GeocoderControl = ({ onAddressSelect }) => {
  const map = useMap();

  useEffect(() => {
    const geocoderControl = L.Control.geocoder({
      defaultMarkGeocode: false, // Disable default centering behavior
    })
      .on("markgeocode", (event) => {
        const { center } = event.geocode;
        onAddressSelect(center); // Pass the selected address to the callback prop
      })
      .addTo(map);

    // Automatically locate the user's position
    map.locate({ setView: true, maxZoom: 16 });

    return () => {
      map.removeControl(geocoderControl);
    };
  }, [map, onAddressSelect]);

  return null;
};

export default GeocoderControl;
