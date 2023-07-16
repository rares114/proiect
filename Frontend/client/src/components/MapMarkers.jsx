import React, { useEffect, useState, useRef } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import markerIcon from "../images/marker3.png";

const MapMarkers = ({ markers }) => {
  const map = useMap();

  console.log(markers);

  const customIcon = L.icon({
    iconUrl: markerIcon,
    iconSize: [60, 60],
    iconAnchor: [60 / 2, 60 / 2],
  });

  useEffect(() => {
    if (markers.length === 0) {
      return;
    }

    L.Icon.Default.prototype.options.iconUrl = markerIcon;
    L.Icon.Default.prototype.options.iconSize = [40, 40];
    L.Icon.Default.prototype.options.iconAnchor = [40 / 2, 40 / 2];
    L.Icon.Default.prototype.options.popupAnchor = [0, -40];
    L.Icon.Default.prototype.options.tooltipAnchor = [16, -30];

    let sumX = 0;
    let sumY = 0;
    for (const marker of markers) {
      sumX += parseFloat(marker.x);
      sumY += parseFloat(marker.y);
    }

    map.panTo([sumY / markers.length, sumX / markers.length]);
  }, [map, markers]);

  useEffect(() => {
    map.locate({ setView: true, maxZoom: 16 });
  }, [map]);

  useEffect(() => {}, [map]);
  return (
    <div>
      {markers.map((marker) => {
        return (
          <Marker position={[marker.y, marker.x]} icon={customIcon}>
            <Popup>
              {marker.label}
            </Popup>
          </Marker>
        );
      })}
    </div>
  );
};

export default MapMarkers;
