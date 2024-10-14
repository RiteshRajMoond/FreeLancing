import React from "react";
import Navbar from "./Navbar";
import Homepage from "./Homepage";
import Footer from "./Footer";
import HomeCard from "./HomeCard";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Homepage />
      <HomeCard />
      <Footer />
    </div>
  );
}
