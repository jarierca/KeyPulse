const keys = document.querySelectorAll('.key');
const keyPressed = document.querySelector('.key-pressed-list');
const mouseButtons = document.querySelectorAll('.mousebutton');
const audio = new Audio('sound.mp3');
audio.preload = 'auto';
const toggleSoundButton = document.getElementById("btn-sound");
let soundEnabled = true;
let keyboadDetectionEnabled = true;
let typinTestStarted = false;

const initialTime = 30;
var words = "";
const time = document.getElementById('time');
var currentTime = 0;
const wordsContainer = document.getElementById('words-container');
const typingInput = document.getElementById('typing-input');
var numKeyStrokes = 0;

const results = document.getElementById('results')
const wpm = results.querySelector('#results-wpm')
const keyStrokes = results.querySelector('#results-keystrokes')
const accuracy = results.querySelector('#results-accuracy')
const correctWords = results.querySelector('#results-correct')
const wrongWords = results.querySelector('#results-wrong')

window.addEventListener('load', function() {
  const storedSoundEnabled = localStorage.getItem("soundEnabled");
  soundEnabled = storedSoundEnabled === "true";
  toggleSoundButton.textContent = soundEnabled ? "🔊" : "🔇";
typingTest();

});

window.addEventListener('keydown', function(event) {
  keys.forEach(key => {
    if (event.keyCode == key.dataset.key && keyboadDetectionEnabled) {
      key.classList.add('active');
      key.classList.add("actived");

      if (soundEnabled) {
        audio.currentTime = 0;
        audio.play();     
      }

      setTimeout(function() {
            key.classList.remove("actived");
          }, 100);

      var addNewKey = document.createElement("span");
      addNewKey.title = event.keyCode;
      addNewKey.textContent = `${event.key} (${event.keyCode})`;
      addNewKey.classList.add('key-pressed');
      keyPressed.insertBefore(addNewKey, keyPressed.firstChild);

      event.preventDefault();

    } else if(!keyboadDetectionEnabled && !typinTestStarted){
      initTypingTest();
    }
  });
});

window.addEventListener('keyup', function(event) {
  keys.forEach(key => {
    if (event.keyCode == key.dataset.key && event.keyCode === 91 && keyboadDetectionEnabled) {
      key.classList.add('active');
      key.classList.add("actived");

      if (soundEnabled) {
        audio.currentTime = 0;
        audio.play();     
      }

      setTimeout(function() {
            key.classList.remove("actived");
          }, 100);

      var addNewKey = document.createElement("span");
      addNewKey.title = event.keyCode;
      addNewKey.textContent = `${event.key} (${event.keyCode})`;
      addNewKey.classList.add('key-pressed');
      keyPressed.insertBefore(addNewKey, keyPressed.firstChild);

      event.preventDefault();
    }
  });
});


window.addEventListener('mousedown', function(event) {
  mouseButtons.forEach(button => {
    if (button.getAttribute("data-key") == event.button && keyboadDetectionEnabled) {
      button.classList.add('active');
      button.classList.add('actived');
      
      if (soundEnabled) {
        audio.currentTime = 0;
        audio.play();     
      }

      setTimeout(function() {
            button.classList.remove("actived");
          }, 100);
      
      var mouseButtonName = "Mouse";
      if(event.button == 0){
        mouseButtonName = "Left";
      } else if(event.button == 1){
        mouseButtonName = "Scroll";
      }else if(event.button == 2){
        mouseButtonName = "Right";
      }

      var addNewButton = document.createElement("span");
      addNewButton.title = button.dataset.key; 
      addNewButton.textContent = `${mouseButtonName} Click `;
      addNewButton.classList.add('key-pressed');
      keyPressed.insertBefore(addNewButton, keyPressed.firstChild);
    }
  });
});

function toggleSound() {
  soundEnabled = !soundEnabled;
  
  toggleSoundButton.textContent = soundEnabled ? "🔊" : "🔇";
  
  localStorage.setItem("soundEnabled", soundEnabled);
}

function resetKeys(){
  keys.forEach(key => { key.classList.remove("active")} );
  mouseButtons.forEach(button => { button.classList.remove("active") });
  keyPressed.innerHTML = ""; 
}

function keyboardTest(){
  const kybdContainer = document.querySelector(".keyboard-container");
  const typeContainer = document.querySelector(".type-test-container");

  kybdContainer.style.display = "";
  typeContainer.style.display = "none";

  keyboadDetectionEnabled = true;

  document.getElementById("btn-sound").style.display = "";
  document.getElementById("reset-kbd").style.display = "";
}

function typingTest(){
  const kybdContainer = document.querySelector(".keyboard-container");
  const typeContainer = document.querySelector(".type-test-container");

  kybdContainer.style.display = "none";
  typeContainer.style.display = "block";
 
  keyboadDetectionEnabled = false;

  document.getElementById("btn-sound").style.display = "none";
  document.getElementById("reset-kbd").style.display = "none";
  
  loadTypingTest();
}

function loadTypingTest() {
  typinTestStarted = false;
  
  numKeyStrokes = 0;

  results.display = "none";

  typingInput.value = "";
  typingInput.disable = false;
  typingInput.addEventListener('keyup', checkWord)

  currentTime = initialTime;
  time.textContent = currentTime;

  var language = document.getElementById("typing-test-language").value

  languageWords = language === 'en' ? words_en: words_es ;

  words = languageWords.toSorted(() => Math.random() - 0.5).slice(0, 50);
  wordsContainer.innerHTML = words.map((word, index) => {
      const letters = word.toLowerCase().split('')

      return `<word>
        ${letters
          .map(letter => `<letter>${letter}</letter>`)
          .join('')
        }
      </word>`
  }).join('');
  
  const firstWord = wordsContainer.querySelector('word')
  firstWord.classList.add('current-word')

  firstWord.querySelector('letter').classList.add('current-letter')
}

function initTypingTest() {
  typinTestStarted = true;

  const intervalId = setInterval(() => {
      currentTime--
      time.textContent = currentTime

      if (currentTime === 0) {
        clearInterval(intervalId)
        endTest()
      }
    }, 1000);
}

function checkWord(event) {
  if (event.keyCode === 32 || event.key === ' ') {
    event.preventDefault();
    
    const currentWord = wordsContainer.querySelector('word.current-word');
    const currentLetter = currentWord.querySelector('letter.current-letter');

    const nextWord = currentWord.nextElementSibling;
    const nextLetter = nextWord.querySelector('letter');

    currentWord.classList.remove('current-word');
    currentLetter.classList.remove('current-letter');

    nextWord.classList.add('current-word');
    nextLetter.classList.add('current-letter');

    const classToAdd = typingInput.value === currentWord.textContent.trim() ? 'correct' : 'marked';
    currentWord.classList.add(classToAdd);

    typingInput.value = '';

    return;

  }else {
    numKeyStrokes++;
    const currentWordContainer = wordsContainer.querySelector('word.current-word');
    const currentLetter = currentWordContainer.querySelector('letter.current-letter');

    const currentWord = currentWordContainer.innerText.trim();
    typingInput.maxLength = currentWord.length;

    const allLetters = currentWordContainer.querySelectorAll('letter');

    allLetters.forEach(letter => letter.classList.remove('correct', 'incorrect'));

    typingInput.value.split('').forEach((char, index) => {
      const letter = allLetters[index];
      const letterToCheck = currentWord[index];

      const isCorrect = char === letterToCheck;
      const letterClass = isCorrect ? 'correct' : 'incorrect';
      letter.classList.add(letterClass);
    })

    currentLetter.classList.remove('current-letter', 'is-last');
    const inputLength = typingInput.value.length;
    const nextActiveLetter = allLetters[inputLength];

    if (nextActiveLetter) {
      nextActiveLetter.classList.add('current-letter');
    } else {
      currentLetter.classList.add('current-letter', 'is-last');
    }
  }
}

function endTest(){
  wordsContainer.style.opacity = '0,5';
  typingInput.disabled = true;
  results.style.display = 'flex';

  const numCorrectWords = wordsContainer.querySelectorAll('word.correct').length
  const numWrongWords = wordsContainer.querySelectorAll('word.marked').length
  const correctLetter = wordsContainer.querySelectorAll('letter.correct').length
  const incorrectLetter = wordsContainer.querySelectorAll('letter.incorrect').length
  
  const totalLetters = correctLetter + incorrectLetter

  wpm.textContent = numCorrectWords * 60 / initialTime;
  

  keyStrokes.textContent = numKeyStrokes;

  var correctLetterSpan = document.createElement("span");
  correctLetterSpan.textContent = " ( " + correctLetter;
  correctLetterSpan.classList.add('correct');

  keyStrokes.appendChild(correctLetterSpan);

  var slashLetterSpan = document.createElement("span");
  slashLetterSpan.classList.add('default-color');
  slashLetterSpan.textContent = "/";

  keyStrokes.appendChild(slashLetterSpan);

  var incorrectLetterSpan = document.createElement("span");
  incorrectLetterSpan.textContent = incorrectLetter + " )";
  incorrectLetterSpan.classList.add('incorrect');

  keyStrokes.appendChild(incorrectLetterSpan);


  accuracy.textContent = (totalLetters > 0 ? ((correctLetter / totalLetters) * 100).toFixed(2) : 0) + "%";
  correctWords.textContent = numCorrectWords;
  wrongWords.textContent = numWrongWords;
}

