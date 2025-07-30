import "leaflet/dist/leaflet.css";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./theme";
import { CssBaseline } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BoulderEditor from "./components/layout/BoulderEditor";
import Layout from "./components/layout/Layout";
import EventEditor from "./components/common/EventEditor";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<EventEditor />} />
              <Route path="event/:eventId" element={<BoulderEditor />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
