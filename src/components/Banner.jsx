import { useState, useEffect } from "react";
import bgBanner from "../assets/banner-img.webp";

function Banner() {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentOffsetY = window.scrollY;
      setOffsetY(currentOffsetY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative w-full h-[80vh] overflow-hidden pt-16 [clip-path:polygon(0_0,100%_0,100%_85%,0_100%)]">
      {/* Image with parallax effect */}
      <img
        src={bgBanner}
        alt="Banner"
        fetchPriority="high"
        className="absolute inset-0 w-full h-full object-cover ease-out"
        style={{
          transform: `translateY(${offsetY * 0.3}px)`,
        }}
      />

      {/* Overlay content */}
      <div className="absolute inset-0 bg-black/60 flex flex-col justify-center items-center text-white">
        <h1 className="text-5xl font-bold tracking-wide">Ideas</h1>
        <p className="text-lg mt-2 font-light opacity-90">
          Where all our great things begin
        </p>
      </div>
    </div>
  );
}

export default Banner;
