var gamePattern =[];
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern=[];
var level=0;
var started=false;

$(document).keypress(function() {
    if (!started) {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });


$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
    
});




  function checkAnswer(currentLevel) {

    //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userClickedPattern.length === gamePattern.length){

        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {

      console.log("wrong");

      playSound("wrong");

      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      $("#level-title").text("Game Over, Press Any Key to Restart");

      //2. Call startOver() if the user gets the sequence wrong.
      startOver();

    }

}
function nextSequence(){
    userClickedPattern=[]; //ye pattern empty krnapdega
    level++;//lvl update
    $("#level-title").text("Level " + level);//idhr bhi level badhega
    
    var randomNumber = Math.floor(Math.random() *4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    //important
    //$("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    animatePress(randomChosenColour);
    //var audio = new Audio("Sounds/"+randomChosenColour+".mp3");
    //audio.play();
    playSound(randomChosenColour);
    
}
//sounds yha se bjenge
function playSound(name){
    var audio = new Audio("Sounds/"+name+".mp3");
    audio.play();
    

}
//animating user clicks
function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    },100);
}
function startOver() {

  //3. Inside this function, you'll need to reset the values of level, gamePattern and started variables.
  level = 0;
  gamePattern = [];
  started = false;
}
