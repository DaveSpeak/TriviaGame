	// VARIABLES
	// ==========================================================================
	var triviaGame =  { 
			info: {questAns:[
				{question:"Who wrote Game of Thrones?",
				 answer: ["Robert Heinlein", "George R.R. Martin", "Kathleen Kennedy",  "Peter Dinklage"],
				 correct:1, picture:"George-RR-Martin.gif", isAsked:false},
				{question:"How does Tywin Lannister die?",
				 answer: ["He doesn't", "He's beheaded by Joffrey", "Duel with Ned Stark",  "Shot with a crossbow"],
				 correct:3, picture:"tyshot.gif", isAsked:false},
				{question:"Who is Joffrey's father?",
				 answer: ["Robert Baratheon", "Ned Stark", "Jamie Lannister",  "George-RR-Martin"],
				 correct:2, picture:"Jamie-Lannister.gif", isAsked:false},
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
				 correct:3, picture:"Viserys.gif", isAsked:false},
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
		maxTime:30,
		counter:0,
		gameStart:function(){
			var win = new Audio('assets/music/1470110884.mp3');
			win.loop=true;
			win.play();
			var initial=$('<button>').attr({'class':'btn','id':'selection'}).append('<h4>'+"Start");
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
			var timeDisplay=$('<div>').attr('id','timeRem').append('<h1>'+"Time Remaining: "+(triviaGame.maxTime-triviaGame.time)+" seconds");
	        $('#time').html(timeDisplay);
	        var triviaQuestion=$('<div>').attr('class','questionArea').append('<br>','<h1>'+triviaGame.info.questAns[triviaGame.q].question,'<br>');
	        for (i=0;i<4;i++){
	        	triviaQuestion.append($('<button>').attr({'class':'btn response','value':i}).append('<h3>'+
	        	triviaGame.info.questAns[triviaGame.q].answer[i]));
	        }
			$("#gameArea").html(triviaQuestion);
			triviaGame.info.questAns[triviaGame.q].isAsked=true;
			$("button").on('click',function(){
				var i=$(this).attr('value');
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
				var timeDisplay=$('<div>').attr('id','timeRem').append('<h1>'+"Time Remaining: &nbsp"+(triviaGame.maxTime-triviaGame.time)+" seconds");

			}else {
				var timeDisplay=$('<div>').attr('id','timeRem').append('<h1>'+"Time Remaining: "+(triviaGame.maxTime-triviaGame.time)+" seconds");
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
			var winner=$('<div>');
			winner.addClass('questionArea');
			winner.append('<br>','<h1>'+"Correct!!!",'<br>',$('<img>').attr('src','assets/images/'+
				triviaGame.info.questAns[triviaGame.q].picture));
			$('#gameArea').html(winner);
			triviaGame.waitaSecond = setTimeout(triviaGame.selectQuestion, 5000);
			return;
		},
		displayWrong:function(){
			clearTimeout(triviaGame.waitaSecond);
			clearInterval(triviaGame.counter);
			$(".questionArea").empty();
			var loser=$('<div>');
			loser.addClass('questionArea');
			loser.append('<br>','<h1>'+"Sorry!!",'<br>','<h1>'+"The correct answer is: "+
			triviaGame.info.questAns[triviaGame.q].answer[triviaGame.info.questAns[triviaGame.q].correct],'<br>',
			$('<img>').attr('src','assets/images/'+triviaGame.info.questAns[triviaGame.q].picture));
			$('#gameArea').html(loser);
			triviaGame.waitaSecond = setTimeout(triviaGame.selectQuestion, 5000);
			return;
		},
		displayUnanswered:function(){
			$(".questionArea").empty();
			var unans=$('<div>');
			unans.addClass('questionArea');
			unans.append('<br>','<h1>'+"Time\'s up!!!",'<br>','<h1>'+"The correct answer is: "+
			triviaGame.info.questAns[triviaGame.q].answer[triviaGame.info.questAns[triviaGame.q].correct], '<br>',
			$('<img>').attr('src','assets/images/'+triviaGame.info.questAns[triviaGame.q].picture));
			$('#gameArea').html(unans);
			triviaGame.unanswered++;
			triviaGame.waitaSecond = setTimeout(triviaGame.selectQuestion, 5000);
			return;
		},
		finishGame:function(){
			$(".questionArea").empty();
			var complete=$('<div>').attr('id','results').append('<br>','<h1>'+"Game Over!!",'<br>','<h1>'+"Correct: "+
			triviaGame.correct,'<br>','<h1>'+"Wrong: "+triviaGame.wrong,'<br>','<h1>'+"Unanswered: "+
			triviaGame.unanswered,'<br>','<br>',$('<button>').attr({'class':'btn','id':'restart'}).append("Restart"));
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
