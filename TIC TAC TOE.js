let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-button");
let newBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let starsContainer = document.querySelector("#stars");

let turnO = true; 
let count = 0;

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

function createStars() {
    const count = 100;
    for (let i = 0; i < count; i++) {
        const star = document.createElement("div");
        star.classList.add("star");
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.width = `${Math.random() * 3 + 1}px`;
        star.style.height = star.style.width;
        star.style.setProperty("--opacity", Math.random());
        star.style.setProperty("--duration", `${Math.random() * 3 + 2}s`);
        star.style.animationDelay = `${Math.random() * 5}s`;
        starsContainer.appendChild(star);
    }
}

createStars();

const resetGame = () => {
    turnO = true;
    count = 0;
    enableBoxes();
    msgContainer.style.display = "none";
    
    // Remove winner class from all boxes
    boxes.forEach(box => {
        box.classList.remove("winner", "x", "o");
        box.style.transform = "";
        box.style.boxShadow = "";
    });
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText !== "") return;
        
        if (turnO) {
            box.innerText = "O";
            box.classList.add("o");
            turnO = false;
        } else {
            box.innerText = "X";
            box.classList.add("x");
            turnO = true;
        }
        
        // Add click animation
        box.style.transform = "scale(0.9)";
        setTimeout(() => {
            box.style.transform = "scale(1)";
        }, 100);
        
        box.disabled = true;
        count++;

        let isWinner = checkWinner();

        if (count === 9 && !isWinner) {
            gameDraw();
        }
    });
});

const gameDraw = () => {
    msg.innerText = `Game was a Draw!`;
    msgContainer.style.display = "flex";
    disableBoxes();
    
    // Add draw animation to all boxes
    boxes.forEach((box, index) => {
        setTimeout(() => {
            box.classList.add("winner");
        }, index * 100);
    });
};

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.style.display = "flex";
    disableBoxes();
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                // Highlight winning boxes
                boxes[pattern[0]].classList.add("winner");
                boxes[pattern[1]].classList.add("winner");
                boxes[pattern[2]].classList.add("winner");
                
                // Add sequential animation
                boxes[pattern[0]].style.animationDelay = "0s";
                boxes[pattern[1]].style.animationDelay = "0.2s";
                boxes[pattern[2]].style.animationDelay = "0.4s";
                
                showWinner(pos1Val);
                return true;
            }
        }
    }
    return false;
};

newBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

resetGame();