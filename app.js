const resetBtn = document.querySelector(`.restart`);
const gamePlay = document.getElementById(`score`);
const gameCard = document.getElementById(`cards`);
const nextGame = document.getElementById(`next-card`);
let gameArr;
let score;
restart();
resetBtn.addEventListener(`click`, restart);
gameCard.addEventListener(`click`, gameClick);

function gameClick(event) {
  if (event.target.className === `card` && !event.target.classList.contains(`matched`)) {
    score++;
    checkForMatch(event);
    setTimeout(() => {
      event.target.classList.remove(`show`);
      gameCard.addEventListener(`click`, gameClick);
    }, 100);
    gameCard.removeEventListener(`click`, gameClick);
    gamePlay.textContent = score;
  }
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
} 

function checkForMatch (e) {
  if (e.target.children[0].className === nextGame.children[0].className) {
    e.target.classList.add(`matched`);    
    gameWinner();
    gameArr = gameArr.filter(element => (element !== e.target.children[0].className));
    nextGame.innerHTML = `<i class="${gameArr[getRandomInt(0, gameArr.length - 1)]}"></i>`;
  } else {
    e.target.classList.add(`show`);
  }
};

function gameWinner() {
  setTimeout(() => {
    if (gameArr.length === 0) {
      alert(`You gameWinner and your score is ${score}!`);
      restart();
    }
  }, );
};

function restart() {
  const allCards = document.querySelectorAll(`.card .fas`);
  gameArr = [];
  for (let card of allCards) {
    card.parentElement.classList.remove(`matched`, `show`);
    gameArr.push(card.className);
  }
  gameArr = shuffle(gameArr);
  score = 0;
  gamePlay.textContent = score;
  for (let i = 0; i < gameArr.length; i++) {
    allCards[i].className = gameArr[i];
  }
  nextGame.innerHTML = `<i class="${gameArr[getRandomInt(0, gameArr.length - 1)]}"></i>`;
};

function shuffle(array) {
  let currentIndex = array.length,
   temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};    
