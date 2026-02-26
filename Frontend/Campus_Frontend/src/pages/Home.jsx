import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../style/Home.css";
import img1 from "../images/img_1.jpg";
import img2 from "../images/img_2.jpg";
import img3 from "../images/img_3.jpg";
import img4 from "../images/img_4.jpg";
import img5 from "../images/img5.jpg";
// import img6 from "../images/img6.jpg";
// import img7 from "../images/img7.jpg";
// import img8 from "../images/img8.jpg";
import Miscarriage from "./resume/Miscarriage";

// const images = [img1,img2,img3,img4,img5,img6,img7,img8];
const images = [img1,img2,img3,img4,img5];


function Home() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000); // change every 4 sec

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Navbar />
      <div
        className="home-container"
        style={{
          backgroundImage: `url(${images[currentImage]})`,
        }}
      >
        <div className="overlay">
          <h1>Welcome to Campus Recruitment Portal</h1>
          <p>Connecting Students with Opportunities</p>
        </div>
      </div>
      <Miscarriage />
    </>
  );
}

export default Home;
