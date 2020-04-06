const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");


let questions = [
    {
        question :"What is the most dense planet in our solar system?",
        imgSrc : "img/space.jpg",
        choiceA : "Earth",
        choiceB : "Mars",
        choiceC : "Mercury",
        correct : "A"
    },{
        question : "What planet is closet to the sun?",
        imgSrc : "img/sun.jpg",
        choiceA : "Venus",
        choiceB : "Mercury",
        choiceC : "Jupiter",
        correct : "B"
    },{
        question : "What is not considered a planet anymore?",
        imgSrc : "img/explanet.jpg",
        choiceA : "Uranus",
        choiceB : "Jupiter",
        choiceC : "Pluto",
        correct : "C"
    },{
        question : "What planet is furthest from the sun?",
        imgSrc : "img/cold.png",
        choiceA : "Earth",
        choiceB : "Pluto",
        choiceC : "Neptune",
        correct : "C"
    },{
        question : "Which planet has a ring?",
        imgSrc : "img/saturn.jpg",
        choiceA : "Mercury",
        choiceB : "Saturn",
        choiceC : "Venus",
        correct : "B"

    }
];


const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 10; 
const gaugeWidth = 150; 
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

function renderQuestion(){
    let q = questions[runningQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    qImg.innerHTML = "<img src="+ q.imgSrc +">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

start.addEventListener("click",startQuiz);


function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); 
}

function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}



function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
     
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
    
            clearInterval(TIMER);
            scoreRender();
        }
    }
}


function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
     
        score++;
       
        answerIsCorrect();
    }else{
       
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
   
        clearInterval(TIMER);
        scoreRender();
    }
}


function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}


function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}


function scoreRender(){
    scoreDiv.style.display = "block";
    
    
    const scorePerCent = Math.round(100 * score/questions.length);
    
   
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
}

