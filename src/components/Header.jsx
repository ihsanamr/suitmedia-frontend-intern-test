import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

function Header() {
  const [shown, setShown] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Scroll position state
  const [isScrolled, setIsScrolled] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  // Navigation menus
  const menus = ["Work", "About", "Services", "Ideas", "Careers", "Contact"];

  useEffect(() => {
    const controlNavbar = () => {
      if (isOpen) return;
      // 1. Hide/show navbar on scroll
      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        setShown(false);
      } else {
        setShown(true);
      }

      // 2. Change background styling when scrolled
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [lastScrollY, isOpen]);

  return (
    <header
      className={`fixed top-0 left-0 w-full h-20 p-4 transition-all duration-500 z-50 text-white
        ${shown ? "translate-y-0" : "-translate-y-full"}
        ${isScrolled || isOpen ? "bg-orange-600/70 backdrop-blur-md shadow-md" : "bg-orange-600"}
      `}
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center h-full">
        <img
          src="src/assets/logo-suitmedia.png"
          alt="Logo"
          className="h-10 md:h-12 w-auto cursor-pointer"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            setIsOpen(false);
          }}
        />

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 focus:outline-none z-50 flex flex-col gap-1.5 cursor-pointer"
        >
          <span
            className={`w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? "rotate-45 translate-y-2" : ""}`}
          ></span>
          <span
            className={`w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? "opacity-0" : ""}`}
          ></span>
          <span
            className={`w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-2" : ""}`}
          ></span>
        </button>

        {/* Responsive Navigation */}
        <nav
          className={`
          flex gap-8 text-lg font-medium transition-all duration-300 ease-in-out
          fixed inset-0 flex-col justify-center items-center bg-orange-600 w-full h-screen
          ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}
          
          md:static md:flex md:flex-row md:w-auto md:h-auto md:bg-transparent md:opacity-100 md:visible md:text-sm md:gap-6
        `}
        >
          {menus.map((menu) => {
            const path = menu === "Ideas" ? "/" : `/${menu.toLowerCase()}`;

            return (
              <NavLink
                key={menu}
                to={path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `pb-1 transition-all text-lg duration-200 cursor-pointer ${
                    isActive
                      ? "border-b-2 border-white font-bold opacity-100"
                      : "opacity-75 hover:opacity-100 border-b-2 border-transparent"
                  }`
                }
              >
                {menu}
              </NavLink>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

export default Header;
