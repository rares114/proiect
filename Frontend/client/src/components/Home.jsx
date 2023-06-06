import React from "react";
import myImage from "../images/StoreLOGO.png";
import myImage2 from "../images/storePNG.png";
import PrimaryNavbar from './PrimaryNavbar';

const Home = () => (
  <>
    <PrimaryNavbar />
    <img src={myImage} className="logo" />
    <img src={myImage2} className="grocery" />
    <h1>Welcome to an enchanting world, full of local treasures!</h1>
    <div className="divH2">
      <h2>
        Explore non-stop shops, grocery stores, bakeries, and florists, where
        you will find unique products and personalized services. Enjoy the
        simple pleasures of shopping and be inspired by the beauty and freshness
        offered by small businesses in your neighborhood. Be part of a vibrant
        community and support these local enterprises, bringing a touch of magic
        and color into your everyday life. Discover these treasures and let
        yourself be carried away in an experience full of surprises and
        inspiration!
      </h2>
    </div>
  </>
);

export default Home;
