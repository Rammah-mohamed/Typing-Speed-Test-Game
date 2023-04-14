const typingTag = document.querySelector(".typing-box p"),
mistakeTag = document.querySelector(".mistakes span"),
timerTag = document.querySelector(".timer span b"),
wpmTag = document.querySelector(".wpm span"),
cpmTag = document.querySelector(".cpm span"),
btn = document.querySelector(".details button")
inputField = document.querySelector(".input-field");

let timer,
maxTime = 60,
timeLeft = maxTime;

let charIndex = mistakes = isTyping = 0;

function randomParagraph() {
  // getting a random paragraph
  let randomIndex = Math.floor(Math.random() * paragraphs.length)
  typingTag.innerHTML = "";
  
  paragraphs[randomIndex].split("").map(span => {
    let spanTag = `<span>${span}</span>`
    typingTag.innerHTML += spanTag
  })

  typingTag.querySelectorAll("span")[0].classList.add("active")
  document.addEventListener("keydown", () => inputField.focus())
  typingTag.addEventListener("click", () => inputField.focus())
}

randomParagraph();

inputField.addEventListener("input", initTyping);
btn.addEventListener("click", resetGame)

function initTyping() {
  const chars = typingTag.querySelectorAll("span");
  let typedChar = inputField.value.split("")[charIndex];

  // check if the paragraph is end or the time is end
  if (charIndex < chars.length - 1 && timeLeft > 0) {
    if (!isTyping) {
      timer = setInterval(initTimer, 1000);
      isTyping = true;
    }
    
    // check if pressing backspace to reset the characters
    if (typedChar == null) {
      charIndex--;

      // check if the character contains incorrect class to decrease the misktakes
      if(chars[charIndex].classList.contains("incorrect")) {
        mistakes--;
      }

      chars[charIndex].classList.remove("correct", "incorrect")
    }else {
      // check if the typed character match the current character or not
      if (chars[charIndex].innerText === typedChar) {
        chars[charIndex].classList.add("correct")
      } else {
        mistakes++;
        chars[charIndex].classList.add("incorrect")
    
      }
      charIndex++;
    }
    // add active class to the current character
    chars.forEach(span => span.classList.remove("active"))
    chars[charIndex].classList.add("active")

    // claculate the mistakes, cpm and wpm
    mistakeTag.innerText = mistakes;
    cpmTag.innerText = charIndex - mistakes;
    let wpm = Math.round((((charIndex - mistakes) / 5) / (maxTime - timeLeft)) * 60);
    // check if the wpm value is less than zero or null or infinity
    wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
    wpmTag.innerText = wpm;
  } else {
    // reset the input and time
    inputField.value = "";
    clearInterval(timer)
  }
}

function initTimer() {
  // count down until timer reach zero 
  if (timeLeft > 0) {
    timeLeft--;
    timerTag.innerText = timeLeft
  } else {
    clearInterval(timer)
  }
}

function resetGame() {
  // reset all value to start again
  randomParagraph()
  inputField.value = "";
  clearInterval(timer)

  timeLeft = maxTime;
  charIndex = mistakes = isTyping = 0;

  cpmTag.innerText = charIndex - mistakes;
  timerTag.innerText = timeLeft
  mistakeTag.innerText = 0;
  wpmTag.innerText = 0;
}