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
      <div className="min-h-screen bg-gray-50 text-gray-900 pt-20">
        <Header />

        {/* Route handling */}
        <Routes>
          {/* Main page (Ideas) */}
          <Route
            path="/"
            element={
              <main id="main-content">
                <Banner />
                <ListPost />
              </main>
            }
          />

          <Route
            path="/work"
            element={
              <main>
                <Work />
              </main>
            }
          />
          <Route
            path="/about"
            element={
              <main>
                <About />
              </main>
            }
          />
          <Route
            path="/services"
            element={
              <main>
                <Services />
              </main>
            }
          />
          <Route
            path="/careers"
            element={
              <main>
                <Careers />
              </main>
            }
          />
          <Route
            path="/contact"
            element={
              <main>
                <Contact />
              </main>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
