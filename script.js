let playerCount = 2;
let playerNames = [];
let currentPlayer = 1;
let startingDiv = document.querySelector(".starting-game-div");
let playerNamesDiv = document.querySelector(".player-name-entering-div");
let playingDiv = document.querySelector(".playing-div");
let playingDivTextContainer = document.getElementById(
  "playing-div-text-container"
);
let winnerTextBox = document.getElementById("winner-text");
let winnerDiv = document.getElementById("winner-div-id");
let playingDivText = "";
let flag = false;
let flag2 = false;
let currentPlayerNumM = 1;
let currentPlayerNumC = 1;
let currentPlayerNumP = 1;
let nowPlaying = 1;
let currentValue = 1;

function startButtonClickHandler() {
  playerCount = document.getElementById("player-count-input").value;
  if (playerCount == "" || playerCount < 2 || playerCount > 10) {
    alert("Please enter a valid player count");
    quitGameClickHandler();
    return;
  }
  startingDiv.removeAttribute("open");
  startingDiv.style.display = "none";
  playerNamesDiv.style.display = "flex";
  playerNamesDiv.setAttribute("open", true);

  for (let i = 0; i < playerCount; i++) {
    document.getElementById(`player-${i + 1}-span`).style.display = "flex";
  }
}

function playButtonClickHandler() {
  for (let i = 0; i < playerCount; i++) {
    let playerName = document.getElementById(`player-${i + 1}-name`).value;
    playerNames.push(playerName);
  }
  for (let i = 0; i < playerCount; i++) {
    let tempArr = playerNames.filter(
      (value) => value.trim() == playerNames[i].trim()
    );
    if (tempArr.length > 1) {
      alert("Please provide different player names");
      playerNames = [];
      return;
    }
    if (playerNames[i] == "") {
      alert("Please don't leave input box empty");
      playerNames = [];
      return;
    }
  }

  playerNamesDiv.removeAttribute("open");
  playerNamesDiv.style.display = "none";
  playingDiv.style.display = "flex";
  playingDiv.setAttribute("open", true);

  nextTurnClickHandler();
}

function getExclimationMarkString(num) {
  let exclimationMark = "";
  for (let i = 1; i <= num; i++) {
    exclimationMark += "!";
  }
  return exclimationMark;
}

function nextTurnClickHandler() {
  nowPlaying = currentPlayer;
  let currentPlayerText = document.getElementById("current-player-txt");
  currentPlayerText.innerText = playerNames[nowPlaying - 1];

  if (!flag && !flag2) {
    playingDivText =
      currentValue + " Machli " + getExclimationMarkString(currentPlayerNumM);
    playingDivTextContainer.innerText = playingDivText;
    currentPlayerNumM += 1;

    if (currentPlayerNumM > currentValue) {
      currentPlayerNumM = 1;
      flag = true;
    }

    goToNextPlayer();
    return;
  } else if (currentPlayerNumC <= currentValue && flag && !flag2) {
    playingDivText =
      "Pani Me Gayi " + getExclimationMarkString(currentPlayerNumC);
    playingDivTextContainer.innerText = playingDivText;
    currentPlayerNumC += 1;

    if (currentPlayerNumC > currentValue) {
      currentPlayerNumC = 1;
      flag = false;
      flag2 = true;
    }

    goToNextPlayer();
    return;
  } else if (currentPlayerNumP <= currentValue && flag2 && !flag) {
    playingDivText = "Chapak" + getExclimationMarkString(currentPlayerNumP);
    playingDivTextContainer.innerText = playingDivText;
    currentPlayerNumP += 1;
    if (currentPlayerNumP > currentValue) {
      currentPlayerNumP = 1;
      flag2 = false;
    }

    if (!flag2) {
      if (currentPlayer < playerCount) {
        currentPlayer += 1;
      } else {
        currentPlayer = 1;
      }
      currentValue += 1;
    }
  }
}
function goToNextPlayer() {
  if (currentPlayer < playerCount) {
    currentPlayer += 1;
  } else {
    currentPlayer = 1;
  }
}
function outPlayerClickHandler() {
  let removedItem = playerNames.splice(nowPlaying - 1, 1);
  currentValue = 1;
  if (playerNames.length == 1) {
    winnerDiv.style.display = "flex";
    winnerDiv.setAttribute("open", true);
    playerNamesDiv.setAttribute("open", true);
    winnerTextBox.innerText = "Winner is " + playerNames[0];
    playingDiv.style.display = "none";
    playingDiv.removeAttribute("open");
    return;
  }

  playerCount -= 1;
  flag = false;
  flag2 = false;
  alert(removedItem[0] + " is out from game");
  currentPlayer = 1;
  nextTurnClickHandler();
}

function quitGameClickHandler() {
  console.log("Quiting Game");
  playingDivText = "";
  flag = false;
  flag2 = false;
  currentPlayerNumM = 1;
  currentPlayerNumC = 1;
  currentPlayerNumP = 1;
  nowPlaying = 1;
  playerCount = 2;
  playerNames = [];
  currentPlayer = 1;
  let spanTags = document.querySelectorAll(".player-span");
  spanTags.forEach((element) => {
    element.style.display = "none";
  });
  playingDiv.style.display = "none";
  startingDiv.style.display = "flex";
  winnerDiv.removeAttribute("open");
  winnerDiv.style.display = "none";
}
