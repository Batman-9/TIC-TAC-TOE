let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-button");
let newBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; 
let gameOver = false;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (gameOver || box.innerText !== "") return;
        
        if (turnO) {
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }
        
        box.disabled = true;
        checkWinner();
    });
});

const checkWinner = () => {
    let winnerFound = false;
    
    for(let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;
        
        if(pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if(pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
                winnerFound = true;
                break;
            }
        }
    }
    
    if (!winnerFound) {
        checkDraw();
    }
};

const checkDraw = () => {
    let allFilled = true;
    for(let box of boxes) {
        if(box.innerText === "") {
            allFilled = false;
            break;
        }
    }
    
    if(allFilled) {
        showDraw();
    }
};

const showWinner = (winner) => {
    gameOver = true;
    msg.innerText = `Winner: ${winner}`;
    msgContainer.style.display = "flex";
};

const showDraw = () => {
    gameOver = true;
    msg.innerText = "Game Draw!";
    msgContainer.style.display = "flex";
};

const resetGame = () => {
    gameOver = false;
    turnO = true;
    
    for(let box of boxes) {
        box.innerText = "";
        box.disabled = false;
    }
    
    msgContainer.style.display = "none";
};

resetBtn.addEventListener("click", resetGame);
newBtn.addEventListener("click", resetGame);
