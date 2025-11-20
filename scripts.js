//Getters
const gamePanel = document.getElementById('GamePopup');
const gameCloseButton = document.getElementById('close-btn');
const gameOpenButtonTTT = document.getElementById('OpenGameButtonTTT');
const gameOpenButtonHM = document.getElementById('OpenGameButtonHM');
const gameOpenButton2048 = document.getElementById('OpenGameButton2048');
const TTTBoard = document.getElementById('TTTBoard');
const HMBoard = document.getElementById('HMBoard');
const Board2048 = document.getElementById('Board2048');

//Functions
function OpenTTTFunction() {
    gamePanel.classList.remove('Hidden');
    TTTBoard.classList.remove('Hidden');
    HMBoard.classList.add('Hidden');
    Board2048.classList.add('Hidden');
}
function OpenHMFunction() {
    gamePanel.classList.remove('Hidden');
    TTTBoard.classList.add('Hidden');
    HMBoard.classList.remove('Hidden');
    Board2048.classList.add('Hidden');
}
function Open2048Function() {
    gamePanel.classList.remove('Hidden');
    TTTBoard.classList.add('Hidden');
    HMBoard.classList.add('Hidden');
    Board2048.classList.remove('Hidden');
}

function CloseFunction() {
    gamePanel.classList.add('Hidden');
}

//Listeners
gameCloseButton.addEventListener("click", CloseFunction);
gameOpenButtonTTT.addEventListener("click", OpenTTTFunction);
gameOpenButtonHM.addEventListener("click", OpenHMFunction);
gameOpenButton2048.addEventListener("click", Open2048Function);



/* Tick Tack Toe */
const cells = document.querySelectorAll('.cellTTT');
const statusMessage = document.getElementById('TTTstatus-message');
const TTTrestartButton = document.getElementById('TTTrestart-button');

let gameBoard = ['', '', '', '', '', '', '', '', ''];
let chosenSpots = 0;
let currentPlayer = 'X';
let gameActive = true;
statusMessage.textContent = `It's X's turn`;

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

function handleCellClick(e) {
    const clickedCell = e.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));//Gets the number in that attribute

    if (gameBoard[clickedCellIndex] != '' || !gameActive) {
        return; //Dont click occupied cells or after game ends
    }

    gameBoard[clickedCellIndex] = currentPlayer;//Set the cell to the player
    clickedCell.textContent = currentPlayer;//Set the cell text to the player
    chosenSpots++;

    checkResult();//Check if there is a win
    changePlayer();
}

function checkResult() {
    for(let i = 0; i < winningConditions.length;i++)
    {
        if(gameBoard[winningConditions[i][0]] == currentPlayer && gameBoard[winningConditions[i][1]] == currentPlayer && gameBoard[winningConditions[i][2]] == currentPlayer)
        {
            statusMessage.innerHTML = "Winner is: " + currentPlayer;
            gameActive = false;
            return;
        }
    }
    if(chosenSpots == 9)
    {
        statusMessage.innerHTML = "Both players loose!";
        gameActive = false;
        return;
    }
}

function changePlayer() {
    if(gameActive == true)
    {
        if(currentPlayer == 'O')
        {
            currentPlayer = 'X';
            statusMessage.textContent = `It's X's turn`;
        }
        else
        {
            currentPlayer = 'O';
            statusMessage.textContent = `It's O's turn`;
        }
    }
}


/* HangMan */
let HMwordToguess = "";
let playingHM = true;
let knownLetters = [];
let wrongCount = 0;
let maxWrong = 4;
let HMImage = document.getElementById("HMMan");
const HMrestartButton = document.getElementById('HMrestart-button');

//Dont let the submit button reload everything
const hmForm = document.getElementById('HMForm');
hmForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevents the default form submission (page reload)
    const inputValue = hmForm.elements.HMinput.value;
    console.log('Form submitted without reload. Input value:', inputValue);
    //clear the input field
    CheckHMStatus(inputValue);
  });

function CheckHMStatus(theInput)
{
    //check to see if the input is 
    /*1 letter, not already guessed - then wether or not its in the word */
    wrongCount++;
    ChangeHMMan();
}

function ChangeHMMan()
{
    //The physical hangman man
    if(playingHM == true){
        switch (wrongCount) {
            case 0:
                HMImage.src = "images/HM/HM1.png";
                break;
            case 1:
                HMImage.src = "images/HM/HM2.png";
                break;
            case 2:
                HMImage.src = "images/HM/HM3.png";
                break;
            case 3:
                HMImage.src = "images/HM/HM4.png";
                break;
            case 4:
                HMImage.src = "images/HM/HM5.png";
                playingHM = false;
                HMGameOver();
                break;
            default:
                break;
        }
    }
    
}
function ChangeHMText()
{
    //weather or not to show ----- or words
}

function HMGameOver()
{
    //fully revealed letter vs fully hung man
}

function HMChooseWord()
{
    //return a rand word
}

function restartTTTGame() {
    /* TickTacToe */
    gameActive = true;
    currentPlayer = 'X';
    chosenSpots = 0;
    statusMessage.textContent = `It's X's turn`;
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    for(let i = 0; i < gameBoard.length; i++)
    {
        cells[i].textContent = '';
    }
    
}
function restartHMGame()
{
    console.log("Restarting");
    /* HM */
    //HMwordToGuess = HMChooseWord();
    knownLetters = [];
    playingHM = true;
    wrongCount = 0;
    ChangeHMMan();
    // hmForm.elements.HMinput.value = "";//???
    /* 2048 */
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
TTTrestartButton.addEventListener('click', restartTTTGame);
HMrestartButton.addEventListener('click', restartHMGame);
