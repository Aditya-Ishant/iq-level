// Question bank with 15 questions (5 each from Math, GK, and History)
const questionBank = {
    math: [
        {
            question: "What is 15% of 240?",
            options: ["36", "32", "40", "38"],
            correct: 0
        },
        {
            question: "If a triangle has angles of 45° and 60°, what is the third angle?",
            options: ["75°", "85°", "65°", "55°"],
            correct: 0
        },
        {
            question: "What is the square root of 144?",
            options: ["11", "12", "13", "14"],
            correct: 1
        },
        {
            question: "If x + 7 = 15, what is the value of x?",
            options: ["6", "7", "8", "9"],
            correct: 2
        },
        {
            question: "What is 2³ × 3²?",
            options: ["54", "62", "72", "81"],
            correct: 2
        }
    ],
    gk: [
        {
            question: "What is the largest planet in our solar system?",
            options: ["Saturn", "Jupiter", "Neptune", "Uranus"],
            correct: 1
        },
        {
            question: "Which element has the chemical symbol 'Au'?",
            options: ["Silver", "Aluminum", "Gold", "Argon"],
            correct: 2
        },
        {
            question: "What is the capital of Australia?",
            options: ["Sydney", "Melbourne", "Canberra", "Perth"],
            correct: 2
        },
        {
            question: "How many continents are there?",
            options: ["5", "6", "7", "8"],
            correct: 2
        },
        {
            question: "What is the hardest natural substance on Earth?",
            options: ["Gold", "Iron", "Diamond", "Platinum"],
            correct: 2
        }
    ],
    history: [
        {
            question: "In which year did World War II end?",
            options: ["1944", "1945", "1946", "1947"],
            correct: 1
        },
        {
            question: "Who was the first person to walk on the moon?",
            options: ["Buzz Aldrin", "Neil Armstrong", "John Glenn", "Alan Shepard"],
            correct: 1
        },
        {
            question: "The Great Wall of China was primarily built during which dynasty?",
            options: ["Tang", "Song", "Ming", "Qing"],
            correct: 2
        },
        {
            question: "Which ancient wonder of the world was located in Alexandria?",
            options: ["Colossus of Rhodes", "Lighthouse of Alexandria", "Hanging Gardens", "Temple of Artemis"],
            correct: 1
        },
        {
            question: "Who painted the ceiling of the Sistine Chapel?",
            options: ["Leonardo da Vinci", "Raphael", "Michelangelo", "Donatello"],
            correct: 2
        }
    ]
};

// Application state
let currentSubject = 'math';
let currentQuestionIndex = 0;
let totalQuestionIndex = 0;
let userAnswers = [];
let scores = {
    math: 0,
    gk: 0,
    history: 0
};

// DOM elements
const startScreen = document.getElementById('start-screen');
const questionScreen = document.getElementById('question-screen');
const resultsScreen = document.getElementById('results-screen');
const startBtn = document.getElementById('start-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');

// Question elements
const progressFill = document.getElementById('progress-fill');
const questionCounter = document.getElementById('question-counter');
const subjectIndicator = document.getElementById('subject-indicator');
const subjectBadge = document.getElementById('subject-badge');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');

// Results elements
const iqNumber = document.getElementById('iq-number');
const iqInterpretation = document.getElementById('iq-interpretation');
const mathScore = document.getElementById('math-score');
const gkScore = document.getElementById('gk-score');
const historyScore = document.getElementById('history-score');
const mathBar = document.getElementById('math-bar');
const gkBar = document.getElementById('gk-bar');
const historyBar = document.getElementById('history-bar');

// Initialize the application
function init() {
    startBtn.addEventListener('click', startTest);
    prevBtn.addEventListener('click', previousQuestion);
    nextBtn.addEventListener('click', nextQuestion);
    restartBtn.addEventListener('click', restartTest);
}

// Start the test
function startTest() {
    startScreen.classList.remove('active');
    questionScreen.classList.add('active');
    resetTest();
    displayQuestion();
}

// Reset test data
function resetTest() {
    currentSubject = 'math';
    currentQuestionIndex = 0;
    totalQuestionIndex = 0;
    userAnswers = [];
    scores = { math: 0, gk: 0, history: 0 };
}

// Display current question
function displayQuestion() {
    const subjects = ['math', 'gk', 'history'];
    const subjectNames = ['Math', 'General Knowledge', 'History'];
    
    // Determine current subject based on total question index
    const subjectIndex = Math.floor(totalQuestionIndex / 5);
    currentSubject = subjects[subjectIndex];
    currentQuestionIndex = totalQuestionIndex % 5;
    
    const question = questionBank[currentSubject][currentQuestionIndex];
    
    // Update progress
    const progressPercentage = ((totalQuestionIndex + 1) / 15) * 100;
    progressFill.style.width = `${progressPercentage}%`;
    questionCounter.textContent = `${totalQuestionIndex + 1} of 15`;
    subjectIndicator.textContent = subjectNames[subjectIndex];
    
    // Update subject badge
    subjectBadge.textContent = subjectNames[subjectIndex];
    subjectBadge.className = `subject-badge ${currentSubject}`;
    
    // Display question
    questionText.textContent = question.question;
    
    // Clear and populate options
    optionsContainer.innerHTML = '';
    question.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option';
        optionDiv.textContent = option;
        optionDiv.addEventListener('click', () => selectOption(index, optionDiv));
        optionsContainer.appendChild(optionDiv);
    });
    
    // Update button states
    prevBtn.disabled = totalQuestionIndex === 0;
    nextBtn.disabled = true;
    nextBtn.textContent = totalQuestionIndex === 14 ? 'Finish Test' : 'Next';
    
    // Restore previous answer if exists
    if (userAnswers[totalQuestionIndex] !== undefined) {
        const selectedOption = optionsContainer.children[userAnswers[totalQuestionIndex]];
        selectedOption.classList.add('selected');
        nextBtn.disabled = false;
    }
}

// Handle option selection
function selectOption(optionIndex, optionElement) {
    // Remove previous selection
    const options = optionsContainer.querySelectorAll('.option');
    options.forEach(option => option.classList.remove('selected'));
    
    // Add selection to clicked option
    optionElement.classList.add('selected');
    
    // Store answer
    userAnswers[totalQuestionIndex] = optionIndex;
    
    // Enable next button
    nextBtn.disabled = false;
}

// Go to previous question
function previousQuestion() {
    if (totalQuestionIndex > 0) {
        totalQuestionIndex--;
        displayQuestion();
    }
}

// Go to next question or finish test
function nextQuestion() {
    if (totalQuestionIndex < 14) {
        totalQuestionIndex++;
        displayQuestion();
    } else {
        finishTest();
    }
}

// Calculate scores and show results
function finishTest() {
    calculateScores();
    displayResults();
    questionScreen.classList.remove('active');
    resultsScreen.classList.add('active');
}

// Calculate scores for each subject
function calculateScores() {
    const subjects = ['math', 'gk', 'history'];
    
    subjects.forEach((subject, subjectIndex) => {
        let correctAnswers = 0;
        for (let i = 0; i < 5; i++) {
            const questionIndex = (subjectIndex * 5) + i;
            const userAnswer = userAnswers[questionIndex];
            const correctAnswer = questionBank[subject][i].correct;
            
            if (userAnswer === correctAnswer) {
                correctAnswers++;
            }
        }
        scores[subject] = correctAnswers;
    });
}

// Display results
function displayResults() {
    const totalCorrect = scores.math + scores.gk + scores.history;
    const percentage = (totalCorrect / 15) * 100;
    
    // Calculate IQ score based on percentage
    const iqScore = calculateIQScore(percentage);
    const interpretation = getIQInterpretation(iqScore);
    
    // Display IQ score
    iqNumber.textContent = iqScore;
    iqInterpretation.textContent = interpretation;
    
    // Display subject scores
    mathScore.textContent = `${scores.math}/5`;
    gkScore.textContent = `${scores.gk}/5`;
    historyScore.textContent = `${scores.history}/5`;
    
    // Animate score bars
    setTimeout(() => {
        mathBar.style.width = `${(scores.math / 5) * 100}%`;
        gkBar.style.width = `${(scores.gk / 5) * 100}%`;
        historyBar.style.width = `${(scores.history / 5) * 100}%`;
    }, 500);
}

// Calculate IQ score based on percentage of correct answers
function calculateIQScore(percentage) {
    if (percentage >= 93) return 140;
    else if (percentage >= 87) return 130;
    else if (percentage >= 80) return 120;
    else if (percentage >= 73) return 110;
    else if (percentage >= 67) return 105;
    else if (percentage >= 60) return 100;
    else if (percentage >= 53) return 95;
    else if (percentage >= 47) return 90;
    else if (percentage >= 40) return 85;
    else if (percentage >= 33) return 80;
    else if (percentage >= 27) return 75;
    else return 70;
}

// Get IQ interpretation
function getIQInterpretation(iqScore) {
    if (iqScore >= 140) return "Genius Level Intelligence";
    else if (iqScore >= 130) return "Very Superior Intelligence";
    else if (iqScore >= 120) return "Superior Intelligence";
    else if (iqScore >= 110) return "High Average Intelligence";
    else if (iqScore >= 90) return "Average Intelligence";
    else if (iqScore >= 80) return "Low Average Intelligence";
    else if (iqScore >= 70) return "Borderline Intelligence";
    else return "Below Average Intelligence";
}

// Restart the test
function restartTest() {
    resultsScreen.classList.remove('active');
    startScreen.classList.add('active');
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', init);