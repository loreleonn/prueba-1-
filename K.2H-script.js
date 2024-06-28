const questions = [
    {
        question:" Choose the correct comparison:",
        answers: [
            { text: "19 is grater than 21", correct: false },
            { text: "15 is greater than 8", correct: true },
            { text: "8 is grater than 17", correct: false },
            { text: "11 is greater than 20 ", correct: false },
        ]
    },
    {
        question: " Choose the correct statement: ",
        answers: [
            { text: "8 is less than 5", correct: false },
            { text: "15 is less than 9", correct: false },
            { text: "16 is less than 20", correct: true },
            { text: "22 is less than 8", correct: false },
        ]
    },
    {
        question: " Timmy has 12 marbles, and his friend Sarah has 8 marbles. How many more marbles does Timmy have than Sarah? ",
        answers: [
            { text: "Timmy has 12 marbles, which is 4 more than Sarah who has 8 marbles.", correct: true },
            { text: "Timmy has 12 marbles, which is 6 more than Sarah who has 8 marbles.", correct: false },
            { text: "Timmy has 12 marbles, which is 7 more than Sarah who has 8 marbles.", correct: false },
            { text: "Timmy has 12 marbles, which is 3 more than Sarah who has 8 marbles.", correct: false },
        ]
    },
    {
        question: "Amanda has 10 apples, and Alex has 15 apples. How many fewer apples does Amanda have compared to Alex?",
        answers: [
            { text: "Amanda has 8 fewer apples than Alex", correct: false },
            { text: "Amanda has 7 fewer apples than Alex", correct: false },
            { text: "Amanda has 5 fewer apples than Alex", correct: true },
            { text: "Amanda has 9 fewer apples than Alex", correct: false },
        ]
    },
    {
        question: "In a toy store, there are 14 blue toy cars and 14 red toy cars. How many more blue toy cars are there compared to red toy cars?",
        answers: [
            { text: "There are more blue toy cars than red toy cars; they are equal", correct: false },
            { text: "There are no more blue toy cars than red toy cars; they are equal", correct: true },
            { text: "There are more red toy cars than blue toy cars; they are equal", correct: false },
        ]
    },
    {
        question: " 14 > 19",
        answers: [
            { text: "false", correct: true },
            { text: "true", correct: false },
        ]
    },
    {
        question: " 16 = 16",
        answers: [
            { text: "false", correct: false },
            { text: "true", correct: true },
        ]
    },
    {
        question: "Compare 10 and 5",
        answers: [
            { text: "5 is greater than 10", correct: false },
            { text: "10 is less than 5", correct: false },
            { text: "10 is equal to 5", correct: false },
            { text: "10 is greater than 5", correct: true },
        ]
    },
    {
        question: " 20 > 17",
        answers: [
            { text: "false", correct: false },
            { text: "true", correct: true },
        ]
    },
    {
        question: " 8 < 14",
        answers: [
            { text: "true", correct: true },
            { text: "false", correct: false },
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