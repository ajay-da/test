const questionNumber=document.querySelector(".question-numbers");
const questionText=document.querySelector(".question-text");
const optionContainer=document.querySelector(".option-container");
const homeBox = document.querySelector(".home");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");

let questionCounter=0;
let currentQuestion;
let availableQuestions=[];
let availableOptions=[];
let correctAnswer=0;
let attempt=0;


function setAvailableQuestions(){
const totalQuestions=quiz.length;
for(let i=0;i<totalQuestions;i++){
    availableQuestions.push(quiz[i]);
}
}
function getNewQuestion(){
    questionNumber.innerHTML="Question " + (questionCounter + 1) + " of " + quiz.length;
    const questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
    currentQuestion=questionIndex;
    questionText.innerHTML=currentQuestion.q;
    const index1=availableQuestions.indexOf(questionIndex);
    availableQuestions.splice(index1,1)
    const optionLen = currentQuestion.options.length
    for(let i=0;i<optionLen;i++)
    {
        availableOptions.push(i);
    }
    optionContainer.innerHTML='';
    for(let i=0;i<optionLen;i++)
    {
        const optionIndex=availableOptions[Math.floor(Math.random() * availableOptions.length)];
        const index2=availableOptions.indexOf(optionIndex);
        availableOptions.splice(index2,1);
        const option =document.createElement("div");
        option.innerHTML=currentQuestion.options[optionIndex];
        option.id=optionIndex;
        option.className="option";
        optionContainer.appendChild(option);
        option.setAttribute("onclick","getResult(this)");
    }

    questionCounter++;
}

function getResult(element){
const id= parseInt(element.id);

if(id===currentQuestion.answer){
    element.classList.add("correct");
    correctAnswer++;
}else{
element.classList.add("wrong");

const optionLen=optionContainer.children.length;
for(let i=0;i<optionLen;i++)
{
    if(parseInt(optionContainer.children[i].id)===currentQuestion.answer){
        element.classList.add("correct");
}
    }
}
attempt++;
unclickableOptions();
}

function next(){
    if(questionCounter==quiz.length){
        quizOver();
    }else{
        getNewQuestion();
    }
}
function unclickableOptions(){
    const optionLen=optionContainer.children.length;
    for(let i=0;i<optionLen;i++){
        optionContainer.children[i].classList.add("already-answered");
    }
}
function quizOver(){
quizBox.classList.add("hide");
resultBox.classList.remove("hide");
quizResult();
}
function quizResult(){
    resultBox.querySelector(".total-questions").innerHTML=quiz.length;
    resultBox.querySelector(".total-attempt").innerHTML=attempt;
    resultBox.querySelector(".total-correct").innerHTML=correctAnswer;
    resultBox.querySelector(".total-wrong").innerHTML=attempt-correctAnswer;
    const percentage=(correctAnswer/quiz.length)*100;
    resultBox.querySelector(".percentage").innerHTML=percentage.toFixed(2)+ "%";
    resultBox.querySelector(".total-score").innerHTML=correctAnswer + "/" + quiz.length;
}
function resetQuiz(){
    questionCounter=0;
    currentQuestion=0;
    attempt=0;  
}
function tryAgainQuiz(){
resultBox.classList.add("hide");
quizBox.classList.remove("hide");
resetQuiz();
startQuiz();
}
function goToHome(){
resultBox.classList.add("hide");
homeBox.classList.remove("hide");
resetQuiz();
}

function startQuiz(){
    homeBox.classList.add("hide");
    quizBox.classList.remove("hide");
    setAvailableQuestions();
    getNewQuestion();
}
window.onload=function(){
homeBox.querySelector(".total-questions").innerHTML=quiz.length;
}
document.getElementById("start-btn").addEventListener("click",() =>{
    var name=document.getElementById("uname").value;
    var email=document.getElementById("e-mail").value;
    localStorage.setItem("1",name);
    localStorage.setItem("2",email);
})
console.log(localStorage.getItem("1"));
console.log(localStorage.getItem("2"));