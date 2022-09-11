import {
  Routes,
  Route,
  HashRouter
} from "react-router-dom";

import Login from '../src/Pages/Login';
import Home from './components/Home';
import '../src/styles/main.scss';
import Details from "./Pages/Details";
import { DataProvider } from "../src/Contexts/DataContext";
import { ThemeProvider } from "./Contexts/ThemeContext";

function App() {
  return (
    <div>
      <ThemeProvider>
        <DataProvider>
          <HashRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Home />} />
              <Route path=":name" element={<div className="app"><Details /></div>} />
            </Routes>
          </HashRouter>
        </DataProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
