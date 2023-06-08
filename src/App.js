import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Transferencia from "./Components/Transferencia";
import CadastroChave from "./Components/CadastroChave";


function App() {
 

  return (
    <div className="App">
      <Router>
        <Routes>
            <Route path="/" element={ <CadastroChave />}></Route>
            <Route path="/transferencia" element={ <Transferencia />}></Route>
        </Routes>
    </Router>
    </div>
  );
}

export default App;
