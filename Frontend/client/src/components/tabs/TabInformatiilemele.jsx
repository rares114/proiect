import React, { useState, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { server_url } from "../../config";
import { Input, Button } from "antd";
import Map from "../Map";
import Geocode from "react-geocode";

const TabInformatiileMele = () => {
  const [markerPosition, setMarkerPosition] = useState([51.505, -0.09]);
  const [shopName, setShopName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [schedule, setSchedule] = useState("");
  const mapRef = useRef(null);

  const { TextArea } = Input;

  const handleNameChange = (e) => {
    setShopName(e.target.value);
  };

  const handleScheduleChange = (e) => {
    setSchedule(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const payload = {
      shopName,
      email,
      address,
      phone,
      schedule,
      description,
    };
  
    try {
      const response = await axios.post(`${server_url}/shops/me`, payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
  
      if (response.status === 200) {
        Geocode.fromAddress(address)
          .then((response) => {
            const { lat, lng } = response.results[0].geometry.location;
            setMarkerPosition([lat, lng]);
            mapRef.current.setView([lat, lng], 13);
          })
          .catch((error) => {
            console.error(error);
          });
  
        toast.success("Informatiile au fost actualizate");
      } else {
        toast.error("Nu s-au putu actualiza informatiile");
      }
    } catch (error) {
      toast.error("A aparut o problema");
    }
  };
  

  return (
    <div>
      <div className="infomele-containter">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="shopName">Numele magazinului:</label>
            <div>
              <TextArea
                rows={1}
                placeholder="Setează numele magazinului"
                maxLength={50}
                style={{ width: "200px" }}
                id="name"
                value={shopName}
                onChange={handleNameChange}
              />
            </div>
          </div>
          <div>
            <label htmlFor="email">Email de contact:</label>
            <div>
              <TextArea
                rows={1}
                placeholder="Setează emailul de contact"
                maxLength={50}
                style={{ width: "200px" }}
                id="email"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
          </div>
          <div>
            <label htmlFor="address">Adresa:</label>
            <div>
              <TextArea
                rows={1}
                placeholder="Setează adresa magazinului"
                maxLength={50}
                style={{ width: "300px" }}
                id="address"
                value={address}
                onChange={handleAddressChange}
              />
            </div>
          </div>
          <div>
            <label htmlFor="phone">Telefon:</label>
            <div>
              <TextArea
                rows={1}
                maxLength={10}
                style={{ width: "130px" }}
                id="phone"
                value={phone}
                onChange={handlePhoneChange}
              />
            </div>
          </div>
          <div>
            <label htmlFor="address">Descriere:</label>
            <div>
              <TextArea
                rows={4}
                placeholder="Introdu o descriere a magazinului"
                maxLength={200}
                style={{ width: "600px" }}
                id="description"
                value={description}
                onChange={handleDescriptionChange}
              />
            </div>
          </div>
          <div>
            <label htmlFor="email">Program:</label>
            <div>
              <TextArea
                rows={1}
                placeholder="Scrie programul magazinului"
                maxLength={50}
                style={{ width: "220px" }}
                id="schedule"
                value={schedule}
                onChange={handleScheduleChange}
              />
            </div>
          </div>
          <div className="register-button-container">
            <Button type="primary" htmlType="submit" className="nav-btn">
              Actualizează
            </Button>
          </div>
        </form>
      </div>
      <Map markerPosition={markerPosition} />
    </div>
  );
};

export default TabInformatiileMele;
