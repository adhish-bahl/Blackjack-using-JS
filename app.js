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
let userScore = 0;
let compScore = 0;
let draws = 0;
let userSum = 0;
let compSum = 0;

function pickAndDisplayCard(sum, cardArea, sumArea) {
    const choices = [2,3,4,5,6,7,8,9,"J","Q","K","A"]
    let index = Math.floor(Math.random() * 12);
    let image = document.createElement("img");
    image.setAttribute("src","static/images/"+choices[index]+".jpg");
    cardArea.appendChild(image);
    if(index >= 8 && index <= 10) {
        sum = sum + 10;
    } else if(index === 11) {
        sum = sum + 11;
    } else {
        sum = sum + index + 2;
    }
    sumArea.textContent = sum;
    if(sum > 21) {
        result.textContent = "Bursted, the sum crossed 21!";
        hit.setAttribute("disabled", "");
        hit.className += " disableBtn";
    }
    return sum;
}

hit.addEventListener("click", ()=> {
    userSum = pickAndDisplayCard(userSum, userCardSection, userSumDOM);
});

stand.addEventListener("click", ()=> {
    hit.setAttribute("disabled", "");
    hit.className += " disableBtn";
});

deal.addEventListener("click", ()=> {
    userSumDOM.textContent = "0";
    compSumDOM.textContent = "0";
    result.textContent = "Let's Start";
    // userCardSection.innerHTML = "";
    while (userCardSection.firstChild) {
        userCardSection.removeChild(userCardSection.firstChild);
    }
    while (compCardSection.firstChild) {
        compCardSection.removeChild(compCardSection.firstChild);
    }
    compSum = userSum = 0;
    hit.removeAttribute("disabled");
    hit.classList.remove("disableBtn");
});