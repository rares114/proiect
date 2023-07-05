import React, { useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Map = ({ markerPosition }) => {
  const containerStyle = {
    position: "absolute",
    top: 80,
    left: 1000,
    width: "600px",
    height: "600px",
  };

  const mapRef = useRef(null);

  return (
    <div style={containerStyle}>
      <MapContainer
        ref={mapRef} // Add this line to create a ref for the MapContainer
        center={markerPosition}
        zoom={13}
        scrollWheelZoom={false}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={markerPosition}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
