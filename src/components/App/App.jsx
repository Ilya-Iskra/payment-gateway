import Web3Provider from "../Web3Provider/Web3Provider";
import BackgroundTexture from "/src/components/BackgroundTexture";
import PaymentPage from "../../pages/PaymentPage";
import "./App.css";

function App() {
  return (
    <Web3Provider>
      <div className="app">
        <BackgroundTexture />
        <PaymentPage />
      </div>
    </Web3Provider>
  );
}

export default App;
