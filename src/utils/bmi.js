import { useState } from 'react';

export const BMI_CATEGORIES = {
  UNDERWEIGHT: {
    name: 'Kurus',
    min: 0,
    max: 18.5,
    color: '#3498db',
    bgColor: '#e8f4fc',
    description: 'Berat badan kurang'
  },
  NORMAL: {
    name: 'Normal',
    min: 18.5,
    max: 24.9,
    color: '#27ae60',
    bgColor: '#e8f8ef',
    description: 'Berat badan ideal'
  },
  OVERWEIGHT: {
    name: 'Gemuk',
    min: 25,
    max: 29.9,
    color: '#f39c12',
    bgColor: '#fef5e7',
    description: 'Kelebihan berat badan'
  },
  OBESE: {
    name: 'Obesitas',
    min: 30,
    max: 100,
    color: '#e74c3c',
    bgColor: '#fdedec',
    description: 'Obesitas'
  }
};

// Fungsi untuk menghitung BMI
export const calculateBMI = (weightKg, heightCm) => {
  if (!weightKg || !heightCm || weightKg <= 0 || heightCm <= 0) {
    throw new Error('Berat dan tinggi harus berupa angka positif');
  }
  
  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);
  return Math.round(bmi * 10) / 10;
};

// Fungsi untuk menentukan kategori BMI
export const getBMICategory = (bmi) => {
  if (bmi < BMI_CATEGORIES.NORMAL.min) {
    return BMI_CATEGORIES.UNDERWEIGHT;
  } else if (bmi < BMI_CATEGORIES.OVERWEIGHT.min) {
    return BMI_CATEGORIES.NORMAL;
  } else if (bmi < BMI_CATEGORIES.OBESE.min) {
    return BMI_CATEGORIES.OVERWEIGHT;
  } else {
    return BMI_CATEGORIES.OBESE;
  }
};

// Fungsi untuk mendapatkan saran kesehatan
export const getHealthAdvice = (bmiCategory) => {
  const advice = {
    'Kurus': [
      'Tingkatkan asupan kalori dengan makanan bergizi',
      'Konsumsilah makanan tinggi protein',
      'Lakukan latihan kekuatan untuk membangun massa otot',
      'Konsultasi dengan ahli gizi'
    ],
    'Normal': [
      'Pertahankan pola makan seimbang',
      'Lakukan aktivitas fisik minimal 30 menit per hari',
      'Jaga kualitas tidur yang cukup',
      'Lakukan pemeriksaan kesehatan rutin'
    ],
    'Gemuk': [
      'Kurangi asupan kalori berlebih',
      'Tingkatkan aktivitas fisik secara bertahap',
      'Batasi konsumsi makanan tinggi gula dan lemak',
      'Perbanyak konsumsi sayuran dan buah'
    ],
    'Obesitas': [
      'Segera konsultasi dengan dokter atau ahli gizi',
      'Mulai program penurunan berat badan yang terstruktur',
      'Kombinasikan diet sehat dengan olahraga teratur',
      'Pantau perkembangan berat badan secara berkala'
    ]
  };
  
  return advice[bmiCategory.name] || [];
};

// Fungsi untuk menghitung berat ideal
export const calculateIdealWeight = (heightCm) => {
  const heightM = heightCm / 100;
  const minWeight = 18.5 * (heightM * heightM);
  const maxWeight = 24.9 * (heightM * heightM);
  
  return {
    min: Math.round(minWeight * 10) / 10,
    max: Math.round(maxWeight * 10) / 10,
    range: `${Math.round(minWeight)} - ${Math.round(maxWeight)} kg`
  };
};

// Fungsi untuk memvalidasi input
export const validateInput = (weight, height) => {
  const errors = [];
  
  if (!weight || isNaN(weight) || weight <= 0) {
    errors.push('Berat badan harus berupa angka positif');
  } else if (weight < 20 || weight > 300) {
    errors.push('Berat badan harus antara 20 kg dan 300 kg');
  }
  
  if (!height || isNaN(height) || height <= 0) {
    errors.push('Tinggi badan harus berupa angka positif');
  } else if (height < 50 || height > 300) {
    errors.push('Tinggi badan harus antara 50 cm dan 300 cm');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Hook custom untuk kalkulator BMI
export const useBMICalculator = () => {
  const [userData, setUserData] = useState({
    weight: '',
    height: ''
  });
  const [results, setResults] = useState(null);
  const [errors, setErrors] = useState([]);

  const calculate = () => {
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
        userData: { weight, height }
      });
    } catch (error) {
      setErrors([error.message]);
    }
  };

  const reset = () => {
    setUserData({ weight: '', height: '' });
    setResults(null);
    setErrors([]);
  };

  const updateUserData = (field, value) => {
    setUserData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return {
    userData,
    results,
    errors,
    calculate,
    reset,
    updateUserData
  };
};