// Initial Conditions======================================================================

var startButton = document.createElement("BUTTON");
var titleHead = document.querySelector("h1");
var quizQInstr = document.querySelector("h2");
var rightWrong = document.querySelector("h3");
var timerInterval;

titleHead.textContent = "Quiz Challenge"
quizQInstr.textContent = "Try to answer the questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by 10 seconds.";
rightWrong.textContent = "Go for it!";

document.querySelector(".initials").setAttribute("style", "visibility: hidden")

startButton.innerHTML = "Start Quiz!";
document.querySelector("#button-rows").appendChild(startButton);
startButton.addEventListener("click", function (event) {
    event.preventDefault(); {
        startQuiz();
    }
}
);

// startQuiz Function: ===================================================================
function startQuiz() {
    document.querySelector("#button-rows").innerHTML = "";
    startTimer();
    titleHead.textContent = "_________________";
    currentQuestion(0);
};

// currentQuestion Function: =============================================================
var currentQuestionID = 0;

function currentQuestion(q) {
    quizQInstr.textContent = (quizContent[q].Question);
    document.querySelector("#button-rows").innerHTML = "";
    for (var i = 0; i < quizContent[q].Answers.length; i++) {
        var answerBtn = document.createElement("BUTTON");
        answerBtn.textContent = quizContent[q].Answers[i];
        if (quizContent[q].RightAnswer === quizContent[q].Answers[i]) {
            answerBtn.addEventListener("click", rightAnswer);
        } else {
            answerBtn.addEventListener("click", wrongAnswer);
        }
        document.querySelector("#button-rows").appendChild(answerBtn);
    }
};

// rightAnswer Function:=================================================================

function rightAnswer() {
    ++currentQuestionID;
    if (currentQuestionID < quizContent.length) {
        currentQuestion(currentQuestionID);
        rightWrong.textContent = "Right!"
    } else { allDone(); }
};


// wrongAnswer Function:=================================================================

function wrongAnswer() {
    ++currentQuestionID;
    secondsLeft = secondsLeft - 10;
    if (currentQuestionID < quizContent.length) {
        currentQuestion(currentQuestionID);
        rightWrong.textContent = "Wrong!"
    } else {
        allDone();
    }
};

// Timer Function:=======================================================================
var countDown = document.querySelector("#countdown");
var secondsLeft = 60;
var finalScore;
countDown.textContent = "Time: " + secondsLeft;

function startTimer() {
    timerInterval = setInterval(function () {
        secondsLeft--;
        if (secondsLeft <= 0) {
            secondsLeft = 0;
            clearInterval(timerInterval);
            allDone();
        }
        countDown.textContent = "Time: " + secondsLeft;
    }, 1000);
}

// allDone function:=====================================================================
function allDone() {

    titleHead.textContent = "All Done!"
    clearInterval(timerInterval);
    quizQInstr.textContent = "Enter your initials to get on the Highscore Board";
    document.querySelector("#button-rows").setAttribute("style", "visibility: hidden");
    document.querySelector(".initials").setAttribute("style", "visibility: block");
    rightWrong.textContent = "Your Final Score is: " + (secondsLeft);
}

// Array of question objects:=========================================(NEEDS WORDS)======


var quizContent = [
    {
        "Question": "Which of the following is a primary color?",
        "Answers": ["purple", "teal", "red", "aqua"],
        "RightAnswer": "red"
    },
    {
        "Question": "What does the 'K' stand for in CMYK?",
        "Answers": ["kuleur", "khaki", "kaleidoscope", "black"],
        "RightAnswer": "black"
    },
    {
        "Question": "What does the 'G' stand for in RGB?",
        "Answers": ["ghiraffe", "green", "gobble", "gratitude"],
        "RightAnswer": "answer3B-right"
    },
    {
        "Question": "What is red and blue mixed together?",
        "Answers": ["green", "purple", "black", "brown"],
        "RightAnswer": "purple"
    },
    {
        "Question": "How do you make green?",
        "Answers": ["blue + yellow", "yellow + green", "red + blue", "black + white"],
        "RightAnswer": "blue + yellow"
    },
]



// Highscore Page variables: ======================================================

var initialsInput = document.querySelector("#initials-text");
var initialsForm = document.querySelector("#initials-form");
var initialsList = document.querySelector("#initials-list");
var initials = [];

// postInitials function: ======================================================

function postInitials() {
    initialsList.innerHTML ="";

    for (var i = 0; i < 5; i++) {
        var initials = initials[i];
        var li = document.createElement("li");
        li.textContent = initials;
        li.setAttribute("data-index",i);
        initialsList.appendChild(li);
    }
}

// init function: ==============================================================

function init() {
    var storedInitials = JSON.parse(localStorage.getItem("initials"));
    if (storedInitials !== null) {
        initials = storedInitials;
    }
    postInitials();
}

// store Initials function: ====================================================

function storeInitials() {
    localStorage.setItem("initials", JSON.stringify(initials));
}

// initialsForm Event Listener: =================================================
initialsForm.addEventListener("submit", function(event) {
    event.preventDefault();
    var initialsText = initialsInput.value.trim;
    if (initialsText === "") {
        return;
    }
    initials.push(initialsText);
    initialsInput.value = "";

    storeInitials();
    postInitials();
});

init();


