import { useState } from 'react';
import SimplePieChart from './piechart/SimplePieChart';
import InteractivePieChart from './piechart/InteractivePieChart';
import MultiLevelPieChart from './piechart/MultiLevelPieChart';
import './piechart/chart.css';

const PieChartWrapper = () => {
  const [activeChart, setActiveChart] = useState('interactive');

  return (
    <div className="pie-charts-wrapper">
      <div className="charts-header">
        <h2>📊 Visualisasi Data Krisis Gula 📊</h2>
        <p className="header-description">
          Eksplorasi data krisis gula melalui berbagai visualisasi interaktif. 
          Pilih jenis chart untuk melihat dari perspektif yang berbeda.
        </p>
      </div>
      
      <div className="chart-selector">
        <div className="selector-tabs">
          <button
            className={`tab-button ${activeChart === 'simple' ? 'active' : ''}`}
            onClick={() => setActiveChart('simple')}
          >
            📈 Pie Chart Sederhana
          </button>
          <button
            className={`tab-button ${activeChart === 'interactive' ? 'active' : ''}`}
            onClick={() => setActiveChart('interactive')}
          >
            🎯 Pie Chart Interaktif
          </button>
          <button
            className={`tab-button ${activeChart === 'multilevel' ? 'active' : ''}`}
            onClick={() => setActiveChart('multilevel')}
          >
            🔄 Multi-Level Analysis
          </button>
        </div>
      </div>
      
      <div className="chart-display">
        {activeChart === 'simple' && <SimplePieChart />}
        {activeChart === 'interactive' && <InteractivePieChart />}
        {activeChart === 'multilevel' && <MultiLevelPieChart />}
      </div>
      
      <div className="charts-footer">
        <div className="footer-note">
          <h4>💡 Cara Membaca Data:</h4>
          <ul>
            <li><strong>Ukuran bagian</strong> menunjukkan skala relatif dampak</li>
            <li><strong>Warna berbeda</strong> merepresentasikan level krisis (global, nasional, usia muda)</li>
            <li><strong>Data proporsional</strong> membantu memahami distribusi masalah</li>
            <li><strong>Interaktivitas</strong> memungkinkan eksplorasi detail setiap kategori</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PieChartWrapper;