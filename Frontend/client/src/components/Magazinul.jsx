import React, { useEffect, useState } from "react";
import axios from "axios";
import { server_url } from "../config";
import { useParams } from "react-router-dom";

const Magazinul = () => {
  const [shopData, setShopData] = useState({});
  const { shopId } = useParams();

  useEffect(() => {
    fetchShopDetails();
  }, []);

  const fetchShopDetails = async () => {
    try {
      const shopInfo = await getShopInformation(shopId);
      setShopData(shopInfo);
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
      <p>Shop Details</p>
      <p>Shop Name: {shopData.name}</p>
      <p>Email: {shopData.email}</p>
      <p>Address: {shopData.address}</p>
    </div>
  );
};

export default Magazinul;
