import React from "react";
import ArchLandscapeContainer from "./Arch-Lansdcap-Container";
import PortraitContainer from "./Portrait-Container";
import StreetContainer from "./Street-Container";
import About from "./About";

function App() {
  return (
    <>
      <About />
      <PortraitContainer />
      <StreetContainer />
      <ArchLandscapeContainer />
      <Contact />
    </>
  );
}

export default App;
