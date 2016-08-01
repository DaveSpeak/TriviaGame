	// VARIABLES
	// ==========================================================================
	var trivia = [
		{question:"What is the answer 1?",
		 answer: ["Answer # 1", "Answer # 2", "Answer # 3",  "Answer # 4"],
		 correct:3, picture:"Darth-Maul.jpg", isAsked:false},
		{question:"What is the answer 2?",
		 answer: ["Answer # 1", "Answer # 2", "Answer # 3",  "Answer # 4"],
		 correct:2, picture:"Darth-Sidious.jpg", isAsked:false},
		{question:"What is the answer 3?",
		 answer: ["Answer # 1", "Answer # 2", "Answer # 3",  "Answer # 4"],
		 correct:1, picture:"Luke-Skywalker.jpg", isAsked:false},
		{question:"What is the answer 4?",
		 answer: ["Answer # 1", "Answer # 2", "Answer # 3",  "Answer # 4"],
		 correct:0, picture:"Obi-Wan.jpg", isAsked:false}
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
		"<li>"+"<button class='response' value=0>"+trivia[q].answer[0]+"</button></li>"+
		"<li>"+"<button class='response' value=1>"+trivia[q].answer[1]+"</button></li>"+
		"<li>"+"<button class='response' value=2>"+trivia[q].answer[2]+"</button></li>"+
		"<li>"+"<button class='response' value=3>"+trivia[q].answer[3]+"</button></li>"+
		"</ul></div>"
		$("#gameArea").html(triviaQuestion);
		var timeDisplay="<div><h1>Time Remaining: "+(maxTime-time)+" seconds</h1></div>";
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
			var timeDisplay="<div><h1>Time Remaining: &nbsp"+(maxTime-time)+" seconds</h1></div>";

		}else {
			var timeDisplay="<div><h1>Time Remaining: "+(maxTime-time)+" seconds</h1></div>";
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
		var complete ='<div class="questionArea"><br><h1>Game Over!!</h1><br><h1>Correct: '+correct+
		'</h1><br><h1>Wrong: '+wrong+'</h1><br><h1>Unanswered: '+unanswered+'<br><br><button id="selection">Restart</button></div>';
		$('#gameArea').html(complete);
		correct=0;
		wrong=0;
		for (var i=0;i<trivia.length;i++){
			trivia[i].isAsked=false;
		}
		$('#selection').on('click', selectQuestion);
	}
