import { useState, useEffect } from "react";
import Logo from "../assets/Logo.png";
import "../styles/landingpage.css";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  // Efek untuk mendeteksi scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handler untuk klik logo
  const handleLogoClick = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <>
      <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
        <div className="navbar-container">
          <div className="navbar-logo">
            <a
              href="#icon"
              onClick={handleLogoClick}
              aria-label="kembali ke atas"
            >
              <img src={Logo} alt="logo" loading="lazy" />
              <h2>Hidup Bahagia Tanpa Gula Berlebih</h2>
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
