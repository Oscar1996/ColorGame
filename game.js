var buttonColors = ["red", "green", "blue", "yellow"]; //Array that contain the colors

var gamePattern = []; //Empty array that will contain the next random color

var userGamePattern = []; //Empty array thar will carry the values of the user picks

var level = 0; //Actual level of the game

var started = false; //Conditional for the first level


//------------------------------------USERS CLICKS-----------------------------------------------------


//jQuery Version
// $(".btn").click(function(){
//   var userChosenColor = $(this).attr("id"); // //It get the id of the button
//   userGamePattern.push(userChosenColor); //It add the color clicked by the user
//   makeItSound(userChosenColor);
//   animatePress(userChosenColor);
//   checkAnswer(userGamePattern.length-1);
//});

 for(var i = 0; i < document.querySelectorAll(".btn").length; i++) {
    document.querySelectorAll(".btn")[i].addEventListener("click", function(){
    var userChosenColor = this.id; //It gett the id of the button
    userGamePattern.push(userChosenColor);//It add the color clicked by the user
    makeItSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userGamePattern.length-1);
  });
}



//------------------------------------------------GAME START-------------------------------------------------------

//jQuery Version
// $(document).keypress(function(){
//   if(!started){
//     nextSequence();
//     started = true;
//   }
// });

document.addEventListener("keypress", function(){
  if(!started){
    nextSequence();
    started = true;
  }
});




//-------------------------------------------------FUNCTIONS------------------------------------------------------------
function nextSequence() {

  userGamePattern = [];
  level++;

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber]; //Selecting a random color
  gamePattern.push(randomChosenColor); //Adding a new element to the array

  //jQuery Version
  // $("#level-title").text("Level " + level);
  // $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  document.getElementById("level-title").textContent = "Level " + level;
  var flashButton = document.getElementById(randomChosenColor);
  flashButton.classList.add("pressed1");
  setTimeout(function(){
  flashButton.classList.remove("pressed1");
  },100);

  makeItSound(randomChosenColor);
}

function checkAnswer(currentLevel){

  if(gamePattern[currentLevel]===userGamePattern[currentLevel]){

    if(gamePattern.length === userGamePattern.length){

      setTimeout(function(){
        nextSequence();
      },1000);

    }
  }else{

    var audio1 = new Audio("sounds/wrong.mp3");
    audio1.play();

    // $("body").addClass("game-over"); //It add a class to the button userClicked
    // setTimeout(function(){
    //   $("body").removeClass("game-over");//Remove the class after 100 milliseconds
    // },300);
    // $("h1").text("Game Over, press any key to restart the game");

    document.body.classList.add("game-over");
    setTimeout(function(){
      document.body.classList.remove("game-over");
    },300);

    document.querySelector("h1").textContent = "Game Over, press any key to restart the game";

    gameOver();
  }

}

function gameOver(){

  gamePattern = [];
  level = 0;
  started = false;

}

function makeItSound(nameColor){ //Function that add sounds effects
  var audio = new Audio("sounds/" + nameColor + ".mp3");
  audio.play();
}

function animatePress(currentColor){ //Function that add animations
  //jQuery Version
  // $("#" + currentColor).addClass("pressed"); //It add a class to the button userClicked
  // setTimeout(function(){
  //   $("#" + currentColor).removeClass("pressed");//Remove the class after 100 milliseconds
  // },100);

  var element = document.getElementById(currentColor);
  element.classList.add("pressed"); //It add a class to the button userClicked
  setTimeout(function(){
  element.classList.remove("pressed");//Remove the class after 100 milliseconds
  },100);
}
