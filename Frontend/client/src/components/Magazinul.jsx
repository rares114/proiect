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
    </div>
  );
};

export default Magazinul;
