function launchFireworks() {
    const colors = ["red", "yellow", "blue", "lime", "orange", "magenta"];

    const container = document.querySelector(".container");
    if (!container) return;

    const rect = container.getBoundingClientRect();

    for (let burst = 0; burst < 3; burst ++) {
        setTimeout(() => {
           const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            for (let i = 0; i < 36; i++) {
                const particle = document.createElement("div");

                particle.className = "firework-particle";

                particle.style.left = centerX + "px";
                particle.style.top = centerY + "px";

                const color = colors[Math.floor(Math.random() * colors.length)];
                particle.style.backgroundColor = color;
                particle.style.color = color;
                const angle = (Math.PI * 2 * i) / 36;
                const distance = 30 + Math.random() * 50;

                particle.style.setProperty(
                    "--x", Math.cos(angle) * distance + "px"
                    );

                particle.style.setProperty(
                    "--y", Math.sin(angle) * distance + "px"
                );
                    document.body.appendChild(particle);
                    setTimeout(() => particle.remove(), 1100);                
            }
        }, burst * 300);
    }
}
// END AMIMATION


let currentNumber;
let score = 0;
let questionCount = 0;
let maxQuestions = 10;
let timeleft = 60;
let timer;
let gameStarted = false;
let currentType;

// NUMBER TO ENGLISH WORD 

    const  englishNumbers = {
        1: "one",
        2: "two",
        3: "three",
        4: "four",
        5: "five",
        6: "six",
        7: "seven",
        8: "eight",
        9: "nine",
        10: "ten",
        11: "eleven",
        12: "twelve",
        13: "thirteen",
        14: "fourteen",
        15: "fifteen",
        16: "sixteen",
        17: "seventeen",
        18: "eighteen",
        19: "nineteen",
        20: "twenty",
        21: "twenty-0ne",
        22: "twenty-two",
        23: "twenty-three",
        24: "twenty-four",
        25: "twenty-five",
        26: "twenty-six",
        27: "twenty-seven",
        28: "twenty-eight",
        29: "twenty-nine",
        30: "thirty",
        31: "thirty-one",
        32: "thirty-two",
        33: "thirty-three",
        34: "thirty-four",
        35: "thirty-five",
        36: "thirty-six",
        37: "thirty-seven",
        38: "thirty-eight",
        39: "thirty-nine",
        40: "forty",
        41: "forty-one",
        42: "forty-two",
        43: "forty-three",
        44: "forty-four",
        45: "forty-five",
        46: "forty-six",
        47: "forty-seven",
        48: "forty-eight",
        49: "forty-nine",
        50: "fifty",
        51: "fifty-one",
        52: "fifty-two",
        53: "fifty-three",
        54: "fifty-four",
        55: "fifty-five",
        56: "fifty-six",
        57: "fifty-seven",
        58: "fifty-eight",
        59: "fifty-nine",
        60: "sixty",
        61: "sixty-one",
        62: "sixty-two",
        63: "sixty-three",
        64: "sixty-four",
        65: "sixty-five",
        66: "sixty-six",
        67: "sixty-seven",
        68: "sixty-eight",
        69: "sixty-nine",
        70: "seventy",
        71: "seventy-one",
        72: "seventy-two",
        73: "seventy-three",
        74: "seventy-four",
        75: "seventy-five",
        76: "seventy-six",
        77: "seventy-seven",
        78: "seventy-eight",
        79: "seventy-nine",
        80: "eighty",
        81: "eighty-one",
        82: "eighty-two",
        83: "eighty-three",
        84: "eighty-four",
        85: "eighty-five",
        86: "eighty-six",
        87: "eighty-seven",
        88: "eighty-eight",
        89: "eighty-nine",
        90: "ninety",
        91: "ninety-one",
        92: "ninety-two",
        93: "ninety-three",
        94: "ninety-four",
        95: "ninety-five",
        96: "ninety-six",
        97: "ninety-seven",
        98: "ninety-eight",
        99: "ninety-nine",
        100: "one hundred"               
    };

    // start game

function startGame () {
    score = 0;
    questionCount = 0;
    timeleft = 60;
    gameStarted  = true;
    clearInterval(timer);

    document.getElementById("score").innerText = score;
    document.getElementById("count").innerText = questionCount;
    document.getElementById("timer").innerText = timeleft;
    document.getElementById("message").innerText = "";
    document.getElementById("answer").value = "";

    // start timer
    timer = setInterval( function () {
        timeleft--;
        document.getElementById("timer").innerText = timeleft;
        if (timeleft <= 0) {
            clearInterval(timer);
            gameStarted =false
            document.getElementById("question").innerText = "Time's up!";

            document.getElementById("message").innerText = 
            "Final Score:" + score + "/" + maxQuestions;
        } 
    }, 1000);
    nextQuestion();
}
// Generate next question
function nextQuestion () {
    if (questionCount >= maxQuestions) {
        clearInterval(timer);
        gameStarted = false;

         document.getElementById("question").innerText = "Game Over!";

         document.getElementById("message").innerText = 
         "Final Score:" + score + "/" + maxQuestions;
         return;
    }

    let level = Number(document.getElementById("level").value);
    // generate random number
    currentNumber = Math.floor(Math.random() * level) + 1;

    // RANDOMLY CHOOSE QUESTION TYPE
    currentType = Math.random() < 0.5
    ? "word"
    : "number";

    if (currentType === "word") {
        // example:
        // deus -> 2
        // cinq -> 5
    document.getElementById("question").innerText =
    englishNumbers[currentNumber];
    document.getElementById("answer").type = "number";
    document.getElementById("answer").placeholder = "enter number";
    }
    else {
         // example:
        // 10 -> dix
        // 7 -> sept
    document.getElementById("question").innerText = currentNumber
    document.getElementById("answer").type = "text";
    document.getElementById("answer").placeholder = "enter english number";
    }

    // display english word
    // document.getElementById("question").innerText = numberTowords(currentNumber);
    // clear anser 
    document.getElementById("answer").value = "";
    //  increase question count
    questionCount++;
    document.getElementById("count").innerText = questionCount;
    // focus count
    document.getElementById("answer").focus();
}

// check answer
function checkAnswer () {
    if (!gameStarted) {
        return;
    }

  let answer = document.getElementById("answer")
  .value
  .trim()
  .toLowerCase();

//   dont accept emty answr
if (answer ==="") {
    return;
}
let correct = false;

// word number
if (currentType === "word"){
    if (Number(answer) === currentNumber){
        correct = true;
    }
}

else{
    let correcword = englishNumbers[currentNumber].toLowerCase();
    if (answer === correcword) {
        correct = true;
    }
}

//   correct answer
  if (correct){
    score++;
    document.getElementById("score").innerText = score;
    document.getElementById("message").innerText = "correct!  ✔ 👍 🎉";
    message.style.color = "green"
    launchFireworks();
    
  } else{
    document.getElementById("message").innerText = 
    "wrong! ❌ 😜 Correct Answer: " + (currentType === "word" ? currentNumber
    : englishNumbers[currentNumber]);
    message.style.color = "red"
  }
        nextQuestion();

} 
// press enter to submit answer
    document.getElementById("answer").addEventListener(
        "keydown",
        function(event) {
            if (event.key ==="Enter") {
                checkAnswer();
            }
        }
    );


