import bot from "./assets/bot.svg";
import user from "./assets/user.svg";

const form = document.querySelector("form");
const chatContainer = document.querySelector("#chat__container");

let loadInterval;




/* This function that sets an interval to add dots to the textContent property 
of the passed element every 300 milliseconds. If the textContent
property of the element becomes '....', the textContent property is
reset to an empty string. */

function loader(element) {
  element.textContent = "";

  loadInterval = setInterval(() => {
    element.textContent += ".";

    if (element.textContent === "....") {
      element.textContent = "";
    }
  }, 300);
}




/* This function simulates the typing of a text string  
into the innerHTML property of the passed element. 
It uses a setInterval function to add one character of
the text to the innerHTML every 20 milliseconds. 
The clearInterval function is used to stop the interval
when all the characters of the text have been typed */

function typeText(element, text) {
  let index = 0;

  let interval = setInterval(() => {
    if (index < text.length) {
      element.innerHTML += text.charAt(index);
      index++;
    } else {
      clearInterval(interval);
    }
  }, 20);
}




/* This function generates a unique ID string. It uses the current
time in milliseconds obtained from Date.now() and a random number
generated with Math.random() to create the ID. The random number 
is then converted to a hexadecimal string using toString(16). 
The function returns a string concatenating "id-", the timestamp, 
and the hexadecimal string, separated by a -.
This ensures that each call to generateUniqueId() will return a 
unique string. */

function generateUniqueId() {
  const timeStamp = Date.now();
  const randomNumber = Math.random();
  const hexadecimalString = randomNumber.toString(16);

  return `id-${timeStamp}-${hexadecimalString}`;
}







/* This is a function which returns a string of HTML code. 
The function takes three parameters:

isAI: a boolean value that determines if the message is from the AI (bot) or the user.
value: the text content of the message.
uniqueId: a unique identifier for the message.

The returned HTML code generates a div element that represents a single chat message.

The div element has classes wrapper and ai (if isAI is true), and contains a div element
with class chat that holds the message and profile picture. The profile picture is an img 
element with the source being either the bot or user URL depending on the value of isAI. 
The message text is displayed in a div element with class message and has its id set to 
the value of uniqueId. */


function chatStripe (isAI, value, uniqueId){
  return (
    `
    <div>
      <div class="wrapper ${isAI && 'ai'}">
        <div class="chat">
          <div className="profile">
            <img src="${isAI ? bot : user}"
              alt="${isAI ? 'bot' : 'user'}"
            />
          </div>
          <div class="message" id=${uniqueId}>${value}</div>
        </div>
      </div>
    </div>
    `
  );
}





/* This code defines an async function handleSubmit that is executed when a form is submitted.
The function takes an event object e as a parameter and calls e.preventDefault() to prevent the default
form submission behavior.

The function creates a new FormData object from the form and stores it in the data variable. 
Then, it appends the user's chat message to the chatContainer element by concatenating the result of
the chatStripe function with false as the first argument and data.get('prompt') as the second argument. 
The form is reset by calling the reset method on the form object.

The function then generates a unique identifier using the generateUniqueId function and appends the bot's
chat message to the chatContainer by concatenating the result of the chatStripe function with true as the 
first argument, an empty string as the second argument, and the unique identifier as the third argument.
The scrollTop property of chatContainer is set to its scrollHeight to ensure that the latest messages are always visible.

Finally, the function retrieves the div element that contains the bot's message using its unique identifier
and passes it to the loader function to display a loading animation until the bot's response is returned. */

const handleSubmit = async (e) => {
  e.preventDefault();


  const data = new FormData(form);
  
  // users chatstripe
  chatContainer.innerHTML += chatStripe(false, data.get('prompt'));
  form.reset();

  // bot chatstripe

  const uniqueId = generateUniqueId;
  chatContainer.innerHTML += chatStripe(true, " ",  uniqueId);

  chatContainer.scrollTop = chatContainer.scrollHeight;

  const messageDiv = document.getElementById(uniqueId);
  
  loader(messageDiv);
}

/* These two lines add two event listeners to the form element.
The first one listens for a 'submit' event and calls the handleSubmit function
when it occurs. The second one listens for a 'keyup' event and calls an anonymous
function when it occurs. This anonymous function checks if the key that was released
is the 'Enter' key (key code 13) and, if so, calls the handleSubmit function and passes 
the event as an argument. */


form.addEventListener('submit, handleSubmit');
form.addEventListener('keyup', (e) =>{
  if (e.key === 13) {
    handleSubmit(e);
  }
})