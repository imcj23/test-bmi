import { useState, useEffect } from "react";
import "../styles/quiz.css";

const QuizApp = () => {
  // Data kuis: makanan dan kandungan gulanya dalam gram
  const quizData = [
    {
      id: 1,
      question: "Berapa gram gula dalam satu kaleng Coca-Cola (330ml)?",
      options: [
        { text: "25 gram", isCorrect: false },
        { text: "35 gram", isCorrect: true },
        { text: "45 gram", isCorrect: false },
        { text: "55 gram", isCorrect: false },
      ],
      fact: "Satu kaleng Coca-Cola 330ml mengandung sekitar 35 gram gula, setara dengan 7 sendok teh gula!",
      image: "cola",
    },
    {
      id: 2,
      question: "Berapa gram gula dalam satu potong kue coklat brownies?",
      options: [
        { text: "15 gram", isCorrect: false },
        { text: "25 gram", isCorrect: false },
        { text: "35 gram", isCorrect: true },
        { text: "45 gram", isCorrect: false },
      ],
      fact: "Satu potong brownies (100g) mengandung sekitar 35 gram gula. Itu hampir sama dengan satu kaleng soda!",
      image: "brownie",
    },
    {
      id: 3,
      question: "Berapa gram gula dalam satu donat glazed?",
      options: [
        { text: "10 gram", isCorrect: false },
        { text: "15 gram", isCorrect: false },
        { text: "20 gram", isCorrect: false },
        { text: "25 gram", isCorrect: true },
      ],
      fact: "Satu donat glazed mengandung sekitar 25 gram gula, atau setara dengan 5 sendok teh gula.",
      image: "donut",
    },
    {
      id: 4,
      question: "Berapa gram gula dalam satu cup es krim vanilla (100ml)?",
      options: [
        { text: "15 gram", isCorrect: false },
        { text: "20 gram", isCorrect: true },
        { text: "25 gram", isCorrect: false },
        { text: "30 gram", isCorrect: false },
      ],
      fact: "Es krim vanilla mengandung sekitar 20 gram gula per 100ml. Varian dengan topping coklat bisa mengandung lebih banyak.",
      image: "icecream",
    },
    {
      id: 5,
      question: "Berapa gram gula dalam satu batang coklat susu (45g)?",
      options: [
        { text: "18 gram", isCorrect: false },
        { text: "24 gram", isCorrect: true },
        { text: "30 gram", isCorrect: false },
        { text: "36 gram", isCorrect: false },
      ],
      fact: "Coklat susu mengandung sekitar 24 gram gula per batang 45g. Coklat hitam dengan kandungan kakao tinggi memiliki gula lebih sedikit.",
      image: "chocolate",
    },
    {
      id: 6,
      question:
        "Berapa gram gula dalam satu botol minuman teh kemasan (500ml)?",
      options: [
        { text: "20 gram", isCorrect: false },
        { text: "30 gram", isCorrect: false },
        { text: "40 gram", isCorrect: true },
        { text: "50 gram", isCorrect: false },
      ],
      fact: "Minuman teh kemasan 500ml mengandung sekitar 40 gram gula, hampir setara dengan 10 sendok teh gula!",
      image: "tea",
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [quizStarted, setQuizStarted] = useState(false);

  // Fungsi untuk pindah ke pertanyaan berikutnya
  const handleNextQuestion = () => {
    setCurrentQuestion(currentQuestion + 1);
    setSelectedOption(null);
    setAnswered(false);
    setTimeLeft(30);
  };

  // Timer untuk setiap pertanyaan
  useEffect(() => {
    if (!quizStarted || showScore || answered) return;

    const timer = setTimeout(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
      } else {
        handleNextQuestion(); // Sekarang sudah dideklarasikan
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, answered, showScore, quizStarted]);

  // Fungsi untuk menangani pemilihan jawaban
  const handleAnswerClick = (option, index) => {
    if (answered) return;

    setSelectedOption(index);
    setAnswered(true);

    if (option.isCorrect) {
      setScore(score + 1);
    }

    // Lanjut ke pertanyaan berikutnya setelah 2 detik
    setTimeout(() => {
      if (currentQuestion < quizData.length - 1) {
        handleNextQuestion();
      } else {
        setShowScore(true);
      }
    }, 2000);
  };

  // Fungsi untuk memulai kuis
  const startQuiz = () => {
    setQuizStarted(true);
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedOption(null);
    setAnswered(false);
    setTimeLeft(30);
  };

  // Fungsi untuk merestart kuis
  const restartQuiz = () => {
    startQuiz();
  };

  // Render gambar berdasarkan tipe makanan
  const renderFoodImage = (imageType) => {
    // Dalam implementasi nyata, Anda akan menggunakan gambar aktual
    // Di sini saya menggunakan emoji sebagai pengganti
    const foodEmojis = {
      cola: "🥤",
      brownie: "🍫",
      donut: "🍩",
      icecream: "🍨",
      chocolate: "🍫",
      tea: "🍵",
    };

    return (
      <div className="food-image">
        <span className="food-emoji">{foodEmojis[imageType] || "🍰"}</span>
      </div>
    );
  };

  // Render konten berdasarkan status kuis
  const renderContent = () => {
    if (!quizStarted) {
      return (
        <div className="start-screen">
          <h1>Kuis: Kandungan Gula pada Makanan Manis</h1>
          <div className="intro-section">
            <p>
              Tahukah Anda berapa banyak gula yang terkandung dalam makanan dan
              minuman manis favorit Anda? Kuis ini akan menguji pengetahuan Anda
              tentang kandungan gula dalam berbagai makanan manis.
            </p>
            <div className="stats">
              <div className="stat">
                <span className="stat-number">{quizData.length}</span>
                <span className="stat-label">Pertanyaan</span>
              </div>
              <div className="stat">
                <span className="stat-number">30</span>
                <span className="stat-label">Detik per Pertanyaan</span>
              </div>
              <div className="stat">
                <span className="stat-number">70%</span>
                <span className="stat-label">Nilai Minimum Lulus</span>
              </div>
            </div>
            <button className="start-button" onClick={startQuiz}>
              Mulai Kuis
            </button>
            <div className="fun-fact">
              <h3>Fakta Menarik:</h3>
              <p>
                WHO merekomendasikan konsumsi gula maksimal 50 gram (10 sendok
                teh) per hari untuk orang dewasa.
              </p>
            </div>
          </div>
        </div>
      );
    }

    if (showScore) {
      const percentage = Math.round((score / quizData.length) * 100);
      let message = "";

      if (percentage >= 80) {
        message =
          "Luar biasa! Anda sangat memahami kandungan gula dalam makanan.";
      } else if (percentage >= 60) {
        message = "Bagus! Pengetahuan Anda cukup baik tentang kandungan gula.";
      } else if (percentage >= 40) {
        message =
          "Cukup baik. Masih ada ruang untuk meningkatkan pengetahuan tentang gula.";
      } else {
        message =
          "Yah, sepertinya Anda perlu belajar lebih banyak tentang kandungan gula dalam makanan.";
      }

      return (
        <div className="score-section">
          <h1>Hasil Kuis Anda</h1>
          <div className="score-circle">
            <span className="score-percentage">{percentage}%</span>
            <span className="score-detail">
              {score} dari {quizData.length} benar
            </span>
          </div>
          <p className="score-message">{message}</p>

          <div className="recommendations">
            <h3>Tips Mengurangi Konsumsi Gula:</h3>
            <ul>
              <li>Minum air putih daripada minuman manis</li>
              <li>Baca label nutrisi sebelum membeli makanan kemasan</li>
              <li>Pilih buah segar sebagai pengganti camilan manis</li>
              <li>Kurangi pemanis tambahan dalam minuman</li>
            </ul>
          </div>

          <button className="restart-button" onClick={restartQuiz}>
            Coba Lagi
          </button>
        </div>
      );
    }

    // Render pertanyaan kuis
    const question = quizData[currentQuestion];

    return (
      <div className="question-section">
        <div className="quiz-header">
          <div className="quiz-progress">
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{
                  width: `${((currentQuestion + 1) / quizData.length) * 100}%`,
                }}
              ></div>
            </div>
            <div className="progress-text">
              Pertanyaan {currentQuestion + 1} dari {quizData.length}
            </div>
          </div>

          <div className="timer-score">
            <div className="timer">
              <span className="timer-icon">⏱️</span> {timeLeft} detik
            </div>
            <div className="current-score">
              Skor: <span className="score-value">{score}</span>
            </div>
          </div>
        </div>

        <div className="question-content">
          {renderFoodImage(question.image)}

          <h2 className="question-text">{question.question}</h2>

          <div className="options-grid">
            {question.options.map((option, index) => {
              let optionClass = "option-button";

              if (answered) {
                if (option.isCorrect) {
                  optionClass += " correct";
                } else if (index === selectedOption && !option.isCorrect) {
                  optionClass += " wrong";
                }
              }

              return (
                <button
                  key={index}
                  className={optionClass}
                  onClick={() => handleAnswerClick(option, index)}
                  disabled={answered}
                >
                  <span className="option-letter">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="option-text">{option.text}</span>
                  {answered && option.isCorrect && (
                    <span className="option-indicator">✓</span>
                  )}
                  {answered &&
                    index === selectedOption &&
                    !option.isCorrect && (
                      <span className="option-indicator">✗</span>
                    )}
                </button>
              );
            })}
          </div>

          {answered && (
            <div className="feedback-section">
              <div className="fact-box">
                <h3>Fakta Gula:</h3>
                <p>{question.fact}</p>
                <div className="sugar-visualization">
                  <span className="sugar-label">Kandungan gula:</span>
                  <div className="sugar-bars">
                    {Array.from({
                      length: Math.round(
                        parseInt(
                          question.options.find((opt) => opt.isCorrect).text
                        ) / 5
                      ),
                    }).map((_, i) => (
                      <div key={i} className="sugar-bar"></div>
                    ))}
                  </div>
                  <span className="sugar-amount">
                    {question.options.find((opt) => opt.isCorrect).text}
                  </span>
                </div>
              </div>
              <div className="next-button-container">
                <button className="next-button" onClick={handleNextQuestion}>
                  {currentQuestion < quizData.length - 1
                    ? "Pertanyaan Berikutnya →"
                    : "Lihat Hasil"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="quiz-app">
      <header className="quiz-header-container">
        <h1>🍭 Kuis Kandungan Gula 🍬</h1>
        <p className="subtitle">
          Uji pengetahuan Anda tentang gula dalam makanan manis sehari-hari
        </p>
      </header>

      <main className="quiz-container">{renderContent()}</main>

      <footer className="quiz-footer">
        <p>
          <strong>Disclaimer:</strong> Kuis ini hanya untuk tujuan edukasi.
          Kandungan gula dapat bervariasi berdasarkan merek dan ukuran porsi.
        </p>
        <p className="footer-note">
          Dibuat dengan Vite + ReactJS • Rekomendasi WHO: Konsumsi gula maksimal
          50g/hari
        </p>
      </footer>
    </div>
  );
};

export default QuizApp;
