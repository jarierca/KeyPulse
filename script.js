
const keys = document.querySelectorAll('.key');
const keyPressed = document.querySelector('.key-pressed-list');
const mouseButtons = document.querySelectorAll('.mousebutton');

window.addEventListener('keydown', function(event) {
  keys.forEach(key => {
    if (event.keyCode == key.dataset.key) {
      key.classList.add('active');

      var addNewKey = document.createElement("span");
      addNewKey.title = event.keyCode;
      addNewKey.textContent = `${event.key} (${event.keyCode})`;
      addNewKey.classList.add('key-pressed');
      keyPressed.insertBefore(addNewKey, keyPressed.firstChild);

    }
    event.preventDefault();
  });
});

window.addEventListener('mousedown', function(event) {
  mouseButtons.forEach(button => {
    if (button.getAttribute("data-key") == event.button) {
      button.classList.add('active');
      
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

function keyboardTest(){

}

function typingTest(){

}
