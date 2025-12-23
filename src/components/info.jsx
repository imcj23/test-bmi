// import React from 'react';
import '../styles/bmi.css';

const BMIInfo = () => {
  const categories = [
    { name: 'Kurus', range: '< 18.5', description: 'Berat badan kurang' },
    { name: 'Normal', range: '18.5 - 24.9', description: 'Berat badan sehat' },
    { name: 'Gemuk', range: '25 - 29.9', description: 'Kelebihan berat badan' },
    { name: 'Obesitas', range: '≥ 30', description: 'Obesitas' }
  ];

  return (
    <div className="info-section">
      <h3>Tentang BMI (Body Mass Index)</h3>
      
      <div className="info-content">
        <p>
          BMI adalah pengukuran yang digunakan untuk menentukan apakah berat badan 
          seseorang proporsional dengan tinggi badannya. Ini adalah alat skrining 
          sederhana yang dapat membantu mengidentifikasi masalah berat badan.
        </p>
        
        <h4>Kategori BMI</h4>
        <div className="categories-grid">
          {categories.map((category, index) => (
            <div key={index} className="category-card">
              <h5>{category.name}</h5>
              <div className="category-range">{category.range}</div>
              <p>{category.description}</p>
            </div>
          ))}
        </div>
        
        <div className="limitations">
          <h4>Keterbatasan BMI</h4>
          <ul>
            <li>Tidak membedakan antara massa otot dan lemak</li>
            <li>Tidak memperhitungkan distribusi lemak tubuh</li>
            <li>Tidak cocok untuk atlet dengan massa otot tinggi</li>
            <li>Mungkin tidak akurat untuk lansia atau ibu hamil</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BMIInfo;