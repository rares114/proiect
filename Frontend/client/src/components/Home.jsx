import React, { useState } from "react";
import myImage from "../images/StoreLOGO.png";
import myImage2 from "../images/storePNG.png";
import PrimaryNavbar from "./PrimaryNavbar";
import Map from "./Map";
import { Input, Button } from "antd";
import axios from "axios";
import { toast } from "react-toastify";
import { OpenStreetMapProvider } from "leaflet-geosearch";

const Home = () => {
  const defaultPosition = [51.505, -0.09];
  const defaultZoom = 13;

  const [search, setSearch] = useState(null);
  const [markers, setMarkers] = useState([]);

  const cautaProdus = async () => {
    try {
      const response = await axios.get(`/shops/product/search/${search}`);

      if (response.status !== 200) {
        throw "Could not find any products";
      }

      const addresses = response.data;
      console.log(addresses);

      const provider = new OpenStreetMapProvider();
      let geocodeCoords = [];
      for (const addr of addresses) {
        const results = await provider.search({ query: addr.address });
        if (results.length > 0) {
          geocodeCoords.push(results[0]);
        }
      }

      setMarkers(geocodeCoords);
    } catch (error) {
      console.log(error);
      toast.error("Could not find products");
    }
  };

  return (
    <div style={{ overflowY: "scroll", height: "100vh" }}>
      <PrimaryNavbar />
      <div className="logo-container">
        <img src={myImage} className="logo" alt="Logo" />
      </div>
      <h1>Bine ai venit în lumea micilor comori locale!</h1>
      <div className="divH2">
        <h2>
          Explorează brutăriile și florăriile, magazinele alimentare și
          non-stop, unde vei găsi produse unice și servicii personalizate.
          Bucură-te de plăcerile simple ale cumpărăturilor și lasă-te inspirat
          de frumusețea și prospețimea oferite de afacerile mici din vecinătatea
          ta. Fă parte dintr-o comunitate vibrantă și susține aceste
          întreprinderi locale, aducând o notă de magie și culoare în viața ta
          de zi cu zi. Descoperă aceste comori și lasă-te purtat într-o
          experiență plină de surprize și inspirație!
        </h2>
      </div>
      <img src={myImage2} className="grocery" alt="Grocery" />
      <div className="containerHarta">
        <Map center={defaultPosition} zoom={defaultZoom} markers={markers} />
      </div>
      <Input
        className="productInput"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Button className="nav-btn-home" onClick={cautaProdus}>
        Caută
      </Button>
      <h1 className="h1search">Începe deja să cauți produsele dorite!</h1>
    </div>
  );
};

export default Home;
