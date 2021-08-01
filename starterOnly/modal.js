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
const formDatas = document.querySelectorAll(".formData");
const modalClose = document.querySelector(".close");
const submitBtnArray = document.getElementsByClassName("btn-submit");
const modalBody = document.getElementsByClassName("modal-body")[0];
const form = document.getElementsByTagName("form")[0];

// moodal body height
modalBody.style.height = "960px";

// some regex we use in the project
let nameReg = new RegExp(/[a-zA-Z]{2,}/);
let emailReg = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
let birthdateReg = new RegExp(/^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/);
let competitionsReg = new RegExp(/[0-9]{1,}/);

// settings of all the different inputs
let settings = {
  first: {id:0, name:'first', iconErrorId:2, iconValidId:1, message:"Votre prénom doit comporter deux lettres minimum", isSubmitReady:false, displayAfterSubmit:true},
  last: {id:1, name:'last', iconErrorId:4, iconValidId:3, message:"Votre nom doit comporter deux lettres minimum", isSubmitReady:false, displayAfterSubmit:true},
  email: {id:2, name:'email', iconErrorId:6, iconValidId:5, message:"Veuillez renseigner une adresse e-mail valide", isSubmitReady:false, displayAfterSubmit:true},
  birthdate: {id:3, name:'birthdate', iconErrorId:8, iconValidId:7, message:"Veuillez indiquer une date de naissance valide", isSubmitReady:false, displayAfterSubmit:true},
  quantity: {id:4, name:'quantity', iconErrorId:10, iconValidId:9, message:"Indiquez un chiffre (ou 0 si vous n'avez jamais participé)", isSubmitReady:false, displayAfterSubmit:true},
  location: {id:5, name:'location', iconErrorId:0, iconValidId:0, message:"Veuillez indiquer une ville", isSubmitReady:false, displayAfterSubmit:true},
  checkbox: {id:6, name:'checkbox', iconErrorId:0, iconValidId:0, message:"Vous devez accepter les conditions d'utilisation", isSubmitReady:true, displayAfterSubmit:false},
};

// adding Font Awesome script
var FontAwesomeScript = document.createElement("script");
FontAwesomeScript.setAttribute("src", "https://kit.fontawesome.com/f98c9ed341.js");
FontAwesomeScript.setAttribute("type", "text/javascript");
document.head.appendChild(FontAwesomeScript);

// new html elements: icons and error messages
formDatas.forEach(formData => {
  if (formData.querySelector("#birthdate") !== null) {
    formData.innerHTML += "<i class='icon validIcon birthInput fas fa-check-circle'></i><i class='icon errorIcon birthInput fas fa-exclamation-circle'></i><small class='errorMessage'>Error message</small></br>";
    formData.style.paddingBottom = "7px";
  }
  else if (formData.querySelector("#quantity") !== null) formData.innerHTML += "<i class='icon validIcon competitionsInput fas fa-check-circle'></i><i class='icon errorIcon competitionsInput fas fa-exclamation-circle'></i><small class='errorMessage'>Error message</small></br>";
  else if (formData.querySelector("#location1") !== null) formData.outerHTML += "<div class='errorMessage'>Error message</div>";
  else if (formData.querySelector("#checkbox1") !== null) {
    formData.innerHTML += "<div class='errorMessage'>Error message</div>";
    formData.style.paddingBottom = "30px";
  }
  else formData.innerHTML += "<i class='icon validIcon fas fa-check-circle'></i><i class='icon errorIcon fas fa-exclamation-circle'></i><small class='errorMessage'>Error message</small></br>";
  formData.style.position = "relative";
});

// adding some style
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
  (icon.classList.contains("validIcon")) ? icon.style.color = "LimeGreen" :  icon.style.color = "OrangeRed";
});

// preparing all the error messages
const errorMessages = document.querySelectorAll('.errorMessage');
errorMessages.forEach(text => {
  text.style.color = "OrangeRed";
  text.style.visibility = "hidden";
  (window.matchMedia("(max-width: 600px)").matches) ? text.style.fontSize = "small" : text.style.fontSize = "medium";
});

// we create a text-control array after they appears in DOM
const formInputsText = document.querySelectorAll('.text-control');
formInputsText.forEach(formInput => {
  formInput.style.border = "4px solid";
  formInput.style.borderColor = "white";
});

// initialization of the listeners
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
      displayFeedback(settings.location, this.validity.valid);
    })
  });

  // general terms and conditions
  document.getElementById("checkbox1").setAttribute("required", "");
  document.getElementById("checkbox1").addEventListener("change", function (event) {
    displayFeedback(settings.checkbox, this.validity.valid);
  });
}

// test if first name is valid
function checkFirstNameValue(event) {
  displayFeedback(settings.first, nameReg.test(event.target.value));
}

// test if last name is valid
function checkLastNameValue(event) {
  displayFeedback(settings.last, nameReg.test(event.target.value));
}

// test if email is valid
function checkEmailValue(event) {
  displayFeedback(settings.email, emailReg.test(event.target.value));
}

// test if birthdate is valid
function checkBirthdateValue(event) {
  displayFeedback(settings.birthdate, birthdateReg.test(event.target.value));
}

// test if number of competitions is valid
function checkCompetitionsValue(event) {
  displayFeedback(settings.quantity, competitionsReg.test(event.target.value));
}

// display a valid or an error feedback
function displayFeedback(input, isValidated) {

  // valid feedback
  if (isValidated) {
    formInputsText.forEach(formInput => {
      if (formInput.id == input.name) {
        formInput.style.borderColor = "limegreen";
        icons[input.iconErrorId].style.visibility = "hidden";
        icons[input.iconValidId].style.visibility = "visible";
      }
    });
    errorMessages[input.id].style.visibility = "hidden";
    input.isSubmitReady = true;
  }

  // error feedback
  else if (!isValidated) {
    formInputsText.forEach(formInput => {
      if (formInput.id == input.name) {
        formInput.style.borderColor = "orangered";
        icons[input.iconValidId].style.visibility = "hidden";
        icons[input.iconErrorId].style.visibility = "visible";
      }
    });
    errorMessages[input.id].textContent = input.message;
    errorMessages[input.id].style.visibility = "visible";
    input.isSubmitReady = false;
  }
  input.displayAfterSubmit = false;
}

// launch modal
modalBtn.forEach((btn) => btn.addEventListener("click", function(event) {
  modalbg.style.display = "block";
  for (let submitBtn of submitBtnArray) submitBtn.addEventListener("click", submit, false);
  initListeners();
}));

// close modal
modalClose.addEventListener("click", function(event){
  modalbg.style.display = "none";
});

// return true if all the form is complete
function isSubmitReady() {
  for (let i in settings) {
    if (settings[i].isSubmitReady == false) return false;
  }
  return true;
}

// if entries are not correct, user can't submit
function submit(event) {
  if (!isSubmitReady()) {
    for (let i in settings) {
      if (settings[i].displayAfterSubmit) displayFeedback(settings[i], false);
    }
    resetInputListeners();
  }
  else onSubmitMessage();
  event.preventDefault();
}

// the focusOut listeners are replacing by input listeners, they are more reactive and more helpful for an user who needs help
function resetInputListeners() {
  document.getElementById("first").addEventListener("input", checkFirstNameValue);
  document.getElementById("last").addEventListener("input", checkLastNameValue);
  document.getElementById("email").addEventListener("input", checkEmailValue);
  document.getElementById("birthdate").addEventListener("input", checkBirthdateValue);
}

// after a successful submit, a success message appears 
function onSubmitMessage() {
  modalBody.style.display = "flex";
  modalBody.style.justifyContent = "center";
  modalBody.style.alignItems = "center";
  modalBody.style.textAlign = "center";
  form.innerHTML = '<br><br><h1>Merci !</h1><br><p>Votre réservation a bien été reçue.</p><br><br><i class="far fa-smile-wink fa-3x"></i>';
}