import { BrowserRouter } from "react-router-dom";
import "./global.css";
import { Routers } from "./Router";

function App() {
  return (
    <BrowserRouter>
      <Routers />
    </BrowserRouter>
  );
}

export default App;
