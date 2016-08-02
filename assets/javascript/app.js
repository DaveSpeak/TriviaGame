	// VARIABLES
	// ==========================================================================
	var triviaGame =  { 
			info: {questAns:[
				{question:"Who wrote Game of Thrones?",
				 answer: ["Robert Heinlein", "George R.R. Martin", "Kathleen Kennedy",  "Peter Dinklage"],
				 correct:1, picture:"George-RR-Martin.jpg", isAsked:false},
				{question:"How does Tywin Lannister die?",
				 answer: ["He doesn't", "He's beheaded by Joffrey", "Duel with Ned Stark",  "Shot with a crossbow"],
				 correct:3, picture:"tyshot.gif", isAsked:false},
				{question:"Who is Joffrey's father?",
				 answer: ["Robert Baratheon", "Ned Stark", "Jamie Lannister",  "George-RR-Martin"],
				 correct:2, picture:"Jamie-Lannister.jpg", isAsked:false},
				{question:"Which Game of Thrones actress was a bond girl?",
				 answer: ["Diana Rigg", "Natalie Dormer", "Michelle Fairley",  "Emilia Clark"],
				 correct:0, picture:"Diana-Rigg.gif", isAsked:false},
				{question:"Which charater is not a Stark?",
				 answer: ["Ned", "Cersei", "Ayra",  "Jon"],
				 correct:1, picture:"Cersei.gif", isAsked:false},
				{question:"What two things does Tyrion do?",
				 answer: ["Makes money and spends it", "Fights and makes love", "Drinks and knows things",  "He only does one thing"],
				 correct:2, picture:"Tyrion-Lannister.gif", isAsked:false},
				{question:"Who is Daenerys Targaryen's brother?",
				 answer: ["Tywin", "Ned", "The Hound",  "Viserys"],
				 correct:3, picture:"Viserys-Targeryen.jpg", isAsked:false},
				{question:"Which character does Emilia Clark play?",
				 answer: ["Ayra Stark", "Cersei Lannister", "Daenerys Targaryen",  "Yara Greyjoy"],
				 correct:2, picture:"Daenerys.gif", isAsked:false}
				]
			},
		correct:0,
		wrong:0,
		unanswered:0,
		q:-1,
		waitaSecond:0,
		time:0,
		maxTime:10,
		counter:0,
		gameStart:function(){
			var win = new Audio('assets/music/1470110884.mp3');
			win.loop=true;
			win.play();
			var initial = "<button class='btn' id='selection'><h4>Start</h4></button>";
			$("#gameArea").html(initial);
			$("#selection").on('click', triviaGame.selectQuestion);
		},
		selectQuestion:function (){
			clearInterval(triviaGame.counter);
			if (triviaGame.correct+triviaGame.wrong+triviaGame.unanswered < triviaGame.info.questAns.length){
				triviaGame.q=Math.floor(Math.random()*triviaGame.info.questAns.length);
				console.log(triviaGame.q);
				if (triviaGame.info.questAns[triviaGame.q].isAsked) {triviaGame.selectQuestion();}else {triviaGame.askQuestion();}
			} else {triviaGame.finishGame();}
		},
		askQuestion:function (){
		$(".questionArea").empty();
			triviaGame.time = 0;
	        triviaGame.counter = setInterval(triviaGame.increment, 1000);
			var triviaQuestion="<div class='questionArea'><br><h1>"+triviaGame.info.questAns[triviaGame.q].question+"</h1><br><ul>"+
			"<li>"+"<button class='btn response' value=0><h3>"+triviaGame.info.questAns[triviaGame.q].answer[0]+"</h3></button></li>"+
			"<li>"+"<button class='btn response' value=1><h3>"+triviaGame.info.questAns[triviaGame.q].answer[1]+"</h3></button></li>"+
			"<li>"+"<button class='btn response' value=2><h3>"+triviaGame.info.questAns[triviaGame.q].answer[2]+"</h3></button></li>"+
			"<li>"+"<button class='btn response' value=3><h3>"+triviaGame.info.questAns[triviaGame.q].answer[3]+"</h3></button></li>"+
			"</ul></div>"
			$("#gameArea").html(triviaQuestion);
			var timeDisplay="<div id='timeRem'><h1>Time Remaining: "+(triviaGame.maxTime-triviaGame.time)+" seconds</h1></div>";
	        $('#time').html(timeDisplay);
			triviaGame.info.questAns[triviaGame.q].isAsked=true;
			$("button").on('click',function(){
				var i=$(this).attr('value');
				console.log(i);
				if (i==triviaGame.info.questAns[triviaGame.q].correct){
					triviaGame.correct++;
					triviaGame.displayCorrect();
				}else{
					triviaGame.wrong++;
					triviaGame.displayWrong();
				}
			});
		},
	 	increment:function(){
			triviaGame.time++;
			if (triviaGame.maxTime-triviaGame.time < 10){
				var timeDisplay="<div id='timeRem'><h1>Time Remaining: &nbsp"+(triviaGame.maxTime-triviaGame.time)+" seconds</h1></div>";

			}else {
				var timeDisplay="<div id='timeRem'><h1>Time Remaining: "+(triviaGame.maxTime-triviaGame.time)+" seconds</h1></div>";
			}
			$('#time').empty();
	        $('#time').html(timeDisplay);
	        if (triviaGame.time >= triviaGame.maxTime) {
	        	clearInterval(triviaGame.counter);
	        	triviaGame.displayUnanswered();
	        }
		},
		displayCorrect:function(){
			clearTimeout(triviaGame.waitaSecond);
			clearInterval(triviaGame.counter);
			$(".questionArea").empty();
			var winner='<div class="questionArea"><br><h1>Correct!!!</h1><br><img src="assets/images/'+triviaGame.info.questAns[triviaGame.q].picture+'"></div>';
			$('#gameArea').html(winner);
			triviaGame.waitaSecond = setTimeout(triviaGame.selectQuestion, 3000);
			return;
		},
		displayWrong:function(){
			clearTimeout(triviaGame.waitaSecond);
			clearInterval(triviaGame.counter);
			$(".questionArea").empty();
			var loser='<div class="questionArea"><br><h1>Sorry!!</h1><br><h1>The correct answer is: '+
			triviaGame.info.questAns[triviaGame.q].answer[triviaGame.info.questAns[triviaGame.q].correct]+'</h1><br><img src="assets/images/'+triviaGame.info.questAns[triviaGame.q].picture+'"></div>';
			$('#gameArea').html(loser);
			triviaGame.waitaSecond = setTimeout(triviaGame.selectQuestion, 3000);
			return;
		},
		displayUnanswered:function(){
			$(".questionArea").empty();
			var unans='<idv class="questionArea"><br><h1>Time\'s up!!!</h1><br><h1>The correct answer is: '+
			triviaGame.info.questAns[triviaGame.q].answer[triviaGame.info.questAns[triviaGame.q].correct]+'</h1><br><img src="assets/images/'+triviaGame.info.questAns[triviaGame.q].picture+'"></div>';
			$('#gameArea').html(unans);
			triviaGame.unanswered++;
			triviaGame.waitaSecond = setTimeout(triviaGame.selectQuestion, 3000);
			return;
		},
		finishGame:function(){
			$(".questionArea").empty();
			var complete ='<div id="results"><br><h1>Game Over!!</h1><br><h1>Correct: '+triviaGame.correct+
			'</h1><br><h1>Wrong: '+triviaGame.wrong+'</h1><br><h1>Unanswered: '+triviaGame.unanswered+'</h1><br><br><button class="btn" id="restart">Restart</button></div>';
			$('#gameArea').html(complete);
			triviaGame.correct=0;
			triviaGame.wrong=0;
			triviaGame.unanswered=0;
			for (var i=0;i<triviaGame.info.questAns.length;i++){
				triviaGame.info.questAns[i].isAsked=false;
			}
			$('#restart').on('click', triviaGame.selectQuestion);
		}
	}
	$(document).ready(function(){
		triviaGame.gameStart();
	});
