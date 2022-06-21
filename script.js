// Constant Elements from the DOM

// Input Container
const inputContainer = document.getElementById("input-container");
const countdownForm = document.getElementById("countdownForm");
const dateEl = document.getElementById("date-picker");


// Countdown Container
const countdownContainer = document.getElementById("countdown-container");
const countdownTitleEl = document.getElementById("countdown-title");
const countdownResetBtn = document.getElementById("countdown-reset-btn");
const timeElements = document.querySelectorAll("span");


// complete Container
const completeContainer = document.getElementById("complete-container");
const completeInfo = document.getElementById("complete-info");
const newCountdownBtn = document.getElementById("complete-button");

// Js variables for title
let countdownTitle = '';
let countdownDate = '';

// Countdown Active 
let countdownActive;

// Object to store our countdown in localStorage
let savedCountdown;

// Set min Date to the input as today's date

// We can also do this
// const d = new Date();
// const today = `${d.getFullYear}-${d.getMonth}-${d.getDate}`

const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute("min", today);

// Update the DOM / complete the input section and start countdown 
function updateDOM() {
    // disclaring the second , minute , hour , day in milli Seconds
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    countdownActive = setInterval(() => {
        // Converting the total time into the milliseconds
        const totalTimeSecs = new Date(countdownDate).getTime();

        // Getting the current time in milli seconds
        const currentTimeSecs = new Date().getTime();

        // Finding the distance between the current time and the inputed time 
        // We are going to add  14400000 milli seconds to remove the 4 hour differnce in the time
        const distanceTime = totalTimeSecs - (currentTimeSecs + 14400000);
        // Now converting the seconds into the day , hour , minute , seconds
        const days = Math.floor(distanceTime / day);
        const hours = Math.floor((distanceTime % day) / hour);
        const minutes = Math.floor((distanceTime % hour) / minute);
        const seconds = Math.floor((distanceTime % minute) / second);

        if (distanceTime < 0) {
            completeInfo.innerText = `${countdownTitle} is finished on ${today}`;
            clearInterval(countdownActive);
            completeContainer.hidden = false;
            countdownContainer.hidden = true;
            inputContainer.hidden = true;
            document.title = 'Custom Countdown';
            localStorage.removeItem("countdown");


        } else {
            // Change the title and Times in the countdwon section
            countdownTitleEl.textContent = countdownTitle;
            timeElements[0].textContent = days;
            timeElements[1].textContent = hours;
            timeElements[2].textContent = minutes;
            timeElements[3].textContent = seconds;
            document.title = `${days} : ${hours} : ${minutes} : ${seconds}`
            // hide the input container
            inputContainer.hidden = true;
            // Show the countdown container
            countdownContainer.hidden = false;
        }

    }, 1000)
}

// Update the countdown to get the values from the form 
function updateCountdown(e) {
    // here e is stand for the element on which the event is called.
    // Below function prevents the form to submit
    e.preventDefault();

    // Getting and Setting the values of countdown title and countdown Date 
    countdownTitle = e.srcElement[0].value;
    countdownDate = e.srcElement[1].value;
    document.title = 'Custom Countdown';

    // Now calling the function by sending the date which we get from the user
    if ((countdownDate === '' || countdownTitle === '')) {
        alert("Please enter the value of Date input")
    }
    else {
        if (countdownDate === today) {
            alert("You have set today as a countdown. Please set future date")
        } else {
            savedCountdown = {
                title: countdownTitle,
                date: countdownDate,
            }
            localStorage.setItem("countdown", JSON.stringify(savedCountdown))
            updateDOM();
        }
    }

}

// Reset the countdown
function resetCountDown() {
    var r = confirm("You want to reset the countdown?");
    if (r) {
        // Reset the value of input 
        document.getElementById('title').value = '';
        dateEl.value = '';
        clearInterval(countdownActive)
        // Show / hide the containers
        inputContainer.hidden = false;
        countdownContainer.hidden = true;
        document.title = 'Custom Countdown';
        localStorage.removeItem("countdown");

    }
}

function recoverOldCountdown() {

    const savedCount = localStorage.getItem("countdown");
    const savedCountObj = JSON.parse(savedCount);


    countdownTitle = savedCountObj.title;
    countdownDate = savedCountObj.date;
    // hide the input container
    inputContainer.hidden = true;
    // Show the countdown container
    countdownContainer.hidden = false;
    updateDOM(countdownDate);

}

if (localStorage.getItem("countdown")) {
    recoverOldCountdown();
}


// Event Listeners
countdownForm.addEventListener("submit", updateCountdown);
countdownResetBtn.addEventListener("click", resetCountDown);


newCountdownBtn.addEventListener("click", () => {
    completeContainer.hidden = true;
    inputContainer.hidden = false;
    localStorage.removeItem("countdown");
    document.title = 'Custom Countdown';
});