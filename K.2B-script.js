const questions = [
    {
        question:" Choose the correct representation for number five:",
        answers: [
            { text: "✿ ✿ ✿ ✿ ", correct: false },
            { text: "✿ ✿ ✿ ✿ ✿  ", correct: true },
            { text: "✿ ✿ ✿ ", correct: false },
            { text: "✿ ✿ ✿ ✿ ✿ ✿ ", correct: false },
        ]
    },
    {
        question: " Choose the correct answer: ",
        answers: [
            { text: "★ ★  + ★ ★ ★ = 7", correct: false },
            { text: "★ ★ ★ ★  + ★ ★ ★ ★ = 7", correct: false },
            { text: "★ ★ ★  + ★ ★ ★ ★ = 7 ", correct: true },
            { text: "★ + ★ ★ ★ ★ = 7", correct: false },
        ]
    },
    {
        question: "Select the correct answer: ",
        answers: [
            { text: "Fifteen plus six equals twenty one ", correct: true },
            { text: "Nineteen plus three equals twenty five", correct: false },
            { text: "Eleven plus sixteen equals fourteen", correct: false },
            { text: "Twelve plus twenty equals twenty four", correct: false },
        ]
    },
    {
        question: "Select the correct representation for 'twelve take away eight is ...'",
        answers: [
            { text: "12 - 8 = 6", correct: false },
            { text: "12 - 8 = 3", correct: false },
            { text: "12 - 8 = 4", correct: true },
            { text: "12 - 8 = 5", correct: false },
        ]
    },
    {
        question: "There are sixteen apples on a tree. A bird takes away nine apples. How many apples are left?",
        answers: [
            { text: "eigth", correct: false },
            { text: "seven", correct: true },
            { text: "eleven", correct: false },
            { text: "ten", correct: false },
        ]
    },
    {
        question: "Choose the number that matches the description: 'Two more than twelve'",
        answers: [
            { text: "twenty two", correct: false },
            { text: "24", correct: false },
            { text: "ten", correct: false },
            { text: "14", correct: true },
        ]
    },
    {
        question: "Tim has 16 toy cars. He buys 4 more toy cars from the store. How many toy cars does Tim have in total now?",
        answers: [
            { text: "twenty", correct: true },
            { text: "eighteen", correct: false },
            { text: "twenty one", correct: false },
            { text: "nineteen", correct: false },
        ]
    },
    {
        question: "Choose the correct answer to fill in the blank '5, 7,__,11'",
        answers: [
            { text: "twelve", correct: false },
            { text: "eight", correct: false },
            { text: "ten", correct: false },
            { text: "nine", correct: true },
        ]
    },
    {
        question: "Jane has 14 marbles. Mark has 21 marbles. Who has more marbles?",
        answers: [
            { text: "Jane has more marbles", correct: false },
            { text: "Mark has more marbles", correct: true },
        ]
    },
    {
        question: "There are 25 children on the playground. 15 children are playing tag and the rest are playing soccer. How many more children are playing tag than soccer?",
        answers: [
            { text: "10", correct: true },
            { text: "five", correct: false },
            { text: "7", correct: false },
            { text: "nine", correct: false },
        ]
    },
];

const questionElement = document.getElementById ("question");
const answerButtons = document.getElementById ("answer-buttons");
const nextButton = document.getElementById ("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next",
    showQuestion()
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}


function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}! `;
    nextButton.innerHTML = `Try again`;
    nextButton.style.display = "block"; 

}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}


nextButton.addEventListener("click", () =>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});


startQuiz(); 