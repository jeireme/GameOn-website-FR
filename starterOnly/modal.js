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

// booleans used to validate submit
let firstName = false;
let lastName = false;
let competitions = false;
let email = false;
let birthdate = false;
let locations = false;
let conditions = true;

// object with all the error messages
let errorMessageTexts = {
  first: "Votre prénom doit comporter deux lettres minimum",
  last: "Votre nom doit comporter deux lettres minimum",
  email: "Veuillez renseigner une adresse e-mail valide",
  birthdate: "Veuillez indiquer une date de naissance valide",
  quantity: "Indiquez un chiffre (ou 0 si vous n'avez jamais participé)",
  location: "Veuillez indiquer une ville",
  checkbox: "Vous devez accepter les conditions d'utilisation"
}

// object with all the valid feedback parameters
let inputValidFeedbacks = {
  first: {id:0, inputId:'first', iconId:1, messageId:0},
  last: {id:1, inputId:'last', iconId:3, messageId:1},
  email: {id:2, inputId:'email', iconId:5, messageId:2},
  birthdate: {id:3, inputId:'birthdate', iconId:7, messageId:3},
  quantity: {id:4, inputId:'quantity', iconId:9, messageId:4},
  location: {id:5, inputId:'location', iconId:0, messageId:5},
  checkbox: {id:6, inputId:'checkbox', iconId:0, messageId:6},
};

// object with all the error feedback parameters
let inputErrorFeedbacks = {
  first: {inputId:'first', iconId:2, messageId:0, displayAfterSubmit:true},
  last: {inputId:'last', iconId:4, messageId:1, displayAfterSubmit:true},
  email: {inputId:'email', iconId:6, messageId:2, displayAfterSubmit:true},
  birthdate: {inputId:'birthdate', iconId:8, messageId:3, displayAfterSubmit:true},
  quantity: {inputId:'quantity', iconId:10, messageId:4, displayAfterSubmit:true},
  location: {inputId:'location', iconId:0, messageId:5, displayAfterSubmit:true},
  checkbox: {inputId:'checkbox', iconId:0, messageId:6, displayAfterSubmit:false},
};

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

//adding some style when it's necessary for a better lisibility
document.getElementsByClassName("formData")[3].style.paddingBottom = "7px";
document.getElementsByClassName("formData")[6].style.paddingBottom = "30px";
document.getElementsByClassName("errorMessage")[5].style.marginLeft = "6px";
document.getElementsByClassName("errorMessage")[6].style.marginLeft = "6px";
document.getElementsByClassName("modal-body")[0].style.height = "960px";

// adding some style to our new elements
const icons = document.querySelectorAll('.icon');
icons.forEach(icon => {
  icon.style.position = "absolute";
  icon.style.visibility = "hidden";
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
  message.style.visibility = "hidden";
  message.style.fontSize = "medium";
});

// we create a text-control array after they appears in DOM
const inputTexts = document.querySelectorAll('.text-control');
inputTexts.forEach(inputText => {
  inputText.style.border = "4px solid";
  inputText.style.borderColor = "white";
});

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// close modal event
modalClose.addEventListener("click", closeModal);

// we launch the modal form, then we add listeners on elements after they appear in the DOM
function launchModal() {
  modalbg.style.display = "block";
  submitBtn[0].addEventListener("click", submit, false);
  initListeners();
}

// closing modal with display none
function closeModal() {
  modalbg.style.display = "none";
}

// ! We init here the listeners for all the inputs ! \\
function initListeners() {

  // first name
  document.getElementById("first").addEventListener("focusout", function onFocusOut(event) {
    checkFirstNameValue(event);
    this.removeEventListener("focusout", onFocusOut);
    this.addEventListener("input", checkFirstNameValue);
  });

  // last name
  document.getElementById("last").addEventListener("focusout", function onFocusOut(event) {
    checkLastNameValue(event);
    this.removeEventListener("focusout", onFocusOut);
    this.addEventListener("input", checkLastNameValue);
  });

  // email
  document.getElementById("email").addEventListener("focusout", function onFocusOut(event) {
    checkEmailValue(event);
    this.removeEventListener("focusout", onFocusOut);
    this.addEventListener("input", checkEmailValue);
  });

  // birthdate
  document.getElementById("birthdate").addEventListener("focusout", function onFocusOut(event) {
    checkBirthdateValue(event);
    this.removeEventListener("focusout", onFocusOut);
    this.addEventListener("input", checkBirthdateValue);
  });

  // competitions
  document.getElementById("quantity").addEventListener("change", function onFocusOut(event) {
    checkCompetitionsValue(event);
    this.removeEventListener("focusout", onFocusOut);
    this.addEventListener("input", checkCompetitionsValue);
  });

  // location
  document.getElementById("location1").setAttribute("required", "");
  const locationInputs = document.querySelectorAll('input[type=radio]');
  locationInputs.forEach(locationInput => {
    locationInput.addEventListener("change", function (event) {
      if (this.validity.valid == true) {
        locations = true;
        validFeedback(inputValidFeedbacks.location);
      } else {
        locations = false;
        errorFeedback(inputErrorFeedbacks.location);
      }
    })
  });

  // general terms and conditions
  document.getElementById("checkbox1").setAttribute("required", "");
  document.getElementById("checkbox1").addEventListener("change", function (event) {
    if (this.validity.valid == true) {
      conditions = true;
      validFeedback(inputValidFeedbacks.checkbox);
    } else {
      conditions = false;
      errorFeedback(inputErrorFeedbacks.checkbox);
    }
  });
}

// test if first name is valid
function checkFirstNameValue(event) {
  if (/[a-zA-Z]{2,}/.test(event.target.value)) {
    firstName = true;
    validFeedback(inputValidFeedbacks.first);
  } else {
    firstName = false;
    errorFeedback(inputErrorFeedbacks.first);
  }
}

// test if last name is valid
function checkLastNameValue(event) {
  if (/[a-zA-Z]{2,}/.test(event.target.value)) {
    lastName = true;
    validFeedback(inputValidFeedbacks.last);
  } else {
    lastName = false;
    errorFeedback(inputErrorFeedbacks.last);
  }
}

// test if email is valid
function checkEmailValue(event) {
  if (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(event.target.value)) {
    email = true;
    validFeedback(inputValidFeedbacks.email);
  } else {
    email = false;
    errorFeedback(inputErrorFeedbacks.email);
  }
}

// test if birthdate is valid
function checkBirthdateValue(event) {
  if (/^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/.test(event.target.value)) {
    birthdate = true;
    validFeedback(inputValidFeedbacks.birthdate);
  } else {
    birthdate = false;
    errorFeedback(inputErrorFeedbacks.birthdate);
  }
}

// test if number of competitions is valid
function checkCompetitionsValue(event) {
  if (/[0-9]{1,}/.test(event.target.value)) {
    competitions = true;
    validFeedback(inputValidFeedbacks.quantity);
  } else {
    competitions = false;
    errorFeedback(inputErrorFeedbacks.quantity);
  }
}

// render the borders green, display the valid icon and remove the error message
function validFeedback(feedback) {
  inputTexts.forEach(inputText => {
    if (inputText.id == feedback.inputId) {
      inputText.style.borderColor = "limegreen";
      icons[feedback.iconId + 1].style.visibility = "hidden";
      icons[feedback.iconId].style.visibility = "visible";
    }
  });
  errorMessages[feedback.messageId].style.visibility = "hidden";
  inputErrorFeedbacks[Object.keys(inputErrorFeedbacks)[feedback.id]].displayAfterSubmit = false;
}

// render the borders red, display the error icon and the error message
function errorFeedback(feedback) {
  inputTexts.forEach(inputText => {
    if (inputText.id == feedback.inputId) {
      inputText.style.borderColor = "orangered";
      icons[feedback.iconId - 1].style.visibility = "hidden";
      icons[feedback.iconId].style.visibility = "visible";
    }
  });
  errorMessages[feedback.messageId].textContent = errorMessageTexts[feedback.inputId];
  errorMessages[feedback.messageId].style.visibility = "visible";
  feedback.displayAfterSubmit = false;
}

// if entries are not correct, user can't submit
function submit(event) {
  if (!firstName || !lastName || !competitions || !email || !birthdate || !locations || !conditions) {
    for (let input in inputErrorFeedbacks) {
      if (inputErrorFeedbacks[input].displayAfterSubmit) {
        errorFeedback(inputErrorFeedbacks[input]);
      }
    }
    resetInputListeners();
    event.preventDefault();
  }
}

// the focusOut listeners are replacing by input listeners
// they are more reactive and helpful when user needs help
function resetInputListeners() {
  document.getElementById("first").addEventListener("input", checkFirstNameValue);
  document.getElementById("last").addEventListener("input", checkLastNameValue);
  document.getElementById("email").addEventListener("input", checkEmailValue);
  document.getElementById("birthdate").addEventListener("input", checkBirthdateValue);
}