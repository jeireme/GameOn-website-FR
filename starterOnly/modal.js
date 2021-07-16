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

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// close modal event
modalClose.addEventListener("click", closeModal);

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
  // we add a listener to the submit button after it appears in the DOM
  submitBtn[0].addEventListener("click", submit, false);
}

// closing modal with display:none
function closeModal() {
  modalbg.style.display = "none";
}

// if the entries are not correct, user can't submit (see the functions below)
function submit(event) {
  if (!firstName || !lastName || !competitions) {
    event.preventDefault();
  }
}

// 1) FIRST NAME
document.getElementById("first").addEventListener("input", function (event) {
  if (/[a-zA-Z]{2,}/.test(event.target.value)) {
    firstName = true;
  } else {
    firstName = false;
  }
});

// 2) LAST NAME
document.getElementById("last").addEventListener("input", function (event) {
  if (/[a-zA-Z]{2,}/.test(event.target.value)) {
    lastName = true;
  } else {
    lastName = false;
  }
});

// 3) EMAIL
document.getElementById("email").setAttribute("required", "");

// 4) COMPETITIONS
document.getElementById("quantity").addEventListener("input", function (event) {
  if (/[0-9]{1,}/.test(event.target.value)) {
    competitions = true;
  } else {
    competitions = false;
  }
});

// 5) LOCATIONS
document.getElementById("location1").setAttribute("required", "");

// 6) GENERAL TERMS AND CONDITIONS
document.getElementById("checkbox1").setAttribute("required", "");
