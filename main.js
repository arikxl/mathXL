const option1 = document.getElementById('option1');
const option2 = document.getElementById('option2');
const option3 = document.getElementById('option3');
const operatorH3 = document.getElementById('operatorH3');
const num1H3 = document.getElementById('num1H3');
const num2H3 = document.getElementById('num2H3');
const xpSpan = document.getElementById('xpSpan');

let audio = new Audio('win.wav');


const prizeXP=[100,250,555,999,1250,1515,1890,2222,2555,2999,3333,3693,4000,4444,4864,5000]
let goalIndx = localStorage.getItem('MathGoalIndx') ||0;
let currentGoal = prizeXP[goalIndx];

let xp = +localStorage.getItem('Math-xp') ||0;
let answer;
let operatorG = '+';
let num1G;

xpSpan.innerHTML = xp;

function changeOperator(operator){ 
    operatorG = operator;
    operatorH3.innerHTML = operatorG;
    createQuestion(operatorG)
}

function createQuestion(operator) { 
    let rndNum1 = Math.round(Math.random() * 100);
    let rndNum2 = Math.round(Math.random() * 100);
    switch (operator) {
        case 'x':
            rndNum1 = Math.round(Math.random() * 13);
            rndNum2 = Math.round(Math.random() * 10);
            break;
            case '÷':
            if (rndNum1===num1G||rndNum2===num1G||rndNum1===rndNum2) createQuestion(operatorG)
            rndNum1 = Math.round(Math.random() * 120);
            rndNum2 = getDivisors(rndNum1)[Math.floor(Math.random() * getDivisors(rndNum1).length)];
            break;
    
        default:
            rndNum1 = Math.round(Math.random() * 100);
            rndNum2 = Math.round(Math.random() * 100);
            break;
    } 
    let temp;

    if (rndNum2 > rndNum1) {
        temp = rndNum1;
        rndNum1 = rndNum2;
        rndNum2 = temp;
    }
    num1G = rndNum1;
    num1H3.innerHTML = rndNum1;
    num2H3.innerHTML = rndNum2;
    createOptions(rndNum1,rndNum2,operator)
}

function getDivisors(num) {
  let divisors = [];
  for (let i = 1; i <= num; i++) {
    if (num % i === 0&& i!==1 && i!==num) {
      divisors.push(i);
    }
    }
    if (divisors.length === 0) {
        changeOperator(operatorG)
    } else {
        return divisors
    }

}

changeOperator(operatorG)

function createOptions(rndNum1,rndNum2,operator) {

    let max;
    let min;
    let opts = [];

    switch (operator) {
        case '+':
            max = rndNum1*2;
            min = rndNum1;
            answer = rndNum1 + rndNum2;
            opts[0] = Math.floor(Math.random() * (max - min + 1)) + min;
            opts[1] = Math.floor(Math.random() * (max - min + 1)) + min;
            opts[2] = answer;
            break;
        case '-':
            max = rndNum1;
            min = 0;
            answer = rndNum1 - rndNum2;
            opts[0] = Math.floor(Math.random() * (max - min + 1)) + min;
            opts[1] = Math.floor(Math.random() * (max - min + 1)) + min;
            opts[2] = answer;
            break;
        case 'x':
            max = rndNum1*rndNum2+rndNum1;
            min = rndNum1;
            answer = rndNum1 * rndNum2;
            opts[0] = Math.floor(Math.random() * (max - min + 1)) + min;
            opts[1] = Math.floor(Math.random() * (max - min + 1)) + min;
            opts[2] = answer;
            break;
        case '÷':
            max = 15;
            min = 0;
            answer = rndNum1 / rndNum2;
            opts[0] = Math.floor(Math.random() * (max - min + 1)) + min;
            opts[1] = Math.floor(Math.random() * (max - min + 1)) + min;
            opts[2] = answer;
            break;
    
        default:
            break;
    }
    
    let switchOptions = [];
    for (i = opts.length; i--;){
        switchOptions.push(opts.splice(Math.floor(Math.random() * (i + 1)), 1)[0]);
    }

    option1.innerHTML = switchOptions[0];
    option2.innerHTML = switchOptions[1];
    option3.innerHTML = switchOptions[2];
}

function guess(id) {

    let pointsPlus;
    if (operatorG === 'x' || operatorG === '÷') {
        pointsPlus = 2;
    } else {
        pointsPlus = 1;
    }

    const playerGuess = document.getElementById(id);
    if (+playerGuess.innerHTML === answer) {
        xp =xp+pointsPlus;
        localStorage.setItem('Math-xp', xp);
        xpSpan.innerHTML = xp;
    } else {
        xp--;
        if (xp < 0) xp = 0;
        localStorage.setItem('Math-xp', xp);
        xpSpan.innerHTML = xp;
        alert(answer)
    }
    howMuchToPrize()
    createQuestion(operatorG)
}

function howMuchToPrize() {
    if (xp >= currentGoal) {
        audio.play()
        alert('גש לאמא או אבא לקבל פרס');
        goalIndx++;
        localStorage.setItem('MathGoalIndx', goalIndx);
        currentGoal = prizeXP[goalIndx];
    }
    xpToPrize = currentGoal - xp;
    prizeSpan.innerHTML = xpToPrize;
}
howMuchToPrize()