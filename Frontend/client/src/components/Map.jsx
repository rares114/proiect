import React, { useState } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "bootstrap/dist/css/bootstrap.css";
import MapMarkers from "./MapMarkers";

const Map = ({ center, zoom, markers }) => {
  const [markerPosition, setMarkerPosition] = useState(center);

  const containerStyle = {
    position: "absolute",
    top: "600px",
    left: "300px",
    width: "600px",
    height: "600px",
    margin: "auto",
  };

  const handleAddressSelect = (address) => {
    const { lat, lng } = address;
    setMarkerPosition([lat, lng]);
  };

  return (
    <div style={containerStyle}>
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={false}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapMarkers markers={markers}></MapMarkers>
      </MapContainer>
    </div>
  );
};

export default Map;
