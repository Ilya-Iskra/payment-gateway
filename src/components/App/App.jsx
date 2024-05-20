// import { useState } from "react";
import BackgroundTexture from "/src/components/BackgroundTexture";
import Centered from "../../layouts/Cetnered/Centered.layout";
import "./App.css";

function App() {
  return (
    <div className="app">
      <BackgroundTexture />
      <Centered>
        <div>text</div>
      </Centered>
    </div>
  );
}

export default App;
