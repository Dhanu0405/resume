// script.js 

let questions = [ 
	{ 
		prompt: `What is the capital city of Australia?`, 
		options: [ 
			"Brisbane", 
			"Canberra", 
			"Melbourne", 
			"Sydney", 
		], 
		answer: "Canberra", 
	}, 

	{ 
		prompt: `Which planet is known as the "Red Planet"?`, 
		options: [ 
			"Venus", 
			"Mars", 
			"Jupiter", 
			"Saturn", 
		], 
		answer: "Mars", 
	}, 

	{ 
		prompt: `In what year did the Titanic sink?`, 
		options: [ 
			"1923", 
			"1912", 
			"1905", 
			"1931", 
		], 
		answer: "1912", 
	}, 

	{ 
		prompt: `Who wrote the play "Romeo and Juliet"?`, 
		options: ["Charles Dickens", "Jane Austen", "William Shakespeare", "William Faulkner"], 
		answer: "William Shakespeare", 
	}, 

	{ 
		prompt: `What is the largest mammal on the planet`, 
		options: [ 
			"African Elephant", 
			"Giraffe", 
			"Blue Whale", 
			"Polar Bear", 
		], 
		answer: "Blue Whale", 
	}, 
]; 

// Get Dom Elements 

let questionsEl = 
	document.querySelector( 
		"#questions"
	); 
let timerEl = 
	document.querySelector("#timer"); 
let choicesEl = 
	document.querySelector("#options"); 
let submitBtn = document.querySelector( 
	"#submit-score"
); 
let startBtn = 
	document.querySelector("#start"); 
let nameEl = 
	document.querySelector("#name"); 
let feedbackEl = document.querySelector( 
	"#feedback"
); 
let reStartBtn = 
	document.querySelector("#restart"); 

// Quiz's initial state 
let currentQuestionIndex = 0; 
let time = questions.length * 15; 
let timerId; 

// Start quiz and hide frontpage 

function quizStart() { 
	timerId = setInterval( 
		clockTick, 
		1000 
	); 
	timerEl.textContent = time; 
	let landingScreenEl = 
		document.getElementById( 
			"start-screen"
		); 
	landingScreenEl.setAttribute( 
		"class", 
		"hide"
	); 
	questionsEl.removeAttribute( 
		"class"
	); 
	getQuestion(); 
} 

// Loop through array of questions and 
// Answers and create list with buttons 
function getQuestion() { 
	let currentQuestion = 
		questions[currentQuestionIndex]; 
	let promptEl = 
		document.getElementById( 
			"question-words"
		); 
	promptEl.textContent = 
		currentQuestion.prompt; 
	choicesEl.innerHTML = ""; 
	currentQuestion.options.forEach( 
		function (choice, i) { 
			let choiceBtn = 
				document.createElement( 
					"button"
				); 
			choiceBtn.setAttribute( 
				"value", 
				choice 
			); 
			choiceBtn.textContent = 
				i + 1 + ". " + choice; 
			choiceBtn.onclick = 
				questionClick; 
			choicesEl.appendChild( 
				choiceBtn 
			); 
		} 
	); 
} 

// Check for right answers and deduct Time for wrong answer
// Go to next question 

function questionClick() { 
	if ( 
		this.value !== 
		questions[currentQuestionIndex] 
			.answer 
	) { 
		time -= 10; 
		if (time < 0) { 
			time = 0; 
		} 
		timerEl.textContent = time; 
		feedbackEl.textContent = `Wrong! The correct answer was 
		${questions[currentQuestionIndex].answer}.`; 
		feedbackEl.style.color = "red"; 
	} else { 
		feedbackEl.textContent = 
			"Correct!"; 
		feedbackEl.style.color = 
			"green"; 
	} 
	feedbackEl.setAttribute( 
		"class", 
		"feedback"
	); 
	setTimeout(function () { 
		feedbackEl.setAttribute( 
			"class", 
			"feedback hide"
		); 
	}, 2000); 
	currentQuestionIndex++; 
	if ( 
		currentQuestionIndex === 
		questions.length 
	) { 
		quizEnd(); 
	} else { 
		getQuestion(); 
	} 
} 

// End quiz by hiding questions, 
// Stop timer and show final score 

function quizEnd() { 
	clearInterval(timerId); 
	let endScreenEl = 
		document.getElementById( 
			"quiz-end"
		); 
	endScreenEl.removeAttribute( 
		"class"
	); 
	let finalScoreEl = 
		document.getElementById( 
			"score-final"
		); 
	finalScoreEl.textContent = time; 
	questionsEl.setAttribute( 
		"class", 
		"hide"
	); 
} 

// End quiz if timer reaches 0 

function clockTick() { 
	time--; 
	timerEl.textContent = time; 
	if (time <= 0) { 
		quizEnd(); 
	} 
} 


// Save score after pressing enter 
function checkForEnter(event) { 
    if (event.key === "Enter") { 
        submitScore();
    } 
} 
nameEl.onkeyup = checkForEnter;



// Function to handle score submission
function submitScore() {
    
    let playerName = nameEl.value; // Get the player's name from the input field
	alert(`Thank you, ${playerName}! Your Score has been Submitted. Final Score: ${time}`);
}

// Assign the function to the onclick event of the submit button
submitBtn.onclick = submitScore;


// Start quiz after clicking start quiz 

startBtn.onclick = quizStart;
