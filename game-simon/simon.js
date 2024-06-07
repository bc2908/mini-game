var numButtons = ["one", "two", "three", "four"];

var gamePattern = []; 
var userClickedPattern = []; 

var started = false;
var level = 0;
var userStatus = "new"; //3 status: new, playing, lose

var isMobileDevice = false;

function runGame() {
  $("#level-title").text("Level " + level);
  nextSequence();
  started = true;
  userStatus = "playing";
}

//Start game on window by keyboard
$(document).keypress(function () {
  if (!started) {
    runGame();
  }
});

//Handler button game
$(".btn").click(function () {
  //fix issue: when not start game click button -> game over =)) -> add condition for userStatus
  if (userStatus === "playing") {
    var numUserChosenButton = $(this).attr("id");
    userClickedPattern.push(numUserChosenButton);

    playSound(numUserChosenButton);
    animatePress(numUserChosenButton);

    checkAnswer(userClickedPattern.length - 1); //pass present level
  }
});

//Handler new game button on mobile
$(".btn-new-game").click(function () {
  if (!started && (userStatus === "lose" || userStatus === "new")) {
    runGame();

    setTimeout(function () {
      $(".btn-new-game").removeClass("show");
    }, 10);
  }
});

//Funny test
$("body").click(function () {
  detechDevice();
  if (
    isMobileDevice &&
    !started &&
    (userStatus === "lose" || userStatus === "new")
  ) {
    console.log("funny test");
  }
});

//Handler when load game again
$(document).ready(function () {
  detechDevice();
  if (isMobileDevice) {
    $("#level-title").text("Press New Game To Start");
    if (!$(".btn-new-game").hasClass("show")) {
      $(".btn-new-game").addClass("show");
    }
  } else {
    if ($(".btn-new-game").hasClass("show")) {
      $(".btn-new-game").removeClass("show");
    }
  }
});

//Logic game
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    //check the number of times - the player remembers - remember enough to pass
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence(); //increase level
      }, 1000);
    }
  } else {
    userStatus = "lose";
    playSound("wrong");
    detechDevice();

    $("body").addClass("game-over");
    if (!isMobileDevice) {
      $("#level-title").text("Game Over, Press Any Key To Restart");
    } else {
      $("#level-title").text("Game Over, Press New Game To Restart");
      $(".btn-new-game").addClass("show");
    }

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 100);

    startOver();
  }
}

//Increase level
function nextSequence() {
  userClickedPattern = []; //reset array which save memory player
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenNumberButton = numButtons[randomNumber];
  gamePattern.push(randomChosenNumberButton); //increase difficult game

  $("#" + randomChosenNumberButton)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenNumberButton);
}

//Animation when click button
function animatePress(currentNumberButton) {
  $("#" + currentNumberButton).addClass("pressed");
  setTimeout(function () {
    $("#" + currentNumberButton).removeClass("pressed");
  }, 100);
}

//Sound when click button
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//Reset game
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

//Check device
function detechDevice() {
  if (
    navigator.userAgent.match(/Android/) ||
    navigator.userAgent.match(/webOS/) ||
    navigator.userAgent.match(/iPhone/) ||
    navigator.userAgent.match(/iPad/) ||
    navigator.userAgent.match(/iPod/) ||
    navigator.userAgent.match(/BlackBerry/) ||
    navigator.userAgent.match(/Windows Phone/)
  ) {
    isMobileDevice = true;
  } else {
    isMobileDevice = false;
  }
}
