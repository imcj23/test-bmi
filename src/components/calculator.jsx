import { useState } from "react";
import BMIResult from "./result";
import BMIInfo from "./info";
import { calculateBMI, getBMICategory, calculateIdealWeight, getHealthAdvice, validateInput} from "../utils/bmi";
// import "../styles/bmi.css";

  const BMICalculator = () => {
    const [userData, setUserData] = useState({
      weight: "",
      height: "",
    });
    const [results, setResults] = useState(null);
    const [errors, setErrors] = useState([]);

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      // Hanya izinkan angka dan titik desimal
      const sanitizedValue = value.replace(/[^0-9.]/g, "");

      // Pastikan hanya satu titik desimal
      const parts = sanitizedValue.split(".");
      const finalValue =
        parts.length > 2
          ? parts[0] + "." + parts.slice(1).join("")
          : sanitizedValue;

      setUserData((prev) => ({
        ...prev,
        [name]: finalValue,
      }));

      // Reset error saat user mengetik
      if (errors.length > 0) {
        setErrors([]);
      }
    };

    const handleCalculate = () => {
      const validation = validateInput(userData.weight, userData.height);

      if (!validation.isValid) {
        setErrors(validation.errors);
        setResults(null);
        return;
      }

      setErrors([]);

      const weight = parseFloat(userData.weight);
      const height = parseFloat(userData.height);

      try {
        const bmi = calculateBMI(weight, height);
        const category = getBMICategory(bmi);
        const idealWeight = calculateIdealWeight(height);
        const healthAdvice = getHealthAdvice(category);

        setResults({
          bmi,
          category,
          idealWeight,
          healthAdvice,
          userData: { weight, height },
        });
      } catch (error) {
        setErrors([error.message]);
      }
    };

    const handleReset = () => {
      setUserData({ weight: "", height: "" });
      setResults(null);
      setErrors([]);
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      handleCalculate();
    };

    return (
      <div className="bmi-calculator-container">
        <div className="header">
          <h1>Kalkulator BMI</h1>
          <p className="subtitle">
            Hitung Indeks Massa Tubuh Anda untuk mengetahui status berat badan
          </p>
        </div>

        <div className="calculator-wrapper">
          <div className="input-section">
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label htmlFor="weight">Berat Badan (kg)</label>
                <input
                  type="text"
                  id="weight"
                  name="weight"
                  value={userData.weight}
                  onChange={handleInputChange}
                  placeholder="Contoh: 65.5"
                  className={
                    errors.some((e) => e.includes("Berat")) ? "error" : ""
                  }
                />
                <div className="unit">kilogram</div>
              </div>

              <div className="input-group">
                <label htmlFor="height">Tinggi Badan (cm)</label>
                <input
                  type="text"
                  id="height"
                  name="height"
                  value={userData.height}
                  onChange={handleInputChange}
                  placeholder="Contoh: 170"
                  className={
                    errors.some((e) => e.includes("Tinggi")) ? "error" : ""
                  }
                />
                <div className="unit">sentimeter</div>
              </div>

              {errors.length > 0 && (
                <div className="error-messages">
                  {errors.map((error, index) => (
                    <div key={index} className="error-message">
                      ⚠️ {error}
                    </div>
                  ))}
                </div>
              )}

              <div className="button-group">
                <button
                  type="submit"
                  className="calculate-btn"
                  disabled={!userData.weight || !userData.height}
                >
                  Hitung BMI
                </button>
                <button
                  type="button"
                  className="reset-btn"
                  onClick={handleReset}
                >
                  Reset
                </button>
              </div>
            </form>

            <div className="sample-data">
              <h4>Contoh Data:</h4>
              <div className="sample-buttons">
                <button
                  onClick={() => setUserData({ weight: "65", height: "170" })}
                  className="sample-btn"
                >
                  Pria (65kg, 170cm)
                </button>
                <button
                  onClick={() => setUserData({ weight: "55", height: "160" })}
                  className="sample-btn"
                >
                  Wanita (55kg, 160cm)
                </button>
              </div>
            </div>
          </div>

          <div className="result-section-wrapper">
            {results ? (
              <BMIResult results={results} onReset={handleReset} />
            ) : (
              <div className="initial-state">
                <h2>Hasil BMI Anda</h2>
                <p>
                  Masukkan data berat dan tinggi badan Anda, lalu klik "Hitung
                  BMI"
                </p>
                <div className="placeholder-graphic">
                  <div className="scale-placeholder"></div>
                </div>
              </div>
            )}
          </div>
        </div>

        <BMIInfo />
      </div>
    );
  };

  export default BMICalculator;
