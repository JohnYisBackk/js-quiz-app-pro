"use strict";

// ======================================================
// SELECT ELEMENTS
// ======================================================

const questionCounter = document.getElementById("questionCounter");
const questionText = document.getElementById("questionText");
const scoreValue = document.getElementById("scoreValue");

const progressBar = document.getElementById("progressBar");

const answersContainer = document.getElementById("answersContainer");
const feedbackText = document.getElementById("feedbackText");

const nextBtn = document.getElementById("nextBtn");
const restartBtn = document.getElementById("restartBtn");

const resultBox = document.getElementById("resultBox");
const finalScore = document.getElementById("finalScore");
const resultMessage = document.getElementById("resultMessage");

// ======================================================
// QUESTIONS DATA
// ======================================================

const questions = [
  {
    question: "Which language runs in the browser?",
    answers: ["JavaScript", "Python", "C++", "Java"],
    correct: "JavaScript",
  },
  {
    question: "What does CSS stand for?",
    answers: [
      "Creative Style System",
      "Cascading Style Sheets",
      "Computer Style Syntax",
      "Colorful Sheet System",
    ],
    correct: "Cascading Style Sheets",
  },
  {
    question: "Which HTML tag is used for a link?",
    answers: ["<link>", "<a>", "<href>", "<url>"],
    correct: "<a>",
  },
  {
    question: "Which method selects an element by ID?",
    answers: [
      "querySelectorAll()",
      "getElementById()",
      "addEventListener()",
      "createElement()",
    ],
    correct: "getElementById()",
  },
  {
    question: "Which event is used for a button click?",
    answers: ["submit", "input", "click", "change"],
    correct: "click",
  },
];

// ======================================================
// APP STATE
// ======================================================

let currentQuestionIndex = 0;
let score = 0;
let answered = false;

// ======================================================
// RENDER QUESTION FUNCTION
// ======================================================

function renderQuestion() {
  const currentQuestion = questions[currentQuestionIndex];

  questionCounter.textContent = `Question ${currentQuestionIndex + 1} / ${questions.length}`;

  questionText.textContent = currentQuestion.question;

  answersContainer.innerHTML = "";

  feedbackText.textContent = "Choose the correct answer.";

  nextBtn.disabled = true;
  answered = false;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");

    button.classList.add("answer-btn");
    button.textContent = answer;
    button.addEventListener("click", () => {
      selectAnswer(answer, button);
    });

    answersContainer.appendChild(button);
  });

  updateProgress();
}

// ======================================================
// SELECT ANSWER FUNCTION
// ======================================================

function selectAnswer(selectedAnswer, clickedButton) {
  if (answered) return;

  answered = true;

  const currentQuestion = questions[currentQuestionIndex];

  if (selectedAnswer === currentQuestion.correct) {
    score++;

    scoreValue.textContent = score;

    clickedButton.classList.add("correct");

    feedbackText.textContent = "Correct answer!";
  } else {
    clickedButton.classList.add("wrong");

    feedbackText.textContent = "Wrong answer.";

    highlightCorrectAnswer();
  }

  disableAnswers();

  nextBtn.disabled = false;
}

// ======================================================
// HIGHLIGHT CORRECT ANSWER FUNCTION
// ======================================================

function highlightCorrectAnswer() {
  const currentQuestion = questions[currentQuestionIndex];

  const answerButtons = document.querySelectorAll(".answer-btn");

  answerButtons.forEach((button) => {
    if (button.textContent === currentQuestion.correct) {
      button.classList.add("correct");
    }
  });
}

// ======================================================
// DISABLE ANSWERS FUNCTION
// ======================================================

function disableAnswers() {
  const answerButtons = document.querySelectorAll(".answer-btn");

  answerButtons.forEach((button) => {
    button.disabled = true;
  });
}

// ======================================================
// UPDATE PROGRESS FUNCTION
// ======================================================

function updateProgress() {
  const percentage = ((currentQuestionIndex + 1) / questions.length) * 100;

  progressBar.style.width = `${percentage}%`;
}

// ======================================================
// NEXT QUESTION FUNCTION
// ======================================================

function nextQuestion() {
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    renderQuestion();
  } else {
    showResults();
  }
}

// ======================================================
// SHOW RESULTS FUNCTION
// ======================================================

function showResults() {
  answersContainer.classList.add("hidden");
  nextBtn.classList.add("hidden");
  restartBtn.classList.remove("hidden");
  resultBox.classList.remove("hidden");

  finalScore.textContent = `You scored ${score} / ${questions.length}`;

  if (score === questions.length) {
    resultMessage.textContent = "Perfect score. Frontend master detected.";
  } else {
    resultMessage.textContent = "Keep practicing and try again.";
  }
}

// ======================================================
// RESTART QUIZ FUNCTION
// ======================================================

function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;

  scoreValue.textContent = score;

  answersContainer.classList.remove("hidden");
  nextBtn.classList.remove("hidden");
  restartBtn.classList.add("hidden");
  resultBox.classList.add("hidden");

  renderQuestion();
}

// ======================================================
// EVENT LISTENERS
// ======================================================

nextBtn.addEventListener("click", nextQuestion);

restartBtn.addEventListener("click", restartQuiz);

// ======================================================
// INITIAL LOAD
// ======================================================

renderQuestion();
