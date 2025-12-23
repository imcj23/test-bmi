import '../styles/bmi.css';

const BMIResult = ({ results, onReset }) => {
  if (!results) return null;

  const { bmi, category, idealWeight, healthAdvice, userData } = results;
  
  // Hitung posisi marker pada skala (0-100%)
  const getMarkerPosition = () => {
    if (bmi < 18.5) return (bmi / 18.5) * 25;
    if (bmi <= 24.9) return 25 + ((bmi - 18.5) / (24.9 - 18.5)) * 25;
    if (bmi <= 29.9) return 50 + ((bmi - 25) / (29.9 - 25)) * 25;
    return 75 + Math.min(((bmi - 30) / 20) * 25, 25);
  };

  const markerPosition = Math.max(0, Math.min(getMarkerPosition(), 100));

  return (
    <div className="result-section" style={{ borderLeftColor: category.color }}>
      <h2>Hasil BMI Anda</h2>
      
      <div className="bmi-display">
        <div className="bmi-value" style={{ color: category.color }}>
          {bmi.toFixed(1)}
        </div>
        <div 
          className="bmi-category"
          style={{ 
            color: category.color,
            backgroundColor: category.bgColor
          }}
        >
          {category.name} ({category.description})
        </div>
      </div>

      <div className="bmi-scale">
        <div className="scale-bar">
          <div 
            className="scale-marker"
            style={{ left: `${markerPosition}%` }}
          >
            ▲
          </div>
        </div>
        <div className="scale-labels">
          <span>Kurus</span>
          <span>Normal</span>
          <span>Gemuk</span>
          <span>Obesitas</span>
        </div>
      </div>

      <div className="ideal-weight">
        <h3>Berat Ideal untuk Tinggi {userData.height} cm</h3>
        <p>{idealWeight.range}</p>
      </div>

      <div className="health-advice">
        <h3>Saran Kesehatan</h3>
        <ul>
          {healthAdvice.map((advice, index) => (
            <li key={index}>{advice}</li>
          ))}
        </ul>
      </div>

      <div className="disclaimer">
        <p>
          <small>
            <em>
              Catatan: BMI adalah indikator umum dan tidak memperhitungkan massa otot, 
              usia, jenis kelamin, atau faktor lainnya. Konsultasikan dengan profesional 
              kesehatan untuk penilaian yang lengkap.
            </em>
          </small>
        </p>
      </div>

      <button 
        className="reset-btn"
        onClick={onReset}
      >
        Hitung Ulang
      </button>
    </div>
  );
};

export default BMIResult;