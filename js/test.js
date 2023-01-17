var nameRequred = document.getElementById('name-requred');
var phoneRequred = document.getElementById('phone-requred');
var emailRequred = document.getElementById('email-requred');
var messageRequred = document.getElementById('message-requred');
var captchaRequired = document.getElementById('captcha-requred');
var submitRequred = document.getElementById('submit-requred');

let header = document.querySelector('header');
let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');


     
window.addEventListener('scroll', () => {
  header.classList.toggle('shadow', window.scrollY > 0);
});

menu.onclick = () => {
  navbar.classList.toggle('active');
}
window.onscroll = () => {
  navbar.classList.remove('active');
}


function validateName() {
  var yourName = document.getElementById('your-name').value;
  if (yourName.length < 3) {
    if (yourName.length < 1) {
      nameRequred.innerHTML = 'Name is Requred';
      return false;
    } else {
      nameRequred.innerHTML = 'Enter a Valid Name';
    }
  } else if (!yourName.match(/^[A-Za-z]*$/)) {
    nameRequred.innerHTML = 'Enter a Valid Name';
    return false
  } else {
    nameRequred.innerHTML = '<i class="fa-sharp fa-solid fa-circle-check"></i>'
    return true;
  }
}

function validatePhone() {
  var yourPhone = document.getElementById('your-phone').value;
  if (yourPhone.length == 0) {
    phoneRequred.innerHTML = 'Phone no is Requred';
    return false;
  } else if (yourPhone.length == 9) {
    phoneRequred.innerHTML = 'Phone no should be 10 degits';
    return false;
  } else if (!yourPhone.match(/^\d{10}$/)) {
    phoneRequred.innerHTML = 'Invalid Phone Number';
    return false;
  } else {
    phoneRequred.innerHTML = '<i class="fa-sharp fa-solid fa-circle-check"></i>';
    return true;
  }
}

function validateEmail() {
  var yourEmail = document.getElementById('your-email').value;
  if (yourEmail.length == 0) {
    emailRequred.innerHTML = 'Email is Required';
    return false;
  } else if (!yourEmail.match(/^[A-Za-z\._\-[0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)) {
    emailRequred.innerHTML = 'Email invalid';
    return false;
  } else {
    emailRequred.innerHTML = '<i class="fa-sharp fa-solid fa-circle-check"></i>';
    return true;
  }
}

function validateSubject() {
  var subject = document.getElementById('your-subject').value;
  if (subject.length < 3) {
    if (subject.length < 1) {
      subjectRequred.innerHTML = 'Subject is Requred';
      return false;
    } else {
      subjectRequred.innerHTML = 'Enter a Valid Subject';
    }
  } else if (!subject.match(/^[A-Za-z]*$/)) {
    subjectRequred.innerHTML = 'Enter a Valid Subject';
    return false
  } else {
    subjectRequred.innerHTML = '<i class="fa-sharp fa-solid fa-circle-check"></i>'
    return true;
  }
}

function validateMessage() {
  var yourMessage = document.getElementById('your-message').value;
  if(yourMessage.length>500){
    messageRequred.innerHTML = 'Message should be less than 500 words';
    messageRequred.classList.remove("wordCount");
    return false;
  }else if(yourMessage.length>0){
    messageRequred.innerHTML = yourMessage.length + ' ' + 'words' + '<i class="fa-sharp fa-solid fa-circle-check"></i>';
    messageRequred.classList.add("wordCount");
    return true;
  }else{
  messageRequred.innerHTML = 'Message is Required';  
  messageRequred.classList.remove("wordCount");
      return false;
}
}

function validateCaptcha(){
  var yourCaptcha = document.getElementById('user-input').value;
  console.log("inn",yourCaptcha, text)
  if (text === yourCaptcha) {
    captchaRequired.innerHTML = '<i class="fa-sharp fa-solid fa-circle-check"></i>';
    return true;
  } else {
    captchaRequired.innerHTML = 'Invalid Captcha';
    return false;
    // triggerFunction();
  }
}
function validateSubmit() {
  if (!validateName() || !validatePhone() || !validateEmail() || !validateSubject()|| !validateMessage() || !validateCaptcha()) {
    submitRequred.style.display = 'flex';
    submitRequred.innerHTML = 'Please Fill all the Details';
    setTimeout(function () { submitRequred.style.display = 'none'; }, 2000)
    return false;
  }else{
      alert("Submitted Sucessfully!");
  }
}
function viewCurrencyConverter(){
  console.log("test")
}


let userInput = document.getElementById("user-input");
let canvas = document.getElementById("canvas");
let reloadButton = document.getElementById("reload-button");
let text = "";
//Generate Text
const textGenerator = () => {
  let generatedText = "";
  /* String.fromCharCode gives ASCII value from a given number */
  // total 9 letters hence loop of 3
  for (let i = 0; i < 3; i++) {
    //65-90 numbers are capital letters
    generatedText += String.fromCharCode(randomNumber(65, 90));
    //97-122 are small letters
    generatedText += String.fromCharCode(randomNumber(97, 122));
    //48-57 are numbers from 0-9
    generatedText += String.fromCharCode(randomNumber(48, 57));
  }
  return generatedText;
};
//Generate random numbers between a given range
const randomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
//Canvas part
function drawStringOnCanvas(string) {
  //The getContext() function returns the drawing context that has all the drawing properties and functions needed to draw on canvas
  let ctx = canvas.getContext("2d");
  //clear canvas
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  //array of text color
  const textColors = ["rgb(0,0,0)", "rgb(130,130,130)"];
  //space between letters
  const letterSpace = 150 / string.length;
  //loop through string
  for (let i = 0; i < string.length; i++) {
    //Define initial space on X axis
    const xInitialSpace = 25;
    //Set font for canvas element
    ctx.font = "20px Roboto Mono";
    //set text color
    ctx.fillStyle = textColors[randomNumber(0, 1)];
    ctx.fillText(
      string[i],
      xInitialSpace + i * letterSpace,
      randomNumber(25, 40),
      100
    );
  }
}
//Initial Function
function triggerFunction() {
  //clear Input
  userInput.value = "";
  text = textGenerator();
  console.log(text);
  //Randomize the text so that everytime the position of numbers and small letters is random
  text = [...text].sort(() => Math.random() - 0.5).join("");
  drawStringOnCanvas(text);
}
// //call triggerFunction for reload button
// reloadButton.addEventListener("click", triggerFunction);
//call triggerFunction when page loads
window.onload = () => triggerFunction();