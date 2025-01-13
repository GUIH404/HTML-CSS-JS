const $startGameButton = document.querySelector(".start-quiz");
const $questionsContainer = document.querySelector(".question-container");
const $answersContainer = document.querySelector(".answers-container");
const $questionText = document.querySelector(".question");
const $nextQuestion = document.querySelector(".next-question");

$startGameButton.addEventListener("click", startGame);
$nextQuestion.addEventListener("click", displayNextQuestion);

let currentQuestion = 0;
let totalCorrect = 0;

function startGame() {
  $startGameButton.classList.add("hide");
  $questionsContainer.classList.remove("hide");
  displayNextQuestion();
}

function displayNextQuestion() {
  resetStates();

  $questionText.textContent = questions[currentQuestion].question;
  questions[currentQuestion].answers.forEach((answers) => {
    const newAnswers = document.createElement("button");
    newAnswers.classList.add("button", "answers");
    newAnswers.textContent = answers.text;

    if (answers.correct) {
      newAnswers.dataset.correct = answers.correct;
    }

    $answersContainer.appendChild(newAnswers);

    newAnswers.addEventListener("click", selectAnswers);
  });
}

function resetStates() {
  if (questions.length == currentQuestion) {
    return finishGame();
  }

  while ($answersContainer.firstChild) {
    $answersContainer.removeChild($answersContainer.firstChild);
  }

  document.body.classList.remove("correct");
  document.body.classList.remove("incorrect");
  $nextQuestion.classList.add("hide");
}

function finishGame() {
  document.body.classList.remove("correct", "incorrect")
  $nextQuestion.classList.add("hide")
  const totalQuestion = questions.length;
  const performance = Math.floor((totalCorrect * 100) / totalQuestion);

  let message = "";

  switch (true) {
    case performance >= 90:
      message = "Excelente continue assim!";
      break;
    case performance >= 70:
      message = "Muito bom";
      break;
    case performance >= 50:
      message = "Bom";
      break;
    default:
      message = "Pode melhorar";
  }

  $questionsContainer.innerHTML = 
  `
  <p class = "final-message">
    Você acertou ${totalCorrect} de ${totalQuestion} questões!
    <span>Resultado: ${message}</span>
  </p>
 

  <button onclick = window.location.reload() class = "button">Refazer teste</button>

  `
}

function selectAnswers(event) {
  const answersClicked = event.target;

  if (answersClicked.dataset.correct) {
    document.body.classList.add("correct");
    totalCorrect++;
  } else {
    document.body.classList.add("incorrect");
  }

  document.querySelectorAll(".answers").forEach((button) => {
    if (button.dataset.correct) {
      
    } else {
    }

    button.disabled = true;
  });

  $nextQuestion.classList.remove("hide");
  currentQuestion++;
}

const questions = [
  {
    question: "Quem entre Guilherme, Eric e Eduardo é mais idiota",
    answers: [
      { text: "Os três são idiotas", correct: true },
      { text: "Eric", correct: false },
      { text: "Guilherme", correct: false },
      { text: "Eduardo", correct: false },
    ],
  },

  {
    question: "Qual dos três tem o espirito de um velho",
    answers: [
      { text: "Eduardo", correct: false },
      { text: "Guilherme", correct: false },
      { text: "Eric", correct: true },
      { text: "N.D.A", correct: false },
    ],
  },

  {
    question: "Dentre os três quem é o mais maduro mentalmente",
    answers: [
      { text: "Eric", correct: false },
      { text: "Guilherme", correct: true },
      { text: "Eduardo", correct: false },
      { text: "Os três são maduros", correct: false },
    ],
  },

  {
    question: "Que dia é o aniversário do Guilherme",
    answers: [
      { text: "17/10", correct: false },
      { text: "17/05", correct: false },
      { text: "17/12", correct: false },
      { text: "17/11", correct: true },
    ],
  },

  {
    question: "Qual o valor de PI aproximadamente",
    answers: [
      { text: "3,1415", correct: false },
      { text: "3,14151617181914151617...", correct: false },
      { text: "3", correct: false },
      { text: "3,14159265358979323846...", correct: true },
    ],
  },
];
