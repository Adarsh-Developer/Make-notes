const addBtn = document.querySelector(".add__note-button");
const addContainer = document.querySelector(".add__note-container");
const colorBtn = document.querySelectorAll(".add__note-color .color");
const notesContainer = document.querySelector(".added__notes");

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
addBtn.addEventListener("click", function () {
  addNote();
});

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
      saveNote();
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
      grandParent.remove();
      saveNote();
    });
  });
}
deleteInput();

// Function to fullscreen the note...
function fullscreen() {
  const fullscreenBtn = document.querySelectorAll(
    ".button-section .fullscreen__btn"
  );
  fullscreenBtn.forEach(function (e) {
    let numFullScreen = 0;
    e.addEventListener("click", function () {
      if (numFullScreen === 0) {
        const parent = e.parentNode;
        const grandParent = parent.parentNode;
        grandParent.classList.add("fullscreen__mode");
        e.innerHTML = `<i class="ri-fullscreen-exit-line"></i>`;
        numFullScreen = 1;
      } else {
        const parent = e.parentNode;
        const grandParent = parent.parentNode;
        grandParent.classList.remove("fullscreen__mode");
        e.innerHTML = `<i class="ri-fullscreen-line">`;
        numFullScreen = 0;
      }
    });
  });
}
fullscreen();

// Function to create the new notePad...
function createNotePad(color, text = "") {
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
            <textarea spellcheck="false" class="notes__input">${text}</textarea>`;
  notesContainer.append(newInputBox);
  newInputBox.style.backgroundColor = color;

  notesContainer.querySelectorAll(".notes__input").forEach(function (e) {
    e.addEventListener("input", function () {
      saveNote();
    });
  });

  changeParentColor();
  deleteInput();
  fullscreen();
}

// Functions to save the data of textarea...
function saveNote() {
  // to save text to the local storage...
  const textNotes = document.querySelectorAll(".added__notes textarea");
  const data = [];
  textNotes.forEach((text) => {
    data.push(text.value);
  });
  localStorage.setItem("textNotes", JSON.stringify(data));

  /***********************************************************************/

  // to save bg color to the local storage...
  const inputBox = document.querySelectorAll(".input__box");
  const bgData = [];
  inputBox.forEach(function (e) {
    const computedStyle = getComputedStyle(e);
    const bgColor = computedStyle.backgroundColor;
    bgData.push(bgColor);
  });
  localStorage.setItem("backgroundColor", JSON.stringify(bgData));
}

(function () {
  const lsTextNotes = JSON.parse(localStorage.getItem("textNotes"));
  const lsBgColor = JSON.parse(localStorage.getItem("backgroundColor"));

  // Check if both lsTextNotes and lsBgColor are defined and have the same length
  for (let i = 0; i < lsTextNotes.length; i++) {
    if(lsTextNotes[i] !== ''){
      createNotePad(lsBgColor[i], lsTextNotes[i]);
    }
  }
})();