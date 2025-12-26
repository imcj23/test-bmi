import Chart from '../components/PieChart'
import Quiz from '../components/quiz';
import IBIKKG from "../assets/univ.png";
import Logo from "../assets/Logo.png";
import Arrow from "../assets/arrowdown.png";
import Hendi from "../assets/hendi.png";
import Stevi from "../assets/stevi.png";
import Data from "../assets/diagram diabetes.png";
import "../styles/landingpage.css";

export default function LandingPage() {
  return (
    <>
      <main>
        <section className="container">
          <nav className="navbar">
            <div className="ibikkg">
              <img src={IBIKKG} alt="IBIKKG Logo" className="logo" />
              <div className="triangle"></div>
            </div>
          </nav>
          <div className="manissecukupnya">
            <img src={Logo} alt="Logo" />
          </div>
          <div className="tagline">
            <h1>Hidup Bahagia Tanpa Gula Berlebihan</h1>
            <p>
              Raih energi lebih stabil, mood yang lebih baik, dan tubuh yang
              lebih sehat dengan mengelola asupan gula harian Anda.
            </p>
            <div className="button-scroll">
              <button>
                <img src={Arrow} alt="" />
                Lebih Lanjut
                <img src={Arrow} alt="" />
              </button>
            </div>
            <div className="hendi">
              <img src={Hendi} alt="Hendi Illustration" />
            </div>
          </div>
        </section>
        <section className="page-2">
          <div className="tagline">
            <h1>
              Mengapa Kita Butuh Pendekatan Baru untuk Edukasi Gula di Era
              Digital?
            </h1>
          </div>
          <div className="page-container">
            <img src={Stevi} alt="Stevia Illustration" />
            <aside>
              <p>
                Generasi Z menghadapi paradoks: paling update dengan tren, namun
                seringkali kurang aware dengan batas aman konsumsi gula. mengapa
                hal ini penting bagi genenasi Z ?
              </p>
              <img src={Data} alt="Data Diabetes" className="data"/>
              <p>
                Fenomena ini menunjukkan bahwa pendekatan edukasi konvensional
                sudah tidak cukup. Dibutuhkan solusi kreatif, interaktif, dan
                native di dunia digital untuk menjangkau Generasi Z.
              </p>
            </aside>
          </div>
          <Chart/>
          <Quiz/>
        </section>
      </main>
    </>
  );
}
