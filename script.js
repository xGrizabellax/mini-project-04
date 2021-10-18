var wordBank = ["apple", "orange", "banana", "mango", "avocado", "melon", "strawberry", "coconut", "pineapple", "grape", "photosynthesis"];
var startBtn = document.querySelector(".start-button");
var resetBtn = document.querySelector(".reset-button");
var guessWord = document.querySelector(".large-font-word-blanks");
var chosenWord = "";
var timeLeft = document.querySelector(".large-font-timer-count");
var win = document.querySelector(".win");
var lose = document.querySelector(".lose");
win.value = 0
lose.value = 0
var timeEl = document.querySelector(".large-font-timer-count")
var secondsLeft = 10
var background = document.querySelector("body")
var pastWin = 0
var pastLose = 0



getScore()


function getScore () {
    pastWin = localStorage.getItem("win")
    pastLose = localStorage.getItem("lose")
    win.innerHTML = pastWin;
    lose.innerHTML = pastLose;
}

function getRandomChar(max) {
    return Math.floor(Math.random() * max)
}

function replaceWord(string) {
    for(var i =0; i < string.length; i++) {
        blankWord += "_";
    }
    return blankWord
}

function replaceAt(string, index, replacement) {
    return string.substr(0, index) + replacement + string.substr(index + replacement.length);
}

function countDown() {
    var timerInterval = setInterval(function() {
        secondsLeft--;
        timeEl.textContent = secondsLeft;

        if (secondsLeft === 0 || secondsLeft < 0) {
            chosenWord = ""
            clearInterval(timerInterval)
            secondsLeft = 10
            timeEl.textContent = ":("
            background.setAttribute("style", "background-color: red");
            youLose()
            localStorage.setItem("lose", lose.value);
        }
        else if (blankWord === chosenWord) {
            clearInterval(timerInterval)
            secondsLeft = 10
            timeEl.textContent = ":)"
            background.setAttribute("style", "background-color: green");
            youWin()
            localStorage.setItem("win", win.value);
        }
    }, 1000)
    return
}

function youWin(event) {
    chosenWord = ""
    alert("YOU WIN!!!")
    win.value++
    win.innerHTML = win.value
    return;
}

function youLose(event) {
    alert("You have lost this round...")
    lose.value++;
    lose.innerHTML = lose.value
    return
}

startBtn.addEventListener("click", function(event) {
    event.preventDefault()
    background.setAttribute("style", "background-color: rgb(250, 247, 100)")
    blankWord = "";
    chosenWord = wordBank[getRandomChar(wordBank.length)];
    guessWord.innerHTML = replaceWord(chosenWord);


    document.addEventListener("keydown", function(event) {
        event.preventDefault()
        var guessLetter = event.key.toLowerCase();
        if (chosenWord.includes(guessLetter)) {
            for(var i = 0; i < chosenWord.length; i++)
            if(chosenWord.charAt(i) === guessLetter){
                console.log(guessLetter);
                blankWord = replaceAt(blankWord, i, guessLetter);
                guessWord.innerHTML = blankWord  ;
            }
        }
        else {
            guessWord.innerHTML = "XXXXXX";
        }
    });
    document.addEventListener("keyup", function() {
        guessWord.innerHTML = blankWord;
    })
if (secondsLeft === 10) {
    countDown();
}

});

resetBtn.addEventListener("click", function(event){
    event.preventDefault;
    win.value = 0
    lose.value = 0
    win.innerHTML = win.value
    lose.innerHTML = lose.value
    localStorage.setItem("win", 0);
    localStorage.setItem("lose", 0);
});


// we'll pick a random word from the word bank
// length of word displayed in _
// everytime user keys down a letter it is checked against the letters in hidden word
// if the word contains a key that is pressed then it is changed to the letter
// when all the letters are revealed, screen turns green and you win
// win is logged into local storage
// if timer equals 0 then you lose and loss is logged into local storage



