let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".reset-btn");
let msg = document.querySelector(".msg");

// Audio files
const clickSound = new Audio("sound/click.mp3");
const winSound = new Audio("sound/win.mp3");
const drawSound = new Audio("sound/draw.mp3");
const resetSound = new Audio("sound/reset.mp3");

// Preload
clickSound.preload = "auto";
winSound.preload = "auto";
drawSound.preload = "auto";
resetSound.preload = "auto";

let turnO = true;
let count = 0;

// Winning patterns
const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
];

// Box click event
boxes.forEach((box) => {
    box.addEventListener("click", () => {

        // Play click sound
        clickSound.currentTime = 0;
        clickSound.play().catch(() => {});

        if (box.innerText !== "") return;

        // Fill X or O
        if (turnO) {
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }

        box.disabled = true;
        count++;

        // Check winner
        if (!checkWinner() && count === 9) {
            msg.innerText = "It's a Draw 🤝";
            drawSound.currentTime = 0;
            drawSound.play().catch(() => {});
        }
    });
});

// Check winner function
const checkWinner = () => {
    for (let pattern of winPatterns) {
        let [a,b,c] = pattern;

        if (
            boxes[a].innerText &&
            boxes[a].innerText === boxes[b].innerText &&
            boxes[a].innerText === boxes[c].innerText
        ) {
            msg.innerText = `${boxes[a].innerText} Wins 🎉`;

            winSound.currentTime = 0;
            winSound.play().catch(() => {});

            boxes[a].classList.add("win");
            boxes[b].classList.add("win");
            boxes[c].classList.add("win");

            boxes.forEach(box => box.disabled = true);
            return true;
        }
    }
    return false;
};

// Reset game function
const resetGame = () => {
    resetSound.currentTime = 0;
    resetSound.play().catch(() => {});

    boxes.forEach(box => {
        box.innerText = "";
        box.disabled = false;
        box.classList.remove("win");
    });

    turnO = true;
    count = 0;
    msg.innerText = "";
};

// Reset button event
resetBtn.addEventListener("click", resetGame);
