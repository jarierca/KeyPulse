
const keys = document.querySelectorAll('.key');
const keyPressed = document.querySelector('.key-pressed-list');
const mouseButtons = document.querySelectorAll('.mousebutton');
const audio = new Audio('sound.mp3');
audio.preload = 'auto';
const toggleSoundButton = document.getElementById("btn-sound");
let soundEnabled = true;
let keyboadDetectionEnabled = true;

const initialTime = 30;
const words = """En un lugar de la Mancha, de cuyo nombre no quiero acordarme, no ha mucho tiempo que vivía un hidalgo de los de lanza en astillero, adarga antigua, rocín flaco y galgo corredor. Una olla de algo más vaca que carnero, salpicón las más noches, duelos y quebrantos los sábados6, lantejas los viernes, algún palomino de añadidura los domingos, consumían las tres partes de su hacienda """;

const time = document.getElementById('.time');
const wordsContainer = document.querySelector('words-container');
const typingInput = document.querySelector('typing-input');
const $game = document.querySelector('#game')
const $results = document.querySelector('#results')
const $wpm = $results.querySelector('#results-wpm')
const $accuracy = $results.querySelector('#results-accuracy')
const $button = document.querySelector('#reload-button')



window.addEventListener('load', function() {
  const storedSoundEnabled = localStorage.getItem("soundEnabled");
  soundEnabled = storedSoundEnabled === "true";
  toggleSoundButton.textContent = soundEnabled ? "🔊" : "🔇";
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

      event.preventDefault();
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
}

function typingTest(){
  const kybdContainer = document.querySelector(".keyboard-container");
  const typeContainer = document.querySelector(".type-test-container");

  kybdContainer.style.display = "none";
  typeContainer.style.display = "block";
 
  keyboadDetectionEnabled = false;
  
  
}

function play() {





}

