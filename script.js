/**
 * SELECTORS
 */

const formContainer = document.querySelector(".form__container")
const form = document.querySelector(".form");
// Cardholder Name
const cardCardholderName = document.querySelector(".card__cardholder-name");
const cardholderName = document.querySelector("#cardholder-name");
const cardholderNameGroup = cardholderName.parentNode;
// Card Number
const cardCardNumber = document.querySelector(".card__card-number");
const cardCardNumberHide = document.querySelector(".card__card-number-hide");
const cardNumber = document.querySelector("#card-number");
const cardNumberGroup = cardNumber.parentNode;
// Exp Date
const cardExpDateMonth = document.querySelector(".card__exp-date-mm");
const expDateMonth = document.querySelector("#exp-date-mm");
const cardExpDateYear = document.querySelector(".card__exp-date-yy");
const expDateYear = document.querySelector("#exp-date-yy");
const expDateGroup = expDateMonth.parentNode.parentNode;
// Card Cvv
const cardCvv = document.querySelector(".card__cvv");
const cvv = document.querySelector("#cvv");
const cvvGroup = cvv.parentNode;
// Confirm Button
const confirmButton = document.querySelector(".confirm-button");
// Help button
const helpContainer = document.querySelector(".help__container");
const helpMessage = document.querySelector(".help__message")
const helpButton = document.querySelector(".help__button");

const INPUTS = [
  cardholderName,
  cardNumber,
  expDateMonth,
  expDateYear,
  cvv
];

const CARD_VALUES = {
  cardholderName: cardCardholderName,
  cardNumber: cardCardNumber,
  cardNumberHide: cardCardNumberHide,
  expDateMonth: cardExpDateMonth,
  expDateYear: cardExpDateYear,
  cvv: cardCvv
};

/**
 * FORM VALIDATION
 */

// Cardholder Name
cardholderName.addEventListener("blur", ({target: {value}}) => validateCardholderName(value));

// Card Number
cardNumber.addEventListener("blur", ({target: {value}}) => validateCardNumber(value));

// Exp. Date
expDateMonth.addEventListener("blur", ({target: {value}}) => validateExpDateMonth(value));
expDateYear.addEventListener("blur", ({target: {value}}) => validateExpDateYear(value));

// CVV
cvv.addEventListener("blur", ({target: {value}}) => validateCvv(value));

// Form
form.addEventListener("submit", (event) => {
  event.preventDefault();
  if(validateForm()) {
    resetForm();
    loadSuccessMessage();
  } else {
    confirmButton.classList.add("shake");
    setTimeout(() => confirmButton.classList.remove("shake"), 750)
  }
});

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
  if(value.split(" ").join("").length != 16 || /[^0-9\s]/.test(value)) {
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
  if(value.length == 0 || /[^0-9]/.test(value) || value < 23 || value > 27) {
    errorMessage += "YY must be a number greater than 23 and less than 27 (2023-2026)";
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

/**
 * SUCCESS MESSAGE
 */

const success = document.createElement("div");
success.classList.add("success__container")
const checkIcon = document.createElement("div");
checkIcon.classList.add("success__icon");
const checkImg = document.createElement("img");
checkImg.src = "./assets/img/check-icon.svg";
checkIcon.appendChild(checkImg);
const successMessage = document.createElement("p");
successMessage.textContent = "¡Information added successfully!";
successMessage.classList.add("success__message");
const continueButton = document.createElement("button");
continueButton.textContent = "CONTINUE";
continueButton.classList.add("button", "primary-button");
continueButton.addEventListener("click", reloadForm);
success.appendChild(checkIcon);
success.appendChild(successMessage);
success.appendChild(continueButton);

/**
 * CHANGES IN THE CARD IN REAL TIME
 */

cardholderName.addEventListener("input", ({target, target: {value}}) => {
  let valueFinal = value.trim();
  if(value == "") CARD_VALUES["cardholderName"].innerHTML = target.placeholder;
  else {
    if(valueFinal.length > 23) CARD_VALUES["cardholderName"].innerHTML = valueFinal.slice(0, 20) + "...";
    else CARD_VALUES["cardholderName"].innerHTML = valueFinal
  };
})

cardNumber.addEventListener("input", ({target: {value}}) => {
  let valueFinal = value.split(" ").join("");
  let text = "";
  for(let i = 0; i < valueFinal.length; i++) {
    if(i % 4 == 0) text += " " + valueFinal[i];
    else text += valueFinal[i]
  }
  if(value == "") CARD_VALUES["cardNumber"].innerHTML = "1234 5678 9123 0000";
  else CARD_VALUES["cardNumber"].innerHTML = text.slice(0, 20);
})

cardNumber.addEventListener("input", ({target: {value}}) => {
  let valueFinal = value.split(" ").join("");
  if(value == "") CARD_VALUES["cardNumberHide"].innerHTML = "0000";
  else CARD_VALUES["cardNumberHide"].innerHTML = valueFinal.slice(12, 16);
})

expDateMonth.addEventListener("input", ({target: {value}}) => {
  if(value == "") CARD_VALUES["expDateMonth"].innerHTML = "00";
  else CARD_VALUES["expDateMonth"].innerHTML = value;
})

expDateYear.addEventListener("input", ({target: {value}}) => {
  if(value == "") CARD_VALUES["expDateYear"].innerHTML = "00";
  else CARD_VALUES["expDateYear"].innerHTML = value;
})

cvv.addEventListener("input", ({target, target: {value}}) => {
  if(value == "") CARD_VALUES["cvv"].innerHTML = target.placeholder;
  else CARD_VALUES["cvv"].innerHTML = value;
})

/**
 * HELP BUTTON
 */

helpButton.addEventListener("click", () => {
  // helpMessage.style.display = (helpMessage.style.display === "none") ? "block" : "none"
  if(helpMessage.style.display == "none" || helpMessage.style.display == "") {
    helpMessage.style.display = "block";
    helpMessage.classList.add("fadeIn");
    setTimeout(() => helpMessage.classList.remove("fadeIn"), 300)
  } else {
    helpMessage.classList.add("fadeOut");
    setTimeout(() => {
      helpMessage.classList.remove("fadeOut");
      helpMessage.style.display = "none";
    }, 300);
  }
})

/**
 * UTIL FUNCTIONS
 */

function resetForm() {
  for(input of INPUTS) input.value = "";
}

function loadSuccessMessage() {
  formContainer.replaceChild(success, form);
}

function reloadForm() {
  location.reload();
}