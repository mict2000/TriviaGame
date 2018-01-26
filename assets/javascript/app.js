var triviaQuestions = [{
	question: "In what year did Kelly Slater win his first World Title?",
	answerList: ["1979", "1992", "2006", "2000"],
	answer: 1
},{
	question: "In whose memory is the Billabong Pipe Masters contest held?",
	answerList: ["Andy Irons", "Ace Cool", "Ronnie Burns", "Taz Fritz"],
	answer: 0
},{
	question: "What is the name of Dane Reynold's new clothing label?",
	answerList: ["Former", "Marine Layer", "Boyz In The Keyz", "Pierpont Surf"],
	answer: 0
},{
	question: "Velzyland on Oahu's North Shore is named after which surfing legend?",
	answerList: ["Fernando Velzy", "James Labrador", "Dave Velzy", "Pierre Von Velz"],
	answer: 2
},{
	question: "Which of the following surf companies recently declared bankruptcy?",
	answerList: ["Hurley", "Billabong", "Vans", "Quiksilver"],
	answer: 3
},{
	question: "The Curran surfing family hails from what city in California?",
	answerList: ["Oxnard", "Santa Barbara", "Compton", "Malibu"],
	answer: 0
},{
	question: "Who is considered a pioneer of surfing Pipeline in the 1970s?",
	answerList: ["Brad Gerlach", "Gerry Lopez", "Jamie O'Brien", "John John Florence"],
	answer: 1
},{
	question: "Which surf company is not located in Hawaii?",
	answerList: ["Local Motion", "Town & Country", "Channel Islands", "HIC"],
	answer: 2
},{
	question: "The Toth and Graves surfing families live on what island?",
	answerList: ["Molokai", "Puerto Rico", "Bermuda", "St. Lucia"],
	answer: 1
},{
	question: "Former world champ Sunny Garcia has what tattooed on his chest?",
	answerList: ["Bra Boys", "Waianae", "Hui O He'e Nalu", "Death and Taxes"],
	answer: 3
},{
	question: "Kelly Slater appeared on what hit television series?",
	answerList: ["Baywatch", "Saved By The Bell", "Law and Order", "Seinfeld"],
	answer: 0
},{
	question: "What former pro surfer recently ran for mayor of the island of Kauai'?",
	answerList: ["Titus Kinimaka", "Dustin Barca", "Bruce Irons", "Malia Manuel"],
	answer: 1
},{
	question: "Who has the Guinness World Record for biggest wave ever surfed?",
	answerList: ["Jake Gallo", "Jesse Conlon", "Ryan Winger", "Garrett McNamara"],
	answer: 3
},{
	question: "What Australian pro surfer was attacked by a shark on a live broadcast of a surfing contest in South Africa?",
	answerList: ["Mick Fanning", "Mark Occhilupo", "Koby Abberton", "Joel Parkinson"],
	answer: 0
},{
	question: "Which country has no waves to surf?",
	answerList: ["Syria", "Pakistan", "Bolivia", "Iran"],
	answer: 2
}];

var gifArray = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7', 'question8', 'question9', 'question10', 'question11', 'question12', 'question13','question14','question15'];
var currentQuestion; var correctAnswer; var incorrectAnswer; var unanswered; var seconds; var time; var answered; var userSelect;
var messages = {
	correct: "Correct!",
	incorrect: "Sorry, that's wrong.",
	endTime: "Out of time!",
	finished: "Pau already! Let's see how you did!."
}

$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});

$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});

function newGame(){
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();
	answered = true;
	
	//sets up new questions & answerList
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();
	//clicking an answer will pause the time and setup answerPage
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 30;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	//sets timer to go down
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); //Clears question page
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	$('#gif').html('<img src = "assets/images/'+ gifArray[currentQuestion] +'.gif" width = "400px">');
	//checks to see correct, incorrect, or unanswered
	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 5000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 5000);
	}	
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}