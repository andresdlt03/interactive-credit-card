// Selectors

const form = document.querySelector(".form");
const cardholderName = document.querySelector("#cardholder-name");
const cardholderNameGroup = cardholderName.parentNode;
const cardNumber = document.querySelector("#card-number");
const cardNumberGroup = cardNumber.parentNode;
const expDateMonth = document.querySelector("#exp-date-mm");
const expDateYear = document.querySelector("#exp-date-yy");
const expDateGroup = expDateMonth.parentNode.parentNode;
const cvv = document.querySelector("#cvv");
const cvvGroup = cvv.parentNode;
const confirmButton = document.querySelector(".confirm-button");

form.addEventListener("submit", (event) => {
  event.preventDefault();
});

// Cardholder Name Validation
cardholderName.addEventListener("blur", ({target: {value}}) => validateCardholderName(value));

// Card Number Validation
cardNumber.addEventListener("blur", ({target: {value}}) => validateCardNumber(value));

// Exp. Date Validation
expDateMonth.addEventListener("blur", ({target: {value}}) => validateExpDateMonth(value));
expDateYear.addEventListener("blur", ({target: {value}}) => validateExpDateYear(value));

// CVV Validation
cvv.addEventListener("blur", ({target: {value}}) => validateCvv(value));

// Validation functions
function validateCardholderName(value) {
  let valid = true;
  let errorMessage = "";
  if(value.length < 10) {
    errorMessage += "Name must be 10 letters or more<br>";
    valid = false;
  }
  if(/[0-9]/.test(value)){
    errorMessage += "Name must only be made up of letters<br>";
    valid = false;
  }
  styleField(cardholderNameGroup, cardholderName, errorMessage);
  return valid;
}

function validateCardNumber(value) {
  let valid = true;
  let errorMessage = "";
  if(value.split(" ").join("").length != 16 || /[^0-9]/.test(value.split(" ").join(""))) {
    errorMessage += "Card number must be 16 numbers";
    valid = false;
  }
  styleField(cardNumberGroup, cardNumber, errorMessage);
  return valid;
}

function validateExpDateMonth(value) {
  let valid = true;
  let errorMessage = "";
  if(value.length == 0 || /[^0-9]/.test(value) || value < 1 || value > 12) {
    errorMessage += "MM must be a number between 1 and 12";
    valid = false;
  }
  styleField(expDateGroup, expDateMonth, errorMessage);
  return valid;
}

function validateExpDateYear(value) {
  let valid = true;
  let errorMessage = "";
  if(value.length == 0 || /[^0-9]/.test(value) || value < 1 || value > 23) {
    errorMessage += "YY must be a number greater than 0 and less than 23 (current year)";
    valid = false;
  }
  styleField(expDateGroup, expDateYear, errorMessage);
  return valid;
}

function validateCvv(value) {
  let valid = true;
  let errorMessage = "";
  if(value.length < 3 || /[^0-9]/.test(value)) {
    errorMessage += "CVV must be 3 numbers";
    valid = false;
  }
  styleField(cvvGroup, cvv, errorMessage);
  return valid;
}

function validateForm() {
  return (
    validateCardholderName(cardholderName.value) &&
    validateCardNumber(cardNumber.value) &&
    validateExpDateMonth(expDateMonth.value) &&
    validateExpDateYear(expDateYear.value) &&
    validateCvv(cvv.value)
  )
}

function styleField(group, input, errorMessage) {
  // remove error message if exists
  if(group.childElementCount > 2) {
    group.removeChild(group.lastChild);
  }

  // add error message (if not exists yet) and change border color of input
  if (errorMessage.length != 0 && group.childElementCount < 3) {
    let div = document.createElement("div");
    let el = document.createElement("p");
    el.innerHTML = errorMessage;
    input.style.border = "1px solid #FF6663";
    el.classList.add("invalid-message");
    div.appendChild(el);
    group.appendChild(div);
    return
  }
  
  // change border color to default
  input.style.border = "1px solid #D9D9D9";
}