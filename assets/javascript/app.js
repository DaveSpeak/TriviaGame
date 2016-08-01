	// VARIABLES
	// ==========================================================================
	var trivia = [
		{question:"Who wrote Game of Thrones?",
		 answer: ["Robert Heinlein", "George R.R. Martin", "Kathleen Kennedy",  "Peter Dinklage"],
		 correct:1, picture:"George-RR-Martin.jpg", isAsked:false},
		{question:"How does Tywin Lannister die?",
		 answer: ["He doesn't", "He's beheaded by Joffrey", "Duel with Ned Stark",  "Shot with a crossbow"],
		 correct:3, picture:"Tywin-death.jpg", isAsked:false},
		{question:"Who is Joffrey's father?",
		 answer: ["Robert Baratheon", "Ned Stark", "Jamie Lannister",  "George-RR-Martin"],
		 correct:2, picture:"Jamie-Lannister.jpg", isAsked:false},
		{question:"Which Game of Thrones actress was a bond girl?",
		 answer: ["Diana Rigg", "Natalie Dormer", "Michelle Fairley",  "Emilia Clark"],
		 correct:0, picture:"Diana-Rigg.jpg", isAsked:false},
		{question:"Which charater is not a Stark?",
		 answer: ["Ned", "Cersei", "Ayra",  "Jon"],
		 correct:1, picture:"Cersei-Lannister.jpg", isAsked:false},
		{question:"What two things does Tyrion do?",
		 answer: ["Makes money and spends it", "Fights and makes love", "Drinks and knows things",  "He only does one thing"],
		 correct:2, picture:"Tyrion-Lannister.gif", isAsked:false},
		{question:"Who is Daenerys Targaryen's brother?",
		 answer: ["Tywin", "Ned", "The Hound",  "Viserys"],
		 correct:3, picture:"Viserys-Targeryen.jpg", isAsked:false},
		{question:"Which character does Emilia Clark play?",
		 answer: ["Ayra Stark", "Cersei Lannister", "Daenerys Targaryen",  "Yara Greyjoy"],
		 correct:2, picture:"Daenerys-Targaryen.jpg", isAsked:false}
	]
	var correct = 0;
	var wrong = 0;
	var unanswered = 0;
	var q=-1;
	var waitaSecond;
	var time = 0;
	var maxTime = 10;
	var counter;
	$(document).ready(function(){
		gameStart();
	});
	function gameStart(){
		var initial = "<button class='btn' id='selection'><h4>Start</h4></button>";
		$("#gameArea").html(initial);
		$("#selection").on('click', selectQuestion);
	}
	function selectQuestion(){
		clearInterval(counter);
		if (correct+wrong+unanswered < trivia.length){
			q=Math.floor(Math.random()*trivia.length);
			if (trivia[q].isAsked) {selectQuestion();}else {askQuestion();}
		} else {finishGame();}
	}
	function askQuestion(){
		$(".questionArea").empty();
		time = 0;
        counter = setInterval(increment, 1000);
		var triviaQuestion="<div class='questionArea'><br><h1>"+trivia[q].question+"</h1><br><ul>"+
		"<li>"+"<button class='btn response' value=0><h3>"+trivia[q].answer[0]+"</h3></button></li>"+
		"<li>"+"<button class='btn response' value=1><h3>"+trivia[q].answer[1]+"</h3></button></li>"+
		"<li>"+"<button class='btn response' value=2><h3>"+trivia[q].answer[2]+"</h3></button></li>"+
		"<li>"+"<button class='btn response' value=3><h3>"+trivia[q].answer[3]+"</h3></button></li>"+
		"</ul></div>"
		$("#gameArea").html(triviaQuestion);
		var timeDisplay="<div id='timeRem'><h1>Time Remaining: "+(maxTime-time)+" seconds</h1></div>";
        $('#time').html(timeDisplay);
		trivia[q].isAsked=true;
		$("button").on('click',function(){
			var i=$(this).attr('value');
			console.log(i);
			if (i==trivia[q].correct){
				correct++;
				displayCorrect();
			}else{
				wrong++;
				displayWrong();
			}
		});
	}
	function increment(){
		time++;
		if (maxTime-time < 10){
			var timeDisplay="<div id='timeRem'><h1>Time Remaining: &nbsp"+(maxTime-time)+" seconds</h1></div>";

		}else {
			var timeDisplay="<div id='timeRem'><h1>Time Remaining: "+(maxTime-time)+" seconds</h1></div>";
		}
		$('#time').empty();
        $('#time').html(timeDisplay);
        if (time >= maxTime) {
        	clearInterval(counter);
        	displayUnanswered();
        }
	}
	function displayCorrect(){
		clearTimeout(waitaSecond);
		clearInterval(counter);
		$(".questionArea").empty();
		var winner='<div class="questionArea"><br><h1>Correct!!!</h1><br><img src="assets/images/'+trivia[q].picture+'"></div>';
		$('#gameArea').html(winner);
		waitaSecond = setTimeout(selectQuestion, 1000);
		return;
	}
	function displayWrong(){
		clearTimeout(waitaSecond);
		clearInterval(counter);
		$(".questionArea").empty();
		var loser='<div class="questionArea"><br><h1>Sorry!!</h1><br><h1>The correct answer is: '+
		trivia[q].answer[trivia[q].correct]+'</h1><br><img src="assets/images/'+trivia[q].picture+'"></div>';
		$('#gameArea').html(loser);
		waitaSecond = setTimeout(selectQuestion, 2000);
		return;
	}
	function displayUnanswered(){
		$(".questionArea").empty();
		var unans='<idv class="questionArea"><br><h1>Time\'s up!!!</h1><br><h1>The correct answer is:</h1><br><img src="assets/images/'+trivia[q].picture+'"></div>';
		$('#gameArea').html(unans);
		unanswered++;
		waitaSecond = setTimeout(selectQuestion, 2000);
		return;
	}
	function finishGame(){
		$(".questionArea").empty();
		var complete ='<div id="results"><br><h1>Game Over!!</h1><br><h1>Correct: '+correct+
		'</h1><br><h1>Wrong: '+wrong+'</h1><br><h1>Unanswered: '+unanswered+'</h1><br><br><button class="btn" id="restart">Restart</button></div>';
		$('#gameArea').html(complete);
		correct=0;
		wrong=0;
		unanswered=0;
		for (var i=0;i<trivia.length;i++){
			trivia[i].isAsked=false;
		}
		$('#restart').on('click', selectQuestion);
	}
