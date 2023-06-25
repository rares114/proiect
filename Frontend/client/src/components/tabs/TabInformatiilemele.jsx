import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { server_url } from "../../config";

const TabInformatiileMele = () => {
  const [shopName, setShopName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const handleNameChange = (e) => {
    setShopName(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      shopName,
      address,
      phone,
    };

    try {
      const response = await axios.post(`${server_url}/shops/me`, payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.status === 200) {
        toast.success("Informatiile au fost actualizate");
      } else {
        toast.error("Nu s-au putu actualiza informatiile");
      }
    } catch (error) {
      toast.error("A aparut o problema");
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="shopName">Shop name:</label>
          <input
            type="text"
            id="shopName"
            value={shopName}
            onChange={handleNameChange}
            className="register-input"
          />
        </div>
        <div>
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={handleAddressChange}
            className="register-input"
          />
        </div>
        <div>
          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={handlePhoneChange}
            className="register-input"
          />
        </div>
        <div className="register-button-container">
          <button type="submit">Actualizeaza</button>
        </div>
      </form>
    </div>
  );
};

export default TabInformatiileMele;
