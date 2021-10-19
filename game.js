
var gamePattern = [];

var userClickedPattern = [];

var level = 0;

var started = false;

var buttonColours = ["red", "blue", "green", "yellow"];

$(document).keypress(function(){
    if (started==false) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = !started;
    }     
});

$(".btn").click(function(){
    var userChosenColour = this.id;

    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});


function playSound(name) {

    var audio = new Audio("sounds/" + name +".mp3");
    audio.play();
}


function nextSequence() {

    userClickedPattern = []

    level++;

    $("#level-title").text("Level " + level);
    
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    
    
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
   
    playSound(randomChosenColour); 
  
}




function animatePress(currentcolour) {
    $("."+currentcolour).addClass("pressed");
    
    setTimeout(function(){
        $("."+currentcolour).removeClass("pressed");
    }, 100);
}





function checkAnswer(currentLevel) {

    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("Success")
        if(userClickedPattern.length === gamePattern.length){
            setTimeout (function(){
                nextSequence();
            }, 1000)
        }
    } else {
        var audio = new Audio('sounds/wrong.mp3');
        audio.play();

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200)

        $('h1').text("Game Over, Press Any Key to Restart");

        startOver();
    }
}


function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}




