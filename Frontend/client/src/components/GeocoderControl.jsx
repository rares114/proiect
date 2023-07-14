import React, { useEffect, useState } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import markerIcon from "../images/marker.png";

const GeocoderControl = ({ onAddressSelect }) => {
  const map = useMap();
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    L.Icon.Default.prototype.options.iconRetinaUrl = ""; // Remove default icon

    const geocoderControl = L.Control.geocoder({
      defaultMarkGeocode: false,
    })
      .on("markgeocode", (event) => {
        const { center } = event.geocode;
        onAddressSelect(center);
      })
      .addTo(map);

    map.locate({ setView: true, maxZoom: 16 });

    map.on("locationfound", (event) => {
      const { lat, lng } = event.latlng;
      setCurrentLocation([lat, lng]);
    });

    return () => {
      map.removeControl(geocoderControl);
    };
  }, [map, onAddressSelect]);

  useEffect(() => {
    if (currentLocation) {
      L.marker(currentLocation, { icon: customIcon }).addTo(map);
    }
  }, [currentLocation, map]);

  const customIcon = L.icon({
    iconUrl: markerIcon,
    iconSize: [60, 60],
    iconAnchor: [30, 60],
  });

  return null;
};

export default GeocoderControl;
