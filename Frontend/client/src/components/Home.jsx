import React from "react";
import myImage from "../images/StoreLOGO.png";
import myImage2 from "../images/storePNG.png";
import PrimaryNavbar from "./PrimaryNavbar";
import Map from "./Map";
import { Input, Button } from 'antd';

const Home = () => {
  const defaultPosition = [51.505, -0.09];
  const defaultZoom = 13; 

  return (
    <div style={{ overflowY: 'scroll', height: '100vh' }}>
      <PrimaryNavbar />
      <div className="logo-container">
        <img src={myImage} className="logo" alt="Logo" />
      </div>
      <h1>Bine ai venit în lumea micilor comori locale!</h1>
      <div className="divH2">
        <h2>
        Explorează brutăriile și florăriile, magazinele alimentare și non-stop, unde vei găsi produse unice și servicii personalizate. Bucură-te de plăcerile simple ale cumpărăturilor și lasă-te inspirat de frumusețea și prospețimea oferite de afacerile mici din vecinătatea ta. Fă parte dintr-o comunitate vibrantă și susține aceste întreprinderi locale, aducând o notă de magie și culoare în viața ta de zi cu zi. Descoperă aceste comori și lasă-te purtat într-o experiență plină de surprize și inspirație!
        </h2>
      </div>
      <img src={myImage2} className="grocery" alt="Grocery" />
      <div className="containerHarta">
        <Map center={defaultPosition} zoom={defaultZoom} />
      </div>
      <Input className="productInput"/>
      <Button className="nav-btn-home">
      Caută
      </Button>
      <h1 className="h1search">Începe deja să cauți produsele dorite!</h1>
    </div>
  );
};

export default Home;
