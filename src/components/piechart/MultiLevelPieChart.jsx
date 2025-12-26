import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { sugarCrisisData } from './ChartData';
import './chart.css';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

const MultiLevelPieChart = () => {
  // Data untuk donat luar (global impact)
  const globalData = {
    labels: ['Dunia', 'Indonesia', 'Anak & Remaja'],
    datasets: [
      {
        data: [60, 25, 15],
        backgroundColor: ['#4A90E2', '#E24A4A', '#F5A623'],
        borderWidth: 3,
        borderColor: 'white',
        circumference: 270, // 3/4 lingkaran
        rotation: -135, // mulai dari kiri
      }
    ]
  };

  // Data untuk donat dalam (growth rate)
  const growthData = {
    labels: ['Dunia', 'Indonesia', 'Anak & Remaja'],
    datasets: [
      {
        data: [44, 200, 7000],
        backgroundColor: ['#4A90E240', '#E24A4A40', '#F5A62340'],
        borderWidth: 2,
        borderColor: 'white',
        circumference: 270,
        rotation: -135,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '65%',
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            // Data labels sudah tersedia di chartData
            const impactValue = globalData.datasets[0].data[context.dataIndex];
            const growthValue = growthData.datasets[0].data[context.dataIndex];
            return [
              `${context.label}: ${impactValue}% dampak`,
              `Kenaikan: ${growthValue}%`
            ];
          }
        }
      }
    }
  };

  return (
    <div className="pie-chart-container multilevel">
      <div className="chart-header">
        <h3 className="chart-title">📊 Multi-Level Analysis: Dampak vs Kenaikan</h3>
        <p className="chart-subtitle">Donat luar: Skala dampak • Donat dalam: Persentase kenaikan</p>
      </div>
      
      <div className="chart-content">
        <div className="multi-chart-wrapper">
          <div className="doughnut-container">
            <Doughnut data={globalData} options={options} />
            <div className="doughnut-label">
              <span className="label-title">Dampak</span>
              <span className="label-sub">Skala Krisis</span>
            </div>
          </div>
          
          <div className="doughnut-container inner">
            <Doughnut data={growthData} options={options} />
            <div className="doughnut-label">
              <span className="label-title">Kenaikan</span>
              <span className="label-sub">% Peningkatan</span>
            </div>
          </div>
        </div>
        
        <div className="multi-legend">
          <div className="legend-grid">
            {Object.values(sugarCrisisData).map((item, index) => (
              <div key={index} className="legend-item">
                <div className="legend-color-row">
                  <div 
                    className="color-box outer" 
                    style={{ backgroundColor: globalData.datasets[0].backgroundColor[index] }}
                  />
                  <div 
                    className="color-box inner" 
                    style={{ backgroundColor: growthData.datasets[0].backgroundColor[index] }}
                  />
                </div>
                <div className="legend-content">
                  <div className="legend-title">
                    <span className="legend-icon">{item.icon}</span>
                    <span className="legend-name">{item.label}</span>
                  </div>
                  <div className="legend-values">
                    <div className="value-item">
                      <span className="value-label">Dampak:</span>
                      <span className="value-number">{globalData.datasets[0].data[index]}%</span>
                    </div>
                    <div className="value-item">
                      <span className="value-label">Kenaikan:</span>
                      <span className="value-number increase">{growthData.datasets[0].data[index]}%</span>
                    </div>
                  </div>
                  <div className="legend-desc">
                    {item.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="chart-insight">
            <div className="insight-icon">💡</div>
            <div className="insight-content">
              <h5>Insight Penting</h5>
              <p>Meski <strong>skala dampak global lebih besar</strong>, <strong>kenaikan paling signifikan</strong> terjadi pada kelompok anak dan remaja Indonesia (<strong>+7000%</strong>), menunjukkan <strong>urgensi intervensi spesifik</strong> untuk generasi muda.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiLevelPieChart;