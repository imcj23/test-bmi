import React, { useState, useRef } from "react";
import { Pie, getElementAtEvent } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { chartData, chartOptions, sugarCrisisData } from "./ChartData";
import "./chart.css";

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

const InteractivePieChart = () => {
  const [selectedData, setSelectedData] = useState(null);
  const chartRef = useRef();

  const handleChartClick = (event) => {
    if (!chartRef.current) return;

    const element = getElementAtEvent(chartRef.current, event);
    if (element.length > 0) {
      const index = element[0].index;
      const dataKey = Object.keys(sugarCrisisData)[index];
      setSelectedData(sugarCrisisData[dataKey]);
    }
  };

  const customOptions = {
    ...chartOptions,
    onClick: handleChartClick,
    plugins: {
      ...chartOptions.plugins,
      tooltip: {
        ...chartOptions.plugins.tooltip,
        callbacks: {
          ...chartOptions.plugins.tooltip.callbacks,
          afterBody: function (context) {
            const index = context[0].dataIndex;
            const dataKey = Object.keys(sugarCrisisData)[index];
            return [sugarCrisisData[dataKey]?.detail || ""];
          },
        },
      },
    },
  };

  return (
    <div className="pie-chart-container interactive">
      <div className="chart-header">
        <h3 className="chart-title">🔄 Klik untuk Jelajahi Data Krisis Gula</h3>
        <p className="chart-subtitle">Interaktif • Detail • Insightful</p>
      </div>

      <div className="chart-content">
        <div className="chart-section">
          <div className="chart-canvas-wrapper">
            <Pie ref={chartRef} data={chartData} options={customOptions} />
            <div className="chart-instruction">
              <span>👆 Klik bagian chart untuk detail</span>
            </div>
          </div>
          <div className="data-summary">
            <h5>🎯 Ringkasan</h5>
            <p>
              Data menunjukkan pola <strong>krisis berlapis</strong> dari global
              ke lokal dengan <strong>peningkatan paling signifikan</strong>{" "}
              pada kelompok usia muda, menandakan urgensi intervensi yang tepat
              sasaran.
            </p>
          </div>
        </div>

        <div className="detail-section">
          {selectedData ? (
            <div className="selected-detail">
              <div
                className="detail-header"
                style={{ borderLeftColor: selectedData.color }}
              >
                <span className="detail-icon">{selectedData.icon}</span>
                <h4>{selectedData.label}</h4>
              </div>

              <div className="detail-stats">
                <div className="stat-card">
                  <div className="stat-label">Nilai</div>
                  <div className="stat-value">
                    {selectedData.value}{" "}
                    <span className="stat-unit">{selectedData.unit}</span>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-label">Kenaikan</div>
                  <div className="stat-value increase">
                    {selectedData.increase}
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-label">Proporsi</div>
                  <div className="stat-value">
                    {(
                      (selectedData.value /
                        Object.values(sugarCrisisData).reduce(
                          (a, b) => a + b.value,
                          0
                        )) *
                      100
                    ).toFixed(1)}
                    %
                  </div>
                </div>
              </div>

              <div className="detail-description">
                <p>
                  <strong>Deskripsi:</strong> {selectedData.description}
                </p>
                <p>
                  <strong>Detail:</strong> {selectedData.detail}
                </p>
              </div>

              <div className="detail-source">
                <span className="source-label">Sumber:</span>
                <span className="source-value">{selectedData.source}</span>
              </div>

              <button
                className="reset-button"
                onClick={() => setSelectedData(null)}
              >
                Reset Pilihan
              </button>
            </div>
          ) : (
            <div className="default-detail">
              <div className="default-header">
                <h4>📈 Data Krisis Gula</h4>
                <p>Pilih bagian chart untuk melihat detail data</p>
              </div>

              <div className="comparison-table">
                <table>
                  <thead>
                    <tr>
                      <th>Level</th>
                      <th>Nilai</th>
                      <th>Kenaikan</th>
                      <th>Proporsi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.values(sugarCrisisData).map((item, index) => {
                      const total = Object.values(sugarCrisisData).reduce(
                        (a, b) => a + b.value,
                        0
                      );
                      const percentage = ((item.value / total) * 100).toFixed(
                        1
                      );

                      return (
                        <tr key={index}>
                          <td>
                            <div className="table-cell">
                              <span className="table-icon">{item.icon}</span>
                              <span>{item.label}</span>
                            </div>
                          </td>
                          <td>
                            <strong>{item.value}</strong> {item.unit}
                          </td>
                          <td>
                            <span className="increase-badge">
                              {item.increase}
                            </span>
                          </td>
                          <td>
                            <div className="percentage-bar">
                              <div
                                className="bar-fill"
                                style={{
                                  width: `${percentage}%`,
                                  backgroundColor: item.color,
                                }}
                              />
                              <span className="percentage-text">
                                {percentage}%
                              </span>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InteractivePieChart;
