function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const modalClose = document.querySelector(".close");
const submitBtn = document.getElementsByClassName("btn-submit");

// booleans used to validate submit by user
let firstName = false;
let lastName = false;
let competitions = false;
let email = false;
let birthdate = false;

let errorMessageTexts = {
  first: "Votre prénom doit comporter deux lettres minimum",
  last: "Votre nom doit comporter deux lettres minimum",
  email: "Veuillez renseigner une adresse e-mail valide",
  birthdate: "Veuillez indiquer une date de naissance valide",
  quantity: "Indiquez un chiffre (ou 0 si vous n'avez jamais participé)",
  location: "Veuillez indiquer une ville",
  checkbox: "Vous devez accepter les conditions d'utilisation"
}

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// close modal event
modalClose.addEventListener("click", closeModal);

// we launch tje modal form, then we add listeners on elements after they appear in the DOM
function launchModal() {
  modalbg.style.display = "block";
  submitBtn[0].addEventListener("click", submit, false);
  initListeners();
}

function initListeners() {

  // 1) FIRST NAME
  document.getElementById("first").addEventListener("focusout", function onFocusOut(event) {
    checkFirstNameValue(event);
    this.removeEventListener("focusout", onFocusOut);
    this.addEventListener("input", checkFirstNameValue);
  });

  // 2) LAST NAME
  document.getElementById("last").addEventListener("focusout", function onFocusOut(event) {
    checkLastNameValue(event);
    this.removeEventListener("focusout", onFocusOut);
    this.addEventListener("input", checkLastNameValue);
  });

  // 3) EMAIL
  document.getElementById("email").addEventListener("focusout", function onFocusOut(event) {
    checkEmailValue(event);
    this.removeEventListener("focusout", onFocusOut);
    this.addEventListener("input", checkEmailValue);
  });

  // 4) BIRTHDATE checkBirthdateValue
  document.getElementById("birthdate").addEventListener("focusout", function onFocusOut(event) {
    checkBirthdateValue(event);
    this.removeEventListener("focusout", onFocusOut);
    this.addEventListener("input", checkBirthdateValue);
  });

  // 5) COMPETITIONS
  document.getElementById("quantity").addEventListener("focusout", function onFocusOut(event) {
    checkCompetitionsValue(event);
    this.removeEventListener("focusout", onFocusOut);
    this.addEventListener("input", checkCompetitionsValue);
  });

  // 6) LOCATIONS
  document.getElementById("location1").setAttribute("required", "");

  // 7) GENERAL TERMS AND CONDITIONS
  document.getElementById("checkbox1").setAttribute("required", "");

}

// 1) FIRST NAME
function checkFirstNameValue(event) {
  if (/[a-zA-Z]{2,}/.test(event.target.value)) {
    firstName = true;
    validFeedback("first", 1, 0);
  } else {
    firstName = false;
    errorFeedback("first", 2, 0);
  }
}

function checkLastNameValue(event) {
  if (/[a-zA-Z]{2,}/.test(event.target.value)) {
    lastName = true;
    validFeedback("last", 3, 1);
  } else {
    lastName = false;
    errorFeedback("last", 4, 1);
  }
}

function checkEmailValue(event) {
  if (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(event.target.value)) {
    email = true;
    validFeedback("email", 5, 2);
  } else {
    email = false;
    errorFeedback("email", 6, 2);
  }
}

function checkBirthdateValue(event) {
  if (/^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/.test(event.target.value)) {
    birthdate = true;
    validFeedback("birthdate", 7, 3);
  } else {
    birthdate = false;
    errorFeedback("birthdate", 8, 3);
  }
}

function checkCompetitionsValue(event) {
  if (/[0-9]{1,}/.test(event.target.value)) {
    competitions = true;
    validFeedback("quantity", 9, 4);
  } else {
    competitions = false;
    errorFeedback("quantity", 10, 4);
  }
}

// closing modal with display none
function closeModal() {
  modalbg.style.display = "none";
}

// if the entries are not correct, user can't submit (see the functions below)
function submit(event) {
  console.log("SUBMIT");
  if (!firstName || !lastName || !competitions || !email || !birthdate) {
    event.preventDefault();
  }
}

// adding Font Awesome script
var FontAwesomeScript = document.createElement("script");
FontAwesomeScript.setAttribute("src", "https://kit.fontawesome.com/f98c9ed341.js");
FontAwesomeScript.setAttribute("type", "text/javascript");
document.head.appendChild(FontAwesomeScript);

// adding new divs for icons and error messages
for (let i = 0; i < 7; i++) {
  if (i == 3) formData[i].innerHTML += "<i class='icon validIcon birthInput fas fa-check-circle'></i><i class='icon errorIcon birthInput fas fa-exclamation-circle'></i><small class='errorMessage'>Error message</small></br>";
  else if (i == 4) formData[i].innerHTML += "<i class='icon validIcon competitionsInput fas fa-check-circle'></i><i class='icon errorIcon competitionsInput fas fa-exclamation-circle'></i><small class='errorMessage'>Error message</small></br>";
  else if (i == 5) formData[i].outerHTML += "<div class='errorMessage'>Error message</div>";
  else if (i == 6) formData[i].innerHTML += "<div class='errorMessage'>Error message</div>";
  else formData[i].innerHTML += "<i class='icon validIcon fas fa-check-circle'></i><i class='icon errorIcon fas fa-exclamation-circle'></i><small class='errorMessage'>Error message</small></br>";
  formData[i].style.position = "relative";
}

//adding some style when it's necessary for a better lisibility////////////////////////////////////////////////////////
document.getElementsByClassName("formData")[3].style.paddingBottom = "7px";
document.getElementsByClassName("formData")[6].style.paddingBottom = "50px";
document.getElementsByClassName("errorMessage")[5].style.marginLeft = "6px";
document.getElementsByClassName("errorMessage")[6].style.marginLeft = "6px";


// adding some style to our new elements
const icons = document.querySelectorAll('.icon');
icons.forEach(icon => {
  icon.style.position = "absolute";
  icon.style.visibility = "hidden";
  // icon.classList.contains("competitionsInput") ? icon.style.top = "68px" : icon.style.top = "52px";
  // icon.classList.contains("birthInput") ? icon.style.right = "47px" : icon.style.right = "15px";
  if (icon.classList.contains("birthInput")) {
    icon.style.right = "47px";
    icon.style.top = "52px";
  } else if (icon.classList.contains("competitionsInput")) {
    icon.style.right = "35px";
    icon.style.top = "67px"
  } else {
    icon.style.right = "15px";
    icon.style.top = "52px";
  }
});

// the valid icon take the color "limegreen"
const validIcons = document.querySelectorAll('.validIcon');
validIcons.forEach(validIcon => {
  validIcon.style.color = "LimeGreen";
});

// the valid icon take the color "orangered"
const errorIcons = document.querySelectorAll('.errorIcon');
errorIcons.forEach(errorIcon => {
  errorIcon.style.color = "OrangeRed";
});

// preparing all the error messages
const errorMessages = document.querySelectorAll('.errorMessage');
errorMessages.forEach(message => {
  message.style.color = "OrangeRed";
  message.style.visibility = "hidden"; /////////////////////////////////////////// FONT
  message.style.fontSize = "medium";
});

// we create a text-control array after they appears in DOM
const inputTexts = document.querySelectorAll('.text-control');
inputTexts.forEach(inputText => {
  inputText.style.border = "4px solid";
  inputText.style.borderColor = "white";
});

// 1) FIRST NAME
// render the borders green and remove the error message
function validFeedback(inputId, iconId, messageId) {
  // green borders
  inputTexts.forEach(inputText => {
    if (inputText.id == inputId) {
      // inputText.style.border = "4px solid";
      inputText.style.borderColor = "limegreen";

      // give visibility to the valid icon
      icons[iconId + 1].style.visibility = "hidden";
      icons[iconId].style.visibility = "visible";
    }
  });
  // remove the error message
  errorMessages[messageId].style.visibility = "hidden";
}

// render the borders red and display an error message
function errorFeedback(inputId, iconId, messageId) {
  // red borders
  inputTexts.forEach(inputText => {
    if (inputText.id == inputId) {
      // inputText.style.border = "4px solid";
      inputText.style.borderColor = "orangered";

      // give visibility to the error icon
      icons[iconId - 1].style.visibility = "hidden";
      icons[iconId].style.visibility = "visible";
    }
  });
  // display the error message
  errorMessages[messageId].textContent = errorMessageTexts[inputId];
  errorMessages[messageId].style.visibility = "visible";
}

//DEBUBG
launchModal();

// errorFeedback("first", 2, 0);
// validFeedback("first", 1, 0);

// errorFeedback("last", 4, 1);
// validFeedback("last", 3, 1);

// errorFeedback("email", 6, 2);
// validFeedback("email", 5, 2);

// errorFeedback("birthdate", 8, 3);
// validFeedback("birthdate", 7, 3);

// errorFeedback("quantity", 10, 4);
// validFeedback("quantity", 9, 4);

// errorFeedback("location", 0, 5);
// validFeedback("location", 0, 5);

// errorFeedback("checkbox", 0, 6);
// validFeedback("checkbox", 0, 6);

let inputValidFeedbacks = {
  first: {inputId:'first', iconId:1, messageId:0},
  last: {inputId:'last', iconId:3, messageId:1},
  email: {inputId:'email', iconId:5, messageId:2},
  birthdate: {inputId:'birthdate', iconId:7, messageId:3},
  quantity: {inputId:'quantity', iconId:9, messageId:4},
  location: {inputId:'location', iconId:0, messageId:5},
  checkbox: {inputId:'checkbox', iconId:0, messageId:6},
};

let inputErrorFeedbacks = {
  first: {inputId:'first', iconId:2, messageId:0, onscreen:false},
  last: {inputId:'last', iconId:4, messageId:1, onscreen:false},
  email: {inputId:'email', iconId:6, messageId:2, onscreen:false},
  birthdate: {inputId:'birthdate', iconId:8, messageId:3, onscreen:false},
  quantity: {inputId:'quantity', iconId:10, messageId:4, onscreen:false},
  location: {inputId:'location', iconId:0, messageId:5, onscreen:false},
  checkbox: {inputId:'checkbox', iconId:0, messageId:6, onscreen:false},
};

testMessage(inputErrorFeedbacks.first)

function testMessage(obj) {
  console.log("Objet reçu : " + obj.name);
}