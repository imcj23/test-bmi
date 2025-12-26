export const sugarCrisisData = {
  world: {
    id: 'world',
    label: 'Dunia (Global)',
    value: 853,
    unit: 'juta kasus',
    description: 'Proyeksi diabetes dewasa 2050',
    detail: 'Meningkat dari 589 juta (2024) - IDF Diabetes Atlas 2025',
    color: '#4A90E2',
    borderColor: '#357ABD',
    icon: '🌍',
    increase: '44%',
    source: 'IDF Diabetes Atlas 2025'
  },
  indonesia: {
    id: 'indonesia',
    label: 'Indonesia',
    value: 19.2,
    unit: 'sendok teh/hari',
    description: 'Rata-rata konsumsi gula per orang',
    detail: '2-3x di atas rekomendasi WHO (maks 6 sendok teh/hari)',
    color: '#E24A4A',
    borderColor: '#C13A3A',
    icon: '🇮🇩',
    increase: '200%',
    source: 'Riskesdas 2018'
  },
  indonesiaAge: {
    id: 'indonesiaAge',
    label: 'Anak & Remaja',
    value: 70,
    unit: 'kali lipat',
    description: 'Peningkatan diabetes pada anak',
    detail: 'Sejak 2010 - Data IDAI, Usia termuda: 5 tahun',
    color: '#F5A623',
    borderColor: '#D6941A',
    icon: '👧👦',
    increase: '7000%',
    source: 'IDAI 2023'
  }
};

export const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        padding: 20,
        font: {
          size: 12,
          family: "'Inter', sans-serif"
        },
        color: '#333'
      }
    },
    tooltip: {
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      titleColor: '#2c3e50',
      bodyColor: '#2c3e50',
      borderColor: '#e2e8f0',
      borderWidth: 1,
      padding: 12,
      cornerRadius: 8,
      displayColors: true,
      callbacks: {
        label: function(context) {
          const label = context.label || '';
          const value = context.raw || 0;
          const dataItem = Object.values(sugarCrisisData).find(item => item.label === label);
          return [
            `${label}: ${value} ${dataItem?.unit || ''}`,
            dataItem?.description || ''
          ];
        }
      }
    }
  }
};

export const chartData = {
  labels: Object.values(sugarCrisisData).map(item => item.label),
  datasets: [
    {
      label: 'Krisis Gula',
      data: Object.values(sugarCrisisData).map(item => item.value),
      backgroundColor: Object.values(sugarCrisisData).map(item => item.color),
      borderColor: Object.values(sugarCrisisData).map(item => item.borderColor),
      borderWidth: 2,
      hoverBackgroundColor: Object.values(sugarCrisisData).map(item => 
        `${item.color}CC` // Add transparency on hover
      ),
      hoverBorderWidth: 3,
      hoverOffset: 15
    }
  ]
};