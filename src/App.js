import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Login from '../src/Pages/Login';
import Home from './components/Home';
import '../src/styles/main.scss';
import Details from "./Pages/Details";
import { DataProvider } from "../src/Contexts/DataContext";

function App() {
  return (
    <div>
      <DataProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path=":name" element={<div className="app"><Details /></div>} />
          </Routes>
        </BrowserRouter>
      </DataProvider>
    </div>
  );
}

export default App;
