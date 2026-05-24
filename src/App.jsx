import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import Header from "./components/Header";
import Banner from "./components/Banner";
import ListPost from "./components/ListPost";

// Pages
import Work from "./pages/Work";
import About from "./pages/About";
import Services from "./pages/Services";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 text-gray-900">
        {/* Global sticky header */}
        <Header />

        {/* Route handling */}
        <Routes>
          {/* Main page (Ideas) */}
          <Route
            path="/"
            element={
              <>
                <Banner />
                <ListPost />
              </>
            }
          />

          {/* Dummy pages */}
          <Route path="/work" element={<Work />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
