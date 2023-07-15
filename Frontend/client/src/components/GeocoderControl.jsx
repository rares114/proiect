import React, { useEffect, useState, useRef } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import markerIcon from "../images/marker3.png";

const GeocoderControl = ({ onAddressSelect }) => {
  const map = useMap();
  const [currentLocation, setCurrentLocation] = useState(null);
  const markerRef = useRef(null);


  useEffect(() => {
    L.Icon.Default.prototype.options.iconUrl = markerIcon;
    L.Icon.Default.prototype.options.iconSize = [40, 40];
    L.Icon.Default.prototype.options.iconAnchor = [40/2, 40/2];
    L.Icon.Default.prototype.options.popupAnchor = [0, -40];
    L.Icon.Default.prototype.options.tooltipAnchor = [16, -30];

    const geocoderControl = L.Control.geocoder({})
      .on("markgeocode", (event) => {
        const { center } = event.geocode;
        onAddressSelect(center);
      })
      .addTo(map);

    map.on("locationfound", (event) => {
      const { lat, lng } = event.latlng;
      setCurrentLocation([lat, lng]);
    });

    return () => {
      map.removeControl(geocoderControl);
    };
  }, [map, onAddressSelect]);

  useEffect(() => {
    if (markerRef.current) {
      map.removeLayer(markerRef.current);
    }

    if (currentLocation) {
      markerRef.current = L.marker(currentLocation).addTo(map);
    }
  }, [currentLocation, map]);

  useEffect(() => {
    map.locate({ setView: true, maxZoom: 16 });
  }, [map]);

  return null;
};

export default GeocoderControl;
