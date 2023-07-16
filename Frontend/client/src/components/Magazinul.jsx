import React, { useEffect, useState } from "react";
import axios from "axios";
import { server_url } from "../config";
import { useParams } from "react-router-dom";
import Map from "./Map";
import { OpenStreetMapProvider } from "react-leaflet-geosearch";

const Magazinul = () => {
  const [shopData, setShopData] = useState({});
  const { shopId } = useParams();
  const defaultPosition = [51.505, -0.09];
  const defaultZoom = 13;
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    fetchShopDetails();
  }, []);

  const fetchShopDetails = async () => {
    try {
      const shopInfo = await getShopInformation(shopId);
      setShopData(shopInfo);

      // Geocode the shop's address using the OpenStreetMap provider
      const provider = new OpenStreetMapProvider();
      const results = await provider.search({ query: shopInfo.address });
      if (results.length > 0) {
        const { y, x } = results[0];
        const marker = { x, y, label: shopInfo.name };
        setMarkers([marker]); // Set the marker data
      }
    } catch (error) {
      console.error("Error fetching shop details:", error);
    }
  };

  const getShopInformation = async (shopId) => {
    try {
      const response = await axios.get(`${server_url}/shops/${shopId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching shop information:", error);
      throw error;
    }
  };

  return (
    <div className="shop-details-container">
      <div className="textul-shop">
        <p>Detaliile magazinului</p>
        <p>Numele magazinului: {shopData.name}</p>
        <p>Adresa: {shopData.address}</p>
        <p>
          Descriere: <br />
          {shopData.description}
        </p>
        <p>
          Program: <br />
          {shopData.schedule}
        </p>
        <p>Email-ul de contact: {shopData.email}</p>
      </div>
      <div className="containerHartaMag">
        <Map center={defaultPosition} zoom={defaultZoom} markers={markers} />
      </div>
    </div>
  );
};

export default Magazinul;
