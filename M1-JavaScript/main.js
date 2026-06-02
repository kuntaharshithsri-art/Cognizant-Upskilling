console.log("Welcome to the Community Portal");

window.onload = () => {
alert("Community Portal Loaded");
};

class Event {

constructor(name,date,category,seats){

this.name = name;
this.date = date;
this.category = category;
this.seats = seats;

}

}

Event.prototype.checkAvailability = function(){

return this.seats > 0;

};

const events = [

new Event("Music Festival","2026-06-25","Music",20),
new Event("Baking Workshop","2026-07-01","Workshop",15),
new Event("Football Tournament","2026-07-10","Sports",30),
new Event("Guitar Night","2026-08-15","Music",10)

];

const musicEvents =
events.filter(event => event.category === "Music");

const eventTitles =
events.map(event => `Event : ${event.name}`);

console.log(musicEvents);
console.log(eventTitles);

const clonedEvents = [...events];

function addEvent(event){

events.push(event);

}

function registerUser(eventName){

try{

const event =
events.find(e => e.name === eventName);

if(!event){
throw new Error("Event Not Found");
}

if(event.seats <= 0){
throw new Error("No Seats Available");
}

event.seats--;

renderEvents();

}
catch(error){

console.log(error.message);

}

}

function filterEventsByCategory(
category,
callback
){

let result;

if(category === "All"){
result = [...events];
}
else{
result = events.filter(
event => event.category === category
);
}

callback(result);

}

function registrationCounter(){

let count = 0;

return function(){

count++;

return count;

};

}

const totalRegistrations =
registrationCounter();

const eventsContainer =
document.querySelector("#eventsContainer");

function renderEvents(list = events){

eventsContainer.innerHTML = "";

list.forEach(event => {

if(event.checkAvailability()){

const card =
document.createElement("div");

card.className = "card";

card.innerHTML = `
<h3>${event.name}</h3>
<p>Date : ${event.date}</p>
<p>Category : ${event.category}</p>
<p>Seats : ${event.seats}</p>
<button onclick="registerUser('${event.name}')">
Register
</button>
`;

eventsContainer.appendChild(card);

}

});

}

renderEvents();

Object.entries(events[0]).forEach(
([key,value]) =>
console.log(key,value)
);

document
.getElementById("categoryFilter")
.onchange = function(){

filterEventsByCategory(
this.value,
renderEvents
);

};

document
.getElementById("searchBox")
.addEventListener("keydown", () => {

const keyword =
document
.getElementById("searchBox")
.value
.toLowerCase();

const filtered =
events.filter(event =>
event.name
.toLowerCase()
.includes(keyword)
);

renderEvents(filtered);

});

const eventSelect =
document.querySelector(
"select[name='event']"
);

events.forEach(event => {

const option =
document.createElement("option");

option.value = event.name;

option.textContent = event.name;

eventSelect.appendChild(option);

});

document
.getElementById("registrationForm")
.addEventListener(
"submit",
async function(e){

e.preventDefault();

document.getElementById(
"nameError"
).textContent = "";

document.getElementById(
"emailError"
).textContent = "";

document.getElementById(
"eventError"
).textContent = "";

const name =
this.elements["name"].value;

const email =
this.elements["email"].value;

const event =
this.elements["event"].value;

let valid = true;

if(name === ""){

document.getElementById(
"nameError"
).textContent =
"Name Required";

valid = false;

}

if(email === ""){

document.getElementById(
"emailError"
).textContent =
"Email Required";

valid = false;

}

if(event === ""){

document.getElementById(
"eventError"
).textContent =
"Select Event";

valid = false;

}

if(!valid){
return;
}

const {name:userName,email:userEmail} = {
name,
email
};

console.log(userName,userEmail);

document.getElementById(
"message"
).textContent =
"Submitting Registration...";

setTimeout(async () => {

try{

const response =
await fetch(
"https://jsonplaceholder.typicode.com/posts",
{
method:"POST",
headers:{
"Content-Type":
"application/json"
},
body:JSON.stringify({
name,
email,
event
})
}
);

await response.json();

document.getElementById(
"message"
).textContent =
`Registration Successful.
Total Registrations:
${totalRegistrations()}`;

}
catch(error){

document.getElementById(
"message"
).textContent =
"Submission Failed";

}

},2000);

}
);

async function loadEvents(){

try{

const response =
await fetch(
"https://jsonplaceholder.typicode.com/users"
);

await response.json();

document.getElementById(
"loading"
).style.display = "none";

}
catch(error){

console.log(error);

}

}

loadEvents();