import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { chartData, chartOptions, sugarCrisisData } from "./ChartData";
import "./chart.css";

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

const SimplePieChart = () => {
  return (
    <div className="pie-chart-container simple">
      <div className="chart-header">
        <h3 className="chart-title">Distribusi Krisis Gula Berlebih</h3>
        <p className="chart-subtitle">
          Data menunjukkan pola konsumsi yang mengkhawatirkan di semua level
        </p>
      </div>

      <div className="chart-wrapper">
        <div className="chart-canvas">
          <Pie
            data={chartData}
            options={{
              ...chartOptions,
              plugins: {
                ...chartOptions.plugins,
                title: {
                  display: true,
                  text: "Skala Krisis Gula",
                  font: {
                    size: 16,
                    weight: "bold",
                  },
                  padding: {
                    top: 10,
                    bottom: 30,
                  },
                },
              },
            }}
          />
          <div className="chart-note">
            <p>
              💡 <strong>Insight:</strong> Peningkatan signifikan pada kelompok
              usia muda menunjukkan urgensi intervensi edukatif yang relevan
              dengan Generasi Z.
            </p>
          </div>
        </div>

        <div className="chart-details">
          <div className="details-header">
            <h4>📊 Detail Data</h4>
            <p>Klik/tap bagian chart untuk melihat detail</p>
          </div>

          <div className="data-list">
            {Object.values(sugarCrisisData).map((item, index) => (
              <div key={index} className="data-item">
                <div
                  className="data-color"
                  style={{ backgroundColor: item.color }}
                />
                <div className="data-content">
                  <div className="data-header">
                    <span className="data-icon">{item.icon}</span>
                    <span className="data-label">{item.label}</span>
                  </div>
                  <div className="data-value">
                    <strong>{item.value}</strong> {item.unit}
                  </div>
                  <div className="data-desc">{item.description}</div>
                  <div className="data-badge">
                    <span className="badge">↑ {item.increase}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimplePieChart;
