import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home/Home";
import Kitchen from "./Components/Kitchen/Kitchen";
import Served from "./Components/Served/Served";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/kitchen" element={<Kitchen />} />
        <Route path="/served" element={<Served />} />
      </Routes>
    </div>
  );
}

export default App;
