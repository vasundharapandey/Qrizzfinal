import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";

import FAQ from "./scenes/faq";
import Favouritecharts from "./scenes/favourite/favouritecharts";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";

import "./index.css";

import Favouritequeries from "./scenes/favourite/favouritequeries";
function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<Favouritecharts />} />
              <Route path="/favouritecharts" element={<Favouritecharts />} />
              <Route path="/favouritequeries" element={<Favouritequeries />} />
             
           
              <Route path="/faq" element={<FAQ />} />
          
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
