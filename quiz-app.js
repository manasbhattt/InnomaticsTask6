document.addEventListener("DOMContentLoaded", function() {
    const quiz = [
        {
            question: "What is the most used programming language in 2021?",
            ans1text: "Java",
            ans2text: "C",
            ans3text: "Python",
            ans4text: "JavaScript",
            answer: "JavaScript",
        },
        {
            question: "Who is the President of US?",
            ans1text: "Joe Biden",
            ans2text: "Donald Trump",
            ans3text: "Barack Obama",
            ans4text: "George Bush",
            answer: "Joe Biden",
        },
        {
            question: "What does HTML stand for?",
            ans1text: "Hypertext Markup Language",
            ans2text: "Cascading Style Sheet",
            ans3text: "Jason Object Notation",
            ans4text: "Helicopters Terminals Motorboats Lamborghinis",
            answer: "Hypertext Markup Language",
        },
        {
            question: "What year was JavaScript launched?",
            ans1text: "1996",
            ans2text: "1995",
            ans3text: "1994",
            ans4text: "none of the above",
            answer: "1995",
        }
    ];

    const question = document.getElementById("quiz-question");
    const option_a = document.getElementById("text_option_a");
    const option_b = document.getElementById("text_option_b");
    const option_c = document.getElementById("text_option_c");
    const option_d = document.getElementById("text_option_d");
    const answerElement = document.querySelectorAll(".answer");
    const submit = document.getElementById("submit");
    const progressBar = document.getElementById("progress-bar");
    const timerDisplay = document.getElementById("timer");

    let currentQuestion = 0;
    let score = 0;
    let timeLeft = 10;
    let timer;

    // Load high score from localStorage
    let highScore = localStorage.getItem("highScore") || 0;

    // Shuffle function using Fisher-Yates (Durstenfeld) algorithm
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // Swap elements
        }
        return array;
    }

    // Shuffle the quiz questions before starting the quiz
    shuffle(quiz);

    function loadQuiz() {
        question.textContent = quiz[currentQuestion].question;
        option_a.textContent = quiz[currentQuestion].ans1text;
        option_b.textContent = quiz[currentQuestion].ans2text;
        option_c.textContent = quiz[currentQuestion].ans3text;
        option_d.textContent = quiz[currentQuestion].ans4text;

        timeLeft = 10;
        timerDisplay.textContent = `Time Left: ${timeLeft}s`;
        startTimer();
        updateProgressBar();
    }

    loadQuiz();

    submit.addEventListener("click", submitAnswer);

    function submitAnswer() {
        const checkedAns = document.querySelector('input[type="radio"]:checked');
        if (checkedAns === null) {
            alert("Please select an answer");
        } else {
            if (checkedAns.nextElementSibling.textContent === quiz[currentQuestion].answer) {
                score++;
            }
            nextQuestion();
        }
    }

    // Timer countdown
    function startTimer() {
        clearInterval(timer);
        timer = setInterval(() => {
            timeLeft--;
            timerDisplay.textContent = `Time Left: ${timeLeft}s`;

            if (timeLeft <= 0) {
                clearInterval(timer);
                nextQuestion();
            }
        }, 1000);
    }

    function nextQuestion() {
        clearInterval(timer);

        currentQuestion++;
        if (currentQuestion < quiz.length) {
            loadQuiz();
            answerElement.forEach(ans => ans.checked = false);
        } else {
            updateHighScore(); // Update high score before alerting the result
            alert(`Your score is ${score} out of ${quiz.length}. High score: ${highScore}`);
            location.reload();
        }
    }

    function updateProgressBar() {
        const progressPercent = ((currentQuestion + 1) / quiz.length) * 100;
        progressBar.style.width = progressPercent + '%';
    }

    // Function to update and store high score in localStorage
    function updateHighScore() {
        if (score > highScore) {
            highScore = score;
            localStorage.setItem("highScore", highScore);
            alert(`New high score: ${highScore}!`);
        }
    }
});
