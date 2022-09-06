import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import './App.css';
import Home from './components/Home';
import '../src/styles/main.scss'
import Details from "./Pages/Details";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path=":name" element={<Details />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
