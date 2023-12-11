const addBtn = document.querySelector(".add__note-button");
const addContainer = document.querySelector(".add__note-container");
const colorBtn = document.querySelectorAll(".add__note-color .color");
const notesContainer = document.querySelector(".added__notes");
const inputBox = document.querySelector(".input__box");
const mainContainer = document.querySelector(".main__container");

// Function to animate the add buttons of notes...
let addClick = 0;
function addNote() {
  if (addClick === 0) {
    addContainer.style.height = "600px";
    addBtn.style.rotate = "135deg";
    addClick = 1;
  } else {
    addContainer.style.height = "80px";
    addBtn.style.rotate = "-0deg";
    addClick = 0;
  }
}

// Function to add color to the notes
function addColor() {
  colorBtn.forEach(function (e) {
    e.addEventListener("click", function () {
      // To refresh the size of the color container...
      addContainer.style.height = "80px";
      addBtn.style.rotate = "-0deg";
      addClick = 0;

      // To get the color of the button...
      const computedStyle = getComputedStyle(e);
      const elementColor = computedStyle.backgroundColor;
      rgbValues = elementColor.match(/\d+/g);
      let alpha = 0.8;
      rgbColor =
        "rgba(" +
        rgbValues[0] +
        ", " +
        rgbValues[1] +
        ", " +
        rgbValues[2] +
        ", " +
        alpha +
        ")";
      createNotePad(rgbColor);
    });
  });
}
addColor();

// Function to change the color of parent note...
function changeParentColor() {
  const inputColor = document.querySelectorAll(".color-section .color");
  inputColor.forEach(function (e) {
    e.addEventListener("click", function () {
      const computedStyle = getComputedStyle(e);
      const elementColor = computedStyle.backgroundColor;
      const parentElement = e.parentNode;
      const grandParent = parentElement.parentNode;
      const parentGrandParent = grandParent.parentNode;
      rgbValues = elementColor.match(/\d+/g);
      let alpha = 0.8;
      rgbColor =
        "rgba(" +
        rgbValues[0] +
        ", " +
        rgbValues[1] +
        ", " +
        rgbValues[2] +
        ", " +
        alpha +
        ")";
      parentGrandParent.style.backgroundColor = rgbColor;
    });
  });
}
changeParentColor();

// Function to remove the notePad...
function deleteInput() {
  const deleteBtn = document.querySelectorAll(".button-section .delete__btn");
  deleteBtn.forEach(function (e) {
    e.addEventListener("click", function () {
      const parent = e.parentNode;
      const grandParent = parent.parentNode;
      console.log(grandParent);

      notesContainer.removeChild(grandParent);
    });
  });
}
deleteInput();

// Function to fullscreen the note...
function fullscreen() {
  const fullscreenBtn = document.querySelectorAll(".button-section .fullscreen__btn");
  fullscreenBtn.forEach(function (e) {
    let numFullScreen = 0;
    e.addEventListener("click", function () {
      if (numFullScreen === 0) {
        const parent = e.parentNode;
        const grandParent = parent.parentNode;
        grandParent.classList.add("fullscreen__mode");
        e.innerHTML = `<i class="ri-fullscreen-exit-line"></i>`
        numFullScreen = 1;
      } else {
        const parent = e.parentNode;
        const grandParent = parent.parentNode;
        grandParent.classList.remove("fullscreen__mode");
        e.innerHTML = `<i class="ri-fullscreen-line">`
        numFullScreen = 0;
      }
    });
  });
}
fullscreen()

// Function to create the new notePad...
function createNotePad(color) {
  let newInputBox = document.createElement("div");
  newInputBox.classList.add("input__box");
  newInputBox.innerHTML = `
  <div class="button-section">
  <button class="delete__btn"><i class="ri-delete-bin-line"></i></button>
              <div class="color-section">
                <div class="color color-1"></div>
                <div class="color color-2"></div>
                <div class="color color-3"></div>
                <div class="color color-4"></div>
                <div class="color color-5"></div>
                <div class="color color-6"></div>
              </div>
              <button class="fullscreen__btn"><i class="ri-fullscreen-line"></i></button>
            </div>
            <textarea spellcheck="false" class="notes__input"></textarea>`;
  notesContainer.append(newInputBox);
  newInputBox.style.backgroundColor = color;
  changeParentColor();
  deleteInput();
  fullscreen();
}

addBtn.addEventListener("click", function () {
  addNote();
});
