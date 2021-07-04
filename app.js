const hit = document.querySelector(".hit");
const stand = document.querySelector(".stand");
const deal = document.querySelector(".deal");
const result = document.querySelector(".result");
const userCardSection = document.querySelector(".userCardSection");
const compCardSection = document.querySelector(".compCardSection");
const userScoreDOM = document.querySelector(".userScore");
const compScoreDOM = document.querySelector(".compScore");
const userSumDOM = document.querySelector(".userSum");
const compSumDOM = document.querySelector(".compSum");
const drawsDOM = document.querySelector(".draws");
const hitSound = new Audio("static/sounds/swish.m4a");
const winSound = new Audio("static/sounds/cash.mp3");
const loseSound = new Audio("static/sounds/aww.mp3");
let userScore = 0;
let compScore = 0;
let draws = 0;
let userSum = 0;
let compSum = 0;

function pickAndDisplayCard(sum, cardArea, sumArea) {
    const choices = [2,3,4,5,6,7,8,9,"J","Q","K","A"]
    let index = Math.floor(Math.random() * 12);
    let image = document.createElement("img");
    stand.removeAttribute("disabled");
    // stand.classList.remove("disableBtn");
    image.setAttribute("src","static/images/"+choices[index]+".jpg");
    hitSound.play();
    cardArea.appendChild(image);
    if(index >= 8 && index <= 10) {
        sum = sum + 10;
    } else if(index === 11 && sum < 11) {
        sum = sum + 11;
    } else if(index === 11 && sum >= 11) {
        sum = sum + 1;
    } else {
        sum = sum + index + 2;
    }
    sumArea.textContent = sum;
    console.log(cardArea);
    return sum;
}

function compHit() {
    hit.setAttribute("disabled", "");
    stand.setAttribute("disabled", "");
    deal.removeAttribute("disabled");
    // deal.classList.remove("disableBtn");
    // hit.className += " disableBtn";
    // stand.className += " disableBtn";

    while(compSum < 15) {
        compSum = pickAndDisplayCard(compSum, compCardSection, compSumDOM);
        if(compSum > 21) {
            compSumDOM.textContent = "BUST!";
            compareScore();
        }
        // console.log("loop");
    }
    compareScore();
}

function compareScore() {
    console.log(userSum, compSum);
    if((userSum > 21 && compSum > 21) || (userSum == compSum)) {
        result.textContent = "You Drew!";
        result.style.color = "grey";
        draws++;
        drawsDOM.textContent = draws;
    } else if((userSum > 21 && compSum <= 21) || (userSum < 22 && compSum < 22 &&  userSum < compSum)) {
        result.textContent = "You Lost!";
        result.style.color = "red";
        compScore++;
        compScoreDOM.textContent = compScore;
        loseSound.play();
    } else if((userSum <= 21 && compSum > 21) || (userSum < 22 && compSum < 22 &&  userSum > compSum)) {
        result.textContent = "You Won!";
        result.style.color = "green";
        userScore++;
        userScoreDOM.textContent = userScore;
        winSound.play();
    }
}

hit.addEventListener("click", ()=> {
    console.log("hit");
    userSum = pickAndDisplayCard(userSum, userCardSection, userSumDOM);
    if(userSum > 21) {
        userSumDOM.textContent = "BUST!";
        compHit();
    }
});

stand.addEventListener("click", ()=> {
    console.log("stand");
    compHit();
});

deal.addEventListener("click", ()=> {
    console.log("deal");
    userSumDOM.textContent = "0";
    compSumDOM.textContent = "0";
    result.textContent = "Ready for Next Round?";
    // userCardSection.innerHTML = "";
    while (userCardSection.firstChild) {
        userCardSection.removeChild(userCardSection.firstChild);
    }
    while (compCardSection.firstChild) {
        compCardSection.removeChild(compCardSection.firstChild);
    }
    compSum = userSum = 0;
    hit.removeAttribute("disabled");
    // hit.classList.remove("disableBtn");
    result.style.color = "whitesmoke";
    deal.setAttribute("disabled","")
});